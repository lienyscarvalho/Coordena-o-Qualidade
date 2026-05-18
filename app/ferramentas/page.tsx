"use client";

import React from 'react';
import { Wrench, Target, Box, Activity, Layers, ActivitySquare, ListChecks, ArrowRightLeft, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const ferramentas = [
  {
    nome: "Diagrama de causa e efeito (Ishikawa)",
    icone: <ArrowRightLeft className="w-5 h-5" />,
    descricao: "Conhecido como espinha de peixe. Mapeia as possíveis causas (Mão de Obra, Métodos, Materiais, Máquinas, Meio Ambiente, Medida) para um problema (efeito).",
    aplicacoes: [
      { kpi: "IRR", texto: "Descobrir causa raiz de reparos repetidos devido a falha de conectorização em armários ópticos." },
      { kpi: "IFI", texto: "Analisar por que altas recentes falham logo após ativação (ex: erro de provisionamento, material defeituoso)." },
      { kpi: "IRT", texto: "Investigar motivos de aumento de reclamações técnicas em uma região específica após chuvas." },
      { kpi: "TDNA", texto: "Elencar motivos para o técnico não conseguir fechar o teste de qualidade óptica no prazo." }
    ]
  },
  {
    nome: "Diagrama de Pareto",
    icone: <ActivitySquare className="w-5 h-5" />,
    descricao: "Baseado no princípio 80/20, este gráfico de barras ordena as frequências das ocorrências da maior para a menor.",
    aplicacoes: [
      { kpi: "IRR", texto: "Identificar os 20% de defeitos de rede que geram 80% do volume de chamados de reincidência." },
      { kpi: "IFI", texto: "Priorizar os tipos de erro de instalação mais comuns (ex: falha de login, cabo rompido)." },
      { kpi: "IRT", texto: "Focar em resolver os top 3 motivos de ligação para o call center." },
      { kpi: "TDNA", texto: "Mapear quais testes TDNA apresentam falhas na leitura com maior frequência." }
    ]
  },
  {
    nome: "Folha de Verificação",
    icone: <ListChecks className="w-5 h-5" />,
    descricao: "Lista estruturada para facilitar a coleta sistemática de dados em tempo real no local onde o processo ocorre.",
    aplicacoes: [
      { kpi: "IRR", texto: "Checklist do técnico para garantir que a CTO e PTO foram limpas, evitando novo chamado." },
      { kpi: "IFI", texto: "Verificação dos passos obrigatórios no ato da instalação (foto, nível de sinal, ativação Wi-Fi)." },
      { kpi: "IRT", texto: "Tabela de registro manual ou via app de todas as reclamações por tipo de serviço num turno." },
      { kpi: "TDNA", texto: "Checklist para garantir a correta sincronização e conclusão dos parâmetros exigidos pelo aplicativo TDNA." }
    ]
  },
  {
    nome: "Fluxograma",
    icone: <Layers className="w-5 h-5" />,
    descricao: "Representação visual passo a passo de um processo, mostrando a ordem e a relação das etapas.",
    aplicacoes: [
      { kpi: "IRR", texto: "Mapear o processo de volta da Ordem de Serviço, do técnico até a central, buscando gargalos." },
      { kpi: "IFI", texto: "Desenhar a jornada de ativação de cliente para encontrar onde falhas de sistema causam defeito." },
      { kpi: "IRT", texto: "Modelar o atendimento de call center nível 1 até a passagem para o técnico de campo." },
      { kpi: "TDNA", texto: "Compreender os passos de teste de equipamento que o técnico realiza em campo." }
    ]
  },
  {
    nome: "Histograma",
    icone: <Activity className="w-5 h-5" />,
    descricao: "Gráfico de barras que mostra a distribuição e variação de um conjunto de dados contínuos.",
    aplicacoes: [
      { kpi: "IRR", texto: "Analisar a distribuição de chamados repetidos de acordo com dias da semana." },
      { kpi: "IFI", texto: "Visualizar a variação do IFI nos primeiros 7 dias, mensurando o pico de falhas após a venda." },
      { kpi: "IRT", texto: "Verificar tempo médio de atendimento e sua variância para cada equipe." },
      { kpi: "TDNA", texto: "Distribuição dos tempos que técnicos levam para aprovar o teste TDNA via sistema." }
    ]
  },
  {
    nome: "Gráfico de Controle",
    icone: <Target className="w-5 h-5" />,
    descricao: "Gráfico linear com limites estatísticos superior e inferior que mostram se o processo está sob controle.",
    aplicacoes: [
      { kpi: "IRR", texto: "Acompanhar a meta de IRR (10%), investigando causas se um dia cruzar o limite de controle." },
      { kpi: "IFI", texto: "Monitoramento diário para assegurar que a meta teto de 4% de IFI não é ultrapassada." },
      { kpi: "IRT", texto: "Avaliar se o volume de reclamações está estável e se os esforços (meta 1.2) surtem efeito." },
      { kpi: "TDNA", texto: "Acompanhar picos fora do padrão onde meta (5) de testes completos não são alcançados." }
    ]
  },
  {
    nome: "Diagrama de Dispersão",
    icone: <Box className="w-5 h-5" />,
    descricao: "Gráfico cartesiano para identificar o possível relacionamento entre duas variáveis.",
    aplicacoes: [
      { kpi: "IRR", texto: "Correlacionar tempo de experiência técnico vs índice de reparos repetidos das suas OS." },
      { kpi: "IFI", texto: "Cruzamento do uso de materiais novos X aumento do indicador de falha de instalação." },
      { kpi: "IRT", texto: "Correlacionar chuvas intensas com aumento de reclamações na rede metálica ou gpon." },
      { kpi: "TDNA", texto: "Avaliar relação entre tempo gasto em execução do teste TDNA vs. taxa de sucesso do teste." }
    ]
  }
];

export default function FerramentasPage() {
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text('Análises das Ferramentas de Gestão da Qualidade', 14, 15);
    
    const tableColumn = ["Ferramenta", "Conceito", "Aplicações (Vivo)"];
    const tableRows = ferramentas.map(f => [
      f.nome,
      f.descricao,
      f.aplicacoes.map(a => `${a.kpi}: ${a.texto}`).join('\n')
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      styles: { fontSize: 8 },
      columnStyles: {
        0: { cellWidth: 40 },
        1: { cellWidth: 70 },
        2: { cellWidth: 70 }
      }
    });
    
    doc.save('ferramentas_qualidade.pdf');
  };

  return (
    <main className="max-w-5xl mx-auto px-6 py-12 space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-amber-500 rounded flex items-center justify-center">
            <Wrench className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">7 Ferramentas da Qualidade</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Metodologias aplicadas na gestão e análise dos indicadores IRR, IFI, IRT e TDNA.</p>
          </div>
        </div>
        <button 
          onClick={handleExportPDF}
          className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
        >
          <Download className="w-4 h-4" />
          <span>Exportar PDF</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ferramentas.map((ferramenta, index) => (
          <div key={index} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-500 rounded">
                {ferramenta.icone}
              </div>
              <h2 className="font-bold text-slate-800 dark:text-slate-200 text-sm leading-tight">{ferramenta.nome}</h2>
            </div>
            <div className="space-y-3">
              <div>
                <h3 className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider mb-1">Conceito</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300">{ferramenta.descricao}</p>
              </div>
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                <h3 className="text-[10px] uppercase font-bold text-[#660099] dark:text-[#a855f7] tracking-wider mb-2">Aplicações (Vivo)</h3>
                <div className="space-y-2">
                  {ferramenta.aplicacoes.map((app, i) => (
                    <div key={i} className="flex space-x-2">
                      <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded uppercase">{app.kpi}</span>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 leading-snug">{app.texto}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
