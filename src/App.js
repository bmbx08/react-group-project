import {Route, Routes} from "react-router-dom";
import "./App.css";
import AppLayout from "./layout/AppLayout";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Homepage from "./pages/Homepage/Homepage";
import ItemsPage from "./pages/Items/ItemsPage";
import ItemDetailPage from "./pages/ItemDetail/ItemDetailPage";
import LoginPage from "./pages/Login/LoginPage";
import SignupPage from "./pages/Login/SignupPage";
import MyCartPage from "./pages/Userpage/MyCartPage"
import MyFavoritesPage from "./pages/Userpage/MyFavoritesPage"
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Homepage />} />
          <Route path="items">
            <Route index element={<ItemsPage />} />
            <Route path=":id" element={<ItemDetailPage />} />
          </Route>
          <Route path="login">  {/* 추후 Private Path로 바꿔야함 */}
            <Route index element={<LoginPage/>}/>
            <Route path="signup" element={<SignupPage/>}/>
          </Route>
          <Route path="userpage">
            <Route path="MyCart" element={<MyCartPage/>} />
            <Route path="favorite" element={<MyFavoritesPage/>} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
