import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { Artwork } from '../types/artwork';
import bcrypt from 'bcryptjs';

interface ArtworkStore {
  artworks: Artwork[];
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
  fetchArtworks: () => Promise<void>;
  addArtwork: (artwork: Omit<Artwork, 'id'>, imageFile: File) => Promise<void>;
  removeArtwork: (id: string, imageUrl: string) => Promise<void>;
  updateArtwork: (id: string, artwork: Partial<Artwork>, imageFile?: File) => Promise<void>;
}

export const useArtworkStore = create<ArtworkStore>((set, get) => ({
  artworks: [],
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (password) => {
    try {
      const isValid = password === 'JP';
      set({ isAuthenticated: isValid, error: isValid ? null : 'Mot de passe incorrect' });
      return isValid;
    } catch (error) {
      set({ error: 'Erreur lors de la connexion' });
      return false;
    }
  },

  logout: () => set({ isAuthenticated: false }),

  fetchArtworks: async () => {
    try {
      set({ isLoading: true, error: null });
      const { data, error } = await supabase
        .from('artworks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const artworks = data.map(artwork => ({
        id: artwork.id,
        title: artwork.title,
        year: artwork.year,
        dimensions: artwork.dimensions,
        technique: artwork.technique,
        imageUrl: artwork.image_url,
        category: artwork.category,
        description: artwork.description
      }));
      
      set({ artworks, isLoading: false });
    } catch (error) {
      console.error('Error fetching artworks:', error);
      set({ error: 'Erreur lors du chargement des œuvres', isLoading: false });
    }
  },

  addArtwork: async (artwork, imageFile) => {
    try {
      set({ isLoading: true, error: null });

      // Upload de l'image
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('artwork-images')
        .upload(fileName, imageFile);

      if (uploadError) throw uploadError;

      // Récupérer l'URL publique de l'image
      const { data: { publicUrl } } = supabase.storage
        .from('artwork-images')
        .getPublicUrl(fileName);

      // Ajouter l'œuvre avec l'URL de l'image
      const { data, error } = await supabase
        .from('artworks')
        .insert([{
          title: artwork.title,
          year: artwork.year,
          dimensions: artwork.dimensions,
          technique: artwork.technique,
          image_url: publicUrl,
          category: artwork.category,
          description: artwork.description
        }])
        .select()
        .single();

      if (error) throw error;
      
      const newArtwork = {
        id: data.id,
        title: data.title,
        year: data.year,
        dimensions: data.dimensions,
        technique: data.technique,
        imageUrl: data.image_url,
        category: data.category,
        description: data.description
      };

      set(state => ({
        artworks: [newArtwork, ...state.artworks],
        isLoading: false
      }));
    } catch (error) {
      console.error('Error adding artwork:', error);
      set({ error: 'Erreur lors de l\'ajout de l\'œuvre', isLoading: false });
    }
  },

  removeArtwork: async (id, imageUrl) => {
    try {
      set({ isLoading: true, error: null });

      // Supprimer l'image du stockage
      const fileName = imageUrl.split('/').pop();
      if (fileName) {
        const { error: deleteStorageError } = await supabase.storage
          .from('artwork-images')
          .remove([fileName]);

        if (deleteStorageError) throw deleteStorageError;
      }

      // Supprimer l'œuvre de la base de données
      const { error } = await supabase
        .from('artworks')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      set(state => ({
        artworks: state.artworks.filter(artwork => artwork.id !== id),
        isLoading: false
      }));
    } catch (error) {
      console.error('Error removing artwork:', error);
      set({ error: 'Erreur lors de la suppression de l\'œuvre', isLoading: false });
    }
  },

  updateArtwork: async (id, artwork, imageFile) => {
    try {
      set({ isLoading: true, error: null });

      let imageUrl = artwork.imageUrl;

      // Si une nouvelle image est fournie, la télécharger
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('artwork-images')
          .upload(fileName, imageFile);

        if (uploadError) throw uploadError;

        // Récupérer l'URL publique de la nouvelle image
        const { data: { publicUrl } } = supabase.storage
          .from('artwork-images')
          .getPublicUrl(fileName);

        imageUrl = publicUrl;

        // Supprimer l'ancienne image si elle existe
        const oldFileName = artwork.imageUrl?.split('/').pop();
        if (oldFileName) {
          await supabase.storage
            .from('artwork-images')
            .remove([oldFileName]);
        }
      }

      const { data, error } = await supabase
        .from('artworks')
        .update({
          title: artwork.title,
          year: artwork.year,
          dimensions: artwork.dimensions,
          technique: artwork.technique,
          image_url: imageUrl,
          category: artwork.category,
          description: artwork.description
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      const updatedArtwork = {
        id: data.id,
        title: data.title,
        year: data.year,
        dimensions: data.dimensions,
        technique: data.technique,
        imageUrl: data.image_url,
        category: data.category,
        description: data.description
      };

      set(state => ({
        artworks: state.artworks.map(a => a.id === id ? updatedArtwork : a),
        isLoading: false
      }));
    } catch (error) {
      console.error('Error updating artwork:', error);
      set({ error: 'Erreur lors de la mise à jour de l\'œuvre', isLoading: false });
    }
  },
}));