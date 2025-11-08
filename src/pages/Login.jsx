import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postJSON } from '../services/api.js';

export default function Login() {
  const [ra, setRa] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('no-scroll');
    const imgs = document.querySelectorAll('.background-slider img');
    let current = 0;
    const id = setInterval(() => {
      imgs[current]?.classList.remove('active');
      current = (current + 1) % imgs.length;
      imgs[current]?.classList.add('active');
    }, 5000);
    return () => {
      document.body.classList.remove('no-scroll');
      clearInterval(id);
    };
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await postJSON('/api/alunos/login', { ra, senha });
      // Persist minimal session info if provided
      if (data && (data.token || data.aluno)) {
        sessionStorage.setItem('aluno_session', JSON.stringify(data));
      }
      navigate('/');
    } catch (err) {
      setError(err.message || 'Falha ao entrar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="background-slider">
        <img src="/assets/img_login.jpg" alt="Ônibus escolar amarelo" className="active" />
        <img src="/assets/img_login 2.jpg" alt="Motorista no ônibus escolar" />
        <img src="/assets/img_login 3.jpg" alt="Estudantes entrando no ônibus escolar" />
      </div>

      <form className="auth-form" onSubmit={onSubmit}>
        <h1>Login de Aluno</h1>
        <input type="text" value={ra} onChange={(e) => setRa(e.target.value)} placeholder="Digite seu RA (ex: 000098765432-1)" required />
        <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Digite sua senha" required />
        {error && <div style={{ color: '#d32f2f', fontSize: 14 }}>{error}</div>}
        <button type="submit" disabled={loading}>{loading ? 'Entrando...' : 'Entrar'}</button>
        <div className="login-link">Não tem uma conta? <a href="/register">Registrar</a></div>
      </form>
    </div>
  );
}