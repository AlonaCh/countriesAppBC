import { createSlice } from "@reduxjs/toolkit";
import countriesService from "../services/countries";

export const initializeCountries = () => {
    return async (dispatch) => {
        const countries = await countriesService.getAll();
        dispatch(getCountries(countries)); //send countries(payload) to the reducer  reducers: {  getCountries(state, action)
        setTimeout(() => {
            dispatch(isLoading(false));
        }, 1000);
    };
};

export const countriesSlice = createSlice({
    name: "countries",
    initialState: {
        countries: [], //to acces this: useSelector((state) => state.countries.countries)
        isLoading: true, //to acces this: useSelector((state) => state.countries.isLoading)
    },
    reducers: {
        getCountries(state, action) {
            state.countries = action.payload; //if it is success, then we update the state and isLoading to false
            state.isLoading = false;
        },
        isLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});
export const { getCountries, isLoading } = countriesSlice.actions;

export default countriesSlice.reducer;