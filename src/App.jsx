import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';

export default function App() {
  const location = useLocation();
  return (
    <div className="app-container">
      <Navbar />
      <main>
        <div key={location.pathname} className="route-fade">
          <Outlet />
        </div>
      </main>
      <footer>
        <p>© {new Date().getFullYear()} – Desenvolvido por Mobilize</p>
      </footer>
    </div>
  );
}