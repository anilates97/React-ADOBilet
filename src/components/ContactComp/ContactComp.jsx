import React from "react";
import MapsComp from "../DetailsComp/MapsComp";
import { FaRegEnvelope, FaSquarePhone, FaMapLocationDot } from "react-icons/fa6";

const ContactComp = () => {
  const location = "Atasehir/Istanbul";

  return (
    <section className="premium-section !pt-4">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="glass-panel p-8 text-left">
          <div className="section-eyebrow">Contact info</div>
          <h2 className="mt-3 text-5xl font-bold text-[#f7efe2]">
            Let's plan the next live night.
          </h2>
          <div className="mt-8 grid gap-4 text-base font-bold text-[#d7dee8]">
            <a className="flex items-center gap-4" href="mailto:info@adobilet.com">
              <FaRegEnvelope className="text-[#26d0b1]" /> info@adobilet.com
            </a>
            <a className="flex items-center gap-4" href="tel:+905555555555">
              <FaSquarePhone className="text-[#26d0b1]" /> +90 555 555 55 55
            </a>
            <div className="flex items-center gap-4">
              <FaMapLocationDot className="text-[#26d0b1]" /> Atasehir/Istanbul
            </div>
          </div>
        </div>
        <div className="glass-panel p-4">
          <MapsComp location={location} />
        </div>
      </div>
    </section>
  );
};

export default ContactComp;
