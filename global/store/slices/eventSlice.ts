import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface EventState {
  events: any[];
  currentEvent: any;
  loading: boolean;
  error: string | null;
}

const initialState: EventState = {
  events: [],
  currentEvent: null,
  loading: false,
  error: null,
};

export const createEvent = createAsyncThunk(
  "event/createEvent",
  async (
    eventData: {
      name: string;
      description: string;
      date: Date;
      location: string;
      ticketPrice: number;
      maxTickets: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post("/api/events", eventData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchEvents = createAsyncThunk(
  "event/fetchEvents",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/events");
      return response.data.events;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    clearEventError: (state) => {
      state.error = null;
    },
    setCurrentEvent: (state, action) => {
      state.currentEvent = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events.push(action.payload.event);
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearEventError, setCurrentEvent } = eventSlice.actions;
export default eventSlice.reducer;
