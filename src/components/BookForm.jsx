import { useState, useEffect } from "react";

const GENRES = [
  "Fiction", "Non-Fiction", "Science Fiction", "Fantasy",
  "Mystery", "Thriller", "Biography", "History",
  "Self-Help", "Romance", "Horror", "Philosophy",
];

const EMPTY = { title: "", author: "", genre: "", year: "", description: "", isbn: "" };

const BookForm = ({ book, onSave, onClose, saving }) => {
  const [form,   setForm]   = useState(EMPTY);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm(book ? { ...EMPTY, ...book } : EMPTY);
    setErrors({});
  }, [book]);

  const set = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.title.trim())                         e.title  = "Title is required";
    if (!form.author.trim())                        e.author = "Author is required";
    if (!form.genre)                                e.genre  = "Genre is required";
    const y = Number(form.year);
    if (!form.year || y < 1000 || y > new Date().getFullYear())
                                                    e.year   = `Enter a year between 1000–${new Date().getFullYear()}`;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const payload = {
      title:       form.title.trim(),
      author:      form.author.trim(),
      genre:       form.genre,
      year:        Number(form.year),
      description: form.description.trim(),
      isbn:        form.isbn.trim(),
    };
    onSave(payload);
  };

  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdrop} role="dialog" aria-modal="true" aria-label={book ? "Edit book" : "Add book"}>
      <div className="modal">
        <div className="modal-header">
          <h2>{book ? "Edit Book" : "Add New Book"}</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-grid">

            <div className="form-group">
              <label htmlFor="fTitle">Title *</label>
              <input id="fTitle" type="text" value={form.title} onChange={set("title")} placeholder="Enter book title" />
              {errors.title && <span className="error-msg">{errors.title}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="fAuthor">Author *</label>
              <input id="fAuthor" type="text" value={form.author} onChange={set("author")} placeholder="Author name" />
              {errors.author && <span className="error-msg">{errors.author}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="fGenre">Genre *</label>
                <select id="fGenre" value={form.genre} onChange={set("genre")}>
                  <option value="">Select genre</option>
                  {GENRES.map((g) => <option key={g} value={g}>{g}</option>)}
                </select>
                {errors.genre && <span className="error-msg">{errors.genre}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="fYear">Year *</label>
                <input
                  id="fYear" type="number" value={form.year} onChange={set("year")}
                  placeholder="e.g. 2024" min="1000" max={new Date().getFullYear()}
                />
                {errors.year && <span className="error-msg">{errors.year}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="fDesc">Description</label>
              <textarea id="fDesc" rows={3} value={form.description} onChange={set("description")} placeholder="Short description (optional)" />
            </div>

            <div className="form-group">
              <label htmlFor="fIsbn">ISBN</label>
              <input id="fIsbn" type="text" value={form.isbn} onChange={set("isbn")} placeholder="978-…" />
            </div>

          </div>

          <div className="modal-actions">
            <button type="button" className="btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? "Saving…" : book ? "Update Book" : "Add Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookForm;
