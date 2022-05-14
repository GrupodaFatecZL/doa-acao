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


export function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="create-user" element={<CreateUser />} />


        <Route path="edit-user" element={<EditUser />} />
        <Route path="welcome" element={<Welcome />} />
        <Route path="donation-list" element={<DonationList />} />
        <Route path="follow-up" element={<FollowUp />} />
        <Route path="donation/:id" element={<DonationId />} />
        <Route path="new-donation" element={<NewDonation />} />

      </Routes>
    </BrowserRouter>
  );
}
