import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEventById,
  getArtistWithEvents,
  getEvents,
} from "../../../redux/dataSlice";
import { useNavigate } from "react-router-dom";
import {
  AdminActions,
  AdminCard,
  AdminLoading,
  AdminTable,
  AdminToolbar,
  TextClamp,
} from "../AdminShared";

function EventsAdmin() {
  const dispatch = useDispatch();
  const { events, eventsWithArtists, eventsWithArtistsStatus } = useSelector(
    (state) => state.data
  );
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getEvents());
    if (eventsWithArtistsStatus === "idle") {
      dispatch(getArtistWithEvents());
    }
  }, [dispatch, eventsWithArtistsStatus]);

  const eventRows =
    eventsWithArtists.length > 0
      ? eventsWithArtists
      : events.map((event) => ({
          ...event,
          category: event.category || event.categories,
          artists: event.artists || [],
        }));
  const isInitialLoading =
    eventsWithArtistsStatus === "loading" && eventRows.length === 0;

  return (
    <div className="grid gap-5">
      <AdminToolbar
        eyebrow="Event inventory"
        title="Events"
        copy="Maintain live event pages, timing, categories and venue metadata."
        actionLabel="Add event"
        onAction={() => navigate("/admin/addEvent")}
      />

      {isInitialLoading ? (
        <AdminLoading />
      ) : (
        <AdminTable
          columns={[
            "Name",
            "Date",
            "Time",
            "Location",
            "Category",
            "Artists",
            "Type",
            "Actions",
          ]}
          data={eventRows}
          emptyMessage="No events found."
          getSearchText={(event) =>
            `${event.eventName} ${event.eventDate} ${event.eventHour} ${event.eventLocation} ${event.category?.name} ${event.artists?.map((artist) => artist.artistName).join(" ")}`
          }
          renderCard={(event) => (
            <AdminCard
              key={event.id}
              meta={event.category?.name || "Event"}
              title={event.eventName}
              fields={[
                ["Date", event.eventDate],
                ["Time", `${event.eventHour} - ${event.eventFinishHour}`],
                ["Location", event.eventLocation],
                ["Artists", event.artists?.map((artist) => artist.artistName).join(", ")],
                ["Type", event.isFree ? "Free" : "Paid"],
              ]}
              actions={
                <AdminActions
                  onDelete={() => dispatch(deleteEventById(event.id))}
                  onUpdate={() =>
                    navigate(`/admin/Event/${event.id}`, {
                      state: {
                        eventName: event.eventName,
                        eventHour: event.eventHour,
                        eventFinishHour: event.eventFinishHour,
                        eventDate: event.eventDate,
                        eventLocation: event.eventLocation,
                        categoryId: event.category?.id,
                        isFree: event.isFree,
                      },
                    })
                  }
                />
              }
            />
          )}
          renderRow={(event) => (
            <tr key={event.id}>
              <td className="font-bold text-[#f7efe2]">
                <TextClamp max={34}>{event.eventName}</TextClamp>
              </td>
              <td>{event.eventDate}</td>
              <td>
                {event.eventHour} - {event.eventFinishHour}
              </td>
              <td>
                <TextClamp max={32}>{event.eventLocation}</TextClamp>
              </td>
              <td>{event.category?.name || "-"}</td>
              <td>
                <TextClamp max={34}>
                  {event.artists?.map((artist) => artist.artistName).join(", ") || "-"}
                </TextClamp>
              </td>
              <td>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em]">
                  {event.isFree ? "Free" : "Paid"}
                </span>
              </td>
              <td>
                <AdminActions
                  onDelete={() => dispatch(deleteEventById(event.id))}
                  onUpdate={() =>
                    navigate(`/admin/Event/${event.id}`, {
                      state: {
                        eventName: event.eventName,
                        eventHour: event.eventHour,
                        eventFinishHour: event.eventFinishHour,
                        eventDate: event.eventDate,
                        eventLocation: event.eventLocation,
                        categoryId: event.category?.id,
                        isFree: event.isFree,
                      },
                    })
                  }
                />
              </td>
            </tr>
          )}
        />
      )}
    </div>
  );
}

export default EventsAdmin;
