import React, { useState, useMemo } from 'react';
import { Activity } from '../types';

interface DragAndDropQuizProps {
  activity: Activity;
  onComplete: (score: number) => void;
}

const DragAndDropQuiz: React.FC<DragAndDropQuizProps> = ({ activity, onComplete }) => {
  const pairs = activity.dragDropPairs || [];
  const [droppedTerms, setDroppedTerms] = useState<(string | null)[]>(new Array(pairs.length).fill(null));
  const [draggedTerm, setDraggedTerm] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const shuffledTerms = useMemo(() => pairs.map(p => p.term).sort(() => Math.random() - 0.5), [pairs]);
  
  const handleDragStart = (term: string) => {
    if (submitted) return;
    setDraggedTerm(term);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, definitionIndex: number) => {
    e.preventDefault();
    if (draggedTerm && !submitted) {
      const newDroppedTerms = [...droppedTerms];
      const oldIndex = newDroppedTerms.indexOf(draggedTerm);
      if (oldIndex > -1) newDroppedTerms[oldIndex] = null;
      newDroppedTerms[definitionIndex] = draggedTerm;
      setDroppedTerms(newDroppedTerms);
      setDraggedTerm(null);
    }
  };
  
  const getIsCorrect = (index: number) => {
      if(droppedTerms[index] === null) return false;
      return pairs[index].term === droppedTerms[index];
  }

  const score = useMemo(() => {
    return pairs.reduce((acc, _, index) => acc + (getIsCorrect(index) ? 1 : 0), 0);
  }, [droppedTerms, pairs]);

  const handleSubmit = () => {
      setSubmitted(true);
  }

  return (
    <div className="animate-fade-in">
      <h3 className="text-2xl font-bold font-orbitron mb-4 text-orange-500">{activity.title}</h3>
      <p className="text-slate-300 mb-6">Arrasta cada termo da coluna da esquerda para a sua definição correta na coluna da direita.</p>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3 space-y-3">
            <h4 className="font-bold text-lg text-cyan-400">Termos</h4>
            {shuffledTerms.map(term => {
                const isDropped = droppedTerms.includes(term);
                return (
                    <div
                        key={term}
                        draggable={!isDropped && !submitted}
                        onDragStart={() => handleDragStart(term)}
                        className={`p-4 rounded-lg transition-all ${
                            isDropped || submitted
                            ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                            : 'bg-slate-700 hover:bg-slate-600 cursor-grab'
                        }`}
                    >
                        {term}
                    </div>
                );
            })}
        </div>
        
        <div className="w-full md:w-2/3 space-y-3">
            <h4 className="font-bold text-lg text-orange-500">Definições</h4>
            {pairs.map((pair, index) => (
            <div
                key={pair.id}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
                className={`p-4 rounded-lg min-h-[72px] flex items-center border-2 transition-all ${
                    submitted
                    ? getIsCorrect(index) ? 'border-green-500 bg-green-900/50' : 'border-red-500 bg-red-900/50'
                    : droppedTerms[index] ? 'border-cyan-500 bg-slate-800' : 'border-dashed border-slate-600'
                }`}
            >
                {droppedTerms[index] ? (
                    <div className="bg-slate-700 p-2 rounded">
                        {droppedTerms[index]}
                    </div>
                ) : (
                     <span className="text-slate-400">{pair.definition}</span>
                )}
            </div>
            ))}
        </div>
      </div>

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
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-lg transition-colors shadow-lg"
            >
            Verificar Respostas
            </button>
        )}
      </div>
    </div>
  );
};

export default DragAndDropQuiz;