export default function Loader({ isLoading = false }) {
  if (!isLoading) return;
  return (
    <div className="loading_page">
      <h6 className="loading_text">Loading</h6>
      <span className="loading_dot">.</span>
      <span className="loading_dot">.</span>
      <span className="loading_dot">.</span>
    </div>
  );
}
