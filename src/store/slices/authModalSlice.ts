// modalSlice.js
import { createSlice } from "@reduxjs/toolkit";

export interface AuthModalState {
    isOpenLogin: boolean;
    isOpenOTP: boolean;
    isOpenPassword: boolean;
    isOpenVerifyEmail: boolean;
    isOpenForgotPassword: boolean;
    isOpenResetPassword: boolean;
    isOpenPhoneNumber: boolean;


}

// export interface RootState {
//     authModal: AuthModalState;
//     // Add other slices if you have them
// }

const initialState:AuthModalState = {
    isOpenLogin: false,
    isOpenOTP: false,
    isOpenPassword: false,
    isOpenVerifyEmail: false,
    isOpenForgotPassword: false,
    isOpenResetPassword: false,
    isOpenPhoneNumber: false


};

const authModalSlice = createSlice({
    name: "authModal",
    initialState,
    reducers: {
        openLogIn: (state, action) => {
            state.isOpenLogin = action.payload;
        },
        openOTP: (state, action) => {
            state.isOpenOTP = action.payload;
        },
        openPassword: (state, action) => {
            state.isOpenPassword = action.payload;
        },
        openVerifyEmail: (state, action) => {
            state.isOpenVerifyEmail = action.payload;
        },
        openForgotPassword: (state, action) => {
            state.isOpenForgotPassword = action.payload;
        },
        openResetPassword: (state, action) => {
            state.isOpenResetPassword = action.payload;
        },
        openPhoneNumberForm: (state, action) => {
            state.isOpenPhoneNumber = action.payload;
        },
        closeAllModals: (state) => {
            state.isOpenLogin = false;
            state.isOpenOTP = false;
            state.isOpenPassword = false;
            state.isOpenVerifyEmail = false;
            state.isOpenForgotPassword = false;
            state.isOpenResetPassword = false;
            state.isOpenPhoneNumber = false;
        }
    },
});

export const {
    openLogIn,
    openOTP,
    openPassword,
    openVerifyEmail,
    openForgotPassword,
    openResetPassword,
    openPhoneNumberForm,
    closeAllModals
} = authModalSlice.actions;

export default authModalSlice.reducer;
