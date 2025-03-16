import styles from "@components/CoinDetail/CoinDetail.module.css"
import Chart from "@components/Chart/Chart"
import { useSelector, shallowEqual, useDispatch } from "react-redux"
import { createSelector } from 'reselect'
import { useEffect, useRef, useState } from "react";
import { formatCurrency } from "@/utils/formatCurrency";
import { coinPriceData } from "@/redux/store";
import Crypto from "@api/crypto";
import { useError } from "@/context/ErrorContext";
import Error from "@components/Error/Error";
import ChartLoading from "@components/ChartLoading/ChartLoading";

const selectTopCoins = (currency) => createSelector(
  (state) => state.coinData[`topCoins${currency}`],
  (topCoins) => Object.fromEntries(topCoins.map((coin) => [coin.id, coin]))
)
export default function CoinDetail({ selectedCoin }) {
  const [selectedTime, setSelectedTime] = useState('24H');
  const [loading, setLoading] = useState(false);
  const { errorMessage, updateError } = useError();
  const timeOptions = ['24H', '7D'];
  const topCoinsBTC = useSelector(selectTopCoins("BTC"));
  const topCoinsUSD = useSelector(selectTopCoins("USD"));
  const selectedCoinBTC = topCoinsBTC[selectedCoin];
  const selectedCoinUSD = topCoinsUSD[selectedCoin];
  const { name: nameUSD, symbol: symbolUSD, current_price: current_priceUSD } = selectedCoinUSD;
  const { current_price: current_priceBTC } = selectedCoinBTC;
  const priceChangeClass = (selectedCoinUSD[`price_change_percentage_${selectedTime}`].includes("-")) ? `price-down` :
  (selectedCoinUSD[`price_change_percentage_${selectedTime}`].includes("0.00")) ? `` : `price-up`;
  const btcChangeClass = (selectedCoinBTC[`price_change_percentage_${selectedTime}`].includes("-")) ? `price-down`: 
  (selectedCoinBTC[`price_change_percentage_${selectedTime}`].includes("0.00")) ? `` : `price-up`;
  const handleButtonClick = (time) => setSelectedTime(time);
  const isFirstRender = useRef(true);
  const dispatch = useDispatch();
  useEffect(() => {
    if(isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const fetchPriceData = async () => {
      const crypto = new Crypto(updateError);
      const data = await crypto.fetchDaysDataForCoins(selectedCoin, selectedTime);
      if(data !== null) dispatch(coinPriceData(data));
      setLoading(false);
    }
    setLoading(true);
    fetchPriceData();
  }, [selectedTime, selectedCoin])
  return (
    <>
      {(errorMessage) && <Error />}
      <section className={`${styles.coinDetail} coinDetail`}>
        <header className={`${styles.coinDetailHeader} coinDetail__header`}>
          <h2 className={`${styles.coinDetailTitle} coinDetail__title`}>{nameUSD} <span className={`${styles.coinDetailTicker} coinDetail__ticker`}>{symbolUSD}</span></h2>
          <div className={`${styles.coinDetailPrice} coinDetail__price`}>
            <div className={`${styles.priceWrapper} coinDetail__price-wrapper`}>
              <h3 className={`${styles.priceValue} coinDetail__price-value`}>${formatCurrency(current_priceUSD)} USD</h3>
              <span className={`${styles.priceChange} coinDetail__price-change`}>
                <span className={`${styles.pricePercentage} ${priceChangeClass} coinDetail__price-percentage`}>
                  {selectedCoinUSD[`price_change_percentage_${selectedTime}`]}%
                </span>
                <span className={`${styles.priceTime} coinDetail__price-time`}>{`(${selectedTime})`}</span>
              </span>
            </div>
            <div className={`${styles.btcWrapper} coinDetail__btc-wrapper`}>
              <span className={`${styles.btcValue} coinDetail__btc-value`}>{current_priceBTC} BTC</span>
              <span className={`coinDetail__btc-change ${styles.btcChange}`}>
                <span className={`${styles.btcPercentage} ${btcChangeClass} coinDetail__btc-percentage`}>
                  {selectedCoinBTC[`price_change_percentage_${selectedTime}`]}%</span> 
                <span className={`${styles.btcTime} coinDetail__btc-time`}>{`(${selectedTime})`}</span>
              </span>
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
          {loading ? <ChartLoading /> : <Chart selectedTime={selectedTime}/>}
        </article>
      </section>
    </>
  )
}