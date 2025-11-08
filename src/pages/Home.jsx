import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    document.body.classList.add('no-scroll');
    return () => document.body.classList.remove('no-scroll');
  }, []);
  return (
    <div className="conteudo-principal">
      <div className="texto-principal">
        <h1>TRANSPORTE +</h1>
        <h3>BY MOBILIZE</h3>
        <p>
          O transporte escolar é um serviço que deve ser oferecido. É um investimento em segurança e mobilidade, o transporte escolar é, sem dúvidas, um importante passo para assegurar o acesso à educação. Não é possível falar em universalização da educação e em educação de qualidade sem que esse serviço seja garantido.
        </p>
      </div>
      <div className="img-conteudo-principal">
        <img src="/assets/logocerta.png" alt="Ônibus Transporte+" />
      </div>
      <a href="/contato" className="feedback-icon" aria-label="Suporte">
        <span className="support-icon" aria-hidden="true">
          <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 32a20 20 0 0 1 40 0" />
              <rect x="8" y="28" width="10" height="16" rx="4" />
              <rect x="46" y="28" width="10" height="16" rx="4" />
              <path d="M50 44c0 6-4 10-10 10H28" />
              <g transform="translate(32,32) scale(0.65)">
                <circle cx="0" cy="0" r="8" />
                <circle cx="0" cy="0" r="3" />
                <path d="M0 -14 L0 -10" />
                <path d="M0 10 L0 14" />
                <path d="M-14 0 L-10 0" />
                <path d="M10 0 L14 0" />
                <path d="M-10.6 -10.6 L-7.5 -7.5" />
                <path d="M10.6 10.6 L7.5 7.5" />
                <path d="M-10.6 10.6 L-7.5 7.5" />
                <path d="M10.6 -10.6 L7.5 -7.5" />
              </g>
            </g>
          </svg>
        </span>
      </a>
    </div>
  );
}