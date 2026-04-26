'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Clock, ArrowRight, User } from 'lucide-react';
import { subscribeToResults, QuizResult as FirebaseResult } from '@/lib/firebase';

export default function Leaderboard() {
  const [results, setResults] = useState<FirebaseResult[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToResults((data) => {
      setResults(data);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-card p-6 rounded-3xl shadow-sm border border-gray-100 h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-50 rounded-lg">
          <Trophy className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-lg font-bold">Classificação</h2>
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {results.length > 0 ? (
            results.map((result, index) => (
              <motion.div
                key={result.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-transparent hover:border-slate-200 transition-colors"
                id={`result-${result.id}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-white rounded-lg text-[10px] font-bold border border-slate-200">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-xs font-bold leading-none mb-1">{result.userName}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                      {result.completedAt?.toDate?.() 
                        ? new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit' }).format(result.completedAt.toDate())
                        : 'Agora'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-black text-primary">{result.score}/{result.totalQuestions}</p>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-xs text-gray-400 font-bold uppercase text-center py-8">Aguardando resultados...</p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
