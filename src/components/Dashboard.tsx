import type { MetricKey, Scores, SimulationData } from '../types';

const labels: Record<MetricKey, string> = {
  instructorPresence: 'Instructor Presence',
  responsiveness: 'Responsiveness',
  feedbackQuality: 'Feedback Quality',
  policyCompliance: 'Policy Compliance',
  studentExperience: 'Student Experience',
};

function colorFor(value: number, data: SimulationData): string {
  if (value >= data.engine.dashboardThresholds.green.min) return '#16a34a';
  if (value >= data.engine.dashboardThresholds.yellow.min) return '#eab308';
  return '#dc2626';
}

export function Dashboard({ scores, data }: { scores: Scores; data: SimulationData }) {
  return (
    <section style={{ background: '#fff', borderRadius: 12, padding: 16 }}>
      <h4 style={{ marginTop: 0 }}>Performance Dashboard</h4>
      <div style={{ display: 'grid', gap: 8 }}>
        {(Object.keys(scores) as MetricKey[]).map((k) => {
          const value = scores[k];
          return (
            <div key={k}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                <span>{labels[k]}</span>
                <strong>{value}</strong>
              </div>
              <div style={{ height: 10, background: '#e5e7eb', borderRadius: 999 }}>
                <div style={{ width: `${value}%`, height: '100%', borderRadius: 999, background: colorFor(value, data) }} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
