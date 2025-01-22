import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Login from "./componets/admins/login";
import Otpverify from "./componets/admins/otpverify";
import UsersList from "./componets/admins/userslist";
import Controls from "./componets/admins/controls";
import Coinfrom from "./componets/admins/conisfrom";
import Editfrom from "./componets/admins/editcoins";
// import Poplayout from "../../popup";
import Layout from "../../layout";

// eslint-disable-next-line no-unused-vars

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* <Route path="/" element={<Poplayout />}> */}
        <Route path="/login" element={<Login />} />
        <Route path="/otpverify" element={<Otpverify />} />
      {/* </Route> */}

      <Route path="/" element={<Layout />}>
        <Route path="/userslist" element={<UsersList />} />
        <Route path="/controls" element={<Controls />} />
        <Route path="/coinfrom" element={<Coinfrom />} />
        <Route path="/editfrom" element={<Editfrom />} />
      </Route>
    </>
  )
);

const App = () => {
  return (
    // <AppContextProvider>
    <div className="container-scroller">
      <RouterProvider router={router} />
    </div>
    // </AppContextProvider>
  );
};

export default App;
