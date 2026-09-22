export interface Category {
  id: number;
  category_number: number;
  name: string;
}

export interface ProjectImage {
  id: number;
  projectId: number;
  image: string;
  createdAt?: string;
}

export interface ProjectTechnology {
  id: number;
  projectId: number;
  technology: string;
  createdAt?: string;
}

export interface Project {
  id: number;
  project_number: number;
  name: string;
  description: string | null;
  categoryId: number;
  duration: number;
  project_link: string | null;
  active: boolean;

  category: Category;

  images: ProjectImage[];

  technologies: ProjectTechnology[];

  createdAt?: string;
  updatedAt?: string;
}