const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const startOfToday = (): number => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
};

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
  const parts = date.split("-");
  const day = Number(parts[2]);
  const month = months[Number(parts[1]) - 1];

  if (!month || Number.isNaN(day)) {
    return date;
  }

  return `${month} ${day}`;
};

export const daysUntil = (date: string): number => {
  const target = new Date(`${date}T00:00:00`).getTime();

  if (Number.isNaN(target)) {
    return 0;
  }

  return Math.round((target - startOfToday()) / 86_400_000);
};
