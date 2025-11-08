import { useEffect, useState } from 'react';

export default function Contato() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [sending, setSending] = useState(false);

  // Remover scroll enquanto estiver na página Contato
  useEffect(() => {
    document.body.classList.add('no-scroll');
    // Prefill a partir da sessão do usuário, se existir
    try {
      const raw = sessionStorage.getItem('aluno_session');
      if (raw) {
        const obj = JSON.parse(raw);
        const n = obj?.nome || obj?.aluno?.nome;
        const e = obj?.email || obj?.aluno?.email;
        if (n) setNome(n);
        if (e) setEmail(e);
      }
    } catch (_) {}
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    // Abrir Gmail com composição de e-mail já preenchida
    const subject = encodeURIComponent('Contato Transporte+');
    const body = encodeURIComponent(`Nome: ${nome}\nEmail: ${email}\n\nMensagem:\n${mensagem}`);
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=mobilizepv@gmail.com&su=${subject}&body=${body}&tf=1`;
    const win = window.open(gmailUrl, '_blank', 'noopener,noreferrer');
    // Não redirecionar a aba atual; se pop-up for bloqueado, apenas manter a página
    // e exibir mensagem no console (o usuário pode precisar permitir pop-ups).
    if (!win) {
      console.warn('Pop-up bloqueado: permita pop-ups para abrir o Gmail em nova aba.');
    }
    // Volta o estado do botão depois de um curto período
    setTimeout(() => setSending(false), 1200);
  };

  return (
    <section className="contato-page">
      <div className="contato-info">
        <h2>Fale Conosco</h2>
        <p>
          Tem alguma dúvida, sugestão ou deseja entrar em contato com a nossa equipe?
        </p>
        <p>
          Preencha o formulário ao lado e responderemos o mais breve possível.
        </p>
        <p>
          Se preferir, envie um e-mail para: <strong>mobilizepv@gmail.com</strong>
        </p>
      </div>

      <div className="contato-card">
        <h3>Formulário de Contato</h3>
        <form className="contato-form" onSubmit={onSubmit}>
          <input
            placeholder="Seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <textarea
            placeholder="Digite sua mensagem..."
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            rows={5}
            required
          />
          <button type="submit" className="btn-enviar" disabled={sending}>{sending ? 'Abrindo Gmail...' : 'Enviar'}</button>
        </form>
      </div>
    </section>
  );
}