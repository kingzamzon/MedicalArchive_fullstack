import "./index.scss";
import { RouterProvider, Outlet, createBrowserRouter } from "react-router-dom";
import pages from "./pages";
import components from "./components";
import { WagmiConfig, createClient } from "wagmi";
import { ConnectKitProvider, ConnectKitButton, getDefaultClient } from "connectkit";

const client = createClient(
  getDefaultClient({
    appName: "FI-Cave",
  
  }),
);

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
    <WagmiConfig client={client}>
      <ConnectKitProvider >
        <section className="container">
          <RouterProvider router={router} />
        </section>
      </ConnectKitProvider>
    </WagmiConfig>
  );
}

export default App;;