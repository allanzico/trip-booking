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

export function getLowestPrice(tickets) {
  return tickets
    .filter(
      (ticket) =>
        ticket.ticketPrice ===
        Math.min(...tickets.map((ticket) => ticket.ticketPrice))
    )
    .map((ticket) => ticket.ticketPrice);
}

export function getHighestPrice(tickets) {
  return tickets
    .filter(
      (ticket) =>
        ticket.ticketPrice ===
        Math.max(...tickets.map((ticket) => ticket.ticketPrice))
    )
    .map((ticket) => ticket.ticketPrice);
}

export function updatePrice(experiences) {
  return experiences.map((exp) => ({
    ...exp,
    price: parseInt(getLowestPrice(exp.tickets)),
  }));
}

export function getSender(chatMembers, loggedInUser){
  const sender = chatMembers.find((member) => member._id !== loggedInUser._id);
  return sender;
};