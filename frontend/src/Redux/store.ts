import {configureStore} from "@reduxjs/toolkit";
import authSliceReducer from "./Slices/authSlice.reducer";
import travelPackageSliceReducer from "./Slices/travelPackageSlice.reducer";
import travelBookingSliceReducer from "./Slices/travelBookingSlice.reducer";


const store = configureStore({
    reducer :{
        auth : authSliceReducer,
        travelPackages : travelPackageSliceReducer,
        booking : travelBookingSliceReducer,
    },

    devTools:true
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
