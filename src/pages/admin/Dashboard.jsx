import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllSeats,
  getAllTicketCategories,
  getArtistTest,
  getArtistWithEvents,
  getCategoryTest,
  getSoldTicketsData,
  getUsers,
} from "../../redux/dataSlice";
import { AiFillDollarCircle } from "react-icons/ai";
import { FaUsers, FaUserTie } from "react-icons/fa";
import { MdEventAvailable, MdEventBusy, MdEventSeat } from "react-icons/md";
import { BiSolidCategory } from "react-icons/bi";

const parseEventDate = (date) => {
  if (!date) return null;
  const [day, month, year] = date.split(".");
  return new Date(`${year}-${month}-${day}T00:00:00`);
};

const percent = (value, total) => {
  if (!total) return 0;
  return Math.min(100, Math.round((value / total) * 100));
};

function Dashboard() {
  const dispatch = useDispatch();
  const {
    allSeats,
    artists,
    categoriesTest,
    eventsWithArtists,
    eventsWithArtistsStatus,
    soldTickets,
    ticketCategories,
    users,
  } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(getSoldTicketsData());
    dispatch(getUsers());
    dispatch(fetchAllSeats());
    dispatch(getArtistTest());
    dispatch(getCategoryTest());
    dispatch(getAllTicketCategories());

    if (eventsWithArtistsStatus === "idle") {
      dispatch(getArtistWithEvents());
    }
  }, [dispatch, eventsWithArtistsStatus]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingEvents = eventsWithArtists.filter((event) => {
    const date = parseEventDate(event.eventDate);
    return date && date >= today;
  });
  const pastEvents = eventsWithArtists.length - upcomingEvents.length;
  const soldSeats = allSeats.filter((seat) => seat.status === "SOLD").length;
  const assignedSeats = allSeats.filter((seat) => seat.status === "ASSIGNED").length;
  const availableSeats = allSeats.filter((seat) => seat.availability).length;
  const seatUsage = percent(soldSeats + assignedSeats, allSeats.length);
  const soldCount = soldTickets?.soldCount || 0;

  const stats = [
    {
      label: "Sold tickets",
      value: soldCount,
      icon: AiFillDollarCircle,
    },
    {
      label: "Registered users",
      value: users.length,
      icon: FaUsers,
    },
    {
      label: "Total events",
      value: eventsWithArtists.length,
      icon: MdEventAvailable,
    },
    {
      label: "Available seats",
      value: availableSeats,
      icon: MdEventSeat,
    },
    {
      label: "Upcoming events",
      value: upcomingEvents.length,
      icon: MdEventAvailable,
    },
    {
      label: "Past events",
      value: pastEvents,
      icon: MdEventBusy,
    },
    {
      label: "Artists",
      value: artists.length,
      icon: FaUserTie,
    },
    {
      label: "Categories",
      value: categoriesTest.length,
      icon: BiSolidCategory,
    },
  ];

  return (
    <div className="admin-dashboard">
      <section className="admin-hero-grid">
        <div className="admin-hero-card">
          <div className="section-eyebrow">Live operations</div>
          <h3 className="mt-4">Command center</h3>
          <p className="mt-5 max-w-2xl leading-8">
            Track inventory, audience growth, event status and seat assignment
            from one focused management surface.
          </p>
        </div>

        <div className="admin-dashboard-card">
          <div className="section-eyebrow">Seat occupancy</div>
          <strong className="mt-4 block text-6xl text-[#f7efe2]">{seatUsage}%</strong>
          <p className="mt-3 leading-7">
            {soldSeats} sold and {assignedSeats} assigned seats across {allSeats.length} records.
          </p>
          <div className="admin-progress-bar mt-5">
            <span style={{ width: `${seatUsage}%` }}></span>
          </div>
        </div>
      </section>

      <section className="admin-stat-grid">
        {stats.map(({ label, value, icon: Icon }) => (
          <article className="admin-stat-card" key={label}>
            <div className="admin-stat-icon">
              <Icon />
            </div>
            <strong>{value}</strong>
            <span>{label}</span>
          </article>
        ))}
      </section>

      <section className="admin-hero-grid">
        <div className="admin-dashboard-card">
          <div className="section-eyebrow">Catalogue health</div>
          <div className="admin-progress-list mt-5">
            <ProgressRow
              label="Upcoming ratio"
              value={percent(upcomingEvents.length, eventsWithArtists.length)}
            />
            <ProgressRow
              label="Ticket category coverage"
              value={percent(ticketCategories.length, Math.max(eventsWithArtists.length, 1))}
            />
            <ProgressRow
              label="Sold seat share"
              value={percent(soldSeats, allSeats.length)}
            />
          </div>
        </div>

        <div className="admin-dashboard-card">
          <div className="section-eyebrow">Quick read</div>
          <p className="mt-4 leading-7">
            {upcomingEvents.length > 0
              ? `${upcomingEvents.length} events are still bookable.`
              : "There are no future-dated events right now."}
          </p>
          <p className="mt-3 leading-7">
            {ticketCategories.length} ticket categories are configured for pricing and
            seat assignment workflows.
          </p>
        </div>
      </section>
    </div>
  );
}

function ProgressRow({ label, value }) {
  return (
    <div className="admin-progress-row">
      <header>
        <span>{label}</span>
        <span>{value}%</span>
      </header>
      <div className="admin-progress-bar">
        <span style={{ width: `${value}%` }}></span>
      </div>
    </div>
  );
}

export default Dashboard;
