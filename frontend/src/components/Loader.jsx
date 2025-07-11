export default function Loader({ isLoading = false }) {
  if (!isLoading) return;
  return (
    <div>
      <h6>loading data...</h6>
    </div>
  );
}
