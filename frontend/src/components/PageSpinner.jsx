const PageSpinner = ({ label = 'Loading...' }) => (
  <div className="flex min-h-screen items-center justify-center bg-black text-white light-theme:bg-zinc-100 light-theme:text-black">
    <div className="text-center">
      <div className="spinner mx-auto mb-4" />
      <p className="text-sm text-zinc-400">{label}</p>
    </div>
  </div>
);

export default PageSpinner;
