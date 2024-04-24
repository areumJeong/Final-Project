import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ItemList from './pages/ItemList';
import NotFound from './pages/NotFound';
import ItemInsert from './pages/ItemInsert';
import ItemDetail from './pages/ItemDetail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <ItemList /> },
      { path: 'itemlist', element: <ItemList /> },
      { path: 'iteminsert', element: <ItemInsert /> },
      { path: 'item/detail/:iid', element: <ItemDetail /> },
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
