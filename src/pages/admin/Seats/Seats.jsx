import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSeatById,
  fetchAllSeats,
  getEvents,
  getSeatsAdminByEvent,
} from "../../../redux/dataSlice";
import { useNavigate } from "react-router-dom";
import {
  AdminActions,
  AdminCard,
  AdminSelect,
  AdminTable,
  AdminToolbar,
} from "../AdminShared";

function Seats() {
  const dispatch = useDispatch();
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedEventName, setSelectedEventName] = useState("");
  const { events, seatsAdmin } = useSelector((state) => state.data);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllSeats());
    dispatch(getEvents());
  }, [dispatch]);

  useEffect(() => {
    if (selectedEvent) {
      dispatch(getSeatsAdminByEvent(selectedEvent));
    }
  }, [dispatch, selectedEvent]);

  const selectedEventObj = {
    eventId: selectedEvent,
    eventName: selectedEventName,
  };

  return (
    <div className="grid gap-5">
      <AdminToolbar
        eyebrow="Seat inventory"
        title="Seats"
        copy="Choose an event to assign, update or remove seats."
        actionLabel={selectedEvent ? "Add seat" : "Add new seat"}
        onAction={() =>
          navigate("/admin/addSeat", {
            state: {
              selectedEventObj,
              isNew: !selectedEvent,
            },
          })
        }
      >
        <AdminSelect
          label="Event"
          value={selectedEvent || "chooseOne"}
          onChange={(e) => {
            const selectedOption = e.target.options[e.target.selectedIndex];
            setSelectedEvent(
              selectedOption.value !== "chooseOne" ? selectedOption.value : ""
            );
            setSelectedEventName(selectedOption.text);
          }}
        >
          <option value="chooseOne">Choose event</option>
          {events.map((event) => (
            <option key={event.id} value={event.id}>
              {event.eventName}
            </option>
          ))}
        </AdminSelect>
      </AdminToolbar>

      {selectedEvent ? (
        <AdminTable
          columns={["Seat", "Availability", "State", "Actions"]}
          data={seatsAdmin}
          emptyMessage="No seats found for this event."
          getSearchText={(seat) =>
            `${seat.seatName} ${seat.availability ? "Empty" : "Full"} ${seat.status}`
          }
          renderCard={(seat) => (
            <AdminCard
              key={seat.id}
              meta={seat.status || "Seat"}
              title={seat.seatName}
              fields={[
                ["Availability", seat.availability ? "Empty" : "Full"],
                [
                  "State",
                  seat.status === "ASSIGNED"
                    ? "Assigned"
                    : seat.status === "SOLD"
                    ? "Sold"
                    : "Created",
                ],
              ]}
              actions={
                <AdminActions
                  onAssign={
                    seat.status !== "ASSIGNED" && seat.status !== "SOLD"
                      ? () =>
                          navigate(`/admin/AssignTicket/${seat.id}`, {
                            state: {
                              seat,
                              selectedEventObj,
                            },
                          })
                      : null
                  }
                  onDelete={() => dispatch(deleteSeatById(seat.id))}
                  onUpdate={() =>
                    navigate(`/admin/Seats/${seat.id}`, {
                      state: {
                        seat,
                        selectedEventObj,
                      },
                    })
                  }
                />
              }
            />
          )}
          renderRow={(seat) => (
            <tr key={seat.id}>
              <td className="font-bold text-[#f7efe2]">{seat.seatName}</td>
              <td>{seat.availability ? "Empty" : "Full"}</td>
              <td>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em]">
                  {seat.status === "ASSIGNED"
                    ? "Assigned"
                    : seat.status === "SOLD"
                    ? "Sold"
                    : "Created"}
                </span>
              </td>
              <td>
                <AdminActions
                  onAssign={
                    seat.status !== "ASSIGNED" && seat.status !== "SOLD"
                      ? () =>
                          navigate(`/admin/AssignTicket/${seat.id}`, {
                            state: {
                              seat,
                              selectedEventObj,
                            },
                          })
                      : null
                  }
                  onDelete={() => dispatch(deleteSeatById(seat.id))}
                  onUpdate={() =>
                    navigate(`/admin/Seats/${seat.id}`, {
                      state: {
                        seat,
                        selectedEventObj,
                      },
                    })
                  }
                />
              </td>
            </tr>
          )}
        />
      ) : (
        <div className="admin-empty-state">
          <div className="admin-empty-orb">?</div>
          <p>Select an event to inspect seat inventory.</p>
        </div>
      )}
    </div>
  );
}

export default Seats;
