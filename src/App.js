import logo from "./logo.svg";
import Home from "./pages/home";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
