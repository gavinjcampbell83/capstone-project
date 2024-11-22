import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchReviews = createAsyncThunk(
    'reviews/fetchReviews',
    async (cruzId, { rejectWithValue }) => {
      try {
        const response = await fetch(`/api/reviews/cruz/${cruzId}`);
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

export const createReview = createAsyncThunk(
  'reviews/createReview',
  async ({ cruzId, userId, rating, reviewText }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/reviews/cruz/${cruzId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, rating, review_text: reviewText }),
      });
      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error);
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteReview = createAsyncThunk(
    'reviews/deleteReview',
    async (reviewId, { rejectWithValue }) => {
        try {
            const response = await fetch(`/api/reviews/${reviewId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                const error = await response.json();
                return rejectWithValue(error);
            }
            return reviewId;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateReview = createAsyncThunk(
    'reviews/updateReview',
    async ({ reviewId, reviewData }, { rejectWithValue }) => {
        try {
            const response = await fetch(`/api/reviews/${reviewId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reviewData),
            });
            if (!response.ok) {
                const error = await response.json();
                return rejectWithValue(error);
            }
            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const reviewSlice = createSlice({
    name: 'reviews',
    initialState: {
      reviews: [],
      loading: false,
      error: null,
      success: false,
    },
    reducers: {
      clearReviews(state) {
        state.reviews = [];
        state.loading = false;
        state.error = null;
        state.success = false;
      },
    },
    extraReducers: (builder) => {
      builder
        // Create Review
        .addCase(createReview.pending, (state) => {
          state.loading = true;
          state.success = false;
          state.error = null;
        })
        .addCase(createReview.fulfilled, (state, action) => {
          state.loading = false;
          state.success = true;
          const exists = state.reviews.some((review) => review.id === action.payload.id);
          if (!exists) {
            state.reviews.push(action.payload);
          }
        })
        .addCase(createReview.rejected, (state, action) => {
          state.loading = false;
          state.success = false;
          state.error = action.payload || 'Failed to create review';
        })
  
        // Fetch Reviews
        .addCase(fetchReviews.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchReviews.fulfilled, (state, action) => {
          state.loading = false;
          state.reviews = action.payload;
        })
        .addCase(fetchReviews.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || 'Failed to fetch reviews';
        })
  
        // Update Review
        .addCase(updateReview.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updateReview.fulfilled, (state, action) => {
          state.loading = false;
          const updatedReview = action.payload;
          const index = state.reviews.findIndex((review) => review.id === updatedReview.id);
          if (index !== -1) {
            state.reviews[index] = updatedReview;
          } else {
            state.error = 'Review not found in the state';
          }
        })
        .addCase(updateReview.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || 'Failed to update review';
        })
  
        // Delete Review
        .addCase(deleteReview.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(deleteReview.fulfilled, (state, action) => {
          state.loading = false;
          const reviewExists = state.reviews.some((review) => review.id === action.payload);
          if (reviewExists) {
            state.reviews = state.reviews.filter((review) => review.id !== action.payload);
          } else {
            state.error = 'Review not found in the state';
          }
        })
        .addCase(deleteReview.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || 'Failed to delete review';
        });
    },
  });
  
  export const { clearReviews } = reviewSlice.actions;
  export default reviewSlice.reducer;