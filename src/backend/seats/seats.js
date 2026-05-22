import supabase from "../supabase";
import { getDemoEventById } from "../../eventUtils";

export async function getSeats(eventId) {
  const demoEvent = getDemoEventById(eventId);
  if (demoEvent) {
    return createDemoSeats(demoEvent);
  }

  try {
    const { data, error } = await supabase
      .from("seats")
      .select("*, ticketPricing(ticketCategories(categoryName,price))")
      .eq("eventId", eventId)
      .in("status", ["ASSIGNED", "SOLD"]);

    if (error) {
      console.error(error);
      throw new Error("Seats could not be loaded");
    }

    return data;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function selectSeat(seatId) {
  const demoSeat = getDemoSeatById(seatId);
  if (demoSeat) {
    return demoSeat;
  }

  try {
    const { data, error } = await supabase
      .from("seats")
      .select(
        "id,seatName,availability, events(id,eventName,eventDate, eventLocation, isFree),  ticketPricing(id, ticketCategories(categoryName,price)) "
      )
      .eq("id", seatId)
      .single();

    if (error) {
      console.error(error);
      throw new Error("Seats could not be loaded");
    }

    return data;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

function createDemoSeats(event) {
  return Array.from({ length: 30 }, (_, index) => {
    const seatNumber = index + 1;
    const categoryName =
      seatNumber <= 6 ? "VIP" : seatNumber <= 18 ? "Normal" : "Ogrenci";
    const price = seatNumber <= 6 ? 950 : seatNumber <= 18 ? 600 : 350;
    const ticketId = Number(`${event.id}${seatNumber}`);

    return {
      id: ticketId,
      eventId: event.id,
      seatName: `A-${String(seatNumber).padStart(2, "0")}`,
      availability: true,
      status: "ASSIGNED",
      events: {
        id: event.id,
        eventName: event.eventName,
        eventDate: event.eventDate,
        eventLocation: event.eventLocation,
        isFree: event.isFree,
      },
      ticketPricing: {
        id: ticketId,
        ticketCategories: {
          categoryName,
          price,
        },
      },
    };
  });
}

function getDemoSeatById(seatId) {
  const demoEventIds = ["9001", "9002", "9003", "9004", "9005", "9006", "9007", "9008", "9009", "9010"];

  for (const eventId of demoEventIds) {
    const event = getDemoEventById(eventId);
    const seat = createDemoSeats(event).find(
      (demoSeat) => String(demoSeat.id) === String(seatId)
    );

    if (seat) return seat;
  }

  return null;
}
