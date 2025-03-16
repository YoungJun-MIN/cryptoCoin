import { useError } from "@/context/ErrorContext";
export default class Crypto {
  constructor(setErrorMessage) {
    this.httpClient = `https://api.coingecko.com/api/v3/coins`;
    this.setErrorMessage = setErrorMessage;
  }
  async fetchInitialData() {
    const topCoinsUSD = await this.#fetchTopCoins();
    const topCoinsBTC = await this.#fetchTopCoins("btc");
    const coinPrice = await this.fetchDaysDataForCoins();
    return {topCoinsUSD, coinPrice, topCoinsBTC};
  }

  async fetchDaysDataForCoins(coinId = 'bitcoin', days = "24H") {
    const api = {
      market_chart: "market_chart",
      vs_currency: "usd",
    }
    const time = {'24H': '1', '7D': '7'};
    days = time[days];
    const { market_chart, vs_currency } = api;
    const url = `${this.httpClient}/${coinId}/market_chart?vs_currency=${vs_currency}&days=${days}`
    const data = await this.#fetchWithErrorHandling(url);
    return data;
  }

  async #fetchTopCoins(currency = 'usd') {
    const api = {
      markets: "markets",
      vs_currency: currency, 
      order: "market_cap_desc", 
      per_page: 10, 
      page: 1,
      price_change_percentage: "1h,24h,7d" 
    }
    const {markets, vs_currency, order, per_page, page, price_change_percentage} = api;
    const url = `${this.httpClient}/${markets}/?vs_currency=${vs_currency}&order=${order}&per_page=${per_page}&page=${page}&price_change_percentage=${price_change_percentage}`;
    
    const data = await this.#fetchWithErrorHandling(url);
    return this.#renameAndModifyPriceChanges(data);
  }

  #renameAndModifyPriceChanges(data) {
    const modifedData = data.map((item) => {
      const { 
        price_change_percentage_1h_in_currency,
        price_change_percentage_24h_in_currency,
        price_change_percentage_7d_in_currency,
        ...rest
      } = item;
      return {
        ...rest,
        price_change_percentage_1H: this.#formatWithSign(price_change_percentage_1h_in_currency),
        price_change_percentage_24H: this.#formatWithSign(price_change_percentage_24h_in_currency),
        price_change_percentage_7D: this.#formatWithSign(price_change_percentage_7d_in_currency),
      };
    })

    return modifedData;
  }

  #formatWithSign(value) {
    if(value.toString().includes("0.00")) return "0.00";
    if(value <= 0) return value.toFixed(2);
    return `+${value.toFixed(2)}`;
  }

  async #fetchWithErrorHandling(url) {
    try {
      const response = await fetch(url);
      if(!response.ok) {
        if(response.status === 429) {
          if (response.status === 429) {
            throw new Error("Too many requests, please try again later.");
          }
          throw new Error(`Error: ${response.statusText}`);
        }
      }
      return response.json();
    } catch(error) {
      console.log(`error: `, error);
      this.setErrorMessage(error.message);
      return null;
    }
  }
}