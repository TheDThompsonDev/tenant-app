export function formatDate(isoDate: string): string {
    const date = new Date(isoDate);
    if (isNaN(date.getTime())) return "Invalid date";
  
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }