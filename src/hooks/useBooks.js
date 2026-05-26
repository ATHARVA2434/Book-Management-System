import { useState, useEffect, useCallback } from "react";
import { api } from "../services/api";

export const useBooks = () => {
  const [books, setBooks]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);
  const [search, setSearch]     = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [yearFilter, setYearFilter]   = useState("");
  const [sortBy, setSortBy]     = useState("title");

  // ── Fetch ──────────────────────────────────────────────────────────────────
  const fetchBooks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getAll();
      setBooks(data);
    } catch (err) {
      setError(err.message || "Failed to load books.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchBooks(); }, [fetchBooks]);

  // ── Create ─────────────────────────────────────────────────────────────────
  const addBook = async (bookData) => {
    const created = await api.create(bookData);
    setBooks((prev) => [...prev, created]);
    return created;
  };

  // ── Update ─────────────────────────────────────────────────────────────────
  const updateBook = async (id, bookData) => {
    const updated = await api.update(id, bookData);
    setBooks((prev) => prev.map((b) => (b.id === id ? updated : b)));
    return updated;
  };

  // ── Delete ─────────────────────────────────────────────────────────────────
  const deleteBook = async (id) => {
    await api.remove(id);
    setBooks((prev) => prev.filter((b) => b.id !== id));
  };

  // ── Derived data ───────────────────────────────────────────────────────────
  const genres = [...new Set(books.map((b) => b.genre))].filter(Boolean).sort();
  const years  = [...new Set(books.map((b) => String(b.year)))].filter(Boolean).sort((a, b) => b - a);

  const filtered = books
    .filter((b) => {
      const q = search.toLowerCase();
      if (q && !b.title?.toLowerCase().includes(q) && !b.author?.toLowerCase().includes(q)) return false;
      if (genreFilter && b.genre !== genreFilter) return false;
      if (yearFilter && String(b.year) !== yearFilter) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "author")    return a.author?.localeCompare(b.author);
      if (sortBy === "year_desc") return Number(b.year) - Number(a.year);
      if (sortBy === "year_asc")  return Number(a.year) - Number(b.year);
      return a.title?.localeCompare(b.title);
    });

  const stats = {
    total:      books.length,
    genres:     genres.length,
    showing:    filtered.length,
    avgYear:    books.length
      ? Math.round(books.reduce((s, b) => s + Number(b.year), 0) / books.length)
      : "—",
  };

  return {
    books, filtered, loading, error,
    search, setSearch,
    genreFilter, setGenreFilter,
    yearFilter, setYearFilter,
    sortBy, setSortBy,
    genres, years, stats,
    addBook, updateBook, deleteBook,
    refetch: fetchBooks,
  };
};
