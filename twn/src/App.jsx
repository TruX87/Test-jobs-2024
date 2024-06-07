import './App.css';
import { Navigate, Route, Routes } from "react-router-dom";
import Artikkel from './pages/Artikkel';
import Tabel from './pages/Tabel';
import NavigationBar from './components/NavigationBar';

function App() {
  return (
    <div className='page'>
      <NavigationBar />
      <Routes>
        <Route path="/" element={ <Navigate to="/" /> } />
        <Route path="/artikkel/" element={ <Artikkel /> } />
        <Route path="/artikkel/:id" element={ <Artikkel /> } />
        <Route path="/tabel" element={ <Tabel /> } />
      </Routes>
    </div>
  );
}

export default App;
