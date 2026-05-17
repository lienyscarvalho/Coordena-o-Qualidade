"use client";

import React, { useState } from 'react';
import { 
  ArrowRight, 
  BarChart2, 
  TrendingUp, 
  ChevronDown,
  LayoutDashboard
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList
} from 'recharts';
import { cn } from '@/lib/utils';

const dataIRR = {
  causas: [
    { name: 'CAMPO', value: 9 },
    { name: 'CANCELADO', value: 7 },
    { name: 'MASSIVA', value: 5 },
    { name: 'RETIDO', value: 4 },
    { name: '(Em branco)', value: 3 },
    { name: 'BACKLOG', value: 2 },
  ],
  coordenadoresLimite: [
    { name: 'ACASSIO', value: 3, max: 5 },
    { name: 'ADRIANO', value: 0, max: 4 },
    { name: 'CLEBER', value: 0, max: 4 },
    { name: 'MARCIO', value: 4, max: 6 },
    { name: 'ROBSON', value: 2, max: 4 },
  ],
  projecao: [
    { name: 'MARCIO', atual: 184, projecao: 279 },
    { name: 'ACASSIO', atual: 125, projecao: 207 },
    { name: 'ROBSON', atual: 113, projecao: 176 },
    { name: 'ADRIANO', atual: 87, projecao: 163 },
    { name: 'CLEBER', atual: 80, projecao: 141 },
  ]
};

const dataIFI = {
  coordenadoresLimite: [
    { name: 'ACASSIO', value: 0, max: 2 },
    { name: 'ADRIANO', value: 0, max: 2 },
    { name: 'CLEBER', value: 2, max: 1 },
    { name: 'MARCIO', value: 3, max: 3 },
    { name: 'ROBSON', value: 1, max: 1 },
  ],
  projecao: [
    { name: 'ACASSIO', atual: 48, projecao: 88 },
    { name: 'MARCIO', atual: 29, projecao: 88 },
    { name: 'ADRIANO', atual: 25, projecao: 54 },
    { name: 'ROBSON', atual: 21, projecao: 45 },
    { name: 'CLEBER', atual: 13, projecao: 30 },
  ]
};

const VivoLogo = () => (
  <div className="flex items-center space-x-1">
    <span className="text-white font-bold text-3xl tracking-tighter" style={{ fontFamily: 'sans-serif' }}>vivo</span>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
      <path d="M11 6C11 7.10457 10.1046 8 9 8C7.89543 8 7 7.10457 7 6C7 4.89543 7.89543 4 9 4C10.1046 4 11 4.89543 11 6Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M12.9234 8.78453C12.4202 8.35824 11.666 8.42082 11.2397 8.92398C10.8258 9.41246 10.081 9.49755 9.5623 9.10309C9.02058 8.69116 8.91632 7.91924 9.32825 7.37752C10.3708 6.14144 12.2131 5.98863 13.4491 7.03118C14.6852 8.07374 14.838 9.91605 13.7955 11.1521C13.2923 11.7486 12.4331 11.8385 11.8219 11.36531C11.2393 10.914 11.1213 10.0768 11.5562 9.48208C11.9547 8.93708 12.0125 8.16335 11.4675 7.76483Z" fill="currentColor"/>
      <path d="M8 12.5C8 11.6716 8.67157 11 9.5 11H10.5C11.3284 11 12 11.6716 12 12.5V19.5C12 20.3284 11.3284 21 10.5 21H9.5C8.67157 21 8 20.3284 8 19.5V12.5Z" fill="currentColor"/>
      <path d="M14 11.5C14 10.6716 14.6716 10 15.5 10H16.5C17.3284 10 18 10.6716 18 11.5V19.5C18 20.3284 17.3284 21 16.5 21H15.5C14.6716 21 14 20.3284 14 19.5V11.5Z" fill="currentColor"/>
    </svg>
  </div>
);

export default function DashboardPage() {
  const [view, setView] = useState<'IRR' | 'IFI'>('IRR');
  
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-12">
      {/* Header */}
      <header className="h-16 bg-[#660099] flex items-center justify-between px-8 shrink-0 text-white shadow-sm mb-4">
        <div className="flex items-center space-x-6">
          <VivoLogo />
          <div className="h-8 border-l border-white/20 border-dashed mx-2"></div>
          <h1 className="text-lg font-semibold text-white/90">
            Entrante de {view} Online
          </h1>
        </div>

        <div className="flex items-center space-x-6">
          <div className="border border-white/20 bg-white/5 rounded px-3 py-1.5 text-center flex flex-col justify-center">
             <div className="text-[9px] text-white/70 uppercase tracking-widest font-bold mb-0.5">Atualizado em</div>
             <div className="text-xs font-mono">15/05/2026 15:32:22</div>
          </div>

          <div className="flex flex-col">
            <label className="text-[9px] text-white/70 uppercase tracking-widest font-bold mb-1">Coordenador</label>
            <div className="relative">
              <select className="appearance-none bg-transparent border-b border-white/30 text-white text-xs pr-6 py-0.5 focus:outline-none focus:border-white">
                <option className="text-black">Todos</option>
                <option className="text-black">Acassio</option>
                <option className="text-black">Marcio</option>
              </select>
              <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 text-white/70 pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-[9px] text-white/70 uppercase tracking-widest font-bold mb-1 text-center">Dia</label>
            <div className="flex bg-white/10 rounded overflow-hidden border border-white/20">
              <button className="px-3 py-0.5 text-[10px] uppercase font-bold bg-black/40 text-white">Hoje</button>
              <button className="px-3 py-0.5 text-[10px] uppercase font-bold bg-white text-[#660099]">Ontem</button>
            </div>
          </div>
          
          <div className="flex flex-col ml-4">
             <label className="text-[9px] text-white/70 uppercase tracking-widest font-bold mb-1 text-center">Dashboard</label>
             <div className="flex bg-white/10 rounded overflow-hidden border border-white/20">
               <button onClick={() => setView('IRR')} className={cn("px-3 py-0.5 text-[10px] uppercase font-bold flex items-center space-x-1", view === 'IRR' ? 'bg-[#5F1F81] text-white' : 'bg-white text-slate-800')}>
                  <LayoutDashboard className="w-3 h-3" />
                  <span>IRR</span>
               </button>
               <button onClick={() => setView('IFI')} className={cn("px-3 py-0.5 text-[10px] uppercase font-bold flex items-center space-x-1", view === 'IFI' ? 'bg-[#5F1F81] text-white' : 'bg-white text-slate-800')}>
                  <LayoutDashboard className="w-3 h-3" />
                  <span>IFI</span>
               </button>
             </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-6 space-y-4">
        
        {view === 'IRR' ? (
          <>
            {/* Top KPIs Row IRR */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* IRR Total Widget */}
              <div className="bg-white p-4 border rounded shadow-sm">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                    <ArrowRight className="w-4 h-4 text-slate-500" />
                  </div>
                  <div>
                    <h2 className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">IRR Total</h2>
                    <p className="text-[10px] text-slate-400">Meta = 15,00%</p>
                  </div>
                </div>
                <div className="my-4">
                  <span className="text-2xl font-bold text-emerald-500">11,45%</span>
                </div>
                <div className="space-y-2 pt-3 border-t border-slate-100">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500">Reparos</span>
                    <span className="font-bold text-slate-800">262</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500">IRR</span>
                    <span className="font-bold text-slate-800">30</span>
                  </div>
                </div>
              </div>

              {/* IRR Campo Widget */}
              <div className="bg-white p-4 border rounded shadow-sm">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                    <ArrowRight className="w-4 h-4 text-slate-500" />
                  </div>
                  <div>
                    <h2 className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">IRR Campo</h2>
                    <p className="text-[10px] text-slate-400">Meta = 10,00%</p>
                  </div>
                </div>
                <div className="my-4">
                  <span className="text-2xl font-bold text-emerald-500">4,86%</span>
                </div>
                <div className="space-y-2 pt-3 border-t border-slate-100">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500">Reparos Encerrados</span>
                    <span className="font-bold text-slate-800">185</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500">IRR Campo</span>
                    <span className="font-bold text-slate-800">9</span>
                  </div>
                </div>
              </div>

              {/* Causas Widget */}
              <div className="bg-white p-4 border rounded shadow-sm">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                    <ArrowRight className="w-4 h-4 text-slate-500" />
                  </div>
                  <h2 className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Causas</h2>
                </div>
                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={dataIRR.causas}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                    >
                      <XAxis type="number" hide />
                      <YAxis 
                        dataKey="name" 
                        type="category" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#64748b', fontSize: 9 }}
                        width={80}
                      />
                      <Bar dataKey="value" fill="#a855f7" radius={[0, 2, 2, 0]} barSize={16}>
                        <LabelList dataKey="value" position="right" fill="#334155" fontSize={10} fontWeight={700} formatter={(v:any) => ` ${v}`} />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Bottom Row - Por Coordenador IRR */}
            <div className="bg-white border rounded shadow-sm p-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 text-center mb-6 pb-2 border-b">IRR Campo por Coordenador</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Entrante x Maximo */}
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                      <ArrowRight className="w-3 h-3 text-slate-500" />
                    </div>
                    <h3 className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Entrante x Máximo x Dia</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    {dataIRR.coordenadoresLimite.map((coord) => {
                      const isOverLimit = coord.value > coord.max;
                      return (
                        <div key={coord.name} className="flex flex-col text-center">
                          <span className="text-[10px] text-slate-500 font-bold mb-1 uppercase">{coord.name}</span>
                          <div className={cn(
                            "border rounded overflow-hidden",
                            isOverLimit ? "border-red-400" : "border-slate-200",
                            "shadow-sm bg-white"
                          )}>
                            <div className={cn(
                              "h-1.5 w-full",
                              isOverLimit ? "bg-red-500" : "bg-emerald-500"
                            )} />
                            <div className="py-2 border-b border-dashed border-slate-200">
                              <span className={cn(
                                "text-lg font-bold",
                                isOverLimit ? "text-red-500" : "text-emerald-500"
                              )}>{coord.value}</span>
                            </div>
                            <div className="bg-slate-50 py-1">
                              <div className="text-[9px] text-slate-400 uppercase tracking-widest">Máximo</div>
                              <div className="text-sm font-bold text-slate-700">{coord.max}</div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Contagem Atual e Projecao */}
                <div>
                   <div className="flex items-center space-x-2 mb-4">
                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                      <ArrowRight className="w-3 h-3 text-slate-500" />
                    </div>
                    <h3 className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Contagem IRR Campo Atual e Projeção</h3>
                  </div>
                  <div className="flex items-center justify-center space-x-6 mb-4 mt-2">
                    <div className="flex items-center space-x-1.5">
                      <div className="w-2 h-2 rounded-full bg-[#d8b4fe]" />
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Contagem Atual</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <div className="w-2 h-2 rounded-full bg-[#9333ea]" />
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Projeção</span>
                    </div>
                  </div>
                  
                  <div className="h-[220px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={dataIRR.projecao}
                        margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
                        barGap={0}
                      >
                        <XAxis 
                          dataKey="name" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fill: '#64748b', fontSize: 9 }} 
                          dy={10}
                        />
                        <Bar dataKey="atual" fill="#d8b4fe" barSize={24}>
                           <LabelList dataKey="atual" position="top" fill="#64748b" fontSize={9} offset={6} />
                        </Bar>
                        <Bar dataKey="projecao" fill="#9333ea" barSize={24}>
                           <LabelList dataKey="projecao" position="top" fill="#334155" fontSize={9} fontWeight={700} offset={6} />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

              </div>
            </div>
          </>
        ) : (
          <>
            {/* Top KPIs Row IFI */}
            <div className="bg-white p-6 border rounded shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                
                {/* IFI Main Widget */}
                <div className="flex items-center justify-between col-span-2 pr-8">
                   <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                          <ArrowRight className="w-4 h-4 text-slate-500" />
                        </div>
                        <div>
                          <h2 className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">IFI</h2>
                          <p className="text-[10px] text-slate-400 uppercase tracking-wider">Meta = 4,00%</p>
                        </div>
                      </div>
                   </div>
                   <div className="px-6 py-3 rounded-lg border border-slate-200 bg-slate-50 shadow-sm">
                      <span className="text-3xl font-bold text-emerald-500">3,57%</span>
                   </div>
                </div>

                <div className="flex items-center justify-between border-l border-slate-200 pl-8 pr-4">
                   <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                        <BarChart2 className="w-4 h-4 text-purple-600" />
                      </div>
                      <span className="text-2xl font-bold text-slate-800">168</span>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 mt-1">Altas</span>
                   </div>
                   <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                        <TrendingUp className="w-4 h-4 text-purple-600" />
                      </div>
                      <span className="text-2xl font-bold text-slate-800">6</span>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 mt-1">IFI</span>
                   </div>
                </div>

              </div>
            </div>

            {/* Bottom Row - Por Coordenador IFI */}
            <div className="bg-white border rounded shadow-sm p-4 mt-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 text-center mb-6 border-b pb-2">IFI por Coordenador</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Entrante x Maximo */}
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                      <ArrowRight className="w-3 h-3 text-slate-500" />
                    </div>
                    <h3 className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Entrante x Máximo x Dia</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    {dataIFI.coordenadoresLimite.map((coord) => {
                      const isOverLimit = coord.value > coord.max;
                      return (
                        <div key={coord.name} className="flex flex-col text-center">
                          <span className="text-[10px] text-slate-500 font-bold mb-1 uppercase">{coord.name}</span>
                          <div className={cn(
                            "border rounded overflow-hidden",
                            isOverLimit ? "border-red-400" : "border-slate-200",
                            "shadow-sm bg-white"
                          )}>
                            <div className={cn(
                              "h-1.5 w-full",
                              isOverLimit ? "bg-red-500" : "bg-emerald-500"
                            )} />
                            <div className="py-2 border-b border-dashed border-slate-200">
                              <span className={cn(
                                "text-lg font-bold",
                                isOverLimit ? "text-red-500" : "text-emerald-500"
                              )}>{coord.value}</span>
                            </div>
                            <div className="bg-slate-50 py-1">
                              <div className="text-[9px] text-slate-400 uppercase tracking-widest">Máximo</div>
                              <div className="text-sm font-bold text-slate-700">{coord.max}</div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Contagem Atual e Projecao */}
                <div>
                   <div className="flex items-center space-x-2 mb-4">
                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                      <ArrowRight className="w-3 h-3 text-slate-500" />
                    </div>
                    <h3 className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Contagem IFI Atual e Projeção</h3>
                  </div>
                  <div className="flex items-center justify-center space-x-6 mb-4 mt-2">
                    <div className="flex items-center space-x-1.5">
                      <div className="w-2 h-2 rounded-full bg-[#d8b4fe]" />
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Contagem Atual</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <div className="w-2 h-2 rounded-full bg-[#9333ea]" />
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Projeção</span>
                    </div>
                  </div>
                  
                  <div className="h-[220px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={dataIFI.projecao}
                        margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
                        barGap={0}
                      >
                        <XAxis 
                          dataKey="name" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fill: '#64748b', fontSize: 9 }} 
                          dy={10}
                        />
                        <Bar dataKey="atual" fill="#d8b4fe" barSize={24}>
                           <LabelList dataKey="atual" position="top" fill="#64748b" fontSize={9} offset={6} />
                        </Bar>
                        <Bar dataKey="projecao" fill="#9333ea" barSize={24}>
                           <LabelList dataKey="projecao" position="top" fill="#334155" fontSize={9} fontWeight={700} offset={6} />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
