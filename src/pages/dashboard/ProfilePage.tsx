/* eslint-disable @typescript-eslint/no-explicit-any */
import { useInvalidateEndpointMutation } from "@services/apiSlice";
import type { RootState } from "@store/index";
import { login, logout } from "@store/slices/authSlice";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userData, token } = useSelector((state: RootState) => state.auth);

    const [name, setName] = useState(userData?.name || "");
    const [email, setEmail] = useState(userData?.email || "");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [errors, setErrors] = useState<any>({});

    const [updateUser, { isLoading: isUpdating }] = useInvalidateEndpointMutation();
    const [changePassword, { isLoading: isChanging }] = useInvalidateEndpointMutation();

    const handleUpdateInfo = async () => {
        setErrors({});
        if (!name.trim()) {
            setErrors({ name: "Name is required" });
            return;
        }
        if (!email.trim()) {
            setErrors({ email: "Email is required" });
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrors({ email: "Please enter a valid email address" });
            return;
        }

        try {
            const res = await updateUser({
                url: `/users/${userData.id}`,
                method: "PATCH",
                body: { name, email },
                headers: { Authorization: `Bearer ${token}` },
            }).unwrap();

            if (res?.message === "User info updated successfully") {
                toast.success("Profile Updated Successfully", {
                    duration: 4000, // Toast will disappear after 4 seconds
                });
                dispatch(login(res?.user))

            } else if (res?.errors) {
                setErrors(res.errors);
            }
        } catch (err: any) {
            if (err?.data?.errors) {
                setErrors(err.data.errors);
            } else {
                setErrors({ general: err.data?.message || "Password change failed" });
            }
        }
    };

    const handleChangePassword = async () => {
        setErrors({});
        if (!oldPassword) {
            setErrors({ oldPassword: "Old password is required" });
            return;
        }
        if (!newPassword) {
            setErrors({ newPassword: "New password is required" });
            return;
        }

        try {
            const res = await changePassword({
                url: `/users/${userData.id}/change-password`,
                method: "PATCH",
                body: { oldPassword, newPassword },
                headers: { Authorization: `Bearer ${token}` },
            }).unwrap();

            if (res?.message === "Password changed successfully") {
                toast.success("Password Changed Successfully", {
                    duration: 4000, // Toast will disappear after 4 seconds
                });
                setOldPassword("");
                setNewPassword("");
            } else if (res?.errors) {
                setErrors(res.errors);
            }
        } catch (err: any) {
            if (err?.data?.errors) {
                setErrors(err.data.errors);
            } else {
                setErrors({ general: err.data?.message || "Password change failed" });
            }
        }
    };


    const logoutHandler = () => {
        dispatch(logout())
        toast.success('Logout successfully', {
            duration: 4000, // Toast will disappear after 4 seconds
        })
        navigate("/")

    }


    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-md space-y-8">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-gray-800">Profile</h2>
                <button type="button" onClick={logoutHandler} className="text-white bg-red-600 px-2 py-1 rounded text-lg cursor-pointer focus-within:bg-red-700">Log Out</button>

            </div>
            {/* Update Info */}
            <div className="space-y-4">
                <h3 className="text-xl font-medium text-gray-700">Update Info</h3>
                <div className="flex flex-col gap-2">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                        required
                        className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 ${errors.name ? "focus:ring-red-500" : "focus:ring-primary-500"
                            }`}
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                        className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 ${errors.email ? "focus:ring-red-500" : "focus:ring-primary-500"
                            }`}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                <button
                    onClick={handleUpdateInfo}
                    disabled={isUpdating}
                    className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 disabled:opacity-50 mt-2"
                >
                    {isUpdating ? "Updating..." : "Update Info"}
                </button>
            </div>

            <hr className="opacity-10" />

            {/* Change Password */}
            <div className="space-y-4">
                <h3 className="text-xl font-medium text-gray-700">Change Password</h3>
                <div className="flex flex-col gap-2">
                    <input
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        placeholder="Old Password"
                        className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 ${errors.oldPassword ? "focus:ring-red-500" : "focus:ring-primary-500"
                            }`}
                    />
                    {errors.oldPassword && <p className="text-red-500 text-sm">{errors.oldPassword}</p>}

                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="New Password"
                        className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 ${errors.newPassword ? "focus:ring-red-500" : "focus:ring-primary-500"
                            }`}
                    />
                    {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword}</p>}
                </div>

                <button
                    onClick={handleChangePassword}
                    disabled={isChanging}
                    className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 disabled:opacity-50 mt-2"
                >
                    {isChanging ? "Changing..." : "Change Password"}
                </button>
            </div>
        </div>
    );
};

export default Profile;
