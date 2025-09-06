/* eslint-disable @typescript-eslint/no-explicit-any */
import { Middleware } from "@reduxjs/toolkit";
import { isRejectedWithValue } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import isOnline from "is-online";
import { logout } from "@store/slices/authSlice";

let offlineErrorShown = false;

interface CustomErrorPayload {
  data?: { error?: string };
  status?: number;
  originalStatus?: number;
}

const errorHandlingMiddleware: Middleware = ({ dispatch }) => (next) => async (action) => {
	// const payload = action.payload as CustomErrorPayload;
// const invalidTokenError = payload?.data?.error;

	if (isRejectedWithValue(action)) {
		const errorMessage = action.error.message || "An error occurred";
const payload = action.payload as CustomErrorPayload;
const invalidTokenError = payload?.data?.error;
	
		try {
			const online = await isOnline();
			if (!online && !offlineErrorShown) {
				toast.error("No internet connection");
				offlineErrorShown = true;
			} else if (online) {
				offlineErrorShown = false;

				// Optional: check originalStatus or error message
				const status = (action.payload as any)?.originalStatus ?? (action.payload as any)?.status;

				if (status === 401 && (errorMessage === "Invalid token" || invalidTokenError==="Invalid token user")) {
					toast.error("Session expired. Logging out...");
					dispatch(logout());
				} else {
					// switch (status) {
					// 	case 404:
					// 		toast.error("Resource not found");
					// 		break;
					// 	case 500:
					// 		toast.error("Server error, please try again later");
					// 		break;
					// 	default:
					// 		toast.error(errorMessage);
					// 		break;
					// }
				}
			}
		} catch (error) {
			console.error("Error checking internet connection:", error);
			toast.error("An error occurred while checking internet connection");
		}
	}

	return next(action);
};

export default errorHandlingMiddleware;
