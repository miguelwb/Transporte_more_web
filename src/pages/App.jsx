import { useState, useEffect } from 'react';

export default function AppPage() {
  const images = [
    '/assets/app1.png',
    '/assets/app2.png',
    '/assets/app3.png',
    '/assets/app4.png',
    '/assets/app5.png',
    '/assets/app6.png',
    '/assets/app7.png',
    '/assets/app8.png',
    '/assets/app9.png'
  ];
  const [current, setCurrent] = useState(0);

  const goNext = () => {
    setCurrent((c) => (c + 1) % images.length);
  };

  const goPrev = () => {
    setCurrent((c) => (c - 1 + images.length) % images.length);
  };
  // Auto-slide a cada 5 segundos
  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % images.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  // Remover scroll enquanto estiver na página App
  useEffect(() => {
    document.body.classList.add('no-scroll');
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);

  return (
    <div className="app-page">
      <div className="caixa-texto">
        <div className="app-texto">
          <h2>APP</h2>
          <p>
            <em>
              Nosso aplicativo foi desenvolvido para tornar a gestão do transporte escolar mais <strong>simples, eficiente e segura</strong>.
            </em>
            Implementando funcionalidades como visualização de rotas, notificações instantâneas sobre a chegada e saída dos veículos e possíveis imprevistos, além do acesso direto à carteirinha digital do aluno.
          </p>
          <p>
            Oferecemos uma experiência moderna tanto para responsáveis quanto para estudantes. Tudo isso em uma plataforma intuitiva e acessível, pensada justamente para facilitar o seu dia a dia.
          </p>
        </div>
      </div>
      <div>
        <div className="carrossel">
          <div className="slides">
            <img
              key={`curr-${current}`}
              className="fade"
              src={images[current]}
              alt="Tela do app"
            />
          </div>
          <div className="setas">
            <button className="btn prev" onClick={goPrev} aria-label="Imagem anterior">&lt;</button>
            <button className="btn next" onClick={goNext} aria-label="Próxima imagem">&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
}