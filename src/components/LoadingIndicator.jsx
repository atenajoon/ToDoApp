const LoadingIndicator = ({ isLoading }) => {
  return isLoading && <h1>Hey some async call in progress ! </h1>;
};

export default LoadingIndicator;
