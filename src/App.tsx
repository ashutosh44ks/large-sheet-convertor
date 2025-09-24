import { createBrowserRouter, RouterProvider } from "react-router";
import { ThemeProvider } from "./components/theme-provider";
import Layout from "./components/layout";
import ListingsPage from "./pages/ListingsPage";
import { BooksProvider } from "./hooks/BooksProvider";
import Error from "./pages/Error";
import DataHyderator from "./pages/DataHyderator";
import { ROUTES } from "./lib/constants";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: ROUTES.UPLOAD,
        element: <DataHyderator />,
      },
      {
        path: ROUTES.LISTINGS,
        element: <ListingsPage />,
      },
    ],
    errorElement: <Error />,
  },
]);
function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BooksProvider>
        <RouterProvider router={router} />
      </BooksProvider>
    </ThemeProvider>
  );
}

export default App;
