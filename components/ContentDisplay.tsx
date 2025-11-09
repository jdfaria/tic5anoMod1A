import React from 'react';
import { Activity } from '../types';

interface ContentDisplayProps {
  activity: Activity;
  onContinue: () => void;
}

const ContentDisplay: React.FC<ContentDisplayProps> = ({ activity, onContinue }) => {
  return (
    <div className="flex flex-col justify-between h-full animate-fade-in">
      <div>
        <h3 className="text-2xl font-bold font-orbitron mb-4 text-orange-500">{activity.title}</h3>
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-1 space-y-4 text-slate-300">
            {Array.isArray(activity.content) ? (
              activity.content.map((p, i) => <p key={i}>{p}</p>)
            ) : (
              <p>{activity.content}</p>
            )}
          </div>
          {activity.image && (
            <div className="w-full md:w-2/5 mt-4 md:mt-0">
              <img src={activity.image} alt={activity.title} className="rounded-lg shadow-xl w-full object-cover max-h-72" />
            </div>
          )}
        </div>
      </div>
      <div className="text-right mt-8">
        <button
          onClick={onContinue}
          className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-6 rounded-lg transition-colors shadow-lg"
        >
          Continuar <i className="fas fa-arrow-right ml-2"></i>
        </button>
      </div>
    </div>
  );
};

export default ContentDisplay;