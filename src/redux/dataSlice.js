import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getCategories } from "../backend/categories/categories";
import {
  getEvent,
  getEventPhotos,
  getEventsWithArtist,
} from "../backend/events/events";
import { getArtists } from "../backend/artists/artists";

import { getSeats, selectSeat } from "../backend/seats/seats";
import {
  buyTicket,
  getEventTickets,
  getSoldTickets,
} from "../backend/tickets/tickets";

import {
  fetchUsers,
  getUser,
  getUserFromDatabase,
  logout,
  signIn,
  signUp,
} from "../backend/user/user";
import {
  addCategory,
  removeCategoryById,
  updateCategoryById,
} from "../backend/admin/Category/category";
import {
  addEvent,
  deleteEvent,
  fetchEvents,
  updateEvent,
} from "../backend/admin/Events/events";
import {
  addArtist,
  removeArtistById,
  updateArtistById,
} from "../backend/admin/Artists/artists";
import {
  addTicketCategory,
  getTicketCategories,
  getTicketCategoriesByEventId,
  removeTicketCategoryById,
  updateTicketCategoryById,
} from "../backend/admin/TicketCategories/ticketCategories";
import {
  addSeat,
  getAllSeats,
  getSeatsAdmin,
  removeSeatById,
  updateSeatById,
} from "../backend/admin/Seats/seats";
import {
  addEventPhoto,
  getAllEventPhotos,
  getEventPhotosByEvent,
  removeEventPhotoById,
  updateEventPhotoById,
} from "../backend/admin/EventPhotos/eventPhotos";
import {
  assignTicket,
  createTicket,
  getTicketOfEvent,
} from "../backend/admin/AssignTicket/assignTicket";

const initialState = {
  eventsWithArtistsStatus: "idle",
  categories: [],
  categoriesTest: [],
  artists: [],
  eventsWithArtists: [],
  event: {},
  eventPhotos: [],
  eventPhotosAdmin: [],
  seats: [],
  seatsAdmin: [],
  eventTickets: [],
  eventTicketsAdmin: [],
  selectedSeat: {},
  soldTickets: {},
  users: [],
  user: {},
  userSession: {},
  userData: {},
  events: [],
  ticketCategories: [],
  ticketCategoriesByEvent: [],
  allSeats: [],
};

export const getCategoryTest = createAsyncThunk("testCategory", async () => {
  const data = await getCategories();

  return data;
});

export const getArtistTest = createAsyncThunk("artists", async () => {
  const data = await getArtists();

  return data;
});

export const getArtistWithEvents = createAsyncThunk("eventartist", async () => {
  const data = await getEventsWithArtist();
  return data;
});

export const getEventSingle = createAsyncThunk("getevent", async (eventId) => {
  const data = await getEvent(eventId);

  return data;
});

export const getUsers = createAsyncThunk("fetchusers", async () => {
  const data = await fetchUsers();

  return data;
});

export const getUserSession = createAsyncThunk("getUser", async () => {
  const data = await getUser();

  return data;
});

export const getUserSessionDatabase = createAsyncThunk(
  "getUserdata",
  async (userId) => {
    const data = await getUserFromDatabase(userId);

    return data;
  }
);

export const login = createAsyncThunk("login", async ({ email, password }) => {
  const data = await signIn({ email, password });

  return data;
});

export const logoutUser = createAsyncThunk("logout", async () => {
  const data = await logout();

  console.log("logout", data);

  return data;
});

export const register = createAsyncThunk(
  "register",
  async ({ email, password, username }) => {
    const data = await signUp({ email, password, username });

    console.log("data register", data);

    return data;
  }
);

export const getPhotosByEvent = createAsyncThunk(
  "geteventphotos",
  async (eventId) => {
    const data = await getEventPhotos(eventId);

    return data;
  }
);

export const getSeatsByEvent = createAsyncThunk("seats", async (eventId) => {
  const data = await getSeats(eventId);

  return data;
});

export const getTickets = createAsyncThunk("gettickets", async (eventId) => {
  const data = await getEventTickets(eventId);

  return data;
});

export const getSoldTicketsData = createAsyncThunk("soldticket", async () => {
  const data = await getSoldTickets();

  return data;
});

export const buyTicketOfEvent = createAsyncThunk(
  "buyTicket",
  async ({ eventId, seatId, ticketId }) => {
    const data = await buyTicket(eventId, seatId, ticketId);

    console.log("dataa", data);

    return data;
  }
);

export const selectSeatByUser = createAsyncThunk(
  "selectseat",
  async (seatId) => {
    const data = await selectSeat(seatId);

    console.log("dataa", data);

    return data;
  }
);

//ADMIN

//Category

export const createCategory = createAsyncThunk(
  "createcategory",
  async ({ categoryName, categoryPhoto }) => {
    const data = await addCategory({ categoryName, categoryPhoto });

    return data;
  }
);

export const deleteCategoryById = createAsyncThunk(
  "deleteCategory",
  async (id) => {
    await removeCategoryById(id);

    return id;
  }
);

export const updateCategoryWithId = createAsyncThunk(
  "updateCategory",
  async ({ id, categoryName, categoryPhoto }) => {
    const data = await updateCategoryById({ id, categoryName, categoryPhoto });

    console.log("dataUpdate", data);

    return data;
  }
);

// Events

export const getEvents = createAsyncThunk("getEvents", async () => {
  const data = await fetchEvents();

  return data;
});

export const deleteEventById = createAsyncThunk("deleteEvent", async (id) => {
  await deleteEvent(id);

  return id;
});

export const updateEventById = createAsyncThunk(
  "updateEvent",
  async ({ id, name, hour, finishHour, date, location, category, isFree }) => {
    const data = await updateEvent({
      id,
      name,
      hour,
      finishHour,
      date,
      location,
      category,
      isFree,
    });

    return data;
  }
);

export const createEvent = createAsyncThunk(
  "addEvent",
  async ({
    artists,
    name,
    hour,
    finishHour,
    date,
    desc,
    location,
    category,
    isFree,
  }) => {
    const data = await addEvent({
      artists,
      name,
      hour,
      finishHour,
      date,
      desc,
      location,
      category,
      isFree,
    });

    return data;
  }
);

// Artists
export const createArtists = createAsyncThunk(
  "createartist",
  async ({ artistName, artistPhoto }) => {
    const data = await addArtist({ artistName, artistPhoto });

    return data;
  }
);

export const deleteArtistById = createAsyncThunk("deleteartist", async (id) => {
  await removeArtistById(id);

  return id;
});

export const updateArtistWithId = createAsyncThunk(
  "updateartist",
  async ({ id, artistName, artistPhoto }) => {
    const data = await updateArtistById({ id, artistName, artistPhoto });

    return data;
  }
);

// Ticket Categories
export const getAllTicketCategories = createAsyncThunk(
  "getticketcategories",
  async () => {
    const data = await getTicketCategories();

    return data;
  }
);

export const createTicketCategoryByEvent = createAsyncThunk(
  "createTicketCategoryByEvent",
  async ({ categoryName, eventId, price }) => {
    const data = await addTicketCategory({ categoryName, eventId, price });

    return data;
  }
);

export const deleteTicketCategoryById = createAsyncThunk(
  "deleteTicketCategoryById",
  async (id) => {
    await removeTicketCategoryById(id);

    return id;
  }
);

export const updateTicketCategoryWithId = createAsyncThunk(
  "updateTicketCategoryWithId",
  async ({ id, categoryName, eventId, price }) => {
    const data = await updateTicketCategoryById({
      id,
      categoryName,
      eventId,
      price,
    });

    return data;
  }
);

export const getTicketCategoriesWithEventId = createAsyncThunk(
  "getTicketCategoriesWithEventId",
  async (eventId) => {
    const data = await getTicketCategoriesByEventId(eventId);

    return data;
  }
);

// Seats

export const fetchAllSeats = createAsyncThunk("fetchAllSeats", async () => {
  const data = await getAllSeats();

  return data;
});

export const getSeatsAdminByEvent = createAsyncThunk(
  "getSeatsAdminByEvent",
  async (eventId) => {
    const data = await getSeatsAdmin(eventId);

    return data;
  }
);

export const createSeat = createAsyncThunk(
  "createSeat",
  async ({ eventId, seatName }) => {
    const data = await addSeat({ eventId, seatName });

    return data;
  }
);

export const assignTicketById = createAsyncThunk(
  "assignTicketById",
  async ({ ticketId, id, eventId }) => {
    const data = await assignTicket({ ticketId, id, eventId });

    return data;
  }
);

export const updateSeatWithId = createAsyncThunk(
  "updateSeatWithId",
  async ({ id, eventId, seatName, availability }) => {
    const data = await updateSeatById({ id, eventId, seatName, availability });

    return data;
  }
);

export const deleteSeatById = createAsyncThunk("deleteSeatById", async (id) => {
  await removeSeatById(id);

  return id;
});

// EventPhotos
export const fetchAllEventPhotos = createAsyncThunk(
  "fetchAllEventPhotos",
  async (id) => {
    const data = await getAllEventPhotos();

    return data;
  }
);

export const getEventPhotosWithEvent = createAsyncThunk(
  "getEventPhotosWithEvent",
  async (eventId) => {
    const data = await getEventPhotosByEvent(eventId);

    return data;
  }
);

export const deleteEventPhotosById = createAsyncThunk(
  "deleteEventPhotosById",
  async (id) => {
    await removeEventPhotoById(id);

    return id;
  }
);

export const createEventPhoto = createAsyncThunk(
  "createEventPhoto",
  async ({ eventPhoto, eventId }) => {
    const data = await addEventPhoto({ eventPhoto, eventId });

    return data;
  }
);

export const updateEventPhotoWithId = createAsyncThunk(
  "updateEventPhotoWithId",
  async ({ id, eventPhoto, eventId }) => {
    const data = await updateEventPhotoById({ id, eventPhoto, eventId });

    return data;
  }
);

// Assign Ticket

export const getTicketOfEventById = createAsyncThunk(
  "getTicketOfEventById",
  async (eventId) => {
    const data = await getTicketOfEvent(eventId);

    return data;
  }
);

export const addTicket = createAsyncThunk(
  "addTicket",
  async ({ categoryId, eventId }) => {
    const data = await createTicket({ categoryId, eventId });

    console.log("addTİCKETTTTT", categoryId, eventId);

    return data;
  }
);

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: [],
  extraReducers: (builder) => {
    builder

      .addCase(getCategoryTest.fulfilled, (state, action) => {
        state.categoriesTest = action.payload;
      })
      .addCase(getArtistTest.fulfilled, (state, action) => {
        state.artists = action.payload;
      })
      .addCase(getArtistWithEvents.pending, (state) => {
        state.eventsWithArtistsStatus = "loading";
      })
      .addCase(getArtistWithEvents.fulfilled, (state, action) => {
        state.eventsWithArtists = action.payload || [];
        state.eventsWithArtistsStatus = "succeeded";
      })
      .addCase(getArtistWithEvents.rejected, (state) => {
        state.eventsWithArtistsStatus = "failed";
      })
      .addCase(getEventSingle.fulfilled, (state, action) => {
        state.event = action.payload;
      })
      .addCase(getPhotosByEvent.fulfilled, (state, action) => {
        state.eventPhotos = action.payload;
      })
      .addCase(getSeatsByEvent.fulfilled, (state, action) => {
        state.seats = action.payload || [];
      })
      .addCase(getTickets.fulfilled, (state, action) => {
        state.eventTickets = action.payload || [];
      })
      .addCase(buyTicketOfEvent.fulfilled, (state, action) => {
        console.log("addcase", action.payload);
        const updatedSeats = state.seats.map((seat) => {
          if (
            seat.id === action.payload.seatId &&
            seat.eventId === action.payload.eventId
          ) {
            return {
              ...seat,
              availability: false,
            };
          }
          return seat;
        });

        state.seats = updatedSeats;

        state.eventTickets = state.eventTickets.filter(
          (ticket) =>
            ticket.ticketId !== action.payload.seatId &&
            ticket.eventId === action.payload.eventId
        );
      })
      .addCase(selectSeatByUser.fulfilled, (state, action) => {
        state.selectedSeat = action.payload || {};
      })
      .addCase(getSoldTicketsData.fulfilled, (state, action) => {
        state.soldTickets = action.payload;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(register.fulfilled, (state, action) => {
        const registeredUser = action.payload;

        state.users = [...state.users, registeredUser];
      })
      .addCase(login.fulfilled, (state, action) => {
        state.userSession = action.payload;
      })

      .addCase(getUserSession.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(getUserSessionDatabase.fulfilled, (state, action) => {
        state.userData = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.user = {};
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categoriesTest.push(action.payload);
      })
      .addCase(deleteCategoryById.fulfilled, (state, action) => {
        const deletedId = action.payload;

        state.categoriesTest = state.categoriesTest.filter(
          (category) => category.id !== deletedId
        );
      })
      .addCase(updateCategoryWithId.fulfilled, (state, action) => {
        const updatedCategory = action.payload;
        const { id } = updatedCategory;

        const existingCategoryIndex = state.categoriesTest.findIndex(
          (category) => category.id === id
        );

        if (existingCategoryIndex !== -1) {
          state.categoriesTest[existingCategoryIndex] = updatedCategory;
        }
      })

      .addCase(createEvent.fulfilled, (state, action) => {
        state.eventsWithArtists.push(action.payload);
      })
      .addCase(getEvents.fulfilled, (state, action) => {
        state.events = action.payload;
      })
      .addCase(deleteEventById.fulfilled, (state, action) => {
        const id = action.payload;

        state.eventsWithArtists = state.eventsWithArtists.filter(
          (event) => event.id !== id
        );
      })
      .addCase(updateEventById.fulfilled, (state, action) => {
        const updatedEvent = action.payload;
        console.log("updatedEvent", updatedEvent);
        const { id } = updatedEvent;
        const existingEventIndex = state.events.findIndex(
          (event) => event.id === id
        );

        if (existingEventIndex !== -1) {
          state.events[existingEventIndex] = updatedEvent;
        }
      })
      .addCase(createArtists.fulfilled, (state, action) => {
        state.artists.push(action.payload);
      })
      .addCase(deleteArtistById.fulfilled, (state, action) => {
        const id = action.payload;

        state.artists = state.artists.filter((artist) => artist.id !== id);
      })
      .addCase(updateArtistWithId.fulfilled, (state, action) => {
        const artist = action.payload;
        const { id } = artist;

        const existingArtistIndex = state.artists.findIndex(
          (artist) => artist.id === id
        );

        if (existingArtistIndex !== -1) {
          state.artists[existingArtistIndex] = artist;
        }
      })
      .addCase(getAllTicketCategories.fulfilled, (state, action) => {
        state.ticketCategories = action.payload;
      })
      .addCase(createTicketCategoryByEvent.fulfilled, (state, action) => {
        state.ticketCategories.push(action.payload);
      })
      .addCase(deleteTicketCategoryById.fulfilled, (state, action) => {
        const id = action.payload;

        state.ticketCategories = state.ticketCategories.filter(
          (ticketCategory) => ticketCategory.id !== id
        );
      })
      .addCase(updateTicketCategoryWithId.fulfilled, (state, action) => {
        const updatedTicketCategory = action.payload;
        const { id } = updatedTicketCategory;

        const existingTicketCategoryIndex = state.ticketCategories.findIndex(
          (ticketCategory) => ticketCategory.id === id
        );

        if (existingTicketCategoryIndex !== -1) {
          state.ticketCategories[existingTicketCategoryIndex] =
            updatedTicketCategory;
        }
      })
      .addCase(getTicketCategoriesWithEventId.fulfilled, (state, action) => {
        state.ticketCategoriesByEvent = action.payload;
      })
      .addCase(fetchAllSeats.fulfilled, (state, action) => {
        state.allSeats = action.payload;
      })
      .addCase(createSeat.fulfilled, (state, action) => {
        state.allSeats.push(action.payload);
      })
      .addCase(getSeatsAdminByEvent.fulfilled, (state, action) => {
        state.seatsAdmin = action.payload;
      })
      .addCase(deleteSeatById.fulfilled, (state, action) => {
        const id = action.payload;

        state.allSeats = state.allSeats.filter((seat) => seat.id !== id);
      })
      .addCase(updateSeatWithId.fulfilled, (state, action) => {
        const updatedSeat = action.payload;
        const { id } = updatedSeat;

        const existingSeatIndex = state.allSeats.findIndex(
          (seat) => seat.id === id
        );

        if (existingSeatIndex !== -1) {
          state.allSeats[existingSeatIndex] = updatedSeat;
        }
      })
      .addCase(fetchAllEventPhotos.fulfilled, (state, action) => {
        state.eventPhotos = action.payload;
      })

      .addCase(getEventPhotosWithEvent.fulfilled, (state, action) => {
        state.eventPhotosAdmin = action.payload;
      })
      .addCase(deleteEventPhotosById.fulfilled, (state, action) => {
        const id = action.payload;

        state.eventPhotosAdmin = state.eventPhotosAdmin.filter(
          (eventPhoto) => eventPhoto.id !== id
        );
      })
      .addCase(createEventPhoto.fulfilled, (state, action) => {
        state.eventPhotosAdmin.push(action.payload);
      })
      .addCase(updateEventPhotoWithId.fulfilled, (state, action) => {
        const updatedEventPhoto = action.payload;
        const { id } = updatedEventPhoto;

        const existingEventPhotoIndex = state.eventPhotosAdmin.findIndex(
          (eventPhoto) => eventPhoto.id === id
        );

        if (existingEventPhotoIndex !== -1) {
          state.eventPhotosAdmin[existingEventPhotoIndex] = updatedEventPhoto;
        }
      })
      .addCase(getTicketOfEventById.fulfilled, (state, action) => {
        state.eventTicketsAdmin = action.payload;
      })
      .addCase(addTicket.fulfilled, (state, action) => {
        state.eventTicketsAdmin.push(action.payload);
      })
      .addCase(assignTicketById.fulfilled, (state, action) => {
        const updatedSeat = action.payload;

        console.log("updatedSeat", updatedSeat);
        const { seatId } = updatedSeat.seat;
        const { ticketId } = updatedSeat.ticketPricing;

        const existingSeatIndex = state.seatsAdmin.findIndex(
          (seat) => seat.id === seatId
        );

        const existingTicketIndex = state.eventTicketsAdmin.findIndex(
          (ticket) => ticket.id === ticketId
        );

        if (existingSeatIndex !== -1) {
          state.seatsAdmin[existingSeatIndex] = updatedSeat.seat;
        }

        if (existingTicketIndex !== -1) {
          state.eventTicketsAdmin[existingTicketIndex] =
            updatedSeat.ticketPricing;
        }
      });
  },
});

export default dataSlice.reducer;
