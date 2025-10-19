import type { RouteObject } from "react-router-dom";
import RootPage from "../pages/RootPage";
import Home from "../pages/Home";
import About from "../pages/About";
import PlaceDetailPage from "@pages/PlaceDetailPage";
import BlogList from "@pages/BlogLists";
import BlogDetail from "@pages/BlogDetail";
import BlogCreate from "@pages/BlogCreate";
import BlogEdit from "@pages/BlogEdit";
import Login from "@pages/auth/Login";
import BannerCreatePage from "@pages/dashboard/BannerCreate";
import Dashboard from "@pages/dashboard/Dashboard";
import BannerEditPage from "@pages/dashboard/BannerEdit";
import ProtectedRoute from "./ProtectRoutes";
import PackageCreate from "@pages/dashboard/PackageCreate";
import PackageEdit from "@pages/dashboard/PackageEdit";

export const PageRoutes: RouteObject[] = [
    {
        path: "/",
        element: <RootPage />,
        children: [
            { index: true, element: <Home /> },
            { path: "/login", element: <Login /> },
            { path: "about", element: <About /> },
            { path: "/place/:id", element: <PlaceDetailPage /> },
            { path: "/blogs", element: <BlogList /> },
            { path: "/blogs/:slug", element: <BlogDetail /> },
            // ✅ Protected routes start here
            {
                element: <ProtectedRoute />,
                children: [
                    { path: "/blogs/create", element: <BlogCreate /> },
                    { path: "/blogs/edit/:slug", element: <BlogEdit /> },
                    { path: "/dashboard", element: <Dashboard /> },
                    { path: "/dashboard/banner/create", element: <BannerCreatePage /> },
                    { path: "/dashboard/banner/edit/:id", element: <BannerEditPage /> },
                    { path: "dashboard/packages/create", element: <PackageCreate /> },
                    { path: "dashboard/packages/edit/:id", element: <PackageEdit /> },

                ],
            },
        ],
    },
];
