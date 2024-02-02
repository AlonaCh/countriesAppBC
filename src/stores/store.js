import { configureStore } from "@reduxjs/toolkit";
import countriesReducer from "./countriesSlice";

//store hosts slices (separete states)
//store is state
export default configureStore({
    reducer: {
        countries: countriesReducer,
    }
})