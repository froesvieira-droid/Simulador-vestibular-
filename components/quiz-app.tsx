'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, ArrowRight, HelpCircle, AlertCircle, RefreshCcw } from 'lucide-react';
import { questions, Question } from '@/lib/questions';
import { saveResult } from '@/lib/firebase';
import { cn } from '@/lib/utils';

interface QuizAppProps {
  userName: string;
  onExit: () => void;
}

export default function QuizApp({ userName, onExit }: QuizAppProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = questions[currentIndex];

  const handleOptionSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
  };

  const handleConfirmAnswer = () => {
    if (selectedOption === null || isAnswered) return;
    
    setIsAnswered(true);
    if (selectedOption === currentQuestion.correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = async () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsSubmitting(true);
      try {
        await saveResult(userName, score + (selectedOption === currentQuestion.correctIndex && !isAnswered ? 1 : 0), questions.length);
      } catch (e) {
        console.error("Failed to save result", e);
      }
      setShowResult(true);
      setIsSubmitting(false);
    }
  };

  if (showResult) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto text-center"
      >
        <div className="bg-card p-10 rounded-[32px] shadow-xl border border-gray-100">
          <TrophyIcon score={score} total={questions.length} />
          <h2 className="text-3xl font-bold mb-2">Simulado Finalizado!</h2>
          <p className="text-gray-500 mb-8 font-medium">Bom trabalho, {userName}. Aqui está seu desempenho:</p>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
              <p className="text-[10px] font-bold text-primary uppercase mb-1">Acertos</p>
              <p className="text-2xl font-black text-primary">{score} / {questions.length}</p>
            </div>
            <div className="bg-primary p-6 rounded-2xl border border-blue-600">
              <p className="text-[10px] font-bold text-blue-100 uppercase mb-1">Precisão</p>
              <p className="text-2xl font-black text-white">{Math.round((score / questions.length) * 100)}%</p>
            </div>
          </div>

          <button 
            onClick={onExit}
            className="w-full py-5 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-600 transition-all shadow-lg shadow-blue-100"
          >
            <RefreshCcw className="w-5 h-5" />
            Tentar Novamente
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8 overflow-hidden bg-gray-100 h-2 rounded-full border border-gray-100">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          className="bg-primary h-full rounded-full transition-all duration-500"
        />
      </div>

      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-blue-50 px-3 py-1 rounded-full">
          {currentQuestion.category}
        </span>
        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Questão {currentIndex + 1} de {questions.length}</span>
      </div>

      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="bg-card p-10 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-50 mb-6"
      >
        <h3 className="text-2xl font-bold leading-snug mb-8 text-text">
          {currentQuestion.text}
        </h3>

        <div className="space-y-4">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedOption === index;
            const isCorrect = isAnswered && index === currentQuestion.correctIndex;
            const isWrong = isAnswered && isSelected && index !== currentQuestion.correctIndex;

            return (
              <button
                key={index}
                onClick={() => handleOptionSelect(index)}
                disabled={isAnswered}
                className={cn(
                  "w-full text-left p-5 rounded-2xl border-2 transition-all flex items-center gap-4 font-medium",
                  isSelected && !isAnswered && "border-primary bg-blue-50",
                  isCorrect && "border-success bg-green-50 text-green-900",
                  isWrong && "border-danger bg-red-50 text-red-900",
                  !isSelected && !isCorrect && !isWrong && "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                )}
                id={`option-${currentIndex}-${index}`}
              >
                <div className={cn(
                  "w-8 h-8 shrink-0 rounded-lg flex items-center justify-center text-xs font-bold",
                  isSelected && !isAnswered && "bg-primary text-white",
                  isCorrect && "bg-success text-white",
                  isWrong && "bg-danger text-white",
                  !isSelected && !isCorrect && !isWrong && "bg-gray-100 text-gray-400"
                )}>
                  {String.fromCharCode(65 + index)}
                </div>
                <span className="text-base leading-tight">{option}</span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Explanation & Action */}
      <AnimatePresence mode="wait">
        {isAnswered ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-8"
          >
            <div className="bg-slate-100 p-6 rounded-2xl border-l-4 border-slate-400 flex gap-4">
              <div className="mt-1">
                <HelpCircle className="w-5 h-5 text-slate-600" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase text-slate-600 mb-1 tracking-wider">💡 Explicação do Sistema</p>
                <p className="text-sm text-slate-700 leading-relaxed font-medium">{currentQuestion.explanation}</p>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="flex gap-4">
        {!isAnswered ? (
          <button
            onClick={handleConfirmAnswer}
            disabled={selectedOption === null}
            className="flex-1 py-5 bg-primary disabled:opacity-50 text-white rounded-2xl font-bold shadow-lg shadow-blue-200 flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors"
          >
            Confirmar Resposta
            <CheckCircle2 className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex-1 py-5 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-blue-200 flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors"
          >
            {currentIndex === questions.length - 1 ? 'Finalizar Simulado' : 'Próxima Questão'}
            <ArrowRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}

function TrophyIcon({ score, total }: { score: number, total: number }) {
  const percentage = (score / total) * 100;
  if (percentage >= 80) return <div className="text-6xl mb-6">🏆</div>;
  if (percentage >= 50) return <div className="text-6xl mb-6">🎯</div>;
  return <div className="text-6xl mb-6">📚</div>;
}
