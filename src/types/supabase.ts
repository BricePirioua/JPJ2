export interface Database {
  public: {
    Tables: {
      artworks: {
        Row: {
          id: string;
          title: string;
          year: number;
          dimensions: string;
          technique: string;
          image_url: string;
          category: string;
          description?: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['artworks']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['artworks']['Insert']>;
      };
    };
  };
}