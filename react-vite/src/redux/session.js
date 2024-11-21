import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const thunkAuthenticate = createAsyncThunk("session/authenticate", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch("/api/auth/");
    if (!response.ok) {
      return rejectWithValue("Failed to authenticate user");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const thunkLogin = createAsyncThunk("session/login", async (credentials, { rejectWithValue }) => {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
      const errorMessages = await response.json();
      return rejectWithValue(errorMessages);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const thunkSignup = createAsyncThunk("session/signup", async (user, { rejectWithValue }) => {
  try {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      const errorMessages = await response.json();
      return rejectWithValue(errorMessages);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const thunkLogout = createAsyncThunk("session/logout", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch("/api/auth/logout");
    if (!response.ok) {
      return rejectWithValue("Failed to logout");
    }
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const sessionSlice = createSlice({
  name: "session",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(thunkAuthenticate.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(thunkAuthenticate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(thunkAuthenticate.pending, (state) => {
        state.loading = true;
      })
      .addCase(thunkLogin.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(thunkLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(thunkLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(thunkSignup.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(thunkSignup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(thunkSignup.pending, (state) => {
        state.loading = true;
      })
      .addCase(thunkLogout.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
        state.error = null;
      })
      .addCase(thunkLogout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(thunkLogout.pending, (state) => {
        state.loading = true;
      });
  },
});

export default sessionSlice.reducer;