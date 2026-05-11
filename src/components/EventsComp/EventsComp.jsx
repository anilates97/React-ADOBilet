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

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-GB");

  const convertToDate = (dateString) => {
    const [day, month, year] = dateString.split(".");
    const formattedDate = new Date(`${year}-${month}-${day}`);
    return formattedDate.toLocaleDateString("en-GB");
  };

  const compareDates = (date1, date2) => {
    const [day1, month1, year1] = date1.split("/");
    const [day2, month2, year2] = date2.split("/");

    if (year1 < year2) {
      return false;
    } else if (year1 > year2) {
      return true;
    } else {
      if (month1 < month2) {
        return false;
      } else if (month1 > month2) {
        return true;
      } else {
        if (day1 < day2) {
          return false;
        } else if (day1 > day2) {
          return true;
        } else {
          return true;
        }
      }
    }
  };

  const filteredByDate = events.filter((event) => {
    const eventDate = convertToDate(event.eventDate);
    const isPast = () => {
      if (path === "/pastevents") {
        return compareDates(formattedDate, eventDate);
        // return eventDate < formattedDate;
      } else {
        return compareDates(eventDate, formattedDate);
      }
    };
    return isPast();
  });

  const arr = [];
  filteredByDate.forEach((e) => {
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
