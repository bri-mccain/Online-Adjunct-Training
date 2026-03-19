import { AppShell } from './components/AppShell';
import { FinalResults } from './components/FinalResults';
import { PhaseSummary } from './components/PhaseSummary';
import { ProgressSidebar } from './components/ProgressSidebar';
import { SimulationPlayer } from './components/SimulationPlayer';
import { StartScreen } from './components/StartScreen';
import { useSimulationState } from './hooks/useSimulationState';
import { simulationData } from './utils/jsonAdapter';

export default function App() {
  const sim = useSimulationState(simulationData);

  return (
    <AppShell title={simulationData.title} subtitle={`${simulationData.institution} • v${simulationData.version}`}>
      {!sim.started ? (
        <StartScreen
          title={simulationData.title}
          description={simulationData.description}
          institution={simulationData.institution}
          onStart={sim.begin}
        />
      ) : sim.completed ? (
        <FinalResults outcome={sim.outcome} scores={sim.scores} data={simulationData} onRestart={sim.restart} />
      ) : sim.phaseDone && sim.currentPhase ? (
        <PhaseSummary
          phase={sim.currentPhase}
          scores={sim.scores}
          onContinue={sim.continueFromPhaseSummary}
          simulationData={simulationData}
        />
      ) : sim.currentPhase && sim.currentScene ? (
        <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'minmax(0, 1fr) 300px' }}>
          <SimulationPlayer
            phase={sim.currentPhase}
            scene={sim.currentScene}
            prePhaseEvents={sim.prePhaseEvents.map((e) => e.display)}
            scores={sim.scores}
            data={simulationData}
            feedback={sim.feedback}
            conditionalMessage={sim.conditionalMessage}
            onChoose={sim.choose}
            onContinue={sim.next}
            carryForwardEvents={sim.carryForwardEvents}
          />
          <ProgressSidebar
            phases={simulationData.phases}
            currentPhaseIndex={sim.phaseIndex}
            currentSceneIndex={sim.sceneIndex}
            history={sim.history}
          />
        </div>
      ) : (
        <p>Loading simulation...</p>
      )}
    </AppShell>
  );
}
