import Home from "./pages/home";
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter as Router,
  Routes,
  Route,
  Form,
} from "react-router-dom";
import TodoList from "./pages/todolist";
import { useEffect } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "/todolist",
    element: <TodoList></TodoList>,
  },
]);
function App() {
  
  return <RouterProvider router={router} />;
}

export default App;

{
 
}
