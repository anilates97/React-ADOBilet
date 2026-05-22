import billie from "./assets/billie.jpg";
import concerts from "./assets/img/concerts.jpg";
import drake from "./assets/drake.jpg";
import events from "./assets/img/events.jpg";
import inna from "./assets/inna.jpg";
import kurt from "./assets/kurt.jpg";
import parties from "./assets/img/parties.jpg";
import rihanna from "./assets/rihanna.jpg";
import sago from "./assets/sago.jpg";
import shakira from "./assets/shakira.jpg";
import theaters from "./assets/img/theaters.jpg";

export const TODAY = new Date(2026, 4, 18);

const fallbackImages = [
  sago,
  shakira,
  inna,
  kurt,
  rihanna,
  billie,
  drake,
  concerts,
  parties,
  theaters,
  events,
];

export function parseEventDate(dateString) {
  if (!dateString || typeof dateString !== "string") return null;

  const [day, month, year] = dateString.split(".").map(Number);
  if (!day || !month || !year) return null;

  return new Date(year, month - 1, day);
}

export function isPastEvent(eventDate, today = TODAY) {
  const date = parseEventDate(eventDate);
  if (!date) return false;

  return date < startOfDay(today);
}

export function isUpcomingEvent(eventDate, today = TODAY) {
  const date = parseEventDate(eventDate);
  if (!date) return false;

  return date >= startOfDay(today);
}

export function sortEventsByDate(eventList) {
  return [...eventList].sort((a, b) => {
    const dateA = parseEventDate(a.eventDate)?.getTime() || 0;
    const dateB = parseEventDate(b.eventDate)?.getTime() || 0;
    return dateA - dateB;
  });
}

export function getEventImage(event, index = 0) {
  const fallbackImage = getFallbackImage(event, index);

  if (fallbackImage === inna) {
    return fallbackImage;
  }

  const artistPhoto = event?.artists?.[0]?.artistPhoto;

  if (isUsableImage(artistPhoto)) {
    return artistPhoto;
  }

  return getFallbackImage(event, index);
}

export function getPhotoImage(photo, event, index = 0) {
  if (isUsableImage(photo?.eventPhoto)) {
    return photo.eventPhoto;
  }

  return getFallbackImage(event, index);
}

export function getFallbackImage(event, index = 0) {
  const key = `${event?.eventName || ""} ${event?.category?.name || ""}`.toLowerCase();

  if (key.includes("shakira")) return shakira;
  if (key.includes("inna")) return inna;
  if (key.includes("kurt")) return kurt;
  if (key.includes("sagopa") || key.includes("rap")) return sago;
  if (key.includes("rihanna")) return rihanna;
  if (key.includes("billie")) return billie;
  if (key.includes("drake")) return drake;
  if (key.includes("theatre") || key.includes("tiyatro")) return theaters;
  if (key.includes("festival") || key.includes("party")) return parties;
  if (key.includes("music") || key.includes("konser")) return concerts;

  return fallbackImages[index % fallbackImages.length];
}

export const demoUpcomingEvents = [
  createDemoEvent(9001, "YAZ SAHNESI KONSERI", "20.05.2026", "20:30", "23:00", "KucukCiftlik Park, Istanbul", "Music", sago, "Acik havada rap, pop ve elektronik ritimleri bir araya getiren sezon acilisi."),
  createDemoEvent(9002, "AKDENIZ CAZ AKSAMI", "24.05.2026", "19:30", "22:30", "Kaleici Marina, Antalya", "Music", shakira, "Sahil atmosferinde modern caz yorumlari ve konuk vokallerle sakin bir gece."),
  createDemoEvent(9003, "MODERN DANS GECESI", "28.05.2026", "20:00", "21:45", "Zorlu PSM, Istanbul", "Dance", parties, "Guncel koreografiler, isik tasarimi ve canli muzikle tempolu bir performans."),
  createDemoEvent(9004, "SAHNEDE HAMLET", "04.06.2026", "20:30", "22:30", "Suleyman Demirel Kultur Merkezi, Kocaeli", "Theatre", theaters, "Klasik metnin modern dekor ve guclu oyunculukla yeniden yorumlanan sahnelemesi."),
  createDemoEvent(9005, "ELEKTRONIK GECE", "09.06.2026", "21:00", "01:00", "Volkswagen Arena, Istanbul", "Music", drake, "Yerel DJ setleri ve gorsel sahne tasarimiyla yuksek enerjili bir gece."),
  createDemoEvent(9006, "RESIM VE ISIK SERGISI", "15.06.2026", "11:00", "18:00", "Modern Sanat Muzesi, Ankara", "Art", events, "Yeni medya isleri, tuval calismalari ve rehberli turla zenginlesen sergi deneyimi."),
  createDemoEvent(9007, "YOGA VE NEFES FESTIVALI", "21.06.2026", "09:00", "16:00", "Dogal Yasam Parki, Izmir", "Health", rihanna, "Uzman egitmenlerle nefes, meditasyon ve acik alan atolyelerinden olusan gunluk program."),
  createDemoEvent(9008, "KENT FESTIVALI", "27.06.2026", "14:00", "23:30", "Kulturpark, Bursa", "Festival", concerts, "Sokak lezzetleri, yerel gruplar ve aile dostu atolyelerle dolu yaz festivali."),
  createDemoEvent(9009, "AKUSTIK PERFORMANS", "03.07.2026", "20:00", "22:00", "IF Performance Hall, Ankara", "Music", kurt, "Sadelestirilmis duzenlemeler ve yakin sahne duzeniyle samimi bir konser."),
  createDemoEvent(9010, "AILE TIYATROSU", "11.07.2026", "15:00", "16:30", "Caddebostan Kultur Merkezi, Istanbul", "Theatre", billie, "Cocuklar ve aileler icin hazirlanan eglenceli, muzikli ve interaktif oyun."),
];

export function mergeDemoUpcomingEvents(eventList = []) {
  const existingIds = new Set(eventList.map((event) => String(event.id)));
  const missingDemoEvents = demoUpcomingEvents.filter(
    (event) => !existingIds.has(String(event.id))
  );

  return sortEventsByDate([...eventList, ...missingDemoEvents]);
}

export function getDemoEventById(eventId) {
  return demoUpcomingEvents.find((event) => String(event.id) === String(eventId));
}

function createDemoEvent(
  id,
  eventName,
  eventDate,
  eventHour,
  eventFinishHour,
  eventLocation,
  categoryName,
  image,
  eventDesc
) {
  return {
    id,
    eventName,
    eventDate,
    eventHour,
    eventFinishHour,
    eventLocation,
    eventDesc,
    isFree: false,
    category: {
      id,
      name: categoryName,
      image,
    },
    artists: [
      {
        id,
        artistName: eventName,
        artistPhoto: image,
      },
    ],
  };
}

function isUsableImage(src) {
  return Boolean(src && typeof src === "string" && src.trim() !== "");
}

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
