"use client";

import React, { useState, useEffect } from 'react';
import { ChevronDown, ArrowRight, TrendingUp, BarChart2, Download } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';

const dataIRR = [
  { name: 'Acassio', value: 8.5, max: 10 },
  { name: 'Marcio', value: 12.2, max: 10 }, // over limit
  { name: 'João', value: 9.0, max: 10 },
];

const dataIFI = [
  { name: 'Acassio', value: 3.2, max: 4.0 },
  { name: 'Marcio', value: 4.5, max: 4.0 }, // over limit
  { name: 'João', value: 2.1, max: 4.0 },
];

const dataNTDA = [
  { name: 'Acassio', value: 4.5, max: 5.0 },
  { name: 'Marcio', value: 5.2, max: 5.0 }, // over limit
  { name: 'João', value: 3.8, max: 5.0 },
];

const dataIRT = [
  { name: 'Acassio', value: 1.1, max: 1.2 },
  { name: 'Marcio', value: 1.4, max: 1.2 }, // over limit
  { name: 'João', value: 1.0, max: 1.2 },
];

export default function DashboardPage() {
  const [view, setView] = useState<'IRR' | 'IFI' | 'NTDA' | 'IRT'>('IRR');

  const getData = () => {
    switch (view) {
      case 'IRR': return dataIRR;
      case 'IFI': return dataIFI;
      case 'NTDA': return dataNTDA;
      case 'IRT': return dataIRT;
      default: return dataIRR;
    }
  };

  const currentMax = () => {
    switch (view) {
      case 'IRR': return '10,00%';
      case 'IFI': return '4,00%';
      case 'NTDA': return '5,00';
      case 'IRT': return '1,20';
      default: return '';
    }
  };

  const currentValue = () => {
    switch (view) {
      case 'IRR': return '9,90%';
      case 'IFI': return '3,57%';
      case 'NTDA': return '4,50';
      case 'IRT': return '1,16';
      default: return '';
    }
  };

  const handleExportExcel = async () => {
    const data = getData();
    const XLSX = await import('xlsx');
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, `Relatório ${view}`);
    XLSX.writeFile(wb, `Relatorio_${view}.xlsx`);
  };

  const handleExportPDF = async () => {
    const data = getData();
    const { default: jsPDF } = await import('jspdf');
    const { default: autoTable } = await import('jspdf-autotable');
    const doc = new jsPDF();
    doc.text(`Relatório de Indicadores - ${view}`, 14, 15);
    
    const tableColumn = ["Coordenador", "Valor Atual", "Meta Máxima", "Status"];
    const tableRows = data.map(item => [
      item.name,
      item.value.toString(),
      item.max.toString(),
      item.value > item.max ? "Acima da Meta" : "Dentro da Meta"
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });
    
    doc.save(`Relatorio_${view}.pdf`);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans text-slate-800 dark:text-slate-100 pb-12">
      {/* Filters Bar */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-8 py-3 flex items-center justify-between shadow-sm mb-6 sticky top-0 z-40 relative">
        <div className="flex items-center space-x-6">
          <h1 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100">
            Painel de Desempenho ({view})
          </h1>
          <div className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold rounded-full uppercase tracking-wider">
            Sistemas Online
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex flex-col">
            <label className="text-[9px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-bold mb-1">Atualizado em</label>
            <div className="text-xs font-mono font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">15/05/2026 15:32:22</div>
          </div>

          <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-2"></div>

          <div className="flex items-center space-x-2">
            <label className="text-[9px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-bold">Coordenador:</label>
            <div className="relative">
              <select className="appearance-none bg-slate-100 dark:bg-slate-800 border-none rounded text-slate-700 dark:text-slate-200 text-xs font-bold pl-3 pr-8 py-1 focus:outline-none focus:ring-1 focus:ring-[#660099]">
                <option>Todos</option>
                <option>Acassio</option>
                <option>Marcio</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400 pointer-events-none" />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-[9px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-bold">Dia:</label>
            <div className="flex rounded overflow-hidden border border-slate-200 dark:border-slate-800">
              <button className="px-3 py-1 text-[10px] uppercase font-bold bg-[#660099] text-white">Hoje</button>
              <button className="px-3 py-1 text-[10px] uppercase font-bold bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700">Ontem</button>
            </div>
          </div>
          
          <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-2"></div>

          <div className="flex items-center space-x-2">
             <label className="text-[9px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-bold">Visualização:</label>
             <div className="flex bg-slate-100 dark:bg-slate-800 p-0.5 rounded border border-slate-200 dark:border-slate-700">
               <button onClick={() => setView('IRR')} className={cn("px-4 py-1 text-[10px] uppercase font-bold rounded-sm transition-colors", view === 'IRR' ? 'bg-white dark:bg-slate-700 text-[#660099] dark:text-[#a855f7] shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200')}>
                  <span>IRR</span>
               </button>
               <button onClick={() => setView('IFI')} className={cn("px-4 py-1 text-[10px] uppercase font-bold rounded-sm transition-colors", view === 'IFI' ? 'bg-white dark:bg-slate-700 text-[#660099] dark:text-[#a855f7] shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200')}>
                  <span>IFI</span>
               </button>
               <button onClick={() => setView('NTDA')} className={cn("px-4 py-1 text-[10px] uppercase font-bold rounded-sm transition-colors", view === 'NTDA' ? 'bg-white dark:bg-slate-700 text-[#660099] dark:text-[#a855f7] shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200')}>
                  <span>NTDA</span>
               </button>
               <button onClick={() => setView('IRT')} className={cn("px-4 py-1 text-[10px] uppercase font-bold rounded-sm transition-colors", view === 'IRT' ? 'bg-white dark:bg-slate-700 text-[#660099] dark:text-[#a855f7] shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200')}>
                  <span>IRT</span>
               </button>
             </div>
          </div>
        </div>
      </div>

      <main className="max-w-[1400px] mx-auto px-6 space-y-4">
        {/* Export Action Bar */}
        <div className="flex justify-end space-x-4 mb-4">
          <button onClick={handleExportPDF} className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shadow-sm">
            <Download className="w-4 h-4" />
            <span>Exportar PDF</span>
          </button>
          <button onClick={handleExportExcel} className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shadow-sm">
            <Download className="w-4 h-4" />
            <span>Exportar Excel</span>
          </button>
        </div>

        {/* Dashboard Content */}
        <div className="bg-white dark:bg-slate-900 p-6 border border-slate-200 dark:border-slate-800 rounded shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            
            {/* Main Widget */}
            <div className="flex items-center justify-between col-span-2 pr-8">
               <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                      <ArrowRight className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                    </div>
                    <div>
                      <h2 className="text-slate-400 dark:text-slate-500 text-[10px] uppercase font-bold tracking-wider">{view}</h2>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider">Meta = {currentMax()}</p>
                    </div>
                  </div>
               </div>
               <div className="px-6 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 shadow-sm">
                  <span className="text-3xl font-bold text-emerald-500 dark:text-emerald-400">{currentValue()}</span>
               </div>
            </div>

            <div className="flex items-center justify-between border-l border-slate-200 dark:border-slate-800 pl-8 pr-4">
               <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-purple-100 dark:bg-[#660099]/20 rounded-full flex items-center justify-center mb-2">
                    <BarChart2 className="w-4 h-4 text-purple-600 dark:text-[#a855f7]" />
                  </div>
                  <span className="text-2xl font-bold text-slate-800 dark:text-slate-100">168</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400 mt-1">Altas</span>
               </div>
               <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-purple-100 dark:bg-[#660099]/20 rounded-full flex items-center justify-center mb-2">
                    <TrendingUp className="w-4 h-4 text-purple-600 dark:text-[#a855f7]" />
                  </div>
                  <span className="text-2xl font-bold text-slate-800 dark:text-slate-100">6</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400 mt-1">{view}</span>
               </div>
            </div>
          </div>
        </div>

        {/* Bottom Row - Por Coordenador */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded shadow-sm p-4 mt-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 text-center mb-6 pb-2 border-b border-slate-200 dark:border-slate-800">{view} por Coordenador</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Entrante x Maximo */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                  <ArrowRight className="w-3 h-3 text-slate-500 dark:text-slate-400" />
                </div>
                <h3 className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">Entrante x Máximo x Dia</h3>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {getData().map((coord) => {
                  const isOverLimit = coord.value > coord.max;
                  return (
                    <div key={coord.name} className="flex flex-col text-center">
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold mb-1 uppercase">{coord.name}</span>
                      <div className={cn(
                        "border rounded overflow-hidden",
                        isOverLimit ? "border-red-400 dark:border-red-500/50" : "border-slate-200 dark:border-slate-700",
                        "shadow-sm bg-white dark:bg-slate-800"
                      )}>
                        <div className={cn(
                          "h-1.5 w-full",
                          isOverLimit ? "bg-red-500" : "bg-emerald-500"
                        )} />
                        <div className="py-2 border-b border-dashed border-slate-200 dark:border-slate-700">
                          <span className={cn(
                            "text-lg font-bold",
                            isOverLimit ? "text-red-500 dark:text-red-400" : "text-emerald-500 dark:text-emerald-400"
                          )}>{coord.value}</span>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-900 py-1">
                          <div className="text-[9px] text-slate-400 dark:text-slate-500 uppercase tracking-widest">Máximo</div>
                          <div className="text-sm font-bold text-slate-700 dark:text-slate-300">{coord.max}</div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Gráfico */}
            <div>
               <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                  <ArrowRight className="w-3 h-3 text-slate-500 dark:text-slate-400" />
                </div>
                <h3 className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">Desempenho Visual</h3>
              </div>
              <div className="h-48 w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={getData()}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10}} />
                    <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Bar dataKey="value" fill="#9333ea" radius={[4, 4, 0, 0]} barSize={32}>
                      <LabelList dataKey="value" position="top" fill="#64748b" fontSize={10} fontWeight="bold" />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
