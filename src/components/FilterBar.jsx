const FilterBar = ({
  search, onSearch,
  genreFilter, onGenre, genres,
  yearFilter, onYear, years,
  sortBy, onSort,
}) => (
  <div className="filter-bar">
    <div className="search-wrap">
      <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
      </svg>
      <input
        type="text"
        className="search-input"
        placeholder="Search by title or author…"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        aria-label="Search books"
      />
      {search && (
        <button className="clear-btn" onClick={() => onSearch("")} aria-label="Clear search">✕</button>
      )}
    </div>

    <select value={genreFilter} onChange={(e) => onGenre(e.target.value)} aria-label="Filter by genre">
      <option value="">All genres</option>
      {genres.map((g) => <option key={g} value={g}>{g}</option>)}
    </select>

    <select value={yearFilter} onChange={(e) => onYear(e.target.value)} aria-label="Filter by year">
      <option value="">All years</option>
      {years.map((y) => <option key={y} value={y}>{y}</option>)}
    </select>

    <select value={sortBy} onChange={(e) => onSort(e.target.value)} aria-label="Sort books">
      <option value="title">Sort: Title A–Z</option>
      <option value="author">Sort: Author A–Z</option>
      <option value="year_desc">Sort: Newest first</option>
      <option value="year_asc">Sort: Oldest first</option>
    </select>
  </div>
);

export default FilterBar;
