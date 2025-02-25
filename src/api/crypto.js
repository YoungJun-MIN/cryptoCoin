export default class Crypto {
  constructor() {
    this.httpClient = `https://api.coingecko.com/api/v3/coins`;
  }
  async fetchInitialData() {
    const topCoins = await this.#fetchTopCoins();
    const coinPrice = await this.fetchDaysDataForCoins();
    return {topCoins, coinPrice};
  }

  async #fetchTopCoins() {
    const api = {
      markets: "markets",
      vs_currency: "usd", 
      order: "market_cap_desc", 
      per_page: 10, 
      page: 1
    }
    const {markets, vs_currency, order, per_page, page } = api;
    const response = await fetch(`${this.httpClient}/${markets}/?vs_currency=${vs_currency}&order=${order}&per_page=${per_page}&page=${page}`);

    const data = await response.json();
    return data;
  }
  // async fetchDaysDataForCoins(coins, days = 1) {
  //   const ids = ['bitcoin', 'ethereum','ripple', "tether", "binancecoin", "solana", "usd-coin", "dogecoin", "cardano", "staked-ether"];
  //   const api = {
  //     market_chart: "market_chart",
  //     vs_currency: "usd",
  //   }
  //   const { market_chart, vs_currency } = api;
  //   const result = await Promise.all(
  //     ids.map(async (id) => {
  //         const response = await fetch(`${this.httpClient}/${id}/market_chart?vs_currency=${vs_currency}&days=${days}`)
  //         const data = await response.json();
  //         return {[id]: data}; 
  //     })
  //   )
  //   return result;
  // }
  async fetchDaysDataForCoins(coinId = 'bitcoin', days = 1) {
    const api = {
      market_chart: "market_chart",
      vs_currency: "usd",
    }
    const { market_chart, vs_currency } = api;
    const response = await fetch(`${this.httpClient}/${coinId}/market_chart?vs_currency=${vs_currency}&days=${days}`)
    const data = await response.json();
    return data.prices;
  }
}