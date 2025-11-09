import React, { useState, useRef, useMemo } from 'react';
import { PlayerState } from '../types';
import { missions } from '../data/content';
import * as htmlToImage from 'html-to-image';

interface CertificateViewProps {
    playerState: PlayerState;
    onBackToDashboard: () => void;
}

const CertificateView: React.FC<CertificateViewProps> = ({ playerState, onBackToDashboard }) => {
    const [studentName, setStudentName] = useState('');
    const certificateRef = useRef<HTMLDivElement>(null);

    const { totalScore, maxScore, percentage } = useMemo(() => {
        // FIX: The value from `playerState.missionScores` was being inferred as `unknown`,
        // causing a type error when trying to add it to a number. Casting the score
        // to a Number using `Number(score)` resolves this issue. This also fixes a
        // subsequent error in the percentage calculation which depended on `totalScore` being a number.
        const totalScore = Object.values(playerState.missionScores).reduce((sum, score) => sum + Number(score), 0);
        const maxScore = missions.flatMap(m => m.activities).reduce((sum, activity) => sum + activity.maxPoints, 0);
        const percentage = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;
        return { totalScore, maxScore, percentage };
    }, [playerState.missionScores]);

    const handleDownload = () => {
        if (certificateRef.current) {
            htmlToImage.toJpeg(certificateRef.current, { quality: 0.95, backgroundColor: '#1e293b' })
                .then(function (dataUrl) {
                    const link = document.createElement('a');
                    link.download = `Certificado_CyberQuest_${studentName.replace(/ /g, '_') || 'aluno'}.jpg`;
                    link.href = dataUrl;
                    link.click();
                });
        }
    };

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="text-center">
                 <h2 className="text-3xl font-bold font-orbitron mb-2 text-cyan-300">O Teu Certificado</h2>
                 <p className="text-slate-400">Preenche o teu nome e descarrega a tua conquista!</p>
            </div>
           
            {/* Certificate Area */}
            <div ref={certificateRef} className="bg-slate-800 p-8 rounded-lg shadow-lg border-4 border-cyan-400 relative overflow-hidden">
                <i className="fas fa-crown absolute -top-8 -left-8 text-9xl text-slate-700/50 transform -rotate-12"></i>
                <i className="fas fa-shield-alt absolute -bottom-10 -right-8 text-9xl text-slate-700/50 transform rotate-12"></i>
                
                <div className="text-center z-10 relative">
                    <h3 className="text-yellow-400 font-orbitron text-2xl tracking-widest">CERTIFICADO DE CONCLUSÃO</h3>
                    <p className="text-slate-300 mt-4">Este certificado é concedido a</p>
                    <h1 className="text-white font-orbitron text-4xl my-4 border-b-2 border-slate-600 pb-2 capitalize">
                        {studentName || 'Nome do Aluno'}
                    </h1>
                    <p className="text-slate-300">por ter concluído com sucesso a</p>
                    <h2 className="text-cyan-300 font-orbitron text-3xl my-3">CyberQuest: Academia Digital</h2>
                    <p className="text-slate-300">com uma pontuação final de</p>
                    <p className="text-orange-500 font-bold text-5xl my-4">{percentage}%</p>
                    <div className="text-xs text-slate-400 mt-6">
                        <p>Disciplina de TIC - 6º Ano</p>
                        <p>Professor José Faria</p>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="bg-slate-800 p-6 rounded-lg shadow-lg flex flex-col sm:flex-row gap-4 items-center">
                 <div className="flex-1 w-full">
                    <label htmlFor="studentName" className="block text-sm font-bold text-slate-300 mb-2">O teu nome completo:</label>
                    <input
                        id="studentName"
                        type="text"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        placeholder="Insere o teu nome aqui"
                        className="w-full p-3 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                </div>
                <div className="flex gap-4 w-full sm:w-auto">
                    <button
                        onClick={handleDownload}
                        disabled={!studentName}
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-lg disabled:bg-slate-600 disabled:cursor-not-allowed"
                    >
                        <i className="fas fa-download mr-2"></i> Descarregar
                    </button>
                    <button
                        onClick={onBackToDashboard}
                        className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-lg"
                    >
                        <i className="fas fa-arrow-left mr-2"></i> Voltar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CertificateView;