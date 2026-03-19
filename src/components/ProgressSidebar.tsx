import type { DecisionRecord, Phase } from '../types';

interface Props {
  phases: Phase[];
  currentPhaseIndex: number;
  currentSceneIndex: number;
  history: DecisionRecord[];
}

export function ProgressSidebar({ phases, currentPhaseIndex, currentSceneIndex, history }: Props) {
  return (
    <aside style={{ background: '#fff', borderRadius: 12, padding: 16 }}>
      <h4 style={{ marginTop: 0 }}>Progress</h4>
      <ol>
        {phases.map((phase, idx) => (
          <li key={phase.id} style={{ marginBottom: 8, color: idx === currentPhaseIndex ? '#2563eb' : '#111827' }}>
            {phase.title}
            {idx === currentPhaseIndex ? ` (Scene ${currentSceneIndex + 1})` : ''}
          </li>
        ))}
      </ol>
      <p style={{ fontSize: 14, color: '#4b5563' }}>Decisions made: {history.length}</p>
    </aside>
  );
}
