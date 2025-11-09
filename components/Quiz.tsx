import React, { useState } from 'react';
import { Activity, QuizQuestion } from '../types';

interface QuizProps {
  activity: Activity;
  onComplete: (score: number) => void;
}

const Quiz: React.FC<QuizProps> = ({ activity, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);

  const questions = activity.questions || [];
  const question = questions[currentQuestionIndex];

  const handleOptionSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedOption(index);
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;

    const correct = question.options[selectedOption].isCorrect;
    setIsCorrect(correct);
    if (correct) {
      setScore(score + 1);
    }
    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    setShowFeedback(false);
    setSelectedOption(null);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      onComplete(score);
    }
  };

  if (!question) {
    return <p>Erro: Quiz sem perguntas.</p>;
  }

  return (
    <div className="animate-fade-in">
      <h3 className="text-2xl font-bold font-orbitron mb-4 text-orange-500">{activity.title}</h3>
      <p className="text-lg font-semibold mb-6 text-slate-300">{question.question}</p>
      
      <div className="space-y-4">
        {question.options.map((option, index) => {
          let buttonClass = "w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ";
          if (showFeedback) {
            if (option.isCorrect) {
              buttonClass += "bg-green-500 border-green-400 text-white";
            } else if (index === selectedOption && !option.isCorrect) {
              buttonClass += "bg-red-500 border-red-400 text-white";
            } else {
              buttonClass += "bg-slate-700 border-slate-600 opacity-60";
            }
          } else {
             buttonClass += "bg-slate-700 border-slate-600 hover:bg-slate-600 hover:border-cyan-400 ";
             if (index === selectedOption) {
                buttonClass += "border-cyan-400 ring-2 ring-cyan-400";
             }
          }

          return (
             <button key={index} onClick={() => handleOptionSelect(index)} className={buttonClass} disabled={showFeedback}>
                {option.text}
             </button>
          );
        })}
      </div>

      {showFeedback && (
        <div className={`mt-6 p-4 rounded-lg text-white ${isCorrect ? 'bg-green-600' : 'bg-red-600'}`}>
          <p className="font-bold">{isCorrect ? 'Correto!' : 'Incorreto.'}</p>
          <p>{question.feedback}</p>
        </div>
      )}

      <div className="text-right mt-8">
        {!showFeedback ? (
          <button onClick={handleSubmit} disabled={selectedOption === null} className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-6 rounded-lg transition-colors shadow-lg disabled:bg-slate-600 disabled:cursor-not-allowed">
            Verificar
          </button>
        ) : (
          <button onClick={handleNextQuestion} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-lg transition-colors shadow-lg">
            {currentQuestionIndex < questions.length - 1 ? 'Próxima Pergunta' : 'Finalizar Quiz'} <i className="fas fa-arrow-right ml-2"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
