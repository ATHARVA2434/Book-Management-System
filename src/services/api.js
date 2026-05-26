const STORAGE_KEY = "book_manager_books";

const SEED_DATA = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Fiction",
    year: 1925,
    description:
      "A tale of wealth, love, and the American Dream in the Jazz Age.",
    isbn: "978-0743273565",
  },
  {
    id: "2",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    genre: "History",
    year: 2011,
    description:
      "A brief history of humankind from the Stone Age to the present.",
    isbn: "978-0062316097",
  },
  {
    id: "3",
    title: "Dune",
    author: "Frank Herbert",
    genre: "Science Fiction",
    year: 1965,
    description:
      "An epic saga of politics, religion, and survival on a desert planet.",
    isbn: "978-0441013593",
  },
  {
    id: "4",
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Self-Help",
    year: 2018,
    description:
      "A practical guide to building good habits and breaking bad ones.",
    isbn: "978-0735211292",
  },
  {
    id: "5",
    title: "The Name of the Wind",
    author: "Patrick Rothfuss",
    genre: "Fantasy",
    year: 2007,
    description: "The legend of Kvothe, a magically gifted young man.",
    isbn: "978-0756404079",
  },
  {
    id: "6",
    title: "Gone Girl",
    author: "Gillian Flynn",
    genre: "Thriller",
    year: 2012,
    description:
      "A psychological thriller about a missing woman and her husband.",
    isbn: "978-0307588364",
  },
  {
    id: "7",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    genre: "Non-Fiction",
    year: 2011,
    description: "An exploration of the two systems that drive how we think.",
    isbn: "978-0374533557",
  },
  {
    id: "8",
    title: "The Shining",
    author: "Stephen King",
    genre: "Horror",
    year: 1977,
    description: "A family's terrifying winter in a haunted mountain hotel.",
    isbn: "978-0307743657",
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

const load = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  // First run: seed default books and save
  localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_DATA));
  return SEED_DATA;
};

const save = (books) =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));

const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms));

const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2);

// ── API surface (same signatures as the original fetch-based api.js) ──────────

export const api = {
  getAll: async () => {
    await delay();
    return load();
  },

  create: async (book) => {
    await delay();
    const books = load();
    const created = { ...book, id: uid() };
    save([...books, created]);
    return created;
  },

  update: async (id, book) => {
    await delay();
    const books = load();
    const idx = books.findIndex((b) => b.id === String(id));
    if (idx === -1) throw new Error("Book not found");
    const updated = { ...books[idx], ...book, id: String(id) };
    books[idx] = updated;
    save(books);
    return updated;
  },

  remove: async (id) => {
    await delay();
    const books = load();
    const filtered = books.filter((b) => b.id !== String(id));
    if (filtered.length === books.length) throw new Error("Book not found");
    save(filtered);
    return { id };
  },
};
