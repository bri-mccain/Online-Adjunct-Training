import { useMemo, useState } from 'react';
import type { Choice, Condition, DecisionRecord, Phase, Scene, Scores, SimulationData, TriggerMap } from '../types';
import { evaluateOutcome } from '../utils/outcomeEvaluator';

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

function checkCondition(condition: Condition | undefined, triggers: TriggerMap, selectedChoiceId?: string): boolean {
  if (!condition) return true;

  if (condition.triggerEquals) {
    for (const [key, value] of Object.entries(condition.triggerEquals)) {
      if (Boolean(triggers[key]) !== value) return false;
    }
  }

  if (condition.choiceIn && selectedChoiceId) {
    if (!condition.choiceIn.includes(selectedChoiceId)) return false;
  } else if (condition.choiceIn && !selectedChoiceId) {
    return false;
  }

  if (condition.all) {
    return condition.all.every((c) => checkCondition(c, triggers, selectedChoiceId));
  }

  if (condition.any) {
    return condition.any.some((c) => checkCondition(c, triggers, selectedChoiceId));
  }

  return true;
}

export function useSimulationState(data: SimulationData) {
  const [started, setStarted] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [scores, setScores] = useState<Scores>(data.engine.startingScores);
  const [triggers, setTriggers] = useState<TriggerMap>(Object.fromEntries(data.triggers.map((t) => [t, false])));
  const [history, setHistory] = useState<DecisionRecord[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [conditionalMessage, setConditionalMessage] = useState<string | null>(null);
  const [phaseDone, setPhaseDone] = useState(false);
  const [completed, setCompleted] = useState(false);

  const currentPhase: Phase | undefined = data.phases[phaseIndex];
  const visibleScenes = useMemo(
    () => (currentPhase ? currentPhase.scenes.filter((s) => checkCondition(s.showIf, triggers)) : []),
    [currentPhase, triggers],
  );
  const currentScene: Scene | undefined = visibleScenes[sceneIndex];

  const prePhaseEvents = useMemo(
    () => (currentPhase ? currentPhase.prePhaseEvents.filter((e) => checkCondition(e.if, triggers)) : []),
    [currentPhase, triggers],
  );

  const carryForwardEvents = useMemo(
    () =>
      data.phases
        .flatMap((phase) => (phase.carryForward ?? []).filter((c) => checkCondition(c.if, triggers)).map((c) => c.effect)),
    [data.phases, triggers],
  );

  function begin() {
    setStarted(true);
  }

  function choose(choice: Choice) {
    if (!currentScene) return;

    const { min, max } = data.engine.scoreRange;
    setScores((prev) => {
      const next = { ...prev };
      for (const [k, delta] of Object.entries(choice.effects)) {
        const key = k as keyof Scores;
        next[key] = clamp(next[key] + (delta ?? 0), min, max);
      }

      currentScene.conditionalEffects?.forEach((ce) => {
        if (checkCondition(ce.if, triggers, choice.id)) {
          for (const [k, delta] of Object.entries(ce.additionalEffects)) {
            const key = k as keyof Scores;
            next[key] = clamp(next[key] + (delta ?? 0), min, max);
          }
        }
      });

      return next;
    });

    if (choice.setTriggers) {
      setTriggers((prev) => ({ ...prev, ...choice.setTriggers }));
    }

    setFeedback(choice.feedback);
    const matchedMessage = currentScene.conditionalMessages?.find((m) => checkCondition(m.if, { ...triggers, ...(choice.setTriggers ?? {}) }, choice.id));
    setConditionalMessage(matchedMessage?.message ?? null);

    setHistory((prev) => [
      ...prev,
      {
        phaseId: currentPhase!.id,
        sceneId: currentScene.id,
        sceneTitle: currentScene.title,
        choiceId: choice.id,
        choiceText: choice.text,
        feedback: choice.feedback,
      },
    ]);
  }

  function next() {
    setFeedback(null);
    setConditionalMessage(null);

    if (!currentPhase) return;
    const nextSceneIndex = sceneIndex + 1;
    if (nextSceneIndex < visibleScenes.length) {
      setSceneIndex(nextSceneIndex);
      return;
    }

    setPhaseDone(true);
  }

  function continueFromPhaseSummary() {
    setPhaseDone(false);
    if (phaseIndex + 1 < data.phases.length) {
      setPhaseIndex((p) => p + 1);
      setSceneIndex(0);
    } else {
      setCompleted(true);
    }
  }

  function restart() {
    setStarted(false);
    setPhaseIndex(0);
    setSceneIndex(0);
    setScores(data.engine.startingScores);
    setTriggers(Object.fromEntries(data.triggers.map((t) => [t, false])));
    setHistory([]);
    setFeedback(null);
    setConditionalMessage(null);
    setPhaseDone(false);
    setCompleted(false);
  }

  const outcome = evaluateOutcome(data, scores, triggers);

  return {
    started,
    begin,
    currentPhase,
    currentScene,
    phaseIndex,
    sceneIndex,
    prePhaseEvents,
    scores,
    triggers,
    history,
    feedback,
    conditionalMessage,
    choose,
    next,
    phaseDone,
    continueFromPhaseSummary,
    completed,
    outcome,
    carryForwardEvents,
    restart,
  };
}
