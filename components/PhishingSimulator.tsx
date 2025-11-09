import React, { useState } from 'react';
import { Activity } from '../types';

interface PhishingSimulatorProps {
  activity: Activity;
  onComplete: (score: number) => void;
}

const emailItems = [
    { id: 'remetente', text: 'Banco Seguro <banco.seguro@servico-email.xyz>', isFlag: true, hint: 'O email do remetente parece suspeito e não é um domínio oficial do banco.' },
    { id: 'assunto', text: 'Alerta de Segurança Urgente!', isFlag: true, hint: 'Títulos com sentido de urgência são uma tática comum para te fazer agir sem pensar.' },
    { id: 'data', text: 'Enviado: Hoje', isFlag: false },
    { id: 'saudacao', text: 'Caro/a Cliente', isFlag: true, hint: 'Saudações genéricas são um sinal de alerta. O teu banco sabe o teu nome.' },
    { id: 'link', text: 'clique aqui', isFlag: true, hint: 'Passar o rato por cima do link revela um URL suspeito que não corresponde ao site oficial do banco.' },
    { id: 'despedida', text: 'A Equipa de Segurança', isFlag: false },
];

const PhishingSimulator: React.FC<PhishingSimulatorProps> = ({ activity, onComplete }) => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [verified, setVerified] = useState(false);

    const handleItemClick = (itemId: string) => {
        if (verified) return;

        setSelectedIds(prev =>
            prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
        );
    };

    const handleSubmit = () => {
        setVerified(true);
    };

    const getScore = () => {
        const correctFlags = emailItems.filter(item => item.isFlag);
        const correctlyIdentifiedCount = selectedIds.filter(id => {
            const item = emailItems.find(i => i.id === id);
            return item && item.isFlag;
        }).length;
        
        const pointsPerFlag = activity.maxPoints / correctFlags.length;
        return Math.round(correctlyIdentifiedCount * pointsPerFlag);
    };

    const getSelectionClass = (item: typeof emailItems[0]) => {
        if (verified) {
            const isSelected = selectedIds.includes(item.id);
            if (item.isFlag && isSelected) return 'bg-green-300 border-green-500'; // Correctly identified flag
            if (item.isFlag && !isSelected) return 'bg-red-200 border-red-400'; // Missed flag
            if (!item.isFlag && isSelected) return 'bg-yellow-300 border-yellow-500'; // Incorrectly identified as flag
            return ''; // Safe and not selected
        }
        return selectedIds.includes(item.id) ? 'bg-cyan-200' : 'hover:bg-cyan-100';
    };

    return (
        <div className="animate-fade-in">
            <h3 className="text-2xl font-bold font-orbitron mb-4 text-orange-500">{activity.title}</h3>
            <p className="text-slate-300 mb-6">Clica nas partes do texto que te parecem suspeitas. Depois, clica em "Verificar" para ver quantas descobriste!</p>

            <div className="bg-white text-slate-800 p-6 rounded-lg shadow-lg space-y-4">
                <p><strong>De:</strong> <span onClick={() => handleItemClick('remetente')} className={`cursor-pointer p-1 rounded transition-colors border ${getSelectionClass(emailItems[0])}`}>{emailItems[0].text}</span></p>
                <p><strong>Assunto:</strong> <span onClick={() => handleItemClick('assunto')} className={`cursor-pointer p-1 rounded transition-colors border ${getSelectionClass(emailItems[1])}`}>{emailItems[1].text}</span></p>
                <p className="text-sm text-slate-500"><span onClick={() => handleItemClick('data')} className={`cursor-pointer p-1 rounded transition-colors border ${getSelectionClass(emailItems[2])}`}>{emailItems[2].text}</span></p>
                <hr/>
                <p><span onClick={() => handleItemClick('saudacao')} className={`cursor-pointer p-1 rounded transition-colors border ${getSelectionClass(emailItems[3])}`}>{emailItems[3].text}</span>,</p>
                <p>Detetámos atividade suspeita na sua conta. Por favor, <span onClick={() => handleItemClick('link')} className={`text-blue-600 underline cursor-pointer p-1 rounded transition-colors border ${getSelectionClass(emailItems[4])}`}>{emailItems[4].text}</span> para confirmar os seus dados.</p>
                <p>Obrigado,<br/><span onClick={() => handleItemClick('despedida')} className={`cursor-pointer p-1 rounded transition-colors border ${getSelectionClass(emailItems[5])}`}>{emailItems[5].text}</span></p>
            </div>
            
            {verified && (
                 <div className="mt-6 p-4 rounded-lg bg-slate-900 text-white">
                    <h4 className="font-bold text-lg mb-2 text-cyan-400">Análise:</h4>
                    <ul className="list-disc list-inside space-y-2 text-sm">
                        <li><span className="p-1 rounded bg-green-300 text-slate-900">Verde:</span> Perigo que identificaste corretamente.</li>
                        <li><span className="p-1 rounded bg-red-200 text-slate-900">Vermelho:</span> Perigo que não identificaste.</li>
                        <li><span className="p-1 rounded bg-yellow-300 text-slate-900">Amarelo:</span> Parte segura que marcaste como perigo.</li>
                    </ul>
                </div>
            )}

            <div className="text-right mt-8">
                {verified ? (
                    <button
                        onClick={() => onComplete(getScore())}
                        className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-6 rounded-lg transition-colors shadow-lg"
                    >
                        Continuar <i className="fas fa-arrow-right ml-2"></i>
                    </button>
                ) : (
                    <button
                        onClick={handleSubmit}
                        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-lg transition-colors shadow-lg"
                    >
                        Verificar
                    </button>
                )}
            </div>
        </div>
    );
};

export default PhishingSimulator;