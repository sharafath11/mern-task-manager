export function formatTaskDate(isoDate: string): string {
  const date = new Date(isoDate);

  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",   
    month: "short",     
    day: "2-digit",     
  };

  return date.toLocaleDateString("en-US", options);
}
