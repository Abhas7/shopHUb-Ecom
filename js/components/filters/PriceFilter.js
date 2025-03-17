function PriceFilter({ minPrice, maxPrice, onPriceChange }) {
  try {
    const [localMinPrice, setLocalMinPrice] = React.useState(minPrice || 0);
    const [localMaxPrice, setLocalMaxPrice] = React.useState(maxPrice || 1000);
    
    // Apply price filter when user clicks the button
    const applyFilter = () => {
      onPriceChange(localMinPrice, localMaxPrice);
    };
    
    // Reset price filter
    const resetFilter = () => {
      setLocalMinPrice(0);
      setLocalMaxPrice(1000);
      onPriceChange(0, 1000);
    };
    
    // Update local state when props change
    React.useEffect(() => {
      setLocalMinPrice(minPrice || 0);
      setLocalMaxPrice(maxPrice || 1000);
    }, [minPrice, maxPrice]);
    
    return (
      <div data-name="price-filter" className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-medium mb-3">Price Range</h3>
        
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-500">Min: {formatPrice(localMinPrice)}</span>
            <span className="text-sm text-gray-500">Max: {formatPrice(localMaxPrice)}</span>
          </div>
          
          {/* Simple price range inputs - in a real app, could be replaced with a slider component */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="min-price" className="block text-sm text-gray-600">Min Price</label>
              <input
                id="min-price"
                type="number"
                min="0"
                max={localMaxPrice}
                value={localMinPrice}
                onChange={(e) => setLocalMinPrice(Number(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
                data-name="min-price-input"
              />
            </div>
            <div>
              <label htmlFor="max-price" className="block text-sm text-gray-600">Max Price</label>
              <input
                id="max-price"
                type="number"
                min={localMinPrice}
                value={localMaxPrice}
                onChange={(e) => setLocalMaxPrice(Number(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
                data-name="max-price-input"
              />
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button
            variant="primary"
            onClick={applyFilter}
            className="flex-1"
            data-name="apply-price-filter"
          >
            Apply
          </Button>
          <Button
            variant="outline"
            onClick={resetFilter}
            className="flex-1"
            data-name="reset-price-filter"
          >
            Reset
          </Button>
        </div>
      </div>
    );
  } catch (error) {
    console.error('PriceFilter component error:', error);
    reportError(error);
    return null;
  }
}
