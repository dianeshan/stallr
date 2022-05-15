import { Route, Routes } from "react-router-dom";

import Home from './pages/Home';
//import Login from './components/Login';
import LoginPage from './pages/LoginPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/loginpage" element={<LoginPage />} />
        {/* <Route path="/explore" element={<Explore />} />
        <Route path="/profile" element={<Profile />} />  */}
      </Routes>
    </div>
  );
}

export default App;
