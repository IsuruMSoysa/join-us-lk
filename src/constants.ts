/**
 * Wedding invite copy and dates – single source of truth.
 * Replace placeholders with your names, dates, and venue.
 */

/** Whitelisted invitee slugs allowed in the URL (e.g. "/mr-tom-hanks"). */
export const ALLOWED_INVITEE_SLUGS = [
  "mrs-hasini-and-mr-lukshan",
  "sayumi-nangi",
  "ayesha",
  "rashmi",
  "thejani",
  "madusha-akka-and-dasun-aiya",
  "mr-nalin",
  "mr-imal",
  "roshan-aiya-and-akka",
  "madda",
  "dilini",
  "amila-and-nipuni",
  "kulesha-akka-and-chanaka-aiya",
  "nelumi",
  "uditha",
  "ruwa-and-sanju",
  "bashi-and-sakya",
  "sriya",
  "kalana",
  "thilina",
  "isira",
  "nimmi-and-gayan",
  "roshenka-and-harshan",
  "kavindu",
  "thisal",
  "rahul",
  "chamaa",
  "shamal",
  "aloka",
  "saminda",
  "mawli",
  "dilsara",
  "merishani",
  "sachini",
  "nirasha",
  "isuru",
  "gome",
  "malinga",
  "sanushka",
  "sandun",
  "gaiya",
  "satha",
  "sandamal",
  "baisa",
  "thathsara",
  "nipuna",
  "dombe",
  "praniya",
  "madushi",
  "kisal",
  "tharaka",
  "sahan",
  "ravindu",
  "rasi",
  "shanilka",
  "kaveen",
  "uvindu",
  "ravin",
  "bathi",
  "sahana",
  "chamodaya",
  "jaya",
  "issa",
  "aviya",
  "ladi",
  "sasiya",
  "naduna",
  "nandana",
  "batta",
  "dula",
  "osaa",
  "rushan",
  "senali-and-yasintha",
  "sathsara",
  "ishanka",
  "ruveesha-and-hasinthaka",
  "prabodhi-and-asanka",
  "pamuwa",
  "kasiya",
  "thedini",
  "kasuri",
  "shashi",
  "hasitha",
  "uvintha",
  "madusanka",
  "gihan-aiya-and-anuththara-akka",
  "sahan-aiya",
  "jeewaka",
  "ashan",
  "nipuna-malli",
  "anoma-aunty-and-family",
  "lakiya",
  "ayesha-akka-and-dasun-aiya",
  "cheviya-aiya",
  "ravi-aiya",
] as const;

export const WEDDING = {
  names: { first: "Isuru", second: "Aruni" },
  /** ISO date-time for the ceremony (used for countdown and calendar) */
  weddingDateTime: "2026-05-14T12:00:00",
  /** Display time only */
  weddingTime: "09:30 AM",
  venueName: "Mandakini Banquet Hall",
  venueAddress: "Kurunegala Road, Balagalla, Divulapitiya",
  /** RSVP deadline (display only) */
  rsvpByDate: "May 01, 2026",

  // Creative Copy
  tagline: "A Celestial Dance of Two Souls",
  heroGreeting: "In the quiet hum of the universe, our paths converged.",
  heroInvite:
    "Join us as we weave our futures together under the canopy of the stars.",
  nerudaQuote:
    "I love you without knowing how, or when, or from where. I love you straightforwardly, without complexities or pride; so I love you because I know no other way.",
  nerudaRef: "— Pablo Neruda, Sonnet XVII",

  detailsTitle: "The Ceremony & Celebration",
  galleryTitle: "Memories from Our Engagement Day",
  mapTitle: "The Destination",
  rsvpTitle: "Confirm Your Presence",
  rsvpDeadlineText: "Kindly let us know by",
  rsvpSuccessAttendingTitle: "You're on the list!",
  rsvpSuccessAttendingBody:
    "We can't wait to celebrate this cosmic union with you.",
  rsvpSuccessDeclinedTitle: "We'll miss you!",
  rsvpSuccessDeclinedBody:
    "Thank you for letting us know. We're sorry you can't join us, but we hope our paths cross again soon.",
} as const;

/** Formatted wedding date for display (e.g. "October 18, 2025") */
export function getWeddingDateFormatted(): string {
  const d = new Date(WEDDING.weddingDateTime);
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Google Calendar "Add to Calendar" URL.
 * Built from WEDDING so it stays in sync with the displayed date/time/venue.
 */
export function getGoogleCalendarUrl(): string {
  const start = new Date(WEDDING.weddingDateTime);
  const end = new Date(start);
  end.setHours(end.getHours() + 8);

  const format = (date: Date) =>
    date.toISOString().replace(/[-:]/g, "").replace(/\..*/, "");

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `Wedding: ${WEDDING.names.first} & ${WEDDING.names.second}`,
    dates: `${format(start)}/${format(end)}`,
    details: "Join us for a celebration of love!",
    location: `${WEDDING.venueName}, ${WEDDING.venueAddress}`,
  });

  return `https://www.google.com/calendar/render?${params.toString()}`;
}

/**
 * Google Maps embed iframe src. Replace with your venue's embed URL.
 * Get it from Google Maps: Share → Embed a map → copy the src.
 */
export const MAP_EMBED_SRC = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.014974731634!2d80.0262051!3d7.239130100000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2e3e1821395f1%3A0xeb2264b713646f4b!2sHotel%20Mandakini!5e0!3m2!1sen!2slk!4v1773298620394!5m2!1sen!2slk`;
