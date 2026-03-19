interface Props {
  feedback: string;
  conditionalMessage?: string | null;
  onContinue: () => void;
}

export function FeedbackPanel({ feedback, conditionalMessage, onContinue }: Props) {
  return (
    <section style={{ background: '#ecfeff', border: '1px solid #a5f3fc', borderRadius: 12, padding: 16 }}>
      <h4 style={{ marginTop: 0 }}>Feedback</h4>
      <p>{feedback}</p>
      {conditionalMessage ? <p style={{ color: '#7c2d12' }}>{conditionalMessage}</p> : null}
      <button onClick={onContinue} style={{ background: '#0f766e', color: '#fff', border: 0, padding: '0.6rem 1rem', borderRadius: 8 }}>
        Continue
      </button>
    </section>
  );
}
