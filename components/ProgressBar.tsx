import React from 'react';

interface ProgressBarProps {
  current: number;
  max: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, max }) => {
  const percentage = max > 0 ? (current / max) * 100 : 0;

  return (
    <div className="w-full bg-slate-700 rounded-full h-4 mt-2 overflow-hidden border-2 border-slate-600">
      <div
        className="bg-gradient-to-r from-cyan-400 to-green-400 h-full rounded-full transition-all duration-500"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
