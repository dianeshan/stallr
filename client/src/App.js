import { Route, Routes } from "react-router-dom";

import Home from './pages/Home';
import Login from './components/Login';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/explore" element={<Explore />} />
        <Route path="/profile" element={<Profile />} /> */}
      </Routes>
    </div>
  );
}

export default App;
