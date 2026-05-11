import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getArtistWithEvents,
  getSoldTicketsData,
  getUsers,
} from "../redux/dataSlice";

function Statistics() {
  const dispatch = useDispatch();
  const { users, soldTickets, eventsWithArtists } = useSelector(
    (state) => state.data
  );
  const { eventsWithArtistsStatus } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(getSoldTicketsData());
    dispatch(getUsers());
    if (eventsWithArtistsStatus === "idle") {
      dispatch(getArtistWithEvents());
    }
  }, [dispatch, eventsWithArtistsStatus]);

  const stats = [
    ["Events organized", eventsWithArtists?.length || 0],
    ["Registered users", users.length],
    ["Tickets sold", soldTickets.soldCount || 0],
  ];

  return (
    <section className="premium-section">
      <div className="glass-panel relative overflow-hidden p-8 md:p-10">
        <div className="absolute inset-0 bg-statistics bg-cover bg-center opacity-10"></div>
        <div className="relative grid gap-5 md:grid-cols-3">
          {stats.map(([label, value]) => (
            <div
              key={label}
              className="border border-white/10 bg-white/[0.03] p-7 text-left"
            >
              <h3 className="text-6xl font-bold text-[#f2d59a]">{value}</h3>
              <h4 className="mt-4 text-sm font-extrabold uppercase tracking-[0.16em] text-[#9da8b7]">
                {label}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Statistics;
