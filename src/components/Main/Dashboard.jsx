import { useState } from "react"
import CoinDetail from "../CoinDetail/CoinDetail"
import CoinList from "../CoinList/CoinList"
export default function Dashboard() {
  const initialCoin = `bitcoin`;
  const [selectedCoin, setSelectedCoin] = useState(initialCoin);
  return (
    <>
      <CoinDetail selectedCoin={selectedCoin}/>
      <CoinList setSelectedCoin={setSelectedCoin}/>
    </>
  )
}