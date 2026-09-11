function AudioPlayer({ audioUrl }) {
  if (!audioUrl) return null;

  return (
    <div className="audio-player-wrap">
      <audio controls src={audioUrl}>
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

export default AudioPlayer;