import styles from "@components/LoadingSpinner/LoadingSpinner.module.css";

const LoadingSpinner = () => {
  return (
    <div className={styles.loadingWrapper}>
      <div className={styles.spinner}></div>
      <p>Loading...</p>
    </div>
  );
};

export default LoadingSpinner;