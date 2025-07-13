export default function Loader({ isLoading = false, children }) {
  if (!isLoading) return;
  return (
    <div className="loading_page">
      <div className="loding_main">
        <h6 className="loading_text">Loading</h6>
        <span className="loading_dot dot1">.</span>
        <span className="loading_dot dot2">.</span>
        <span className="loading_dot dot3">.</span>
      </div>
      <div className="loading_body">{children}</div>
    </div>
  );
}
