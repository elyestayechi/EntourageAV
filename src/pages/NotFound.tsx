import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';

export function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-[10vw] sm:text-[8rem] font-bold text-[#2A2A2A] mb-4">404</h1>
        <p className="text-2xl sm:text-3xl text-[#4A4A4A] mb-8">
          Page non trouvée
        </p>
        <p className="text-lg text-[#6A6A6A] mb-12">
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-3 px-8 py-4 bg-[#2A2A2A] text-white hover:bg-[#4A4A4A] transition-colors duration-300"
          style={{
            clipPath: 'polygon(0.5rem 0, calc(100% - 0.5rem) 0, 100% 0.5rem, 100% calc(100% - 0.5rem), calc(100% - 0.5rem) 100%, 0.5rem 100%, 0 calc(100% - 0.5rem), 0 0.5rem)',
          }}
        >
          <ArrowLeft className="w-5 h-5" />
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}
