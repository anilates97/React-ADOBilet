import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEventPhotosById,
  fetchAllEventPhotos,
  getEventPhotosWithEvent,
} from "../../../redux/dataSlice";
import { useNavigate } from "react-router-dom";
import {
  AdminActions,
  AdminCard,
  AdminSelect,
  AdminTable,
  AdminToolbar,
  TextClamp,
} from "../AdminShared";

function EventPhotos() {
  const dispatch = useDispatch();
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedEventName, setSelectedEventName] = useState("");
  const { eventPhotos, eventPhotosAdmin } = useSelector((state) => state.data);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllEventPhotos());
  }, [dispatch]);

  useEffect(() => {
    if (selectedEvent) {
      dispatch(getEventPhotosWithEvent(selectedEvent));
    }
  }, [dispatch, selectedEvent]);

  const selectedEventObj = {
    eventId: selectedEvent,
    eventName: selectedEventName,
  };

  const uniqueEvents = useMemo(() => {
    const map = new Map();
    eventPhotos?.forEach((eventPhoto) => {
      const eventId = eventPhoto.events?.id;
      const eventName = eventPhoto.events?.eventName;
      if (eventId && eventName) map.set(eventId, eventName);
    });

    return Array.from(map, ([eventId, eventName]) => ({ eventId, eventName }));
  }, [eventPhotos]);

  return (
    <div className="grid gap-5">
      <AdminToolbar
        eyebrow="Media library"
        title="Event photos"
        copy="Attach hero and gallery visuals to event detail pages."
        actionLabel={selectedEvent ? "Add photo" : "Add new photo"}
        onAction={() =>
          navigate("/admin/addEventPhoto", {
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
        <AdminTable
          columns={["Photo URL", "Actions"]}
          data={eventPhotosAdmin}
          emptyMessage="No photos found for this event."
          getSearchText={(eventPhoto) => eventPhoto?.eventPhoto}
          renderCard={(eventPhoto) => (
            <AdminCard
              key={eventPhoto.id}
              meta="Event photo"
              title={selectedEventName}
              fields={[["Photo URL", eventPhoto?.eventPhoto]]}
              actions={
                <AdminActions
                  onDelete={() => dispatch(deleteEventPhotosById(eventPhoto.id))}
                  onUpdate={() =>
                    navigate(`/admin/EventPhoto/${eventPhoto.id}`, {
                      state: {
                        eventPhoto,
                        selectedEventObj,
                      },
                    })
                  }
                />
              }
            />
          )}
          renderRow={(eventPhoto) => (
            <tr key={eventPhoto.id}>
              <td>
                <TextClamp max={92}>{eventPhoto?.eventPhoto}</TextClamp>
              </td>
              <td>
                <AdminActions
                  onDelete={() => dispatch(deleteEventPhotosById(eventPhoto.id))}
                  onUpdate={() =>
                    navigate(`/admin/EventPhoto/${eventPhoto.id}`, {
                      state: {
                        eventPhoto,
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
          <p>Select an event to manage its photos.</p>
        </div>
      )}
    </div>
  );
}

export default EventPhotos;
