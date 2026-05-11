import React, { useEffect, useState } from "react";
import EventsComp from "../components/EventsComp/EventsComp";
import FilterCategories from "../components/FilterCategories/FilterCategories";
import { useDispatch, useSelector } from "react-redux";
import { getArtistWithEvents } from "../redux/dataSlice";
import { useParams } from "react-router-dom";
import HeaderMenu from "../components/Header/HeaderMenu";
import Footer from "../components/FooterComp/Footer";

const Events = () => {
  const { eventsWithArtists, eventsWithArtistsStatus } = useSelector(
    (state) => state.data
  );

  const { categoryName } = useParams();
  const [filteredEvents, setFilteredEvents] = useState([]);

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

  const checkedData = filteredEvents.filter((event) => {
    const filtered = convertToDate(event.eventDate);

    if (!compareDates(filtered, formattedDate)) {
      return null;
    }

    return filtered;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (eventsWithArtistsStatus === "idle") {
      dispatch(getArtistWithEvents());
    }
  }, [dispatch, eventsWithArtistsStatus]);

  useEffect(() => {
    if (eventsWithArtists.length > 0) {
      if (!categoryName || categoryName === "All") {
        setFilteredEvents(eventsWithArtists);
      } else {
        setFilteredEvents(
          eventsWithArtists.filter((event) => event.category.name === categoryName)
        );
      }
    }
  }, [eventsWithArtists, categoryName]);

  const handleCategorySelect = (category) => {
    if (category === "") {
      setFilteredEvents(eventsWithArtists);
    } else {
      const filtered = eventsWithArtists.filter(
        (event) => event.category.name === category
      );
      setFilteredEvents(filtered);
    }
  };

  const renderSkeletonCards = () => (
    <div className="mx-auto grid max-w-7xl grid-cols-1 justify-items-center gap-7 px-5 py-10 md:grid-cols-2 xl:grid-cols-3">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="premium-card h-[560px] w-full max-w-[410px] animate-pulse"
        >
          <div className="h-64 bg-white/[0.06]"></div>
          <div className="space-y-4 p-5">
            <div className="h-8 w-4/5 bg-white/[0.08]"></div>
            <div className="h-4 w-full bg-white/[0.06]"></div>
            <div className="h-4 w-2/3 bg-white/[0.06]"></div>
            <div className="h-12 w-full bg-white/[0.08]"></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <div className="bg-color-primary">
        <HeaderMenu />
      </div>
      <main className="public-page-main">
        {eventsWithArtists?.length > 0 ? (
          <>
          <div className="premium-page-title">
            <div className="section-eyebrow">Browse the calendar</div>
            <h1>Incoming Events</h1>
            <p>
              Filter live experiences by category and discover event pages with
              rich visuals, booking actions and venue maps.
            </p>
          </div>
          <FilterCategories
            events={eventsWithArtists}
            clickedCategory={categoryName}
            onSelectCategory={handleCategorySelect}
          />
          {checkedData.length > 0 ? (
            <EventsComp events={filteredEvents} categoryName={categoryName} />
          ) : (
            <section className="premium-section !pt-8">
              <div className="empty-state-panel">
                <div className="section-eyebrow">Calendar clear</div>
                <h2>There are no incoming events yet</h2>
                <p>
                  New live experiences will appear here as soon as they are
                  added to the catalogue.
                </p>
              </div>
            </section>
          )}
          </>
        ) : eventsWithArtistsStatus === "loading" ? (
          renderSkeletonCards()
        ) : (
          <section className="premium-section">
            <div className="empty-state-panel">
              <div className="section-eyebrow">Calendar clear</div>
              <h2>There are no incoming events</h2>
              <p>The event catalogue is ready for the next announcement.</p>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Events;
