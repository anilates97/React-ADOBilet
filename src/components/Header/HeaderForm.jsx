function HeaderForm({ word, setWord, date, setDate, place, setPlace }) {
  const handleChangePlaceName = (event) => {
    setPlace(event.target.value);
  };

  const handleChangeWord = (event) => {
    setWord(event.target.value);
  };

  const handleChangeDate = (event) => {
    setDate(event.target.value);
  };

  return (
    <div className="mx-auto max-w-7xl px-5 pb-14">
      <div className="glass-panel grid gap-4 p-4 text-left sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.8fr_auto]">
        <label className="block">
          <span className="mb-2 block text-xs font-extrabold uppercase tracking-[0.16em] text-[#d9a85f]">
            Event
          </span>
          <input
            className="premium-input px-4"
            onChange={handleChangeWord}
            value={word}
            type="text"
            placeholder="Search artists, concerts, festivals..."
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-xs font-extrabold uppercase tracking-[0.16em] text-[#d9a85f]">
            Date
          </span>
          <input
            placeholder="date"
            type="date"
            value={date}
            onChange={handleChangeDate}
            className="premium-input px-4"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-xs font-extrabold uppercase tracking-[0.16em] text-[#d9a85f]">
            Location
          </span>
          <input
            className="premium-input px-4"
            onChange={handleChangePlaceName}
            value={place}
            type="text"
            placeholder="City or venue"
          />
        </label>
        <div className="flex items-end">
          <button className="premium-btn w-full px-7" type="button">
            Explore
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeaderForm;
