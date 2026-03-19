import type { Choice } from '../types';

interface Props {
  choices: Choice[];
  disabled: boolean;
  onSelect: (choice: Choice) => void;
}

export function ChoiceList({ choices, onSelect, disabled }: Props) {
  return (
    <div style={{ display: 'grid', gap: 10 }}>
      {choices.map((choice) => (
        <button
          key={choice.id}
          disabled={disabled}
          onClick={() => onSelect(choice)}
          style={{ textAlign: 'left', border: '1px solid #d1d5db', borderRadius: 10, padding: 12, background: disabled ? '#f9fafb' : '#fff', cursor: disabled ? 'not-allowed' : 'pointer' }}
        >
          <strong>{choice.id}.</strong> {choice.text}
        </button>
      ))}
    </div>
  );
}
