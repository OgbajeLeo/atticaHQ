/**
 * Formats an ISO date string to "24 July, 2025" format
 * @param dateString - ISO date string (e.g., "2025-09-25T17:56:07.000000Z")
 * @returns Formatted date string (e.g., "25 September, 2025")
 */
export const formatDateToDisplay = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    };
    
    return date.toLocaleDateString('en-US', options);
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid Date';
  }
};

/**
 * Formats an ISO date string to "24 Jul, 2025" format (shorter version)
 * @param dateString - ISO date string (e.g., "2025-09-25T17:56:07.000000Z")
 * @returns Formatted date string (e.g., "25 Sep, 2025")
 */
export const formatDateToDisplayShort = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    };
    
    return date.toLocaleDateString('en-US', options);
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid Date';
  }
};
