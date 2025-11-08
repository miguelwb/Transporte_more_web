import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postJSON, postForm } from '../services/api.js';

export default function Register() {
  const [nome, setNome] = useState('');
  const [foto, setFoto] = useState(null);
  const [email, setEmail] = useState('');
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
      // 1) Primeiro cria o aluno via JSON (backend exige nome, email, ra, senha)
      await postJSON('/api/alunos/adicionar', { nome, email, ra, senha });

      // 2) Se tiver foto, faz upload separado para /api/alunos/:ra/foto
      if (foto) {
        const fd = new FormData();
        fd.append('foto', foto);
        try {
          await postForm(`/api/alunos/${encodeURIComponent(ra)}/foto`, fd);
        } catch (_) {
          // Não bloqueia o fluxo caso o upload da foto falhe
        }
      }
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Falha ao registrar.');
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
        <h1>Registro de Aluno</h1>
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome completo" required />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <div className="file-input">
          <span className="file-placeholder">{foto ? foto.name : 'Foto de perfil'}</span>
          <label htmlFor="foto-perfil" className="file-button">Escolher arquivo</label>
          <input id="foto-perfil" type="file" onChange={(e) => setFoto(e.target.files?.[0] || null)} accept="image/*" />
        </div>
        <input type="text" value={ra} onChange={(e) => setRa(e.target.value)} placeholder="RA Escolar" required />
        <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Senha" required />
        {error && <div style={{ color: '#d32f2f', fontSize: 14 }}>{error}</div>}
        <button type="submit" disabled={loading}>{loading ? 'Registrando...' : 'Registrar'}</button>
        <div className="login-link">Já tem uma conta? <a href="/login">Entrar</a></div>
      </form>
    </div>
  );
}