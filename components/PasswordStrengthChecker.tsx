import React, { useState, useMemo } from 'react';
import { Activity } from '../types';

interface PasswordStrengthCheckerProps {
  activity: Activity;
  onComplete: () => void;
}

const PasswordStrengthChecker: React.FC<PasswordStrengthCheckerProps> = ({ activity, onComplete }) => {
  const [password, setPassword] = useState('');

  const strength = useMemo(() => {
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  }, [password]);

  const strengthText = ['Muito Fraca', 'Fraca', 'Fraca', 'Média', 'Boa', 'Forte', 'Muito Forte'][strength];
  const strengthColor = ['bg-red-500', 'bg-red-500', 'bg-red-500', 'bg-yellow-500', 'bg-green-500', 'bg-green-500', 'bg-green-600'][strength];
  
  const checks = [
      { label: "Pelo menos 8 caracteres", valid: password.length >= 8 },
      { label: "Pelo menos 12 caracteres", valid: password.length >= 12 },
      { label: "Letras maiúsculas e minúsculas", valid: /[A-Z]/.test(password) && /[a-z]/.test(password) },
      { label: "Pelo menos um número", valid: /[0-9]/.test(password) },
      { label: "Pelo menos um símbolo", valid: /[^A-Za-z0-9]/.test(password) },
  ];

  return (
    <div className="animate-fade-in">
      <h3 className="text-2xl font-bold font-orbitron mb-4 text-orange-500">{activity.title}</h3>
      <p className="text-slate-300 mb-6">Escreve uma palavra-passe para testar a sua força. O objetivo é torná-la "Forte" ou "Muito Forte".</p>
      
      <input 
        type="text" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-3 bg-slate-700 border-2 border-slate-600 rounded-lg text-white text-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
        placeholder="Escreve aqui a tua palavra-passe"
      />

      <div className="mt-4">
        <div className="w-full bg-slate-600 rounded-full h-6 overflow-hidden">
            <div 
                className={`h-full rounded-full transition-all duration-300 flex items-center justify-center text-sm font-bold text-white ${strengthColor}`}
                style={{ width: `${(strength / 6) * 100}%` }}
            >
                {strength > 0 && strengthText}
            </div>
        </div>
      </div>
      
      <ul className="mt-6 space-y-2">
          {checks.map(check => (
              <li key={check.label} className="flex items-center text-slate-300">
                  <i className={`fas ${check.valid ? 'fa-check-circle text-green-400' : 'fa-times-circle text-red-400'} mr-3`}></i>
                  {check.label}
              </li>
          ))}
      </ul>

      <div className="text-right mt-8">
        <button
          onClick={onComplete}
          disabled={strength < 5}
          className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-6 rounded-lg transition-colors shadow-lg disabled:bg-slate-600 disabled:cursor-not-allowed"
        >
          Continuar <i className="fas fa-arrow-right ml-2"></i>
        </button>
      </div>
    </div>
  );
};

export default PasswordStrengthChecker;
