const LoadingScreen = () => {
  return (
    <div className="bg-[#1d1b1b] h-screen text-white text-[1.5rem] flex items-center justify-center z-50 gap-[1rem]">
      Loading
      <lord-icon
        src="https://cdn.lordicon.com/ktsahwvc.json"
        trigger="loop"
        state="loop-transparency"
        colors="primary:#ffffff"
      ></lord-icon>
    </div>
  );
};

export default LoadingScreen;
