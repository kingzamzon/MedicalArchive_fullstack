import "./index.scss";
import { RouterProvider, Outlet, createBrowserRouter } from "react-router-dom";
import pages from "./pages";
import components from "./components";

const
  SignedOutAppLayout = () => {
    return (
      <>
        <components.Scroll />
        <components.NavbarSignedOut />
        <Outlet />
      </>
    );
  },

  SignedInAppLayout = () => {
    return (
      <>
        <components.Scroll />
        <components.NavbarSignedIn />
        <Outlet />
      </>
    );
  },

  ErrorPage = () => {
    return (
      <>
        <pages.NotFound />
      </>
    );
  },

  router = createBrowserRouter([
    {
      path: "/",
      element: <SignedOutAppLayout />,
      children: [
        {
          path: "/",
          element: < pages.Landing />
        }
      ]
    },
    {
      path: "/",
      element: <SignedInAppLayout />,
      children: [
        {
          path: "/files",
          element: <pages.Files />
        },
        {
          path: "/send",
          element: <pages.Send />
        },
        {
          path: "/upload",
          element: <pages.Upload />
        }
      ]
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ]);


function App() {
  return (
    <section className="container">
      <RouterProvider router={router} />
    </section>
  );
}

export default App;;