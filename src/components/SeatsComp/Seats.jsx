function Seats({ seat, onSelect, disabled = false }) {
  const category = seat.ticketPricing?.ticketCategories?.categoryName;
  const isSold = seat.status === "SOLD";
  const isDisabled = isSold || disabled;

  function handleSelectSeat(seatId) {
    if (!isDisabled) {
      onSelect(seatId);
    }
  }

  function getSeatClasses() {
    if (isDisabled) {
      return "border-white/10 bg-white/[0.04] text-[#677284] opacity-60";
    }

    switch (category) {
      case "VIP":
        return "border-red-400/50 bg-red-500/20 text-red-100 hover:bg-red-500/30";
      case "Normal":
        return "border-orange-400/50 bg-orange-500/20 text-orange-100 hover:bg-orange-500/30";
      case "Ogrenci":
      case "Öğrenci":
      case "Ã–ÄŸrenci":
        return "border-emerald-400/50 bg-emerald-500/20 text-emerald-100 hover:bg-emerald-500/30";
      default:
        return "border-blue-400/50 bg-blue-500/20 text-blue-100 hover:bg-blue-500/30";
    }
  }

  return (
    <button
      disabled={isDisabled}
      className={`h-16 border text-sm font-extrabold transition ${getSeatClasses()}`}
      onClick={() => handleSelectSeat(seat.id)}
      title={disabled ? "Ticket sales closed" : isSold ? "Sold" : category || "Seat"}
    >
      {seat.seatName}
    </button>
  );
}

export default Seats;
