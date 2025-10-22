import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Fridge from "../pages/Fridge/Fridge";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import AddFood from "../pages/AddFood/AddFood";
import PrivateRoute from "./PrivateRoute";
import MyItems from "../pages/MyItems/MyItems";
import FoodDetails from "../pages/FoodDetails/FoodDetails";
import NotFound from "../pages/NotFound/NotFound";
import FAQSection from "../components/Faq/Faq";
import AboutUs from "../components/About/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "fridge", element: <Fridge /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: 'faq', element: <FAQSection /> },
      { path: 'about', element: <AboutUs></AboutUs> },
      {
        path: "add-food",
        element: (
          <PrivateRoute>
            <AddFood />
          </PrivateRoute>
        ),
      },
      {
        path: "my-items",
        element: (
          <PrivateRoute>
            <MyItems />
          </PrivateRoute>
        ),
      },
      {
        path: "food/:id",
        element: (
          <PrivateRoute>
            <FoodDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
