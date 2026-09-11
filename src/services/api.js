import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  timeout: 20000,
});

export async function fetchVoices(language) {
  const response = await api.get("/voices", { params: language ? { language } : {} });
  return response.data.voices;
}

export async function generateSpeech({ text, language, voice }) {
  const response = await api.post("/tts", { text, language, voice });
  return {
    audioUrl: response.data.audioUrl,
    translatedText: response.data.translatedText,
  };
}

export function extractErrorMessage(error) {
  if (error.response && error.response.data && error.response.data.error) {
    return error.response.data.error;
  }
  if (error.code === "ECONNABORTED") {
    return "The request timed out. Please try again.";
  }
  if (error.message === "Network Error") {
    return "Could not reach the server. Check your connection and try again.";
  }
  return "Something went wrong. Please try again.";
}