import React from "react";
import HeaderMenu from "../components/Header/HeaderMenu";
import Footer from "../components/FooterComp/Footer";
import { AiOutlineCheckCircle, AiOutlineEnter } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const SuccessBuyTicket = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-color-primary">
        <HeaderMenu />
      </div>

      <main className="premium-section">
        <div className="mx-auto max-w-4xl text-center">
          <div className="section-eyebrow">Booking confirmed</div>
          <h1 className="mt-4 text-[4rem] font-bold leading-[0.9] text-[#f7efe2] md:text-[6rem]">
            Your ticket is ready.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#9da8b7]">
            The seat has been reserved and the event ticket was marked as sold.
            You can return home or continue discovering more live experiences.
          </p>

          <div className="glass-panel mt-12 overflow-hidden p-8 md:p-10">
            <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-[#26d0b1]/35 bg-[#26d0b1]/10 text-[#26d0b1] shadow-[0_0_60px_rgba(38,208,177,0.18)]">
              <AiOutlineCheckCircle size={78} />
            </div>

            <h2 className="mt-8 text-4xl font-bold text-[#f7efe2]">
              Ticket purchased successfully
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#9da8b7]">
              Thanks for booking with ADO Bilet. Your event access is now
              confirmed in the system.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                className="premium-btn px-7"
                onClick={() => navigate("/")}
              >
                <AiOutlineEnter size={22} />
                Back To Home Page
              </button>
              <button
                className="premium-ghost-btn premium-link-btn px-7"
                onClick={() => navigate("/events")}
              >
                Browse Events
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default SuccessBuyTicket;
