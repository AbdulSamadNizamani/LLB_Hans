
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Notes: [] // Initially an empty array
};

export const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        // Reducer to update Notes state
        notesdata: (state, action) => {
            state.Notes = action.payload; // Updating Notes with new data
        }
    }
});

// ✅ Export actions correctly
export const { notesdata } = notesSlice.actions;

// ✅ Export reducer correctly
export default notesSlice.reducer;
