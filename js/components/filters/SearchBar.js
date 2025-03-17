function SearchBar({ initialQuery = '', onSearch }) {
  try {
    const [searchQuery, setSearchQuery] = React.useState(initialQuery);
    
    // Update search query when props change
    React.useEffect(() => {
      setSearchQuery(initialQuery);
    }, [initialQuery]);
    
    // Handle search submission
    const handleSubmit = (e) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        onSearch(searchQuery);
      }
    };
    
    // Handle input change
    const handleChange = (e) => {
      setSearchQuery(e.target.value);
    };
    
    // Clear search
    const clearSearch = () => {
      setSearchQuery('');
      onSearch('');
    };
    
    return (
      <div data-name="search-bar" className="mb-6">
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleChange}
            className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            data-name="search-input"
          />
          <div className="absolute left-3 top-3 text-gray-400">
            <i className="fas fa-search"></i>
          </div>
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              data-name="clear-search"
            >
              <i className="fas fa-times"></i>
            </button>
          )}
        </form>
      </div>
    );
  } catch (error) {
    console.error('SearchBar component error:', error);
    reportError(error);
    return null;
  }
}
