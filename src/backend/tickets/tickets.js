import supabase from "../supabase";
import { getDemoEventById, isPastEvent } from "../../eventUtils";
export async function getEventTickets(eventId) {
  const demoEvent = getDemoEventById(eventId);
  if (demoEvent) {
    return Array.from({ length: 30 }, (_, index) => {
      const seatNumber = index + 1;
      const categoryName =
        seatNumber <= 6 ? "VIP" : seatNumber <= 18 ? "Normal" : "Ogrenci";
      const price = seatNumber <= 6 ? 950 : seatNumber <= 18 ? 600 : 350;

      return {
        id: Number(`${demoEvent.id}${seatNumber}`),
        ticketCategories: {
          id: Number(`${demoEvent.id}${seatNumber}`),
          categoryName,
          price,
        },
        events: {
          id: demoEvent.id,
          eventName: demoEvent.eventName,
        },
      };
    });
  }

  try {
    let query = supabase
      .from("ticketPricing")
      .select(
        "id,ticketCategories(id,categoryName,price), events(id,eventName)"
      );

    if (eventId) {
      query = query.eq("eventId", eventId);
    }

    const { data, error } = await query;

    if (error) {
      console.error(error);
      throw new Error("Tickets could not be loaded");
    }

    return data;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function getSoldTickets() {
  try {
    const { data, error } = await supabase
      .from("soldTickets")
      .select("*")
      .single();

    if (error) {
      console.error(error);
      throw new Error("soldTickets could not be loaded");
    }

    return data;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function buyTicket(eventId, seatId, ticketId) {
  console.log("eventId =>", eventId, "seatId =>", seatId);
  try {
    const demoEvent = getDemoEventById(eventId);
    if (demoEvent) {
      if (isPastEvent(demoEvent.eventDate)) {
        throw new Error("This event has ended. Ticket sales are closed.");
      }

      return { success: true, eventId, seatId, ticketId };
    }

    const { data: eventData, error: eventError } = await supabase
      .from("events")
      .select("eventDate")
      .eq("id", eventId)
      .single();

    if (eventError) {
      console.error(eventError);
      throw new Error("Event could not be loaded");
    }

    if (isPastEvent(eventData?.eventDate)) {
      throw new Error("This event has ended. Ticket sales are closed.");
    }

    const updateSeat = await supabase
      .from("seats")
      .update({ availability: false, ticketId: null, status: "SOLD" })
      .eq("eventId", eventId)
      .eq("id", seatId);

    if (updateSeat.error) {
      console.error(updateSeat.error);
      throw new Error("Seat availability could not be updated");
    }

    const { error: updatedTicketPricingError } = await supabase
      .from("ticketPricing")
      .update({ isSold: true })
      .eq("id", ticketId);

    if (updatedTicketPricingError) {
      console.log(updatedTicketPricingError);
      throw new Error("Ticket pricing could not be updated");
    }

    // const { error: deleteError } = await supabase
    //   .from("ticketPricing")
    //   .delete()
    //   .eq("id", ticketId);

    // if (deleteError) {
    //   console.error(deleteError.error);
    //   throw new Error("Ticket pricing could not be deleted");
    // }

    const { data: soldCountData, error: soldCountError } = await supabase
      .from("soldTickets")
      .select("soldCount")
      .single();

    console.log("soldcountdata", soldCountData);

    if (soldCountError) {
      console.error(soldCountError);
      throw new Error("Sold count could not be fetched");
    }

    // soldCount değerini artır ve güncelle
    const updatedSoldCount = soldCountData.soldCount + 1;
    const { error: updateError } = await supabase
      .from("soldTickets")
      .update({ soldCount: updatedSoldCount })
      .eq("id", 1)
      .single();

    console.log("updatedsol", updatedSoldCount);

    if (updateError) {
      console.error(updateError);
      throw new Error("Sold count could not be updated");
    }

    return { success: true, eventId, seatId, ticketId };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
