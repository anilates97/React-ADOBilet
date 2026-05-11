import supabase from "../supabase";

export async function getSeats(eventId) {
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
