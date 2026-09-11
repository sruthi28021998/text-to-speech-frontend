function DownloadButton({ audioUrl }) {
  if (!audioUrl) return null;

  return (
    <a className="download-btn" href={audioUrl} download>
      Download Audio
    </a>
  );
}

export default DownloadButton;