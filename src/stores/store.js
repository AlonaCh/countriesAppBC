import { configureStore } from "@reduxjs/toolkit";
import countriesReducer from "./countriesSlice";

//store hosts slices (separete states)
export default configureStore({
    reducer: {
        countries: countriesReducer,
    }
})