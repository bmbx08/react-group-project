import { Routes, Route } from 'react-router-dom';
import './App.css';
import Footer from './component/Footer';
import Navbar from './component/Navbar';
import Mypage from './page/Mypage';


function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/mypage' element={<Mypage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
