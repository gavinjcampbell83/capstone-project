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

export const addCruzImageThunk = createAsyncThunk(
  'cruz/addCruzImage',
  async ({ cruzId, imageData }, thunkAPI) => {
      const formData = new FormData();
      formData.append('image', imageData.file);
      formData.append('is_primary', imageData.is_primary);

      try {
          const response = await fetch(`/api/cruz/${cruzId}/images`, {
              method: 'POST',
              body: formData,
          });
          if (response.ok) {
              return await response.json();
          } else {
              const error = await response.json();
              return thunkAPI.rejectWithValue(error.message);
          }
      } catch (err) {
          return thunkAPI.rejectWithValue('Network error. Please try again.');
      }
  }
);

export const deleteCruzThunk = createAsyncThunk('cruz/deleteCruz', async (cruzId, thunkAPI) => {
  try {
      const response = await fetch(`/api/cruz/${cruzId}`, {
          method: 'DELETE',
      });
      if (response.ok) {
          return cruzId; // Return the deleted Cruz ID
      } else {
          const error = await response.json();
          return thunkAPI.rejectWithValue(error.message);
      }
  } catch (err) {
      return thunkAPI.rejectWithValue('Network error. Please try again.');
  }
});

export const updateCruzThunk = createAsyncThunk(
  'cruz/updateCruz',
  async ({ id, cruzData }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/cruz/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cruzData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }
      const data = await response.json();
      return data; // Return the updated Cruz data
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateCruzImageThunk = createAsyncThunk(
  'cruz/updateCruzImage',
  async ({ cruzId, cruzImageId, imageData }, thunkAPI) => {
    const formData = new FormData();
    formData.append('image', imageData.file);
    formData.append('is_primary', imageData.is_primary);

    try {
      const response = await fetch(`/api/cruz/${cruzId}/images/${cruzImageId}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        return thunkAPI.rejectWithValue(error.message);
      }

      const updatedImage = await response.json();
      return updatedImage; // Return the updated image data
    } catch (err) {
      return thunkAPI.rejectWithValue('Network error. Please try again.');
    }
  }
);

export const fetchCruzBySearch = createAsyncThunk(
  'cruz/fetchCruzBySearch',
  async ({ city, state }, { rejectWithValue }) => {
    try {
      let url = '/api/cruz?';
      if (city) url += `city=${encodeURIComponent(city)}&`;
      if (state) url += `state=${encodeURIComponent(state)}`;

      const response = await fetch(url);
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const data = await response.json();
      return data; // The list of filtered Cruz
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const cruzSlice = createSlice({
  name: 'cruz',
  initialState: {
    cruzList: [],
    filteredCruz: [],
    cruzDetails: null,
    images: {},
    loading: false,
    error: null,
  },
  reducers: {
    // Set the filtered Cruz
    setFilteredCruz(state, action) {
      state.filteredCruz = action.payload;
    },
  },
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
        state.filteredCruz = action.payload;
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

      // Fetch Cruz By Search
      .addCase(fetchCruzBySearch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCruzBySearch.fulfilled, (state, action) => {
        state.loading = false;
        state.cruzList = action.payload;
      })
      .addCase(fetchCruzBySearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch Cruz by search.';
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
      })

      // Add Cruz Image
      .addCase(addCruzImageThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCruzImageThunk.fulfilled, (state, action) => {
        const image = action.payload;
        if (!state.images[image.cruz_id]) {
          state.images[image.cruz_id] = [];
        }
        state.images[image.cruz_id].push(image);
        state.loading = false;
      })
      .addCase(addCruzImageThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to upload Cruz image';
      })

      // Delete Cruz
      .addCase(deleteCruzThunk.fulfilled, (state, action) => {
        state.cruzList = state.cruzList.filter((cruz) => cruz.id !== action.payload);
      })
      .addCase(deleteCruzThunk.rejected, (state, action) => {
        state.error = action.payload || 'Failed to delete Cruz.';
      })

      // Update Cruz
      .addCase(updateCruzThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCruzThunk.fulfilled, (state, action) => {
        state.loading = false;

        const updatedCruz = action.payload;

        // Update cruzList
        state.cruzList = state.cruzList.map((cruz) =>
          cruz.id === updatedCruz.id ? updatedCruz : cruz
        );

        // Update cruzDetails if it matches the updated Cruz
        if (state.cruzDetails && state.cruzDetails.id === updatedCruz.id) {
          state.cruzDetails = updatedCruz;
        }
      })
      .addCase(updateCruzThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update Cruz.';
      })

      // Update Cruz Image
      .addCase(updateCruzImageThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCruzImageThunk.fulfilled, (state, action) => {
        const updatedImage = action.payload;

        // Update cruzDetails images if it matches the updated Cruz
        if (state.cruzDetails && state.cruzDetails.id === updatedImage.cruz_id) {
          state.cruzDetails.images = state.cruzDetails.images.map((img) =>
            img.id === updatedImage.id ? updatedImage : img
          );
        }

        state.loading = false;
      })
      .addCase(updateCruzImageThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update Cruz image.';
      });
  },
});

export const { setFilteredCruz } = cruzSlice.actions;
export default cruzSlice.reducer;