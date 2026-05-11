import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTicketCategoryById,
  getAllTicketCategories,
  getTicketCategoriesWithEventId,
  getTicketOfEventById,
} from "../../../redux/dataSlice";
import { useNavigate } from "react-router-dom";
import {
  AdminActions,
  AdminCard,
  AdminSelect,
  AdminTable,
  AdminToolbar,
} from "../AdminShared";

function TicketCategories() {
  const dispatch = useDispatch();
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedEventName, setSelectedEventName] = useState("");
  const { eventTicketsAdmin, ticketCategories, ticketCategoriesByEvent } =
    useSelector((state) => state.data);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllTicketCategories());
  }, [dispatch]);

  useEffect(() => {
    if (selectedEvent) {
      dispatch(getTicketCategoriesWithEventId(selectedEvent));
      dispatch(getTicketOfEventById(selectedEvent));
    }
  }, [dispatch, selectedEvent]);

  const selectedEventObj = {
    eventId: selectedEvent,
    eventName: selectedEventName,
  };

  const uniqueEvents = useMemo(() => {
    const map = new Map();
    ticketCategories?.forEach((category) => {
      const eventId = category.events?.id;
      const eventName = category.events?.eventName;
      if (eventId && eventName) map.set(eventId, eventName);
    });

    return Array.from(map, ([eventId, eventName]) => ({ eventId, eventName }));
  }, [ticketCategories]);

  return (
    <div className="grid gap-5">
      <AdminToolbar
        eyebrow="Ticket inventory"
        title="Tickets"
        copy="Configure category pricing and inspect generated tickets per event."
        actionLabel={selectedEvent ? "Add category" : "Add new category"}
        onAction={() =>
          navigate("/admin/addTicketCategories", {
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
          {uniqueEvents.map((event) => (
            <option key={event.eventId} value={event.eventId}>
              {event.eventName}
            </option>
          ))}
        </AdminSelect>
      </AdminToolbar>

      {selectedEvent ? (
        <>
          <AdminTable
            columns={["Category", "Price", "Actions"]}
            data={ticketCategoriesByEvent}
            emptyMessage="No ticket categories found for this event."
            getSearchText={(ticketCategory) =>
              `${ticketCategory.categoryName} ${ticketCategory.price}`
            }
            renderCard={(ticketCategory) => (
              <AdminCard
                key={ticketCategory.id}
                meta="Ticket category"
                title={ticketCategory.categoryName}
                fields={[["Price", ticketCategory.price]]}
                actions={
                  <AdminActions
                    onDelete={() =>
                      dispatch(deleteTicketCategoryById(ticketCategory.id))
                    }
                    onUpdate={() =>
                      navigate(`/admin/TicketCategories/${ticketCategory.id}`, {
                        state: {
                          ticketCategory,
                          selectedEventObj,
                        },
                      })
                    }
                  />
                }
              />
            )}
            renderRow={(ticketCategory) => (
              <tr key={ticketCategory.id}>
                <td className="font-bold text-[#f7efe2]">
                  {ticketCategory.categoryName}
                </td>
                <td>{ticketCategory.price}</td>
                <td>
                  <AdminActions
                    onDelete={() =>
                      dispatch(deleteTicketCategoryById(ticketCategory.id))
                    }
                    onUpdate={() =>
                      navigate(`/admin/TicketCategories/${ticketCategory.id}`, {
                        state: {
                          ticketCategory,
                          selectedEventObj,
                        },
                      })
                    }
                  />
                </td>
              </tr>
            )}
          />

          <AdminToolbar
            eyebrow="Generated tickets"
            title="Ticket pool"
            copy="Tickets created from the selected pricing categories."
            actionLabel="Add ticket"
            onAction={() =>
              navigate("/admin/addTicketPrice", {
                state: {
                  selectedEventObj,
                  ticketCategoriesByEvent,
                },
              })
            }
          />

          <AdminTable
            columns={["Id", "Category", "Price", "Assign", "Sale"]}
            data={eventTicketsAdmin}
            emptyMessage="There are no tickets on this event."
            getSearchText={(ticket) =>
              `${ticket?.id} ${ticket?.ticketCategories?.categoryName} ${ticket?.ticketCategories?.price} ${ticket?.isAssign ? "assigned" : "not assigned"} ${ticket?.isSold ? "sold" : "free"}`
            }
            renderCard={(ticket) => (
              <AdminCard
                key={ticket?.id}
                meta={ticket?.isSold ? "Sold" : "Free"}
                title={ticket?.ticketCategories?.categoryName || `Ticket #${ticket?.id}`}
                fields={[
                  ["Id", ticket?.id],
                  ["Price", ticket?.ticketCategories?.price],
                  ["Assign", ticket?.isAssign ? "Assigned" : "Not assigned"],
                  ["Sale", ticket?.isSold ? "Sold" : "Free"],
                ]}
              />
            )}
            renderRow={(ticket) => (
              <tr key={ticket?.id}>
                <td>{ticket?.id}</td>
                <td className="font-bold text-[#f7efe2]">
                  {ticket?.ticketCategories?.categoryName || "-"}
                </td>
                <td>{ticket?.ticketCategories?.price || "-"}</td>
                <td>{ticket?.isAssign ? "Assigned" : "Not assigned"}</td>
                <td>{ticket?.isSold ? "Sold" : "Free"}</td>
              </tr>
            )}
          />
        </>
      ) : (
        <div className="admin-empty-state">
          <div className="admin-empty-orb">?</div>
          <p>Select an event to manage ticket categories and ticket pool.</p>
        </div>
      )}
    </div>
  );
}

export default TicketCategories;
