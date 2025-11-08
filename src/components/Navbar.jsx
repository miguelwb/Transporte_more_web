import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [nome, setNome] = useState('Visitante');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const showWelcome = location.pathname === '/';

  useEffect(() => {
    const readSession = () => {
      try {
        const raw = sessionStorage.getItem('aluno_session');
        if (!raw) { setNome('Visitante'); setIsLoggedIn(false); return; }
        const obj = JSON.parse(raw);
        const n = obj?.nome || obj?.aluno?.nome || 'Visitante';
        setNome(n);
        setIsLoggedIn(true);
      } catch {
        setNome('Visitante');
        setIsLoggedIn(false);
      }
    };
    readSession();
  }, []);

  const onLogout = (e) => {
    // Mantém o header igual, apenas limpa a sessão e redireciona
    try { sessionStorage.removeItem('aluno_session'); } catch {}
    setIsLoggedIn(false);
    setNome('Visitante');
    navigate('/');
  };
  return (
    <header className="topo">
      <div className="navbar-inner">
        <div className="logo">
          <img src="/assets/logo.png" alt="Transporte +" className="brand-logo" />
        </div>
        {showWelcome && (
          <div className="bem-vindo">
            <p>Bem-vindo, <strong>{nome}</strong></p>
          </div>
        )}
        <div className="nav-right">
          <nav>
            <ul>
              <li><NavLink to="/" end>Início</NavLink></li>
              <li><NavLink to="/sobre">Sobre nós</NavLink></li>
              <li><NavLink to="/app">App</NavLink></li>
              <li><NavLink to="/contato">Contato</NavLink></li>
            </ul>
          </nav>
          <div className="auth-buttons">
            {isLoggedIn ? (
              <a className="pill" onClick={onLogout}>Sair</a>
            ) : (
              <>
                <NavLink to="/login" className="pill">Entrar</NavLink>
                <NavLink to="/register" className="pill">Registrar</NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}