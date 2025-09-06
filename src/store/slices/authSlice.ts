/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
	isAuthenticated: boolean;
	userData: any;
	token: string | null;
}

const initialState: AuthState = {
	isAuthenticated: false,
	userData:  null,
	token: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login: (state, action) => {
			state.isAuthenticated = true;
			state.userData = action.payload;
		},
		logout: () => initialState,
		setToken: (state, action) => {
			state.token = action.payload;
		},
			setAuthenticated:(state) => {
			state.isAuthenticated = true;
			state.token = "12dfgh";
			state.userData = {
				id: "12345",
				name: "John Doe",
				email: "johndoe@example.com",
				role_id: 1, // other examples: "sales", "marketing", "finance"
				avatarUrl: "https://example.com/avatar.jpg",
				permissions: [
					"view_leads",
					"edit_properties",
					"view_confidential",
					"manage_campaigns",
				],
				createdAt: "2024-08-01T10:00:00Z",
				updatedAt: "2025-01-15T14:22:00Z",
			}
		}
	},
});

export const {
	login,
	logout,
	setToken,
	setAuthenticated
} = authSlice.actions;
export default authSlice.reducer;
