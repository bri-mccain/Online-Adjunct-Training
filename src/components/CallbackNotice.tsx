export function CallbackNotice({ events }: { events: string[] }) {
  if (!events.length) return null;
  return (
    <section style={{ background: '#fff7ed', border: '1px solid #fdba74', borderRadius: 10, padding: 12 }}>
      <h4 style={{ marginTop: 0 }}>Carry-forward Notes</h4>
      <ul style={{ marginBottom: 0 }}>
        {events.map((event, i) => (
          <li key={`${event}-${i}`}>{event}</li>
        ))}
      </ul>
    </section>
  );
}
