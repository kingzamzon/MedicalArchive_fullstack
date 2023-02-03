import "./index.scss";
import { RouterProvider, Outlet, createBrowserRouter } from "react-router-dom";
import pages from "./pages";
import components from "./components";
import { WagmiConfig, createClient } from "wagmi";
import { filecoinHyperspace } from "wagmi/chains";
import { ConnectKitProvider, getDefaultClient } from "connectkit";


const
  chains = [filecoinHyperspace],

  client = createClient(
    getDefaultClient({
      appName: "FI-Cave",
      chains: chains
    }),
  ),

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
          path: "/register",
          element: <pages.RegisterPatient />
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