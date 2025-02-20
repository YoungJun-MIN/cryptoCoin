import logo from "@assets/images/logo_48.png"
export default function Header() {
  return(
    <>
      <header>
        <h1>CoinWise</h1>
        <img src={logo} alt="logo" />
      </header>
    </>
  )
}