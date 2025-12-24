import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Page1 } from "./Components/Page1";
import { Page2 } from "./Components/Page2";
import { Login } from "./Components/Login1";
import { Register } from "./Components/Register";
import "./App.css";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Page1 />,
    },
    {
      path: "/page2",
      element: <Page2 />,
    },
     { 
      path: "/login", 
      element: <Login /> 
    },
   {
     path: "/register",
      element: <Register /> 
    }
 
  ]);

  return <RouterProvider router={router} />;
}

export default App;
