"use client";

import React from 'react';
import { BookOpen, AlertCircle, Info, CheckCircle2 } from 'lucide-react';

export default function ManualPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 space-y-8">
      <div className="flex items-center space-x-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="w-12 h-12 bg-[#660099] rounded flex items-center justify-center">
          <BookOpen className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">Manual do Usuário</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Guia de utilização do Dashboard de Indicadores de Qualidade da Vivo.</p>
        </div>
      </div>

      <div className="space-y-6">
        <section className="bg-white dark:bg-slate-900 p-6 border border-slate-200 dark:border-slate-800 rounded shadow-sm">
          <h2 className="text-lg font-bold text-[#660099] dark:text-[#a855f7] mb-4 flex items-center">
            <Info className="w-5 h-5 mr-2" />
            Visão Geral
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
            Este sistema foi desenvolvido para a Coordenação de Qualidade, com o objetivo de centralizar e facilitar o acompanhamento diário dos principais indicadores (KPIs). Através dele, sua equipe pode consultar métricas como IRR e IFI, segmentar por coordenador e comparar a situação atual frente às projeções.
          </p>
        </section>

        <section className="bg-white dark:bg-slate-900 p-6 border border-slate-200 dark:border-slate-800 rounded shadow-sm">
          <h2 className="text-lg font-bold text-[#660099] dark:text-[#a855f7] mb-4 flex items-center">
            <CheckCircle2 className="w-5 h-5 mr-2" />
            Como utilizar os Filtros
          </h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold px-2 py-1 rounded text-xs mr-3 mt-0.5 border border-slate-200 dark:border-slate-700">Coordenador</span>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Utilize o menu suspenso para visualizar os dados de um coordenador de equipe específico. Por padrão, a visualização &quot;Todos&quot; exibe o compilado geral.
              </p>
            </li>
            <li className="flex items-start">
              <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold px-2 py-1 rounded text-xs mr-3 mt-0.5 border border-slate-200 dark:border-slate-700">Dia</span>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Alterne entre &quot;Hoje&quot; e &quot;Ontem&quot; para analisar os indicadores consolidados do dia corrente ou do dia imediatamente anterior.
              </p>
            </li>
            <li className="flex items-start">
              <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold px-2 py-1 rounded text-xs mr-3 mt-0.5 border border-slate-200 dark:border-slate-700">Visualização</span>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Os botões IRR e IFI alteram completamente o painel principal, exibindo as métricas e os gráficos correspondentes à qualidade de reparo ou falha de instalação.
              </p>
            </li>
          </ul>
        </section>

        <section className="bg-white dark:bg-slate-900 p-6 border border-slate-200 dark:border-slate-800 rounded shadow-sm">
          <h2 className="text-lg font-bold text-[#660099] dark:text-[#a855f7] mb-4 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            Significado das Métricas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-4 rounded">
              <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-2">IRR (Índice de Reparo Repetido)</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Mede a taxa de clientes que precisaram de mais de um reparo em um curto período após o reparo original. Quanto menor o IRR, maior a efetividade do primeiro atendimento de campo.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-4 rounded">
              <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-2">IFI (Índice de Falha de Instalação)</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Mede a taxa de clientes que abriram um chamado de reparo logo após uma nova instalação. Um IFI baixo indica que as altas foram realizadas com sucesso técnico na primeira vez.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
