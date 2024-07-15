import { createSlice } from "@reduxjs/toolkit"

export const CounterSlice = createSlice({
    name: "counter",
    initialState: {
        value: false,
    },
    reducers: {
        check: (state) => {
            state.value = localStorage.getItem('token') == undefined ? false : true
        }
    },

})
export const { check } = CounterSlice.actions
export default CounterSlice.reducer