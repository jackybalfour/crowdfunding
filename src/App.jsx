import { useState } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

// Pages
import HomePage from "./pages/HomePage";
import ProjectPage from "./pages/ProjectPage";
import LoginPage from "./pages/LoginPage";
import PledgeForm from "./components/PledgeForm/PledgeForm";
import Donate from "./components/Donate/Donate";
import Thankyou from "./components/ThankYou/thankyou";

// Components
import Nav from "./components/Nav/Nav";

// CSS
import "./App.css";

const HeaderLayout = () => {
  const [loggedIn, setLoggedIn] = useState(window.localStorage.getItem("token") != null)
  return (
    <div className="App">
      <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Outlet context={[loggedIn, setLoggedIn]} />
    </div>
  );
}

const router = createBrowserRouter([
  {
    element: <HeaderLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/project/:id", element: <ProjectPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/pledges", element: <PledgeForm /> },
      { path: "/donate", element: <Donate /> },
      { path: "/thankyou", element: <Thankyou /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;