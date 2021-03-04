import { LoadingAnimation } from '../../atoms';

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center fixed top-0 left-0 w-full h-full bg-white">
      <LoadingAnimation />
    </div>
  );
};

export default LoadingPage;
