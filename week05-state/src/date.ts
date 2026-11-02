const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const splitDate = (date: string): { day: string; month: string } => {
  const parts = date.split("-");
  const monthIndex = Number(parts[1]) - 1;
  const month = months[monthIndex];
  const day = Number(parts[2]);

  if (!month || Number.isNaN(day)) {
    return { day: date, month: "" };
  }

  return { day: String(day), month: month.toUpperCase() };
};

export const formatDate = (date: string): string => {
  const { day, month } = splitDate(date);

  if (!month) {
    return date;
  }

  const readableMonth = month.charAt(0) + month.slice(1).toLowerCase();

  return `${readableMonth} ${day}`;
};
