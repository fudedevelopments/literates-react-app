import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
    isAuth: boolean;

}

const initialState: AuthState = {
    isAuth: false,

};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        isAuthenticated: (state) => {
            state.isAuth = true;

        },
        isNotAuthenticated: (state) => {
            state.isAuth = false;

        },
     
    },
});

export const { isAuthenticated, isNotAuthenticated} =
    authSlice.actions;

export default authSlice.reducer;
