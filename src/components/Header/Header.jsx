import logo from "@assets/images/logo.png"
import styles from "@components/Header/Header.module.css"
export default function Header() {
  return(
    <>
      <header className={`${styles.header} header`}>
        <a className="a-reset" href="#">
          <div className={`${styles.logoContainer} logo-container`}>
            <img src={logo} alt="CoinWise logo" />
            <h1 className={`${styles.header__title} header__title`}>CoinWise</h1>
          </div>
        </a>
        <button className="theme-toggle button-reset">🌙</button>
      </header>
    </>
  )
}