import HeaderForm from "./HeaderForm";
import HeaderMenu from "./HeaderMenu";
import HeaderTitle from "./HeaderTitle";

function HeaderView({ word, setWord, date, setDate, place, setPlace }) {
  return (
    <div className="relative overflow-hidden border-b border-white/10 bg-[#07090d]">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: "url('/happy-holiday-21.png')" }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#07090d] via-[#07090d]/88 to-[#081c1a]/72"></div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#07090d] to-transparent"></div>
      <div className="relative">
      <HeaderMenu />
      <HeaderTitle />
      <HeaderForm
        word={word}
        setWord={setWord}
        date={date}
        setDate={setDate}
        place={place}
        setPlace={setPlace}
      />
      </div>
    </div>
  );
}

export default HeaderView;
