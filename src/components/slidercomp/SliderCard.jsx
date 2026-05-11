import React from "react";
import { useNavigate } from "react-router-dom";

const SliderCard = ({ events }) => {
  const { artists } = events;
  const navigate = useNavigate();

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 200,
      behavior: "smooth",
    });
  };

  const getDetails = (id) => {
    navigate(`/details/${id}`);
  };

  return (
    <article className="premium-card group relative h-[390px] cursor-pointer">
      <img
        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
        src={artists[0]?.artistPhoto}
        alt={events.eventName}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#07090d] via-[#07090d]/52 to-transparent"></div>
      <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#f2d59a] backdrop-blur">
        {events.category?.name || "Event"}
      </div>
      <div className="absolute inset-x-0 bottom-0 p-5 text-left">
        <div className="mb-3 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#9da8b7]">
          <span>{events.eventDate}</span>
          <span className="text-[#d9a85f]">/</span>
          <span>{events.eventLocation}</span>
        </div>
        <h3 className="text-3xl font-bold uppercase leading-none text-[#f7efe2]">
          {events.eventName}
        </h3>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#c7ced8]">
          {events.eventDesc}
        </p>
        <button
          onClick={() => {
            getDetails(events.id);
            handleScrollToTop();
          }}
          className="premium-link-btn mt-5 w-full px-5"
        >
          See Details
        </button>
      </div>
    </article>
  );
};

export default SliderCard;
