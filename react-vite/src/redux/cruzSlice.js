import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAllCruz = createAsyncThunk(
  'cruz/fetchAllCruz',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/cruz/');
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCruzDetails = createAsyncThunk(
  'cruz/fetchCruzDetails',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/cruz/${id}`);
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createCruz = createAsyncThunk(
  'cruz/createCruz',
  async (cruzData, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/cruz/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cruzData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const cruzSlice = createSlice({
  name: 'cruz',
  initialState: {
    cruzList: [],
    cruzDetails: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch All Cruz
      .addCase(fetchAllCruz.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCruz.fulfilled, (state, action) => {
        state.loading = false;
        state.cruzList = action.payload;
      })
      .addCase(fetchAllCruz.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch Cruz data';
      })

      // Fetch Cruz Details
      .addCase(fetchCruzDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCruzDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.cruzDetails = action.payload;
      })
      .addCase(fetchCruzDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch Cruz details';
      })

      // Create Cruz
      .addCase(createCruz.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCruz.fulfilled, (state, action) => {
        state.loading = false;
        state.cruzList.push(action.payload);
      })
      .addCase(createCruz.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to create Cruz';
      });
  },
});

export default cruzSlice.reducer;