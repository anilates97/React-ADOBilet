import React from "react";
import SliderComp from "../components/slidercomp/SliderComp";
import DetailsComp from "../components/DetailsComp/DetailsComp";
import { useLocation, useParams } from "react-router-dom";
import HeaderMenu from "../components/Header/HeaderMenu";
import Footer from "../components/FooterComp/Footer";

const Details = () => {
  const { id } = useParams();
  const location = useLocation();

  const path = location.state;

  return (
    <>
      <div className="bg-color-primary">
        <HeaderMenu />
      </div>

      <div className="premium-page-title">
        <div className="section-eyebrow">Location-aware booking</div>
        <h1>{path ? "Past Event Details" : "Event Details"}</h1>
        <p>
          Review the lineup, schedule, venue location and booking options in one
          polished event profile.
        </p>
      </div>
      <DetailsComp id={id} path={path} />
      <SliderComp />
      <Footer />
    </>
  );
};

export default Details;
