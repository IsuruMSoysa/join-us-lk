import { type EventContent } from "../types/template";

export function getEventDateFormatted(content: EventContent): string {
  const d = new Date(content.eventDateTime);
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function getGoogleCalendarUrl(content: EventContent): string {
  const start = new Date(content.eventDateTime);
  const end = new Date(start);
  end.setHours(end.getHours() + 8);

  const format = (date: Date) =>
    date.toISOString().replace(/[-:]/g, "").replace(/\..*/, "");

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `Event: ${content.names.first} & ${content.names.second}`,
    dates: `${format(start)}/${format(end)}`,
    details: "Join us for the celebration!",
    location: `${content.venueName}, ${content.venueAddress}`,
  });

  return `https://www.google.com/calendar/render?${params.toString()}`;
}
