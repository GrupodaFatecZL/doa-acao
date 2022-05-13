import { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CreateUser } from "./pages/CreateUser";
import { Home } from "./pages/Home";
import { Welcome } from "./pages/Welcome";
import { Login } from "./pages/Login";
import { EditUser } from "./pages/EditUser";
import { DonationList } from "./pages/DonationList";
import { FollowUp } from "./pages/FollowUp";
import { DonationId } from "./pages/DonationId";
import { NewDonation } from "./pages/NewDonation";
import { PrivateRoutes } from "./services/PrivateRoutes"

export function App() {
  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />

          <Route path="create-user" element={<CreateUser />} />

          <Route path="edit-user" element={<PrivateRoutes />}>
            <Route path="edit-user" element={<EditUser />} />
          </Route>
          
          <Route path="welcome" element={<PrivateRoutes />}>
            <Route path="welcome" element={<Welcome />} />
          </Route>
          
          <Route path="donation-list" element={<PrivateRoutes />}>
            <Route path="donation-list" element={<DonationList />} />
          </Route>
          
          <Route path="follow-up" element={<PrivateRoutes />}>
            <Route path="follow-up" element={<FollowUp />} />
          </Route>
         
          <Route path="follow-up" element={<PrivateRoutes />}> 
            <Route path="donation/:id" element={<DonationId />} />
          </Route>

          <Route path="follow-up" element={<PrivateRoutes />}> 
            <Route path="new-donation" element={<NewDonation />} />
          </Route>
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
}
