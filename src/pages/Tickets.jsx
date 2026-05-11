import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  buyTicketOfEvent,
  getPhotosByEvent,
  getSeatsByEvent,
  getTickets,
  selectSeatByUser,
} from "../redux/dataSlice";
import { useNavigate, useParams } from "react-router-dom";
import HeaderMenu from "../components/Header/HeaderMenu";
import Seats from "../components/SeatsComp/Seats";
import Footer from "../components/FooterComp/Footer";
import { HashLoader } from "react-spinners";

const Tickets = () => {
  const { seats, selectedSeat, eventPhotos } = useSelector((state) => state.data);
  const [isLoadingSeats, setIsLoadingSeats] = useState(true);
  const [isBuying, setIsBuying] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const hasSelectedSeat = selectedSeat && Object.keys(selectedSeat).length > 0;
  const selectedCategory =
    selectedSeat?.ticketPricing?.ticketCategories?.categoryName || "Standard";

  const eventName = useMemo(() => {
    return selectedSeat?.events?.eventName || "Select your seat";
  }, [selectedSeat]);

  function getCategoryClasses(category) {
    switch (category) {
      case "VIP":
        return "border-red-400/50 bg-red-500/15 text-red-100";
      case "Normal":
        return "border-orange-400/50 bg-orange-500/15 text-orange-100";
      case "Ogrenci":
      case "Öğrenci":
      case "Ã–ÄŸrenci":
        return "border-emerald-400/50 bg-emerald-500/15 text-emerald-100";
      default:
        return "border-blue-400/50 bg-blue-500/15 text-blue-100";
    }
  }

  function onSelectSeat(seatId) {
    setErrorMessage("");
    dispatch(selectSeatByUser(seatId));
    const selected = seats.find((seat) => seat.id === seatId);
    if (selected?.eventId) {
      dispatch(getPhotosByEvent(selected.eventId));
    }
  }

  async function handleBuyTicket() {
    if (!hasSelectedSeat) {
      setErrorMessage("Please select a seat before buying a ticket.");
      return;
    }

    if (!selectedSeat?.ticketPricing?.id || !selectedSeat?.events?.id) {
      setErrorMessage("This seat is not ready for sale. Please select another seat.");
      return;
    }

    setIsBuying(true);
    setErrorMessage("");

    try {
      await dispatch(
        buyTicketOfEvent({
          eventId: selectedSeat.events.id,
          seatId: selectedSeat.id,
          ticketId: selectedSeat.ticketPricing.id,
        })
      ).unwrap();
      navigate("/event/ticket/success");
    } catch (error) {
      setErrorMessage(error?.message || "Ticket could not be purchased.");
    } finally {
      setIsBuying(false);
    }
  }

  useEffect(() => {
    setIsLoadingSeats(true);
    Promise.all([dispatch(getSeatsByEvent(id)), dispatch(getTickets(id))]).finally(
      () => {
        setIsLoadingSeats(false);
      }
    );
  }, [dispatch, id]);

  return (
    <>
      <div className="bg-color-primary">
        <HeaderMenu />
      </div>

      <section className="premium-page-title">
        <div className="section-eyebrow">Secure checkout</div>
        <h1>Choose Your Ticket</h1>
        <p>
          Select an available seat, review the category and complete your booking.
        </p>
      </section>

      <section className="premium-section !pt-0">
        {isLoadingSeats ? (
          <div className="flex justify-center py-24">
            <HashLoader size={90} color="#d9a85f" />
          </div>
        ) : seats?.length > 0 ? (
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="glass-panel p-6 text-left">
              <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-end">
                <div>
                  <div className="section-eyebrow">Seat map</div>
                  <h2 className="mt-2 text-4xl font-bold text-[#f7efe2]">
                    Available seats
                  </h2>
                </div>
                <div className="text-sm font-semibold text-[#9da8b7]">
                  {seats.filter((seat) => seat.status !== "SOLD").length} available
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
                {seats.map((seat) => (
                  <Seats seat={seat} key={seat.id} onSelect={onSelectSeat} />
                ))}
              </div>
            </div>

            <aside className="glass-panel p-6 text-left">
              <div className="section-eyebrow">Ticket summary</div>
              <h2 className="mt-2 text-4xl font-bold text-[#f7efe2]">
                {eventName}
              </h2>

              {hasSelectedSeat ? (
                <div className="mt-6 grid gap-4">
                  {[
                    ["Selected Seat", selectedSeat.seatName],
                    ["Category", selectedCategory],
                    [
                      "Price",
                      `${selectedSeat.ticketPricing?.ticketCategories?.price || 0} TL`,
                    ],
                    ["Venue", selectedSeat.events?.eventLocation],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="flex items-center justify-between border border-white/10 bg-white/[0.03] p-4"
                    >
                      <span className="text-sm font-bold uppercase tracking-[0.12em] text-[#9da8b7]">
                        {label}
                      </span>
                      <span
                        className={`border px-3 py-1 text-sm font-extrabold ${getCategoryClasses(
                          selectedCategory
                        )}`}
                      >
                        {value || "-"}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-6 text-sm leading-7 text-[#9da8b7]">
                  Pick an available seat from the seat map to see price and event
                  details.
                </p>
              )}

              {errorMessage && (
                <div className="mt-5 border border-[#ff6b6b]/40 bg-[#ff6b6b]/10 px-4 py-3 text-sm font-semibold text-[#ffd0d0]">
                  {errorMessage}
                </div>
              )}

              <button
                className="premium-btn mt-7 w-full px-6 disabled:cursor-not-allowed disabled:opacity-60"
                onClick={handleBuyTicket}
                disabled={isBuying || !hasSelectedSeat}
              >
                {isBuying ? "Processing..." : "Buy Ticket"}
              </button>

              {eventPhotos && eventPhotos.length > 0 && (
                <img
                  className="mt-7 h-64 w-full rounded-[8px] object-cover"
                  src={eventPhotos[0].eventPhoto}
                  alt="Event"
                />
              )}
            </aside>
          </div>
        ) : (
          <div className="glass-panel mx-auto max-w-2xl p-8 text-center">
            <h2 className="text-4xl font-bold text-[#f7efe2]">
              No tickets available
            </h2>
            <p className="mt-4 text-[#9da8b7]">
              This event exists, but no sellable seats are assigned yet. Add
              seats and assign ticket categories from the admin panel.
            </p>
            <button className="premium-btn mt-7 px-6" onClick={() => navigate(-1)}>
              Back to Event
            </button>
          </div>
        )}
      </section>

      <Footer />
    </>
  );
};

export default Tickets;
