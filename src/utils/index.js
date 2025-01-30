//? runtime
export function convertRuntime(runtimeMinutes) {
  const hours = Math.floor(runtimeMinutes / 60);
  const minutes = runtimeMinutes % 60;
  return `${hours}h ${minutes}m`;
}

//? Date (Month Day, Year)

export function formattedDate(inputDate) {
  const date = new Date(inputDate);

  // Check for Invalid Date
  if (isNaN(date.getTime())) {
    throw new RangeError(
      'Invalid date format. Please provide a valid date input. (YYYY-MM-DD)'
    );
  }

  const options = { month: 'long', day: 'numeric', year: 'numeric' };
  return `${new Intl.DateTimeFormat('en-US', options).format(
    date
  )} (Worldwide)`;
}

export function formatNumber(number) {
  if (number >= 1e9) {
    // For billions
    return `$${(number / 1e9).toFixed(1)} billion`;
  } else if (number >= 1e6) {
    // For millions
    return `$${(number / 1e6).toFixed(1)} million`;
  }
  return `$${number}`; // For numbers less than a million
}
