import type { Choice, Phase, Scene, Scores, SimulationData } from '../types';
import { CallbackNotice } from './CallbackNotice';
import { ChoiceList } from './ChoiceList';
import { Dashboard } from './Dashboard';
import { FeedbackPanel } from './FeedbackPanel';
import { SceneCard } from './SceneCard';

interface Props {
  phase: Phase;
  scene: Scene;
  prePhaseEvents: string[];
  scores: Scores;
  data: SimulationData;
  feedback: string | null;
  conditionalMessage: string | null;
  onChoose: (choice: Choice) => void;
  onContinue: () => void;
  carryForwardEvents: string[];
}

export function SimulationPlayer({
  phase,
  scene,
  prePhaseEvents,
  scores,
  data,
  feedback,
  conditionalMessage,
  onChoose,
  onContinue,
  carryForwardEvents,
}: Props) {
  return (
    <section style={{ display: 'grid', gap: 12 }}>
      <article style={{ background: '#fff', borderRadius: 12, padding: 16 }}>
        <h2 style={{ marginTop: 0 }}>{phase.title}</h2>
        <p><strong>Goal:</strong> {phase.goal}</p>
        <p>{phase.introText}</p>
      </article>

      {prePhaseEvents.length ? (
        <article style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: 12, padding: 16 }}>
          <h4 style={{ marginTop: 0 }}>Phase Events</h4>
          <ul style={{ marginBottom: 0 }}>
            {prePhaseEvents.map((event, i) => (
              <li key={`${event}-${i}`}>{event}</li>
            ))}
          </ul>
        </article>
      ) : null}

      <SceneCard scene={scene} />
      <ChoiceList choices={scene.choices} onSelect={onChoose} disabled={Boolean(feedback)} />
      {feedback ? <FeedbackPanel feedback={feedback} conditionalMessage={conditionalMessage} onContinue={onContinue} /> : null}
      <CallbackNotice events={carryForwardEvents} />
      <Dashboard scores={scores} data={data} />
    </section>
  );
}
