function Badge({ count, className = '' }) {
  try {
    if (!count || count <= 0) return null;
    
    return (
      <span 
        data-name="badge"
        className={`badge ${className}`}
      >
        {count > 99 ? '99+' : count}
      </span>
    );
  } catch (error) {
    console.error('Badge component error:', error);
    reportError(error);
    return null;
  }
}
