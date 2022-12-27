import Home from "./pages/home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TodoList from "./pages/todolist";

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
