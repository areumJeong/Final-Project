import React from "react";
import { Outlet } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import RecentItems from "./components/Item/RecentItems";
import Karlo2 from "./pages/Karlo2";
import Cloudinary from "./pages/Cloudinary";

export default function App() {
  return (
    <AuthContextProvider>
        <NavigationBar/>
        <RecentItems/>
        <Karlo2/>
        {/* <Cloudinary/> */}
        <Outlet />
        <Footer />
    </AuthContextProvider>
  );
}