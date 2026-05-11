import React, { useEffect } from "react";
import { FaFacebook, FaWhatsapp, FaTwitter, FaInstagram } from "react-icons/fa";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  getEventSingle,
  getPhotosByEvent,
  getUserSession,
} from "../../redux/dataSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import DetailsSlider from "./DetailsSlider";
import { useNavigate } from "react-router-dom";
import MapsComp from "./MapsComp";

const DetailsComp = ({ id, path }) => {
  const { event, eventPhotos, user } = useSelector((state) => state.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const artists = event.event ? [...event.event.artists] : [];
  const artistImg = artists.map((artist) => artist.artistPhoto);
  const href = window.location.href;

  useEffect(() => {
    dispatch(getEventSingle(id));
    dispatch(getPhotosByEvent(id));
    dispatch(getUserSession());
  }, [dispatch, href, id]);

  const handleFacebookShare = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`,
      "_blank"
    );
  };

  const handleInstagramShare = () => {
    window.open(`https://www.instagram.com/share?url=${window.location.href}`, "_blank");
  };

  const handleTwitterShare = () => {
    window.open(`https://twitter.com/share?url=${window.location.href}`, "_blank");
  };

  const handleWhatsAppShare = () => {
    const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      "Event: " + window.location.href
    )}`;
    window.open(whatsappShareUrl, "_blank");
  };

  const isLoggedIn = () => Boolean(user);

  return (
    <>
      <section className="premium-section !pt-4">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.15fr_0.9fr]">
          <div className="premium-card p-3">
            <img
              className="h-[420px] w-full rounded-[6px] object-cover"
              src={artistImg[0]}
              alt={event.event?.eventName || "Event"}
            />
          </div>

          {event.event && (
            <div className="glass-panel flex flex-col justify-between p-7 text-left">
              <div>
                <div className="section-eyebrow">Event details</div>
                <h2 className="mt-4 text-5xl font-bold uppercase leading-none text-[#f7efe2]">
                  {event.event.eventName}
                </h2>
                <p className="mt-6 text-base leading-8 text-[#c7ced8]">
                  {event.event.eventDesc}
                </p>
                <div className="mt-7 grid gap-4 text-sm font-bold text-[#e7edf5]">
                  <div className="flex items-center gap-3">
                    <FaClock className="text-[#26d0b1]" />
                    {event.event.eventHour} - {event.event.eventFinishHour}
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCalendarAlt className="text-[#26d0b1]" />
                    {event.event.eventDate}
                  </div>
                  <div className="flex items-center gap-3">
                    <FaMapMarkerAlt className="text-[#26d0b1]" />
                    {event.event.eventLocation}
                  </div>
                </div>
              </div>
              {!path && (
                <button
                  className="premium-btn mt-8 w-full px-6"
                  onClick={() => {
                    isLoggedIn()
                      ? navigate(`/event/tickets/${event.event.id}`)
                      : navigate(`/login`);
                  }}
                >
                  Buy a Ticket
                </button>
              )}
            </div>
          )}

          <aside className="glass-panel p-4 text-left">
            <div className="mb-4">
              <div className="section-eyebrow">Venue map</div>
              <h3 className="mt-2 text-3xl font-bold text-[#f7efe2]">
                Find the location
              </h3>
            </div>
            <MapsComp location={event?.event?.eventLocation} />
          </aside>
        </div>
      </section>

      {eventPhotos?.length > 0 && (
        <section className="premium-section !pt-0">
          <div className="mb-8 text-left">
            <div className="section-eyebrow">Gallery</div>
            <h2 className="section-title mt-2">Event atmosphere</h2>
          </div>
          <Swiper
            navigation={true}
            modules={[Navigation]}
            className="mySwiper w-full"
          >
            {eventPhotos.map((photo, i) => (
              <SwiperSlide key={i}>
                <DetailsSlider photo={photo} />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      )}

      <section className="premium-section !pt-0">
        <div className="glass-panel mx-auto max-w-3xl p-8">
          <h2 className="text-4xl font-bold text-[#f7efe2]">
            Share this event
          </h2>
          <div className="mt-7 flex flex-wrap justify-center gap-4 text-sm font-bold">
            {[
              [FaFacebook, "Facebook", handleFacebookShare],
              [FaInstagram, "Instagram", handleInstagramShare],
              [FaTwitter, "Twitter", handleTwitterShare],
              [FaWhatsapp, "WhatsApp", handleWhatsAppShare],
            ].map(([Icon, label, handler]) => (
              <button
                key={label}
                className="premium-ghost-btn premium-link-btn min-w-[130px] px-5"
                onClick={handler}
              >
                <Icon size={22} />
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default DetailsComp;
