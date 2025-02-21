import logo from "@assets/images/logo_48.png"
import styles from "@components/Header/Header.module.css"
export default function Header() {
  return(
    <>
      <header className={`${styles.header} header`}>
        <h1>CoinWise</h1>
        <img src={logo} alt="logo" />
      </header>
    </>
  )
}