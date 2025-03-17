function Modal({ isOpen, onClose, title, children, size = 'medium' }) {
  try {
    if (!isOpen) return null;
    
    // Handle ESC key press to close modal
    React.useEffect(() => {
      const handleEsc = (event) => {
        if (event.keyCode === 27) onClose();
      };
      
      document.addEventListener('keydown', handleEsc);
      
      // Prevent body scrolling when modal is open
      document.body.style.overflow = 'hidden';
      
      return () => {
        document.removeEventListener('keydown', handleEsc);
        document.body.style.overflow = 'auto';
      };
    }, [onClose]);
    
    // Size classes
    let sizeClass = 'w-full max-w-md';
    if (size === 'small') {
      sizeClass = 'w-full max-w-sm';
    } else if (size === 'large') {
      sizeClass = 'w-full max-w-lg';
    } else if (size === 'xl') {
      sizeClass = 'w-full max-w-xl';
    } else if (size === '2xl') {
      sizeClass = 'w-full max-w-2xl';
    } else if (size === 'full') {
      sizeClass = 'w-full max-w-4xl';
    }
    
    // Close modal when clicking on the backdrop
    const handleBackdropClick = (e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };
    
    return (
      <div 
        data-name="modal-overlay"
        className="modal-overlay fade-in"
        onClick={handleBackdropClick}
      >
        <div 
          data-name="modal-content"
          className={`modal-content ${sizeClass} fade-in`}
          onClick={e => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4" data-name="modal-header">
            <h2 className="text-xl font-semibold" data-name="modal-title">{title}</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              data-name="modal-close-button"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div data-name="modal-body">
            {children}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Modal component error:', error);
    reportError(error);
    return null;
  }
}
