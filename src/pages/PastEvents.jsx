import React, { useEffect } from "react";
import EventsComp from "../components/EventsComp/EventsComp";
import { useDispatch, useSelector } from "react-redux";
import { getArtistWithEvents } from "../redux/dataSlice";
import { useLocation } from "react-router-dom";
import HeaderMenu from "../components/Header/HeaderMenu";
import Footer from "../components/FooterComp/Footer";

const PastEvents = () => {
  const location = useLocation();
  const path = location.pathname;

  const { eventsWithArtists, eventsWithArtistsStatus } = useSelector(
    (state) => state.data
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (eventsWithArtistsStatus === "idle") {
      dispatch(getArtistWithEvents());
    }
  }, [dispatch, eventsWithArtistsStatus]);

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
        <div className="premium-page-title">
          <div className="section-eyebrow">Archive</div>
          <h1>Past Events</h1>
          <p>Browse previous experiences and keep the event catalogue complete.</p>
        </div>
        {eventsWithArtists.length > 0 ? (
          <EventsComp events={eventsWithArtists} path={path} />
        ) : eventsWithArtistsStatus === "loading" ? (
          renderSkeletonCards()
        ) : (
          <section className="premium-section !pt-8">
            <div className="empty-state-panel">
              <div className="section-eyebrow">Archive empty</div>
              <h2>No past events found</h2>
              <p>The archive is empty for now.</p>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
};

export default PastEvents;
