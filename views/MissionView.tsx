import React, { useState } from 'react';
import { Mission, Activity } from '../types';
import ContentDisplay from '../components/ContentDisplay';
import Quiz from '../components/Quiz';
import PasswordStrengthChecker from '../components/PasswordStrengthChecker';
import PhishingSimulator from '../components/PhishingSimulator';
import LinkDetector from '../components/LinkDetector';
import DragAndDropQuiz from '../components/DragAndDropQuiz';
import SecurityChecklist from '../components/SecurityChecklist';

interface MissionViewProps {
  mission: Mission;
  onComplete: (missionId: string, score: number) => void;
  onExit: () => void;
  addXp: (amount: number) => void;
}

const MissionView: React.FC<MissionViewProps> = ({ mission, onComplete, onExit, addXp }) => {
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
  const [missionScore, setMissionScore] = useState(0);
  const currentActivity = mission.activities[currentActivityIndex];

  const handleActivityComplete = (xpGained: number, pointsGained: number) => {
    addXp(xpGained);
    const newTotalScore = missionScore + pointsGained;

    if (currentActivityIndex < mission.activities.length - 1) {
      setMissionScore(newTotalScore);
      setCurrentActivityIndex(currentActivityIndex + 1);
    } else {
      // Use a function callback for setState if the new state depends on the previous state
      // Although here we are calling onComplete, it's good practice.
      // The final score for the mission is the accumulated score plus the points from the very last activity.
      onComplete(mission.id, newTotalScore);
    }
  };
  
  const renderActivity = (activity: Activity) => {
    switch (activity.type) {
      case 'content':
        return <ContentDisplay activity={activity} onContinue={() => handleActivityComplete(activity.xp, 0)} />;
      case 'quiz':
        return <Quiz activity={activity} onComplete={(score) => handleActivityComplete(activity.xp, score)} />;
      case 'password-checker':
        return <PasswordStrengthChecker activity={activity} onComplete={() => handleActivityComplete(activity.xp, activity.maxPoints)} />;
      case 'phishing-simulator':
        return <PhishingSimulator activity={activity} onComplete={(score) => handleActivityComplete(activity.xp, score)} />;
      case 'link-detector':
        return <LinkDetector activity={activity} onComplete={(score) => handleActivityComplete(activity.xp, score)} />;
      case 'drag-and-drop-quiz':
        return <DragAndDropQuiz activity={activity} onComplete={(score) => handleActivityComplete(activity.xp, score)} />;
      case 'security-checklist':
        return <SecurityChecklist activity={activity} onComplete={() => handleActivityComplete(activity.xp, activity.maxPoints)} />;
      default:
        return <p>Tipo de atividade desconhecido.</p>;
    }
  };

  return (
    <div className="bg-slate-800 p-6 sm:p-8 rounded-lg shadow-lg border-t-4 border-orange-500 relative">
        <button onClick={onExit} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors">
            <i className="fas fa-times-circle text-2xl"></i>
        </button>
        <h2 className="text-3xl font-bold font-orbitron mb-2 text-cyan-300">{mission.title}</h2>
        <p className="text-slate-400 mb-6">Atividade {currentActivityIndex + 1} de {mission.activities.length}</p>

        <div className="min-h-[300px]">
            {renderActivity(currentActivity)}
        </div>
    </div>
  );
};

export default MissionView;