import React from 'react';
import { PlayerState } from '../types';
import { missions, badges } from '../data/content';
import ProgressBar from '../components/ProgressBar';
import BadgeIcon from '../components/BadgeIcon';

interface DashboardProps {
  playerState: PlayerState;
  onStartMission: (missionId: string) => void;
  onGenerateCertificate: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ playerState, onStartMission, onGenerateCertificate }) => {
  const { xp, level, completedMissionIds, unlockedBadgeIds, avatar } = playerState;
  const currentLevelXP = xp % 100;
  const xpForNextLevel = 100;
  
  const allMissionsCompleted = completedMissionIds.length === missions.length;

  return (
    <div className="space-y-12">
      {/* Profile Section */}
      <section className="bg-slate-800 p-6 rounded-lg shadow-lg flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 border-t-4 border-cyan-400">
        <div className={`w-24 h-24 rounded-full ${avatar.bgColor} flex items-center justify-center text-5xl text-white shadow-md`}>
          <i className={`fas ${avatar.icon}`}></i>
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-2xl font-bold font-orbitron">Agente Nível {level}</h2>
          <p className="text-slate-400">O teu progresso na Academia Digital</p>
          <ProgressBar current={currentLevelXP} max={xpForNextLevel} />
          <p className="text-sm text-right text-slate-300 mt-1">{xp} / {(level) * 100} XP</p>
        </div>
      </section>

      {/* Certificate Section */}
      {allMissionsCompleted && (
        <section className="bg-gradient-to-r from-green-500 to-cyan-500 p-6 rounded-lg shadow-lg text-center animate-fade-in">
            <h2 className="text-3xl font-bold font-orbitron mb-2 text-white">Parabéns, Lenda do Ciberespaço!</h2>
            <p className="text-slate-100 mb-4">Completaste todos os desafios da Academia Digital. Estás pronto para receber a tua certificação.</p>
            <button
                onClick={onGenerateCertificate}
                className="bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold py-3 px-8 rounded-lg transition-transform transform hover:scale-105 shadow-xl text-lg"
            >
                <i className="fas fa-award mr-2"></i> Gerar Certificado
            </button>
        </section>
      )}


      {/* Missions Section */}
      <section>
        <h2 className="text-3xl font-bold font-orbitron mb-6 text-orange-500">Mapa de Missões</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {missions.map((mission, index) => {
            const isCompleted = completedMissionIds.includes(mission.id);
            const isLocked = !allMissionsCompleted && index > 0 && !completedMissionIds.includes(missions[index - 1].id);
            
            return (
              <div
                key={mission.id}
                className={`p-6 rounded-lg transition-all duration-300 ${
                  isLocked 
                    ? 'bg-slate-800 opacity-50 cursor-not-allowed' 
                    : 'bg-slate-800 hover:bg-slate-700 hover:shadow-cyan-500/20 shadow-lg cursor-pointer'
                }`}
                onClick={() => !isLocked && !isCompleted && onStartMission(mission.id)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`text-3xl ${isLocked ? 'text-slate-500' : isCompleted ? 'text-green-400' : 'text-cyan-400'}`}>
                    <i className={`fas ${mission.icon}`}></i>
                  </div>
                  {isCompleted && (
                    <div className="text-green-400 text-2xl">
                      <i className="fas fa-check-circle"></i>
                    </div>
                  )}
                   {isLocked && (
                    <div className="text-slate-500 text-2xl">
                      <i className="fas fa-lock"></i>
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-bold font-orbitron mb-2">{mission.title}</h3>
                <p className="text-slate-400 text-sm">{mission.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Badges Section */}
      <section>
        <h2 className="text-3xl font-bold font-orbitron mb-6 text-orange-500">Conquistas</h2>
        {unlockedBadgeIds.length > 0 ? (
          <div className="flex flex-wrap gap-4">
            {badges
              .filter(badge => unlockedBadgeIds.includes(badge.id))
              .map(badge => (
                <BadgeIcon key={badge.id} badge={badge} />
              ))}
          </div>
        ) : (
          <div className="bg-slate-800 p-6 rounded-lg text-center text-slate-400">
            <p>Ainda não desbloqueaste nenhum badge. Completa missões para os ganhar!</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;