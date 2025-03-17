function formatPrice(price) {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  } catch (error) {
    console.error('Error formatting price:', error);
    reportError(error);
    return `$${price.toFixed(2)}`;
  }
}

function truncateText(text, maxLength = 100) {
  try {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  } catch (error) {
    console.error('Error truncating text:', error);
    reportError(error);
    return text || '';
  }
}

function formatDate(dateString) {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  } catch (error) {
    console.error('Error formatting date:', error);
    reportError(error);
    return dateString;
  }
}

function generateSlug(text) {
  try {
    return text
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  } catch (error) {
    console.error('Error generating slug:', error);
    reportError(error);
    return '';
  }
}
