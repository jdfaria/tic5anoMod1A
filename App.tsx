import React, { useState } from 'react';
import { useGameState } from './hooks/useGameState';
import Dashboard from './views/Dashboard';
import MissionView from './views/MissionView';
import CertificateView from './views/CertificateView';
import { Mission } from './types';
import { missions } from './data/content';

type View = 'dashboard' | 'mission' | 'certificate';

const App: React.FC = () => {
  const { playerState, addXp, completeMission, resetProgress } = useGameState();
  const [currentMission, setCurrentMission] = useState<Mission | null>(null);
  const [view, setView] = useState<View>('dashboard');

  const handleStartMission = (missionId: string) => {
    const mission = missions.find(m => m.id === missionId);
    if (mission) {
      setCurrentMission(mission);
      setView('mission');
    }
  };
  
  const handleMissionComplete = (missionId: string, score: number) => {
      completeMission(missionId, score);
      setCurrentMission(null);
      setView('dashboard');
  }

  const renderContent = () => {
    switch(view) {
        case 'mission':
            return currentMission ? (
                 <MissionView
                    mission={currentMission}
                    onComplete={handleMissionComplete}
                    onExit={() => setView('dashboard')}
                    addXp={addXp}
                />
            ) : null;
        case 'certificate':
            return <CertificateView playerState={playerState} onBackToDashboard={() => setView('dashboard')} />;
        case 'dashboard':
        default:
            return (
                 <Dashboard
                    playerState={playerState}
                    onStartMission={handleStartMission}
                    onGenerateCertificate={() => setView('certificate')}
                />
            );
    }
  }


  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 sm:p-6 md:p-8">
      <div className="max-w-5xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-orbitron text-cyan-300">
            CyberQuest<span className="text-orange-500">:</span> Academia Digital
          </h1>
          <button onClick={() => {
            resetProgress();
            setView('dashboard');
            setCurrentMission(null);
          }} className="text-xs bg-red-600 hover:bg-red-700 p-2 rounded-lg transition-colors">
            <i className="fa-solid fa-arrow-rotate-left mr-1"></i>
            Recomeçar
          </button>
        </header>

        <main>
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;