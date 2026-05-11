import React from "react";
import Footer from "../components/FooterComp/Footer";
import HeaderMenu from "../components/Header/HeaderMenu";
import ContactComp from "../components/ContactComp/ContactComp";

const Contact = () => {
  return (
    <>
      <div className="bg-color-primary">
        <HeaderMenu />
      </div>

      <div className="premium-page-title">
        <div className="section-eyebrow">Support and venue office</div>
        <h1>Contact</h1>
        <p>Reach the ADO Bilet team or find the office location on the map.</p>
      </div>

      <ContactComp />

      <Footer />
    </>
  );
};

export default Contact;
