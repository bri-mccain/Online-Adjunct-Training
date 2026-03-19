import type { Scene } from '../types';

export function SceneCard({ scene }: { scene: Scene }) {
  return (
    <article style={{ background: '#fff', borderRadius: 12, padding: 20 }}>
      <h3 style={{ marginTop: 0 }}>{scene.title}</h3>
      <p style={{ lineHeight: 1.5 }}>{scene.prompt}</p>
    </article>
  );
}
