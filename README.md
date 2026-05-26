# 📚 Book Management System

A React + Vite app to view, add, edit, and delete books — with search, filtering, and sorting. Data is stored in `localStorage` so no backend or external API is required.

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI framework |
| Vite | Build tool & dev server |
| localStorage | Data persistence (no backend needed) |
| Vercel | Deployment |

---

## Project Structure

```
book-manager/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx                  # Entry point
    ├── App.jsx                   # Root component
    ├── App.css                   # All styles (dark mode included)
    ├── services/
    │   └── api.js                # localStorage CRUD (getAll, create, update, remove)
    ├── hooks/
    │   └── useBooks.js           # State, filtering, sorting, CRUD logic
    └── components/
        ├── BookCard.jsx          # Single book display card
        ├── BookForm.jsx          # Add / Edit modal with validation
        ├── FilterBar.jsx         # Search + genre/year filter + sort
        ├── StatsBar.jsx          # Summary counts (total, genres, showing, avg year)
        └── Toast.jsx             # Notifications + useToast hook
```

---

## Features

- **View** all books in a responsive card grid
- **Add** books via a validated modal form
- **Edit** existing books (form pre-fills with current data)
- **Delete** books with a confirmation prompt
- **Search** by title or author in real time
- **Filter** by genre and publication year
- **Sort** by title, author, newest first, or oldest first
- **Stats bar** showing total books, genres, currently showing, and average year
- **Persistent storage** — data survives page refresh via localStorage
- **Loading states** with a spinner
- **Error handling** with retry button
- **Toast notifications** for add / edit / delete actions
- **Dark mode** support (follows system preference)
- **Responsive** — works on mobile and desktop

---

## Local Setup

### Prerequisites

Make sure you have these installed:

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher (comes with Node)

Check your versions:
```bash
node -v
npm -v
```

---

### Step 1 — Clone or download the project

If you have the zip, extract it.


---

### Step 2 — Install dependencies

```bash
npm install
```

---

### Step 3 — Start the dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

The app loads with 8 seed books on first run. All changes (add, edit, delete) are saved automatically to `localStorage`.

---

### Step 4 — Build for production (optional)

```bash
npm run build
```

This creates a `dist/` folder with the optimised production build.

To preview the production build locally:
```bash
npm run preview
```

---





## Resetting Data

All data lives in your browser's `localStorage` under the key `book_manager_books`.

To reset back to the 8 seed books, run this in your browser console:
```js
localStorage.removeItem("book_manager_books");
location.reload();
```

---

## Notes

- No backend, no database, no API keys required
- Data is per-browser — clearing browser data will reset the library
- For a shared/multi-user version, swap `src/services/api.js` with a real REST API (MockAPI, Supabase, Firebase, etc.) — all other files stay the same
