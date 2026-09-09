function VoiceSelector({ voices, value, onChange }) {
  return (
    <div className="select-group">
      <label htmlFor="voice-select">Voice</label>
      <select id="voice-select" value={value} onChange={(e) => onChange(e.target.value)}>
        {voices.map((v) => (
          <option key={v.id} value={v.id}>
            {v.name} ({v.gender})
          </option>
        ))}
      </select>
    </div>
  );
}

export default VoiceSelector;