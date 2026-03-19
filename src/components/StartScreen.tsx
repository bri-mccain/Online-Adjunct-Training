interface Props {
  title: string;
  description: string;
  institution: string;
  onStart: () => void;
}

export function StartScreen({ title, description, institution, onStart }: Props) {
  return (
    <section style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
      <h2 style={{ marginTop: 0 }}>{title}</h2>
      <p>{description}</p>
      <p><strong>Institution:</strong> {institution}</p>
      <button onClick={onStart} style={{ background: '#2563eb', color: '#fff', border: 0, padding: '0.7rem 1rem', borderRadius: 8, cursor: 'pointer' }}>
        Start Simulation
      </button>
    </section>
  );
}
