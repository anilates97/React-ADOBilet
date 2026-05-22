import React, { useEffect } from "react";
import EventsCard from "./EventsCard";
import { useDispatch, useSelector } from "react-redux";
import { getArtistWithEvents } from "../../redux/dataSlice";

const EventsComp = ({ events, path, categoryName }) => {
  const { eventsWithArtistsStatus } = useSelector((state) => state.data);
  const dispatch = useDispatch();

  useEffect(() => {
    if (eventsWithArtistsStatus === "idle") {
      dispatch(getArtistWithEvents());
    }
  }, [dispatch, eventsWithArtistsStatus]);

  const arr = [];
  events.forEach((e) => {
    if (
      e.category.name === categoryName ||
      "All" === categoryName ||
      undefined === categoryName
    ) {
      arr.push(e);
    }
  });

  return (
    <>
      {arr.length > 0 ? (
        <div className="mx-auto grid max-w-7xl grid-cols-1 justify-items-center gap-7 px-5 py-10 md:grid-cols-2 xl:grid-cols-3">
          {arr.map((event, i) => (
            <EventsCard key={i} event={event} path={path} />
          ))}
        </div>
      ) : (
        <div className="premium-section !pt-0">
          <div className="glass-panel mx-auto max-w-2xl p-8 text-center">
            <h2 className="text-4xl font-bold text-[#f7efe2]">
              No events found
            </h2>
            <p className="mt-4 text-[#9da8b7]">
              There are no events matching this view right now.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default EventsComp;
