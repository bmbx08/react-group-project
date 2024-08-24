import { Route, Routes } from "react-router-dom";
import "./App.css";
import AppLayout from "./layout/AppLayout";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Homepage from "./pages/Homepage/Homepage";
import ItemsPage from "./pages/Items/ItemsPage";
import ItemDetailPage from "./pages/ItemDetail/ItemDetailPage";
import MyInfoPage from "./pages/Userpage/MyInfoPage"
import LoginPage from "./pages/Login/LoginPage";
import SignupPage from "./pages/Login/SignupPage";
import MyCartPage from "./pages/Userpage/MyCartPage"
import MyFavoritesPage from "./pages/Userpage/MyFavoritesPage"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import ItemDetailPrivateRoute from "./pages/Login/ItemDetailPrivateRoute";
import MyCartPrivateRoute from "./pages/Login/MyCartPrivateRoute";
import MyFavoritesPrivateRoute from "./pages/Login/MyFavoritesPrivateRoute";

function App() {
  let [authenticate, setAuthenticate] = useState(false) // true면 로그인이 됨 false면 로그인이 안됨
  useEffect(() => {
    console.log('aaaa', authenticate)
  }, [authenticate])
  return (
    <div>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Homepage />} />
          <Route path="items">
            <Route index element={<ItemsPage />} />
            <Route path=":id" element={<ItemDetailPrivateRoute authenticate={authenticate} />} />
          </Route>
          <Route path="login">  {/* 추후 Private Path로 바꿔야함 */}
            <Route index element={<LoginPage setAuthenticate={setAuthenticate} />} />
            <Route path="signup" element={<SignupPage />} />
          </Route>
          <Route path="userpage">
            <Route index element={<MyInfoPage />} /> {/* Closing tag properly */}
            <Route path="myCart" element={<MyCartPrivateRoute authenticate={authenticate} />} />
            <Route path="favorite" element={<MyFavoritesPrivateRoute authenticate={authenticate} />} />
          </Route>

        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
