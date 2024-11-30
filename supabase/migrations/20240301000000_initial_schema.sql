-- Activer l'extension UUID
create extension if not exists "uuid-ossp";

-- Créer la table artworks
create table public.artworks (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  year integer not null,
  dimensions text not null,
  technique text not null,
  image_url text not null,
  category text not null,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Activer RLS (Row Level Security)
alter table public.artworks enable row level security;

-- Créer les politiques de sécurité
create policy "Lecture publique"
  on public.artworks for select
  using (true);

create policy "Insertion authentifiée uniquement"
  on public.artworks for insert
  using (true);

create policy "Modification authentifiée uniquement"
  on public.artworks for update
  using (true);

create policy "Suppression authentifiée uniquement"
  on public.artworks for delete
  using (true);

-- Créer le bucket de stockage pour les images
insert into storage.buckets (id, name, public)
values ('artwork-images', 'artwork-images', true);

-- Créer les politiques de stockage
create policy "Lecture publique stockage"
  on storage.objects for select
  using (bucket_id = 'artwork-images');

create policy "Insertion stockage"
  on storage.objects for insert
  with check (bucket_id = 'artwork-images');

create policy "Modification stockage"
  on storage.objects for update
  using (bucket_id = 'artwork-images');

create policy "Suppression stockage"
  on storage.objects for delete
  using (bucket_id = 'artwork-images');

-- Insérer des données initiales
insert into public.artworks (title, year, dimensions, technique, image_url, category, description)
values 
  ('Abstraction en Bleu', 2023, '100x80cm', 'Huile sur toile', 'https://images.unsplash.com/photo-1541961017774-22349e4a1262', 'Abstrait', 'Une exploration des profondeurs de l''émotion à travers les nuances de bleu.'),
  ('Symphonie Urbaine', 2022, '120x100cm', 'Acrylique sur toile', 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8', 'Urbain', 'Une interprétation vibrante de la vie citadine moderne.'),
  ('Nature Silencieuse', 2023, '90x70cm', 'Huile sur toile', 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5', 'Nature', 'Une étude contemplative de la nature dans ses moments les plus paisibles.'),
  ('Réflexions Nocturnes', 2022, '100x100cm', 'Technique mixte', 'https://images.unsplash.com/photo-1549887534-1541e9326642', 'Abstrait', 'Une méditation sur la solitude et la beauté de la nuit.'),
  ('Fragments de Mémoire', 2023, '80x60cm', 'Acrylique sur toile', 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9', 'Contemporain', 'Une exploration des souvenirs fragmentés et de leur impact sur notre présent.');