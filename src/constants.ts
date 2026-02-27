import { Book, BorrowedBook } from './types';

export const MOCK_BOOKS: Book[] = [
  {
    id: '1',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    coverUrl: 'https://picsum.photos/seed/midnight/400/600',
    status: 'Available',
    category: 'Fiction',
    rating: 4.5,
    pages: 304,
    format: 'Hardcover',
    synopsis: 'Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.'
  },
  {
    id: '2',
    title: 'Dune',
    author: 'Frank Herbert',
    coverUrl: 'https://picsum.photos/seed/dune/400/600',
    status: 'Borrowed',
    category: 'Fiction',
    rating: 4.8,
    pages: 612,
    format: 'Paperback',
    synopsis: 'Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world.'
  },
  {
    id: '3',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    coverUrl: 'https://picsum.photos/seed/code/400/600',
    status: 'Available',
    category: 'Tech',
    rating: 4.7,
    pages: 464,
    format: 'Hardcover',
    synopsis: 'Even bad code can function. But if code isn’t clean, it can bring a development organization to its knees.'
  },
  {
    id: '4',
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    coverUrl: 'https://picsum.photos/seed/sapiens/400/600',
    status: 'Available',
    category: 'Science',
    rating: 4.9,
    pages: 443,
    format: 'Paperback',
    synopsis: 'Destined to become a modern classic, Sapiens explores how the Homo sapiens managed to survive and believe in gods, nations and human rights.'
  },
  {
    id: '5',
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    coverUrl: 'https://picsum.photos/seed/money/400/600',
    status: 'Available',
    category: 'Business',
    rating: 4.8,
    pages: 256,
    format: 'Hardcover',
    synopsis: 'Doing well with money isn’t necessarily about what you know. It’s about how you behave.'
  },
  {
    id: '6',
    title: 'Zero to One',
    author: 'Peter Thiel',
    coverUrl: 'https://picsum.photos/seed/zero/400/600',
    status: 'Borrowed',
    category: 'Business',
    rating: 4.6,
    pages: 224,
    format: 'Hardcover',
    synopsis: 'The next Bill Gates will not build an operating system. The next Larry Page or Sergey Brin won’t make a search engine.'
  },
  {
    id: '7',
    title: '1984',
    author: 'George Orwell',
    coverUrl: 'https://picsum.photos/seed/1984/400/600',
    status: 'Available',
    category: 'Fiction',
    rating: 4.7,
    pages: 328,
    format: 'Paperback',
    synopsis: 'Winston Smith toes the Party line, rewriting history to satisfy the Ministry of Truth. With every lie he writes, Winston grows to hate the Party.'
  },
  {
    id: '8',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    coverUrl: 'https://picsum.photos/seed/gatsby/400/600',
    status: 'Available',
    category: 'Fiction',
    rating: 4.4,
    pages: 180,
    format: 'Paperback',
    synopsis: 'The story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.'
  }
];

export const BORROWED_BOOKS: BorrowedBook[] = [
  {
    ...MOCK_BOOKS[4],
    borrowDate: 'Oct 12, 2023',
    dueDate: 'Oct 26, 2023',
    borrowStatus: 'On Time'
  },
  {
    ...MOCK_BOOKS[5],
    borrowDate: 'Oct 15, 2023',
    dueDate: 'Oct 22, 2023',
    borrowStatus: 'Overdue'
  },
  {
    ...MOCK_BOOKS[7],
    borrowDate: 'Oct 18, 2023',
    dueDate: 'Nov 01, 2023',
    borrowStatus: 'Borrowed'
  }
];
