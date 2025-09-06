import type { RouteObject } from "react-router-dom";
import RootPage from "../pages/RootPage";
import Home from "../pages/Home";
import About from "../pages/About";
import PlaceDetailPage from "@pages/PlaceDetailPage";
import BlogList from "@pages/BlogLists";
import BlogDetail from "@pages/BlogDetail";

export const PageRoutes: RouteObject[] = [
    {
        path: "/",
        element: <RootPage />,
        children: [
            { index: true, element: <Home /> },
            { path: "about", element: <About /> },
            { path: "/place/:id", element: <PlaceDetailPage /> },
            { path: "/blogs", element: <BlogList /> },
            { path: "/blogs/:slug", element: <BlogDetail /> },



        ],
    },
];
