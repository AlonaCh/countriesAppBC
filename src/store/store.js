import { configureStore } from "@reduxjs/toolkit";
import countriesReducer from "./countriesSlice";
import favouritesReducer from "./favouritesSlice";

//store hosts slices (separete states)
//store is state
export default configureStore({
    reducer: {
        countries: countriesReducer,
        favourites: favouritesReducer,
    },
});
