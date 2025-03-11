import styles from "./ChartLoading.module.css";

const ChartLoading = () => {
  return (
    <div className={styles.chartLoading}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default ChartLoading;