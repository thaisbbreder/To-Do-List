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
  /* 
import { app } from './firebase-config';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const handleAction = (id) => {
    const authentication = getAuth();
    if (id === 2) {
      createUserWithEmailAndPassword(authentication, email, password)
        .then((response) => {
          console.log(response)
      })
   }
  return (
<Routes>
            <Route
              path='/login'
              element={
                <Form
                  title="Login"
                  setEmail={setEmail}
                  setPassword={setPassword}
                  handleAction={() => handleAction()}
                />}
            />
            <Route
              path='/register'
              element={
                <Form
                  title="Register"
                  setEmail={setEmail}
                  setPassword={setPassword}
                  handleAction={() => handleAction()}
                />}
            />
          </Routes>
  );
}
export default App; */
}
