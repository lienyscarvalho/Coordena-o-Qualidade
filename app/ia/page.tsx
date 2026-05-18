"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, Loader2 } from 'lucide-react';
import Markdown from 'react-markdown';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function IAPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Olá! Sou a **IA Especialista em Qualidade da Vivo**. Estou aqui para analisar os indicadores (IRR, IFI), sugerir ferramentas de gestão de qualidade e propor planos de ação. Qual métrica você gostaria de avaliar hoje?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userMessage })
      });

      if (!response.ok) throw new Error('API request failed');

      const data = await response.json();
      
      setMessages(prev => [...prev, { role: 'assistant', content: data.text }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Desculpe, houve um erro ao processar sua solicitação de análise. Tente novamente em instantes.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-8 flex flex-col h-[calc(100vh-64px)]">
      <div className="flex items-center space-x-4 border-b border-slate-200 dark:border-slate-800 pb-4 mb-4 shrink-0">
        <div className="w-12 h-12 bg-purple-600 rounded flex items-center justify-center">
          <Bot className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">IA Analista de Dados</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Assistente virtual treinado com relatórios e indicadores IRR/IFI.</p>
        </div>
      </div>

      <div className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm flex flex-col overflow-hidden">
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50 dark:bg-slate-900/50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-[#660099] ml-3' : 'bg-purple-100 dark:bg-purple-900/50 mr-3'}`}>
                  {msg.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-purple-700 dark:text-purple-400" />}
                </div>

                <div className={`px-4 py-3 rounded-lg text-sm ${msg.role === 'user' ? 'bg-[#660099] text-white' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 shadow-sm'}`}>
                  <div className="prose prose-sm prose-slate dark:prose-invert max-w-none">
                    <Markdown>{msg.content}</Markdown>
                  </div>
                </div>
                
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="flex flex-row max-w-[80%]">
                <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/50 mr-3 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-purple-700 dark:text-purple-400" />
                </div>
                <div className="px-4 py-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 shadow-sm flex items-center">
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Analisando indicadores...
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shrink-0">
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ex: Como posso reduzir o IRR da região Metropolitana usando o Pareto?"
              className="flex-1 border border-slate-300 dark:border-slate-700 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#660099] focus:border-transparent bg-slate-50 dark:bg-slate-800 dark:text-white"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-[#660099] text-white px-4 py-2 rounded font-bold uppercase text-xs tracking-wider hover:bg-[#660099]/80 transition-colors disabled:opacity-50 flex items-center"
            >
              <Send className="w-4 h-4 mr-2" />
              Enviar
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
