import React, { useState } from 'react';
import { Activity } from '../types';

interface LinkDetectorProps {
  activity: Activity;
  onComplete: (score: number) => void;
}

const links = [
    { url: 'https://www.google.com', safe: true },
    { url: 'https://www.microsoft.com', safe: true },
    { url: 'http://www.bancoseguro-login.net', safe: false },
    { url: 'https://www.pay-pal.com', safe: false },
    { url: 'https://youtube.com', safe: true },
    { url: 'https://www.amaz0n.com/deals', safe: false },
].sort(() => Math.random() - 0.5); // Randomize order

const LinkDetector: React.FC<LinkDetectorProps> = ({ activity, onComplete }) => {
    const [answers, setAnswers] = useState<(boolean | null)[]>(new Array(links.length).fill(null));
    const [submitted, setSubmitted] = useState(false);

    const handleAnswer = (index: number, isSafe: boolean) => {
        const newAnswers = [...answers];
        newAnswers[index] = isSafe;
        setAnswers(newAnswers);
    };

    const handleSubmit = () => {
        setSubmitted(true);
    };

    const isComplete = answers.every(a => a !== null);
    const score = links.reduce((acc, link, i) => acc + (link.safe === answers[i] ? 1 : 0), 0);

    return (
        <div className="animate-fade-in">
            <h3 className="text-2xl font-bold font-orbitron mb-4 text-orange-500">{activity.title}</h3>
            <p className="text-slate-300 mb-6">Alguns links são seguros, outros são armadilhas. Classifica cada link como "Seguro" ou "Perigoso".</p>

            <div className="space-y-4">
                {links.map((link, index) => (
                    <div key={index} className="bg-slate-700 p-4 rounded-lg flex flex-col sm:flex-row justify-between items-center">
                        <p className="font-mono text-cyan-300 mb-2 sm:mb-0">{link.url}</p>
                        {submitted ? (
                            <div className="flex items-center">
                                {link.safe === answers[index] ? 
                                    <span className="text-green-400 font-bold"><i className="fas fa-check-circle mr-2"></i>Correto</span> :
                                    <span className="text-red-400 font-bold"><i className="fas fa-times-circle mr-2"></i>Incorreto</span>
                                }
                            </div>
                        ) : (
                            <div className="flex space-x-2">
                                <button onClick={() => handleAnswer(index, true)} className={`px-3 py-1 rounded-full text-sm font-bold transition-colors ${answers[index] === true ? 'bg-green-500 text-white' : 'bg-slate-600 hover:bg-green-600'}`}>
                                    <i className="fas fa-shield-alt mr-1"></i> Seguro
                                </button>
                                <button onClick={() => handleAnswer(index, false)} className={`px-3 py-1 rounded-full text-sm font-bold transition-colors ${answers[index] === false ? 'bg-red-500 text-white' : 'bg-slate-600 hover:bg-red-600'}`}>
                                    <i className="fas fa-exclamation-triangle mr-1"></i> Perigoso
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {submitted && (
                 <div className="mt-6 p-4 rounded-lg bg-slate-900 text-white text-center">
                    <p className="text-xl font-bold">Acertaste em {score} de {links.length}!</p>
                    <p className="text-slate-400 mt-2">Repara como os links perigosos usam números em vez de letras (amaz0n) ou hífens para parecerem legítimos (pay-pal).</p>
                </div>
            )}

            <div className="text-right mt-8">
                {submitted ? (
                    <button
                        onClick={() => onComplete(score)}
                        className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-6 rounded-lg transition-colors shadow-lg"
                    >
                        Continuar <i className="fas fa-arrow-right ml-2"></i>
                    </button>
                ) : (
                    <button
                        onClick={handleSubmit}
                        disabled={!isComplete}
                        className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-6 rounded-lg transition-colors shadow-lg disabled:bg-slate-600 disabled:cursor-not-allowed"
                    >
                        Verificar Respostas
                    </button>
                )}
            </div>
        </div>
    );
};

export default LinkDetector;