import { useState } from "react";
import { useBooks }   from "./hooks/useBooks";
import StatsBar       from "./components/StatsBar";
import FilterBar      from "./components/FilterBar";
import BookCard       from "./components/BookCard";
import BookForm       from "./components/BookForm";
import Toast, { useToast } from "./components/Toast";
import "./App.css";

const App = () => {
  const {
    filtered, loading, error,
    search, setSearch,
    genreFilter, setGenreFilter, genres,
    yearFilter,  setYearFilter,  years,
    sortBy, setSortBy,
    stats,
    addBook, updateBook, deleteBook,
    refetch,
  } = useBooks();

  const { toast, show: showToast } = useToast();

  const [modalOpen,  setModalOpen]  = useState(false);
  const [editTarget, setEditTarget] = useState(null); // null = add, book obj = edit
  const [saving,     setSaving]     = useState(false);
  const [deleting,   setDeleting]   = useState(null); // id being deleted

  // ── Handlers ────────────────────────────────────────────────────────────────
  const openAdd  = () => { setEditTarget(null); setModalOpen(true); };
  const openEdit = (book) => { setEditTarget(book); setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); setEditTarget(null); };

  const handleSave = async (data) => {
    setSaving(true);
    try {
      if (editTarget) {
        await updateBook(editTarget.id, data);
        showToast("Book updated successfully");
      } else {
        await addBook(data);
        showToast("Book added successfully");
      }
      closeModal();
    } catch (err) {
      showToast(err.message || "Something went wrong", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Remove this book from the library?")) return;
    setDeleting(id);
    try {
      await deleteBook(id);
      showToast("Book deleted");
    } catch (err) {
      showToast(err.message || "Could not delete book", "error");
    } finally {
      setDeleting(null);
    }
  };

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <div>
          <h1 className="app-title">📚 Book Library</h1>
          <p className="app-subtitle">Manage your personal book collection</p>
        </div>
        <button className="btn btn-primary" onClick={openAdd}>
          + Add Book
        </button>
      </header>

      {/* Stats */}
      <StatsBar stats={stats} />

      {/* Filters */}
      <FilterBar
        search={search}         onSearch={setSearch}
        genreFilter={genreFilter} onGenre={setGenreFilter} genres={genres}
        yearFilter={yearFilter}   onYear={setYearFilter}   years={years}
        sortBy={sortBy}           onSort={setSortBy}
      />

      {/* Content */}
      {loading && (
        <div className="state-box">
          <div className="spinner" aria-label="Loading" />
          <p>Loading books…</p>
        </div>
      )}

      {!loading && error && (
        <div className="state-box state-box--error">
          <p>⚠️ {error}</p>
          <button className="btn" onClick={refetch}>Retry</button>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="state-box">
          <p style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>📭</p>
          <p>No books found</p>
          <p style={{ fontSize: "0.8rem", opacity: 0.6, marginTop: "4px" }}>
            Try adjusting your search or filters
          </p>
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <div className="books-grid">
          {filtered.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onEdit={openEdit}
              onDelete={handleDelete}
              deleting={deleting}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <BookForm
          book={editTarget}
          onSave={handleSave}
          onClose={closeModal}
          saving={saving}
        />
      )}

      {/* Toast */}
      <Toast toast={toast} />
    </div>
  );
};

export default App;
