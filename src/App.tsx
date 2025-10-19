import { PageRoutes } from "@routes/PageRoutes";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "@pages/errorPages/ErrorPage";

const App = () => {

  


  const errorPage401 = {
    path: "/unauthorized",
    element: <ErrorPage errorCode={401} />,
  };

  const errorPage404 = {
    path: "*",
    element: <ErrorPage errorCode={404} />,
  };

  const appRouter = createBrowserRouter([
    ...PageRoutes,
    errorPage401,
    errorPage404,
  ]);

  return (
    <RouterProvider router={appRouter} />
  )
}

export default App
