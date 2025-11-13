export function timeAgo(dateString: string): string {
    const now = new Date();
    const inputDate = new Date(dateString);
    const diffMs = now.getTime() - inputDate.getTime();

    // Handle invalid date
    if (isNaN(inputDate.getTime())) return 'Invalid date';

    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMins / 60);

    if (diffMins < 1) return 'Now';
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hr${diffHours > 1 ? 's' : ''} ago`;

    // Format date for older entries
    const optionsSameYear: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' };
    const optionsDifferentYear: Intl.DateTimeFormatOptions = { ...optionsSameYear, year: 'numeric' };

    if (inputDate.getFullYear() === now.getFullYear()) {
        return inputDate.toLocaleString('en-US', optionsSameYear);
    } else {
        return inputDate.toLocaleString('en-US', optionsDifferentYear);
  }
}