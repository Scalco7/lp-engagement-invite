import React, { useState } from 'react';
import { Copy, Check, Gift, Heart, ExternalLink } from 'lucide-react';
import Reveal from '../atoms/Reveal';

export const GiftList: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("juliaefelipe2026@casamento.com.br");
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <Reveal>
        <p className="font-sans text-base text-center max-w-xl mx-auto mb-12 text-brand-dark/80 leading-relaxed">
          Sua presença é o maior presente para nós. Mas, se desejar nos presentear de outra forma, preparamos algumas opções práticas para nos ajudar a iniciar essa nova jornada juntos.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {/* Card Pix */}
        <Reveal delay={1} className="h-full">
          <div className="bg-white border border-brand-blush/30 rounded-2xl p-6 sm:p-8 flex flex-col justify-between h-full shadow-sm hover:shadow-md transition-shadow duration-300">
            <div>
              <div className="w-12 h-12 rounded-full bg-brand-blush/20 flex items-center justify-center text-brand-accent mb-6">
                <Heart className="w-6 h-6 fill-current" />
              </div>
              <h3 className="font-serif text-2xl text-brand-dark mb-3">Presente em Pix</h3>
              <p className="font-sans text-sm text-brand-dark/75 mb-6 leading-relaxed">
                Se preferir contribuir com a nossa lua de mel ou com a montagem do nosso novo lar de forma direta, você pode realizar uma transferência via Pix.
              </p>
            </div>

            <div className="mt-auto">
              <div className="bg-brand-bg/50 border border-neutral-100 rounded-xl p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="overflow-hidden">
                    <span className="text-xs font-semibold text-brand-accent uppercase block tracking-wider">Chave Pix (E-mail)</span>
                    <span className="text-sm font-medium text-brand-dark truncate block mt-0.5">
                      juliaefelipe2026@casamento.com.br
                    </span>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="flex-shrink-0 p-2.5 rounded-lg bg-white border border-brand-blush/30 text-brand-accent hover:bg-brand-blush/10 transition-colors duration-300 shadow-sm"
                    title="Copiar Chave Pix"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                {copied && (
                  <span className="text-xs text-emerald-600 font-medium flex items-center gap-1 animate-fade-in">
                    <Check className="w-3.5 h-3.5" /> Chave Pix copiada com sucesso! ❤️
                  </span>
                )}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Card Lista de Presentes */}
        <Reveal delay={2} className="h-full">
          <div className="bg-white border border-brand-blush/30 rounded-2xl p-6 sm:p-8 flex flex-col justify-between h-full shadow-sm hover:shadow-md transition-shadow duration-300">
            <div>
              <div className="w-12 h-12 rounded-full bg-brand-sage/40 flex items-center justify-center text-brand-dark/70 mb-6">
                <Gift className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl text-brand-dark mb-3">Lista de Casamento</h3>
              <p className="font-sans text-sm text-brand-dark/75 mb-6 leading-relaxed">
                Selecionamos produtos incríveis em nossas lojas favoritas. Você pode escolher um item diretamente nas plataformas online clicando nos links abaixo.
              </p>
            </div>

            <div className="mt-auto space-y-3">
              <a
                href="https://www.casar.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between px-5 py-4 border border-brand-blush/40 rounded-xl hover:bg-brand-blush/10 transition-all duration-300 group font-sans text-sm font-medium text-brand-dark"
              >
                <span>Lista no Casar.com</span>
                <ExternalLink className="w-4 h-4 text-brand-accent transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="https://www.qualaradade.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between px-5 py-4 border border-brand-blush/40 rounded-xl hover:bg-brand-blush/10 transition-all duration-300 group font-sans text-sm font-medium text-brand-dark"
              >
                <span>Lista na Camicado</span>
                <ExternalLink className="w-4 h-4 text-brand-accent transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default GiftList;
