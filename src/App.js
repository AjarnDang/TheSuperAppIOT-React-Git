import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login'
import Index from './pages/Index';
import Register from './pages/Register';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Index" element={<Index />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </BrowserRouter>
    </div>  
  );
}

export default App;
