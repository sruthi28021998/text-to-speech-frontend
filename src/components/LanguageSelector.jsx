function LanguageSelector({ languages, value, onChange }) {
  return (
    <div className="select-group">
      <label htmlFor="language-select">Language</label>
      <select id="language-select" value={value} onChange={(e) => onChange(e.target.value)}>
        {languages.map((lang) => (
          <option key={lang.language} value={lang.language}>
            {lang.languageLabel}
          </option>
        ))}
      </select>
    </div>
  );
}

export default LanguageSelector;