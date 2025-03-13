import styles from "@components/CoinList/CoinList.module.css"
import { useSelector } from "react-redux";
import { formatCurrency } from "@/utils/formatCurrency";

const selectTopCoinsUSD = (state) => state.coinData.topCoinsUSD;
export default function CoinList({setSelectedCoin}) {
  const topCoinsUSD = useSelector(selectTopCoinsUSD);
  return(
    <>
      <section className={`coinList ${styles.coinList}`}>
        <h3 className={`coinList__title ${styles.coinListTitle}`}>Today's Cryptocurrency Prices</h3>
        <table className={`coinList__table ${styles.coinListTable}`}>
          <thead>
            <tr>
              <th>
                <div>NAME</div>
              </th>
              <th>
                <div>PRICE</div>
              </th>
              <th>
                <div>24H CHANGE</div>
              </th>
            </tr>
          </thead>
          <tbody>
          {topCoinsUSD.map((coin) => (
            <tr key={coin.id} onClick={() =>setSelectedCoin(coin.id)}>
              <td>
                <div className={`coinList__name ${styles.coinListName}`}>
                  <img src={coin.image} alt="icon" />
                  <span>{coin.name}</span>
                </div>
              </td>
              <td>
                <div>{`$${formatCurrency(coin.current_price)}`}</div>
              </td>
              <td>
                <div className={(coin.price_change_percentage_24H.includes("-")) ? 'price-down' : (coin.price_change_percentage_24H.includes("0.00")) ? `` : 'price-up'}>
                  {coin.price_change_percentage_24H
                }%</div>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </section>
    </>
  )
}