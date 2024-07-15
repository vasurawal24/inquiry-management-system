import { configureStore } from "@reduxjs/toolkit";
import CounterSlice from "./Counterslice/CounterSlice";

export default configureStore({
    reducer: {
        counter: CounterSlice
    },
})