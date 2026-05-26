const GENRE_COLORS = {
  "Fiction":          { bg: "#E6F1FB", text: "#185FA5" },
  "Non-Fiction":      { bg: "#EAF3DE", text: "#3B6D11" },
  "Science Fiction":  { bg: "#EEEDFE", text: "#534AB7" },
  "Fantasy":          { bg: "#FAEEDA", text: "#854F0B" },
  "Mystery":          { bg: "#FBEAF0", text: "#993556" },
  "Thriller":         { bg: "#FCEBEB", text: "#A32D2D" },
  "Biography":        { bg: "#E1F5EE", text: "#0F6E56" },
  "History":          { bg: "#F1EFE8", text: "#5F5E5A" },
  "Self-Help":        { bg: "#FAECE7", text: "#993C1D" },
  "Romance":          { bg: "#FBEAF0", text: "#993556" },
  "Horror":           { bg: "#FCEBEB", text: "#A32D2D" },
  "Philosophy":       { bg: "#EEEDFE", text: "#3C3489" },
};

const COVER_ICONS = ["📚", "📖", "📕", "📗", "📘", "📙"];

const BookCard = ({ book, onEdit, onDelete, deleting }) => {
  const colors = GENRE_COLORS[book.genre] || { bg: "#F1EFE8", text: "#5F5E5A" };
  const icon   = COVER_ICONS[Number(book.id) % COVER_ICONS.length] || "📚";

  return (
    <article className="book-card">
      <div className="book-header">
        <div className="book-cover" style={{ background: colors.bg }}>
          {icon}
        </div>
        <div className="book-meta">
          <h3 className="book-title" title={book.title}>{book.title}</h3>
          <p className="book-author">{book.author}</p>
        </div>
      </div>

      <div className="book-details">
        <span
          className="genre-badge"
          style={{ background: colors.bg, color: colors.text }}
        >
          {book.genre}
        </span>
        <span className="year-tag">{book.year}</span>
        {book.isbn && <span className="isbn-tag">{book.isbn}</span>}
      </div>

      {book.description && (
        <p className="book-description">
          {book.description.length > 100
            ? book.description.slice(0, 100) + "…"
            : book.description}
        </p>
      )}

      <div className="book-actions">
        <button className="btn btn-sm" onClick={() => onEdit(book)}>
          ✏️ Edit
        </button>
        <button
          className="btn btn-sm btn-danger"
          onClick={() => onDelete(book.id)}
          disabled={deleting === book.id}
        >
          {deleting === book.id ? "Deleting…" : "🗑 Delete"}
        </button>
      </div>
    </article>
  );
};

export default BookCard;
