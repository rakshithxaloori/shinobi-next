const ProgressBar = ({ progress }) => {
  return (
    <div style={{ height: 20, width: "100%" }}>
      <div
        role="progressbar"
        style={{ width: `${progress}%`, fontWeight: "bold" }}
        aria-valuenow={progress}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        {progress < 100 ? `${progress}%` : "Upload complete!"}
      </div>
    </div>
  );
};

export default ProgressBar;
