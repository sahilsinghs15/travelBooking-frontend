import {configureStore} from "@reduxjs/toolkit";
import authSliceReducer from "./Slices/authSlice.reducer.ts";
import travelPackageSliceReducer from "./Slices/travelPackageSlice.reducer.ts";


const store = configureStore({
    reducer :{
        auth : authSliceReducer,
        travelPackages : travelPackageSliceReducer,
    },

    devTools:true
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
