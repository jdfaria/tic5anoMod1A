import React, { useState } from 'react';
import { Activity } from '../types';

interface SecurityChecklistProps {
  activity: Activity;
  onComplete: () => void;
}

const SecurityChecklist: React.FC<SecurityChecklistProps> = ({ activity, onComplete }) => {
  const items = activity.checklistItems || [];
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const handleCheck = (itemId: string) => {
    setCheckedItems(prev => 
      prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
    );
  };

  const allChecked = checkedItems.length === items.length;

  return (
    <div className="animate-fade-in">
      <h3 className="text-2xl font-bold font-orbitron mb-4 text-orange-500">{activity.title}</h3>
      <p className="text-slate-300 mb-6">Confirma que compreendes cada uma destas boas práticas de segurança. Marca todas as caixas para continuar.</p>
      
      <div className="space-y-4">
        {items.map(item => {
          const isChecked = checkedItems.includes(item.id);
          return (
            <div key={item.id} className={`p-4 rounded-lg border-2 transition-all duration-300 ${isChecked ? 'border-green-500 bg-green-900/50' : 'border-slate-700 bg-slate-700/50'}`}>
              <label className="flex items-start cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={isChecked}
                  onChange={() => handleCheck(item.id)}
                  className="mt-1 h-5 w-5 rounded bg-slate-800 border-slate-600 text-cyan-500 focus:ring-cyan-500"
                />
                <div className="ml-4">
                  <span className="font-bold text-slate-100">{item.text}</span>
                  {isChecked && (
                    <p className="text-sm text-green-300 mt-1 animate-fade-in">{item.explanation}</p>
                  )}
                </div>
              </label>
            </div>
          );
        })}
      </div>

      <div className="text-right mt-8">
        <button
          onClick={onComplete}
          disabled={!allChecked}
          className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-6 rounded-lg transition-colors shadow-lg disabled:bg-slate-600 disabled:cursor-not-allowed"
        >
          Continuar <i className="fas fa-arrow-right ml-2"></i>
        </button>
      </div>
    </div>
  );
};

export default SecurityChecklist;
