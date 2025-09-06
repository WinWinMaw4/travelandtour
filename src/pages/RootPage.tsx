
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import PublicLayout from "../components/share/layouts/PublicLayout";

const RootPage = () => {
    return (
        <PublicLayout>
            <ToastContainer />
            <Outlet />
        </PublicLayout>
    );
};

export default RootPage;
