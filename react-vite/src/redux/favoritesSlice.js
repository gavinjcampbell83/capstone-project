import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchFavorites = createAsyncThunk(
    'favorites/fetchFavorites',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('/api/favorites', {
                method: 'GET',
                credentials: 'include', // Include session cookies
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to fetch favorites');
            }

            return await response.json(); // List of favorites
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const addFavorite = createAsyncThunk(
    'favorites/addFavorite',
    async (cruzId, { rejectWithValue }) => {
        try {
            const response = await fetch('/api/favorites', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cruz_id: cruzId }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to add favorite');
            }

            return await response.json(); // The new favorite object
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const removeFavorite = createAsyncThunk(
    'favorites/removeFavorite',
    async (cruzId, { rejectWithValue }) => {
        try {
            const response = await fetch(`/api/favorites/${cruzId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to remove favorite');
            }

            return cruzId; // Only need the Cruz ID to remove
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: {
        favorites: {}, // Object keyed by Cruz ID for fast lookups
        status: 'idle', // idle, loading, succeeded, failed
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Favorites
            .addCase(fetchFavorites.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchFavorites.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.favorites = action.payload.reduce((acc, favorite) => {
                    acc[favorite.cruz_id] = favorite; // Key by Cruz ID
                    return acc;
                }, {});
            })
            .addCase(fetchFavorites.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            // Add Favorite
            .addCase(addFavorite.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addFavorite.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.favorites[action.payload.cruz_id] = action.payload;
            })
            .addCase(addFavorite.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            // Remove Favorite
            .addCase(removeFavorite.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(removeFavorite.fulfilled, (state, action) => {
                state.status = 'succeeded';
                delete state.favorites[action.payload]; // Remove by Cruz ID
            })
            .addCase(removeFavorite.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default favoritesSlice.reducer;