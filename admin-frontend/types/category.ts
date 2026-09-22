export interface Category {
  id: number;
  category_number: number;
  name: string;
  active: boolean;
  projectCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryData {
  category_number: number;
  name: string;
  active: boolean;
}

export interface UpdateCategoryData {
  category_number?: number;
  name?: string;
  active?: boolean;
}