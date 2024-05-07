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
import AdminItemList from './pages/AdminItemList';
import ItemUpdate from './pages/ItemUpdate';
import CartPage from './pages/CartPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import UserInfo from './pages/UserInfo';
import UserUpdate from './pages/UserUpdate';
import Kakao from './api/kakao';
import WishItemList from './pages/WishItemList';
import { useAuthContext } from "./context/AuthContext";
import QnAList from './pages/QnAList';
import { SuccessPage } from './components/toss/Success';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <ItemList /> },
      { path: 'itemlist', element: <ItemList /> },
      { path: 'itemlist/:searchQuery', element: <ItemList /> },
      { path: 'item/detail/:iid', element: <ItemDetail /> },
      { path: 'cart', element: <CartPage/> },
      { path: 'signIn', element: <SignIn/> },
      { path: 'signUp', element: <SignUp/> },
      { path: 'userInfo', element: <UserInfo/> },
      { path: 'userUpdate', element: <UserUpdate/> },
      { path: 'callback/kakaotalk', element: <Kakao/> },
      { path: 'wish/list', element: <WishItemList/> },
      { path: 'admin/itemlist', element: <AdminRoutes /> },
      { path: 'admin/item/insert', element: <ItemInsertAdminRoutes /> },
      { path: 'admin/item/update/:iid', element: <ItemUpdateAdminRoutes/> },
      { path: 'admin/QnAList', element: <AdminQnAList/> },
      { path: 'success', element: <SuccessPage/> },
    ]
  }
]);

function AdminQnAList() {
  const { user } = useAuthContext();
  return user && user.isAdmin ? <QnAList /> : <ItemList />;
}

function AdminRoutes() {
  const { user } = useAuthContext(); 
  return user && user.isAdmin ? <AdminItemList /> : <ItemList />;
}

function ItemInsertAdminRoutes() {
  const { user } = useAuthContext(); 
  return user && user.isAdmin ? <ItemInsert /> : <ItemList />;
}

function ItemUpdateAdminRoutes() {
  const { user } = useAuthContext();
  return user && user.isAdmin ? <ItemUpdate /> : <ItemList />;
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

reportWebVitals();
