function GenerateButton({ onClick, loading, disabled }) {
  return (
    <button className="generate-btn" onClick={onClick} disabled={disabled || loading}>
      {loading ? "Generating..." : "Generate Speech"}
    </button>
  );
}

export default GenerateButton;