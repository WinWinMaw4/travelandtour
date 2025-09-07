// router/index.tsx
import { useRoutes } from "react-router-dom";
import { PageRoutes } from "./PageRoutes";

export const Router = () => {
    return useRoutes(PageRoutes); // ✅ Pass PageRoutes directly
};
