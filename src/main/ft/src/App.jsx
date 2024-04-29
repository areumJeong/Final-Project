import React from "react";
import ItemInsert from "./pages/ItemInsert";
import { Outlet } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";


const queryClient = new QueryClient();

function App() {
  return (

    <>
      <QueryClientProvider client={queryClient}>
        <NavigationBar/>
        <Outlet />
        <Footer />
      </QueryClientProvider>
      
    </>

  );
}

export default App;
