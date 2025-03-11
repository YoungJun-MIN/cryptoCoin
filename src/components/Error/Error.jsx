import styles from "./Error.module.css"
import { useError } from "@/context/ErrorContext";
export default function Error() {
  const { updateError } = useError();
  return(
    <>
      <section className={`error ${styles.error}`}>
        <div className={`error__content ${styles.errorContent}`}>
            <h2 className={`error__title ${styles.errorTitle}`}>Too Many Request</h2>
            <p className={`error__message ${styles.errorMessage}`}>Please try again in 1 minute</p>
            <button onClick={() => updateError(null)} className={`error__button ${styles.errorButton}`}>Back to home</button>
        </div>
      </section>
    </>
  )
}