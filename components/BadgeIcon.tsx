import React from 'react';
import { Badge } from '../types';

interface BadgeIconProps {
  badge: Badge;
}

const BadgeIcon: React.FC<BadgeIconProps> = ({ badge }) => {
  return (
    <div className="relative group flex flex-col items-center">
      <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center text-3xl text-yellow-400 shadow-md transition-all duration-300 group-hover:bg-yellow-400 group-hover:text-slate-900">
        <i className={`fas ${badge.icon}`}></i>
      </div>
      <div className="absolute bottom-full mb-2 w-max p-2 bg-slate-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <p className="font-bold">{badge.name}</p>
        <p className="text-slate-300">{badge.description}</p>
      </div>
    </div>
  );
};

export default BadgeIcon;
