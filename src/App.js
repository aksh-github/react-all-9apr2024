import logo from "./logo.svg";
import "./App.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import ErrorPage from "./routes/ErrorPage";
import FormsExample from "./routes/FormsExample/FormsExample";
import FormikExample from "./routes/FormikExample/FormikExample";
import Header from "./common/Header";
import Footer from "./common/Footer";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <div> Hello to React World </div>,
      },

      {
        path: "forms",
        element: <FormsExample />,
      },
      {
        path: "formik",
        element: <FormikExample />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
