const LoadingScreen = () => {
  return (
    <div className="flex bg-secondary dark:bg-[#fff] flex-col gap-10 w-full h-screen justify-center items-center">
      <h1 className="text-primary font-jockey font-normal text-7xl">
        EDUQUICK
      </h1>
      <div className="w-32 h-32 animate-spin rounded-full border-t-4 border-[#e70612]" />
    </div>
  );
};

export default LoadingScreen;
