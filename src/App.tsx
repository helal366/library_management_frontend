import { Outlet } from 'react-router';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <section >
      <Navbar />
      <h1 className="text-center h1 ">Library management system </h1>
      <section className="padding my-10">
        <Outlet />
      </section>
      <Footer/>
    </section>
  );
}

export default App;
