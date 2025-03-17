function Rating({ value = 0, max = 5, size = 'medium', showValue = true }) {
  try {
    const stars = [];
    const roundedValue = Math.round(value * 2) / 2; // Round to nearest 0.5
    
    // Size classes
    let sizeClass = 'text-sm';
    if (size === 'small') {
      sizeClass = 'text-xs';
    } else if (size === 'large') {
      sizeClass = 'text-lg';
    }
    
    // Generate stars
    for (let i = 1; i <= max; i++) {
      if (i <= roundedValue) {
        // Full star
        stars.push(
          <i 
            key={i} 
            className="fas fa-star star-filled" 
            data-name={`star-${i}`}
          ></i>
        );
      } else if (i - 0.5 === roundedValue) {
        // Half star
        stars.push(
          <i 
            key={i} 
            className="fas fa-star-half-alt star-filled" 
            data-name={`star-half-${i}`}
          ></i>
        );
      } else {
        // Empty star
        stars.push(
          <i 
            key={i} 
            className="far fa-star star-empty" 
            data-name={`star-empty-${i}`}
          ></i>
        );
      }
    }
    
    return (
      <div data-name="rating" className="flex items-center">
        <div className={`flex ${sizeClass}`}>
          {stars}
        </div>
        {showValue && (
          <span className="ml-1 text-gray-600" data-name="rating-value">
            ({value.toFixed(1)})
          </span>
        )}
      </div>
    );
  } catch (error) {
    console.error('Rating component error:', error);
    reportError(error);
    return null;
  }
}
