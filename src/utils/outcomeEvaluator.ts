import type { EvaluationResult, Scores, SimulationData, TriggerMap } from '../types';

export function evaluateOutcome(
  data: SimulationData,
  scores: Scores,
  triggers: TriggerMap,
): EvaluationResult {
  const thresholds = data.engine.dashboardThresholds;
  const values = Object.values(scores);
  const redCount = values.filter(
    (v) => v >= thresholds.red.min && v <= thresholds.red.max,
  ).length;

  const majorViolation = data.evaluation.majorPolicyViolationTriggers.some((key) => triggers[key]);
  const onTime = Boolean(triggers[data.evaluation.requiredOnTimeTrigger]);

  if (
    redCount >= data.evaluation.redCategoryThresholdCountForFailure ||
    majorViolation ||
    (!onTime && redCount > 0)
  ) {
    const o = data.evaluation.outcomes.find((x) => x.id === 'not_recommended') ?? data.evaluation.outcomes[0];
    return { id: o.id, label: o.label, message: o.message };
  }

  const greenCount = values.filter(
    (v) => v >= thresholds.green.min && v <= thresholds.green.max,
  ).length;

  if (onTime && !majorViolation && greenCount >= 3) {
    const o = data.evaluation.outcomes.find((x) => x.id === 'recommended') ?? data.evaluation.outcomes[0];
    return { id: o.id, label: o.label, message: o.message };
  }

  const fallback = data.evaluation.outcomes.find((x) => x.id === 'conditional') ?? data.evaluation.outcomes[0];
  return { id: fallback.id, label: fallback.label, message: fallback.message };
}
