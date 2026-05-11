import React, { useEffect, useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUsers } from "../../redux/dataSlice";
import Logo from "../LogoComp/Logo";

const Forms = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSignIn, setIsSignIn] = useState(location.pathname !== "/register");

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    setIsSignIn(location.pathname !== "/register");
  }, [location.pathname]);

  const toggleForm = () => {
    navigate(isSignIn ? "/register" : "/login");
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#07090d] text-[#f7efe2]">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: "url('/auth-image.png')" }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-br from-[#07090d] via-[#0b1017]/96 to-[#10201e]/88"></div>
      <div className="relative grid min-h-screen lg:grid-cols-[0.9fr_1.1fr]">
        <section className="flex items-center justify-center px-5 py-10">
          <div className="w-full max-w-[480px]">
            <div className="mb-8">
              <Logo />
            </div>
            <div className="glass-panel p-7 sm:p-9">
              {isSignIn ? (
                <SignIn toggleForm={toggleForm} />
              ) : (
                <SignUp toggleForm={toggleForm} />
              )}
            </div>
          </div>
        </section>

        <section className="hidden border-l border-white/10 px-10 py-10 lg:flex lg:items-center">
          <div className="max-w-2xl text-left">
            <div className="section-eyebrow">Member access</div>
            <h1 className="mt-4 text-[5.8rem] font-bold leading-[0.86] text-[#f7efe2]">
              Book the night before it sells out.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-[#b8c1ce]">
              Sign in to manage tickets, continue checkout and access event
              discovery with a polished premium booking experience.
            </p>
            <div className="mt-8 grid max-w-xl grid-cols-3 gap-3">
              {["Secure auth", "Live events", "Venue maps"].map((item) => (
                <div
                  key={item}
                  className="border border-white/10 bg-white/[0.04] px-4 py-4 text-sm font-extrabold uppercase tracking-[0.12em] text-[#f2d59a]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Forms;
