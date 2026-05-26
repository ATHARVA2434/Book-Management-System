const StatCard = ({ label, value }) => (
  <div className="stat-card">
    <div className="stat-label">{label}</div>
    <div className="stat-value">{value}</div>
  </div>
);

const StatsBar = ({ stats }) => (
  <div className="stats-bar">
    <StatCard label="Total Books" value={stats.total} />
    <StatCard label="Genres"      value={stats.genres} />
    <StatCard label="Showing"     value={stats.showing} />
    <StatCard label="Avg Year"    value={stats.avgYear} />
  </div>
);

export default StatsBar;
