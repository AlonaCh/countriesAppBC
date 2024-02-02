import { createSlice } from "@reduxjs/toolkit";

export const countriesSlice = createSlice({
    name: "countries",
    initialState: {
        countries: [],
        isLoading: true,
    },
    reducers: {},
})

export default countriesSlice.reducer;