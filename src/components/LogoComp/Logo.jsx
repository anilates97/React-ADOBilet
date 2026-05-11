function Logo() {
  return (
    <button
      className="flex items-center gap-3 text-left"
      onClick={() => (window.location.href = "/")}
    >
      <img src="/ado-bilet-logo.png" alt="Logo" className="h-14 w-14 object-contain" />
      <span className="hidden sm:block">
        <span className="block text-lg font-extrabold uppercase tracking-[0.18em] text-[#f7efe2]">
          ADO Bilet
        </span>
        <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-[#d9a85f]">
          live experiences
        </span>
      </span>
    </button>
  );
}

export default Logo;
