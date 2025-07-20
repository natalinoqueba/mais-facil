import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./screens/Home";
import Profile from "./screens/Profile";
import Navbar from "./components/Navbar";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import MainMenu from "./screens/MainMenu";
import TicketPurchase from "./screens/TicketPurchase";
import TicketDetails from "./screens/TicketDetails";
import Payment from "./screens/Payment";
import PaymentSuccess from "./screens/PaymentSuccess";
import TicketPDF from "./screens/TicketPDF"; // Assuming this is the route for PDF generation/viewing
import Footer from "./components/Footer";
import MyTickets from "./screens/MyTickets";
import CompanySelector from "./screens/CompanySelector";
import TicketPurchase2 from "./screens/TicketPurchase2";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mainmenu" element={<MainMenu />} />
        <Route path="/ticket" element={<TicketPurchase />} />
        <Route path="/ticket2" element={<TicketPurchase2 />} />
        <Route path="/ticket-details" element={<TicketDetails />} />
        <Route path="/mytickets" element={<MyTickets />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/ticket-pdf" element={<TicketPDF />} />
        <Route path="/companies" element={<CompanySelector />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
