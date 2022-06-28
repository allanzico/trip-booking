export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function getDatesInRange(startDate, endDate) {
  const date = new Date(startDate.getTime());
  const dates = [];
  while (date <= endDate) {
    dates.push({
      date: new Date(date),
      title: "new itenerary",
      data: new Map(),
    });
    date.setDate(date.getDate() + 1);
  }
  return dates;
}
