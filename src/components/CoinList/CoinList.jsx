import styles from "@components/CoinList/CoinList.module.css"
import { useDispatch, useSelector } from "react-redux";
const selectTopCoinsUSD = (state) => state.coinData.topCoinsUSD;
export default function CoinList({setSelectedCoin}) {
  const topCoinsUSD = useSelector(selectTopCoinsUSD);
  return(
    <>
      <section className={`${styles.coinList}`}>
        <h3>CoinList</h3>
        {topCoinsUSD.map((coin) => (
          <button key={coin.id} onClick={() =>setSelectedCoin(coin.id)}>{coin.id}</button>
        ))}
      </section>
    </>
  )
}