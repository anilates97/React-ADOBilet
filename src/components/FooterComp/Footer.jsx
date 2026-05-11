import { Link } from "react-router-dom";
import { FaFacebook, FaWhatsapp, FaTwitter, FaInstagram } from "react-icons/fa";
import Logo from "../LogoComp/Logo";

function Footer() {
  return (
    <footer className="site-footer border-t border-white/10 bg-[#07090d] px-5 py-10 text-[#f7efe2] sm:py-12">
      <div className="mx-auto grid max-w-7xl gap-9 text-center sm:text-left md:grid-cols-[1.25fr_0.7fr_0.7fr]">
        <div className="mx-auto max-w-md sm:mx-0">
          <Logo />
          <p className="mt-5 text-sm leading-7 text-[#9da8b7]">
            A professional event discovery and ticketing experience for concerts,
            performances, festivals and curated live moments.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#d9a85f]">
            Platform
          </h4>
          <ul className="mt-4 grid gap-3 text-sm font-semibold text-[#d7dee8]">
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/">Homepage</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#d9a85f]">
            Social
          </h4>
          <div className="mt-5 flex justify-center gap-3 sm:justify-start">
            {[FaFacebook, FaWhatsapp, FaTwitter, FaInstagram].map((Icon, i) => (
              <button
                key={i}
                className="flex h-11 w-11 items-center justify-center border border-white/10 bg-white/5 text-[#f7efe2] transition hover:-translate-y-1 hover:border-[#d9a85f]/60 hover:text-[#d9a85f]"
              >
                <Icon size={20} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
