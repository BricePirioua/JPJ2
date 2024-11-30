export interface Artwork {
  id: string;
  title: string;
  year: number;
  dimensions: string;
  technique: string;
  imageUrl: string;
  category: string;
  description?: string;
}