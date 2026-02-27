export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  status: 'Available' | 'Borrowed' | 'Reserved';
  category: string;
  rating: number;
  pages: number;
  format: string;
  synopsis: string;
}

export interface BorrowedBook extends Book {
  borrowDate: string;
  dueDate: string;
  borrowStatus: 'On Time' | 'Overdue' | 'Borrowed';
}

export type View = 'home' | 'login' | 'detail' | 'dashboard';
