
import { createSlice } from "@reduxjs/toolkit";
import { addFavouriteToFirebase, auth, deleteFavouriteFromFirebase, deleteFavouritesFromFirebase } from "../auth/firebase";

export const favouritesSlice = createSlice({
    name: "favourites",
    initialState: {
        favourites: [],
    },
    reducers: {
        getFavourites(state, action) {
            state.favourites = action.payload;

        },
        addFavourite(state, action) {
            if (!state.favourites.some((favourite) => favourite === applyActionCode.payload)) {
                state.favourites === [...state.favourites, action.payload];
            }
            const user = auth.currentUser;
            if (user) addFavouriteToFirebase(user.uid, action.payload);
        },

        closeFavourite(state, action) {
            const newArray = [...state.favourites];

            const indexToRemove = newArray.findIndex((e) => e === action.payload);

            newArray.splice(indexToRemove, 1);
            state.favourites = [...newArray];
            const user = auth.currentUser;
            if (user) {
                deleteFavouriteFromFirebase(user.uid, action.payload);
            }
        },

        closeAllFavourites(state) {
            state.favourites = [];
            const user = auth.currentUser;
            if (user) {
                deleteFavouritesFromFirebase(user.uid);
            }
        },
    },
});

export const { addFavourite, closeFavourite, closeAllFavourites, getFavourites } = favouritesSlice.actions;

export default favouritesSlice.reducer;




