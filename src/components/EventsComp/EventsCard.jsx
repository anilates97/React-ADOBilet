import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from "react-icons/fa";

const EventsCard = ({ event, path }) => {
  const {
    eventDesc,
    eventHour,
    eventLocation,
    eventFinishHour,
    eventName,
    eventDate,
  } = event;

  const navigate = useNavigate();

  const getDetails = (id) => {
    navigate(`/details/${id}`, {
      state: path,
    });
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 200,
      behavior: "smooth",
    });
  };

  return (
    <article className="premium-card group flex min-h-[560px] w-full max-w-[410px] flex-col text-left transition duration-300 hover:-translate-y-2 hover:border-[#d9a85f]/50">
      <div className="relative h-64 overflow-hidden">
        <img
          src={event.artists[0]?.artistPhoto}
          alt={eventName}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07090d] via-transparent to-transparent"></div>
        <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/45 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.14em] text-[#f2d59a] backdrop-blur">
          {event.category?.name || "Live"}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h2 className="text-3xl font-bold uppercase leading-none text-[#f7efe2]">
          {eventName}
        </h2>
        <p className="mt-4 line-clamp-3 text-sm leading-6 text-[#b8c1ce]">
          {eventDesc}
        </p>

        <div className="mt-5 grid gap-3 text-sm font-semibold text-[#d7dee8]">
          <div className="flex items-center gap-3">
            <FaMapMarkerAlt className="text-[#26d0b1]" />
            <span>{eventLocation}</span>
          </div>
          <div className="flex items-center gap-3">
            <FaCalendarAlt className="text-[#26d0b1]" />
            <span>{eventDate}</span>
          </div>
          <div className="flex items-center gap-3">
            <FaClock className="text-[#26d0b1]" />
            <span>
              {eventHour} - {eventFinishHour}
            </span>
          </div>
        </div>

        <div className="mt-auto pt-6">
          {path === "pastevents" ? (
            <button
              onClick={() => {
                getDetails(event.id);
                handleScrollToTop();
              }}
              className="premium-ghost-btn premium-link-btn mb-3 w-full px-5"
            >
              View Archive
            </button>
          ) : null}
          <button
            onClick={() => {
              getDetails(event.id);
              handleScrollToTop();
            }}
            className="premium-link-btn w-full px-5"
          >
            See Details
          </button>
        </div>
      </div>
    </article>
  );
};

export default EventsCard;
