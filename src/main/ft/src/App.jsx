import React from "react";
import ItemInsert from "./pages/ItemInsert";
import { Outlet } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import NavigationBar from "./components/NavigationBar";


const queryClient = new QueryClient();

function App() {
  return (

    <>
      <QueryClientProvider client={queryClient}>
        <NavigationBar/>
        <Outlet />
      </QueryClientProvider>
      
    </>

  );
}

export default App;
