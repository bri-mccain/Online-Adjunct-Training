import type { MetricKey, Scores, SimulationData } from '../types';

const labelMap: Record<MetricKey, string> = {
  instructorPresence: 'Instructor Presence',
  responsiveness: 'Responsiveness',
  feedbackQuality: 'Feedback Quality',
  policyCompliance: 'Policy Compliance',
  studentExperience: 'Student Experience',
};

export function generateStrengthsAndImprovements(
  data: SimulationData,
  scores: Scores,
): { strengths: string[]; improvements: string[] } {
  const { green, red } = data.engine.dashboardThresholds;

  const strengths = (Object.keys(scores) as MetricKey[])
    .filter((k) => scores[k] >= green.min)
    .map((k) => `${labelMap[k]} (${scores[k]})`);

  const improvements = (Object.keys(scores) as MetricKey[])
    .filter((k) => scores[k] <= red.max)
    .map((k) => `${labelMap[k]} (${scores[k]})`);

  return { strengths, improvements };
}
