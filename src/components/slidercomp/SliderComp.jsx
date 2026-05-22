import React, { useEffect } from "react";
import SliderCard from "./SliderCard";
import bg from "../../assets/bg.png";
import { useDispatch, useSelector } from "react-redux";
import { getArtistWithEvents } from "../../redux/dataSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { isUpcomingEvent } from "../../eventUtils";

const SliderComp = () => {
  const { eventsWithArtists, eventsWithArtistsStatus } = useSelector(
    (state) => state.data
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (eventsWithArtistsStatus === "idle") {
      dispatch(getArtistWithEvents());
    }
  }, [dispatch, eventsWithArtistsStatus]);

  const width = window.innerWidth;
  const upcomingEvents = eventsWithArtists.filter((event) =>
    isUpcomingEvent(event.eventDate)
  );

  return (
    <section className="premium-section">
      <div className="mb-10 flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
        <div className="text-left">
          <div className="section-eyebrow">Featured now</div>
          <h2 className="section-title mt-3">Popular upcoming events</h2>
        </div>
        <p className="section-copy max-w-md text-left">
          Handpicked concerts, performances and cultural nights with rich event
          detail pages and location-aware discovery.
        </p>
      </div>

      {upcomingEvents?.length > 0 ? (
        <>
          <img
            className="absolute inset-0 -z-10 h-full w-full object-cover opacity-[0.04]"
            src={bg}
            alt=""
          />
          <Swiper
            slidesPerView={width <= 540 ? 1 : width <= 768 ? 2 : 4}
            spaceBetween={20}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper !py-[40px]"
          >
            {upcomingEvents.map((events, i) => (
              <SwiperSlide key={i}>
                <SliderCard events={events} />
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      ) : (
        <div className="grid grid-cols-1 gap-5 py-10 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="premium-card h-[390px] animate-pulse bg-white/[0.04]"
            >
              <div className="h-64 bg-white/[0.06]"></div>
              <div className="space-y-4 p-5">
                <div className="h-4 w-1/2 bg-white/[0.08]"></div>
                <div className="h-8 w-4/5 bg-white/[0.08]"></div>
                <div className="h-4 w-full bg-white/[0.06]"></div>
                <div className="h-4 w-2/3 bg-white/[0.06]"></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default SliderComp;
