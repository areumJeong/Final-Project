import React from "react";
import ItemList from "./pages/ItemList";
import ItemInsert from "./pages/ItemInsert";
import { Outlet } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient();

function App() {
  return (

    <>
      <QueryClientProvider client={queryClient}>
        <Outlet />
        {/* <ItemInsert /> */}
      </QueryClientProvider>
      
    </>

  );
}

export default App;
