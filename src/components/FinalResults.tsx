import type { EvaluationResult, Scores, SimulationData } from '../types';
import { Dashboard } from './Dashboard';
import { generateStrengthsAndImprovements } from '../utils/summaryGenerator';

interface Props {
  outcome: EvaluationResult;
  scores: Scores;
  data: SimulationData;
  onRestart: () => void;
}

export function FinalResults({ outcome, scores, data, onRestart }: Props) {
  const { strengths, improvements } = generateStrengthsAndImprovements(data, scores);

  return (
    <section style={{ display: 'grid', gap: 12 }}>
      <div style={{ background: '#fff', borderRadius: 12, padding: 16 }}>
        <h2 style={{ marginTop: 0 }}>{outcome.label}</h2>
        <p>{outcome.message}</p>
        <button onClick={onRestart} style={{ background: '#111827', color: '#fff', border: 0, borderRadius: 8, padding: '0.6rem 1rem' }}>
          Restart Simulation
        </button>
      </div>
      <Dashboard scores={scores} data={data} />
      <div style={{ display: 'grid', gap: 10, gridTemplateColumns: '1fr 1fr' }}>
        <div style={{ background: '#ecfdf5', borderRadius: 12, padding: 12 }}>
          <h4 style={{ marginTop: 0 }}>Strengths</h4>
          <ul>{strengths.length ? strengths.map((s) => <li key={s}>{s}</li>) : <li>No standout strengths identified.</li>}</ul>
        </div>
        <div style={{ background: '#fef2f2', borderRadius: 12, padding: 12 }}>
          <h4 style={{ marginTop: 0 }}>Areas for Improvement</h4>
          <ul>{improvements.length ? improvements.map((s) => <li key={s}>{s}</li>) : <li>No critical gaps identified.</li>}</ul>
        </div>
      </div>
    </section>
  );
}
