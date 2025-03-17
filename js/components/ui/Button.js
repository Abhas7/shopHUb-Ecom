function Button({ children, variant = 'primary', size = 'medium', onClick, disabled, fullWidth, className = '', type = 'button', icon }) {
  try {
    // Base classes
    let classes = 'rounded-md transition-all duration-300 flex items-center justify-center font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500';
    
    // Variant classes
    if (variant === 'primary') {
      classes += ' btn-primary text-white';
    } else if (variant === 'secondary') {
      classes += ' btn-secondary';
    } else if (variant === 'outline') {
      classes += ' border border-gray-300 bg-white text-gray-700 hover:bg-gray-50';
    } else if (variant === 'text') {
      classes += ' bg-transparent text-purple-600 hover:bg-purple-50 hover:text-purple-700';
    }
    
    // Size classes
    if (size === 'small') {
      classes += ' text-sm px-3 py-1.5';
    } else if (size === 'medium') {
      classes += ' text-base px-4 py-2';
    } else if (size === 'large') {
      classes += ' text-lg px-6 py-3';
    }
    
    // Width classes
    if (fullWidth) {
      classes += ' w-full';
    }
    
    // Disabled classes
    if (disabled) {
      classes += ' opacity-50 cursor-not-allowed';
    }
    
    // Add any additional classes
    classes += ` ${className}`;
    
    return (
      <button
        data-name="button"
        type={type}
        className={classes}
        onClick={onClick}
        disabled={disabled}
      >
        {icon && <span className="mr-2">{icon}</span>}
        {children}
      </button>
    );
  } catch (error) {
    console.error('Button component error:', error);
    reportError(error);
    return null;
  }
}
