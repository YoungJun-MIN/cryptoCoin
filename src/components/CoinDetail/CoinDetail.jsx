import styles from "@components/CoinDetail/CoinDetail.module.css"
import Chart from "@components/Chart/Chart"
import { useSelector } from "react-redux"
const selectCoinData = (state) => state.coinData;
export default function CoinDetail() {
  const coinData = useSelector(selectCoinData);
  // console.log(`coinData: `, coinData);
  return (
    <section className={`${styles.coinDetail} coinDetail`}>
      <header className="coinDetail__header">
        <h2 className="coinDetail__title">Bitcoin <span className="coinDetail__ticker">BTC</span></h2>
      </header>
      <article className="coinDetail__price">
        <h3 className="coinDetail__price-value">$95,532,58 USD</h3>
        <span className="coinDetail__price-change">-1.26% (24H)</span>
        <p className="coinDetail__btc">
          <span className="coinDetail__btc-value">1.00 BTC</span>
          <span className="coinDetail__btc-change">+0.00% (24H)</span>
        </p>
      </article>
      <article className="coinDetail__timeframe">
        <button className="coinDetail__chart-time">1H</button>
        <button className="coinDetail__chart-time">24H</button>
      </article>
      <article className="coinDetail__chart">
        <Chart />
      </article>
      <article className="coinDetail__stats">
        <div className="coinDetail__stat">
          <span className="coinDetail__stat-label">Market Cap (USD)</span>
          <span className="coinDetail__stat-value">$1,893.97 B</span>
        </div>
        <div className="coinDetail__stat">
          <span className="coinDetail__stat-label">24H VOLUME (USD)</span>
          <span className="coinDetail__stat-value">$15.32 B</span>
        </div>
        <div className="coinDetail__stat">
          <span className="coinDetail__stat-label">Circulating Supply (USD)</span>
          <span className="coinDetail__stat-value">$19.83 M BTC</span>
        </div>
        <div className="coinDetail__stat">
          <span className="coinDetail__stat-label">Max Supply (USD)</span>
          <span className="coinDetail__stat-value">21 M BTC</span>
        </div>
        <div className="coinDetail__stat">
          <span className="coinDetail__stat-label">Total Supply (USD)</span>
          <span className="coinDetail__stat-value">$19.83 M BTC</span>
        </div>
      </article>
    </section>
  )
}