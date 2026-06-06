export default function CategoryFilter({
  categories,
  selected,
  onSelect,
}) {
  return (
    <div className="category-filter" aria-label="Filter kategori">
      <button
        className={selected === 'all' ? 'category-button active' : 'category-button'}
        type="button"
        onClick={() => onSelect('all')}
      >
        Semua
      </button>
      {categories.map((category) => (
        <button
          className={selected === category ? 'category-button active' : 'category-button'}
          key={category}
          type="button"
          onClick={() => onSelect(category)}
        >
          #{category}
        </button>
      ))}
    </div>
  );
}
