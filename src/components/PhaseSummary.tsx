import type { Phase, Scores } from '../types';
import { Dashboard } from './Dashboard';

interface Props {
  phase: Phase;
  scores: Scores;
  onContinue: () => void;
  simulationData: any;
}

export function PhaseSummary({ phase, scores, onContinue, simulationData }: Props) {
  const avg = Math.round(Object.values(scores).reduce((a, b) => a + b, 0) / Object.keys(scores).length);
  let summary = phase.checkpoint.summaryVariants?.mixed ?? '';
  if (avg >= 75) summary = phase.checkpoint.summaryVariants?.high ?? summary;
  if (avg < 55) summary = phase.checkpoint.summaryVariants?.low ?? summary;

  return (
    <section style={{ display: 'grid', gap: 12 }}>
      <div style={{ background: '#fff', borderRadius: 12, padding: 16 }}>
        <h3 style={{ marginTop: 0 }}>{phase.checkpoint.title}</h3>
        <p>{summary}</p>
        <button onClick={onContinue} style={{ background: '#2563eb', color: '#fff', border: 0, borderRadius: 8, padding: '0.6rem 1rem' }}>
          Continue
        </button>
      </div>
      {phase.checkpoint.showDashboard ? <Dashboard scores={scores} data={simulationData} /> : null}
    </section>
  );
}
