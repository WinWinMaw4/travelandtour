// app/(restaurant)/layout.tsx
import React from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { Toaster } from "react-hot-toast";
import DiscountPopUp from "@components/page/discountpopup/DiscountPopUp";


export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen">

            {/* Main Content */}
            <div className="flex flex-col flex-1">
                <DiscountPopUp />
                <Toaster position="bottom-right" /> {/* only once in the app */}

                <NavBar />
                {/* Page Content */}
                <main className="flex-1 bg-gray-50">{children}</main>
                <Footer />

            </div>

        </div>
    );
}
