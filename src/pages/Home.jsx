import { useEffect, useMemo, useState } from "react";
import TextInput, { MAX_CHARS } from "../components/TextInput";
import LanguageSelector from "../components/LanguageSelector";
import VoiceSelector from "../components/VoiceSelector";
import GenerateButton from "../components/GenerateButton";
import AudioPlayer from "../components/AudioPlayer";
import ErrorMessage from "../components/ErrorMessage";
import DownloadButton from "../components/DownloadButton";
import { fetchVoices, generateSpeech, extractErrorMessage } from "../services/api";

function Home() {
  const [allVoices, setAllVoices] = useState([]);
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("");
  const [voice, setVoice] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [voicesLoading, setVoicesLoading] = useState(true);

  useEffect(() => {
    async function loadVoices() {
      try {
        const voices = await fetchVoices();
        setAllVoices(voices);
        if (voices.length > 0) {
          setLanguage(voices[0].language);
          setVoice(voices[0].id);
        }
      } catch (err) {
        setError(extractErrorMessage(err));
      } finally {
        setVoicesLoading(false);
      }
    }
    loadVoices();
  }, []);

  const languages = useMemo(() => {
    const seen = new Set();
    return allVoices.filter((v) => {
      if (seen.has(v.language)) return false;
      seen.add(v.language);
      return true;
    });
  }, [allVoices]);

  const voicesForLanguage = useMemo(
    () => allVoices.filter((v) => v.language === language),
    [allVoices, language]
  );

  function handleLanguageChange(newLanguage) {
    setLanguage(newLanguage);
    const firstVoice = allVoices.find((v) => v.language === newLanguage);
    setVoice(firstVoice ? firstVoice.id : "");
  }

  async function handleGenerate() {
    setError("");

    if (text.trim().length === 0) {
      setError("Please enter some text before generating speech.");
      return;
    }
    if (text.length > MAX_CHARS) {
      setError(`Text exceeds the maximum allowed length of ${MAX_CHARS} characters.`);
      return;
    }
    if (!voice) {
      setError("Please select a voice.");
      return;
    }

    setLoading(true);
    setAudioUrl("");
    try {
      const url = await generateSpeech({ text, language, voice });
      setAudioUrl(url);
    } catch (err) {
      setError(extractErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app-shell">
      <h1 className="app-title">Text to Speech</h1>

      <ErrorMessage message={error} />

      <div className="card">
        <TextInput value={text} onChange={setText} />

        <div className="selectors-row">
          <LanguageSelector languages={languages} value={language} onChange={handleLanguageChange} />
          <VoiceSelector voices={voicesForLanguage} value={voice} onChange={setVoice} />
        </div>

        <GenerateButton
          onClick={handleGenerate}
          loading={loading}
          disabled={voicesLoading || allVoices.length === 0}
        />
      </div>

      {audioUrl && (
        <div className="card">
          <h3>Generated Audio</h3>
          <AudioPlayer audioUrl={audioUrl} />
          <DownloadButton audioUrl={audioUrl} />
        </div>
  )}
    </div>
  );
}

export default Home;