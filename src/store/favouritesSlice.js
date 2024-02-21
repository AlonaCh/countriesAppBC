
import { createSlice } from "@reduxjs/toolkit";

export const favouritesSlice = createSlice({
    name: "favourites",
    initialState: {
        favourites: [],
    },
    reducers: {
        addFavourite(state, action) {
            if (
                state.favourites.some((favourite) => favourite.name.common === action.payload.name.common
                ))
                return;

            state.favourites = [...state.favourites, action.payload];

        },
        closeFavourite(state, action) {
            state.favourites = state.favourites.filter((favourite) => favourite.name.common !== action.payload.name.common);
        },
        closeAllFavourites(state, action) {
            state.favourites = [];
        },
    },
});

export const { addFavourite, closeFavourite, closeAllFavourites } = favouritesSlice.actions;

export default favouritesSlice.reducer;




