'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Sparkles, User, BrainCircuit, GraduationCap } from 'lucide-react';
import QuizApp from '@/components/quiz-app';
import Leaderboard from '@/components/leaderboard';

export default function Home() {
  const [userName, setUserName] = useState('');
  const [isStarted, setIsStarted] = useState(false);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim()) {
      setIsStarted(true);
    }
  };

  return (
    <main className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
      {/* Theme Header */}
      <header className="bg-card rounded-2xl shadow-sm px-8 py-4 flex items-center justify-between border border-gray-100">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl">U</div>
          <div>
            <h1 className="text-lg font-extrabold leading-tight">Univesp Pro</h1>
            <p className="text-xs text-gray-500 font-medium">Plataforma de Simulado</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-6 flex-1 max-w-md mx-12">
          {isStarted && (
            <div className="w-full">
              <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase mb-1">
                <span>Progresso do Simulado</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: '65%' }}></div>
              </div>
            </div>
          )}
        </div>
        <div className="bg-blue-50 text-primary px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider">LIVE DB CONNECTED</div>
      </header>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6 items-start">
        
        {/* Left Side: Main Content */}
        <div className="space-y-6">
          
          <AnimatePresence mode="wait">
            {!isStarted ? (
              <motion.div 
                key="welcome"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-primary text-xs font-mono font-bold tracking-widest uppercase">
                    <Sparkles className="w-3 h-3" />
                    Vestibular 2024
                  </span>
                  <h1 className="font-display text-5xl md:text-7xl font-semibold tracking-tight text-text">
                    Prepare-se com<br />Excelência.
                  </h1>
                  <p className="text-xl text-gray-500 max-w-xl leading-relaxed">
                    Prepare-se com o simulado interativo baseado nas questões oficiais. 
                    Aprenda com explicações detalhadas em tempo real.
                  </p>
                </div>

                <form onSubmit={handleStart} className="max-w-md space-y-4">
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors w-5 h-5" />
                    <input 
                      type="text" 
                      placeholder="Como podemos te chamar?"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      required
                      className="w-full pl-12 pr-6 py-4 bg-white rounded-2xl border border-gray-200 outline-none focus:border-primary focus:ring-4 focus:ring-blue-50 transition-all text-lg"
                      id="user-name-input"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-lg hover:bg-blue-600 transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-2 group"
                  >
                    Iniciar Simulado
                    <BrainCircuit className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  </button>
                </form>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-8 border-t border-gray-200">
                  <div className="space-y-1">
                    <p className="font-mono text-xs uppercase text-gray-400 font-bold">Questões</p>
                    <p className="text-2xl font-display font-bold italic">10 Originais</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-mono text-xs uppercase text-gray-400 font-bold">Nível</p>
                    <p className="text-2xl font-display font-bold italic">Acadêmico</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-mono text-xs uppercase text-gray-400 font-bold">Feedback</p>
                    <p className="text-2xl font-display font-bold italic">Em Tempo Real</p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <QuizApp userName={userName} onExit={() => setIsStarted(false)} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Side: Sidebar */}
        <div className="space-y-6">
          <Leaderboard />
          
          <div className="bg-white p-8 rounded-3xl border-l-4 border-amber-500 shadow-sm relative group">
            <h3 className="text-[12px] uppercase text-gray-500 font-bold tracking-wider mb-2">Dica de Estudo</h3>
            <p className="text-text text-sm leading-relaxed mb-6">
              O vestibular Univesp foca muito em interpretação de gráficos e textos. 
              Leia os enunciados com atenção redobrada!
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-primary cursor-pointer hover:underline">
              Explorar Guia <ArrowRight className="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>

      {/* Background Graphic */}
      <div className="fixed inset-0 -z-10 pointer-events-none opacity-[0.4]">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-50/50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
      </div>
    </main>
  );
}
