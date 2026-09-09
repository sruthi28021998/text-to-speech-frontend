const MAX_CHARS = 2000;

function TextInput({ value, onChange }) {
  const charCount = value.length;
  const wordCount = value.trim().length === 0 ? 0 : value.trim().split(/\s+/).length;
  const overLimit = charCount > MAX_CHARS;

  return (
    <div>
      <textarea
        className="text-input"
        placeholder="Enter or paste the text you want to convert to speech..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className={`meta-row ${overLimit ? "over-limit" : ""}`}>
        <span>Words: {wordCount}</span>
        <span>
          Characters: {charCount} / {MAX_CHARS}
        </span>
      </div>
    </div>
  );
}

export default TextInput;
export { MAX_CHARS };