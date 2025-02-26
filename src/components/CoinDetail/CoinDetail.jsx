import styles from "@components/CoinDetail/CoinDetail.module.css"
import Chart from "@components/Chart/Chart"
import { useSelector } from "react-redux"
import { useState } from "react";
const selectCoinData = (state) => state.coinData;
export default function CoinDetail() {
  const coinData = useSelector(selectCoinData);
  const timeOptions = ['1H', '24H'];
  const [selectedTime, setSelectedTime] = useState('24H');
  const handleButtonClick = (time) => {
    setSelectedTime(time);
  }
  return (
    <section className={`${styles.coinDetail} coinDetail`}>
      <header className={`${styles.coinDetailHeader} coinDetail__header`}>
        <h2 className={`${styles.coinDetailTitle} coinDetail__title`}>Bitcoin <span className={`${styles.coinDetailTicker} coinDetail__ticker`}>BTC</span></h2>
        <div className={`${styles.coinDetailPrice} coinDetail__price`}>
          <div className={`${styles.priceWrapper} coinDetail__price-wrapper`}>
            <h3 className={`${styles.priceValue} coinDetail__price-value`}>$95,532,58 USD</h3>
            <span className="coinDetail__price-change">-1.26% (24H)</span>
          </div>
          <div className="coinDetail__btc">
            <span className="coinDetail__btc-value">1.00 BTC</span>
            <span className="coinDetail__btc-change">+0.00% (24H)</span>
          </div>
        </div>
      </header>
      <nav className={`${styles.timeframe} coinDetail__timeframe`}>
        <h2>Bitcoin Price Chart (USD)</h2>
        <div className="coinDetail__chart-time-buttons">
        {timeOptions.map((time) => (
          <button
          key={time}
            onClick={() => handleButtonClick(time)}
            className={`${styles.chartTime} coinDetail__chart-time button-reset ${(selectedTime === time) ? 'active' : ''} `}
          >
            {time}
          </button>
        ))}
        </div>
      </nav>
      <article className={`coinDetail__chart ${styles.coinDetailChart}`}>
        <Chart />
      </article>
    </section>
  )
}