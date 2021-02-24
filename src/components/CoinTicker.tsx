import { useQuery } from '@apollo/client'
import React from 'react'
import { btcToRandPrice } from '../common/currency'
import useGlobal from '../common/globalStateHook'
import { GET_TICKER } from '../graphql/queries'
import { Coin } from './CoinItem'

type Props = {
  coin: Coin
}

const CoinTicker: React.FC<Props> = ({ coin }: Props) => {
  const [globalState] = useGlobal()
  const { data } = useQuery(GET_TICKER, {
    fetchPolicy: 'cache-first',
    variables: {
      id: coin && coin.id
    }
  })

  if (!coin) {
    return null
  }

  // console.log(
  //   // 'summary' + coin.name,
  //   data && data.ticker.askRate
  // )

  const dataTicker = data ? data.ticker : {}

  return (
    <span>
      {dataTicker.askRate && globalState.bitcoinRandPrice
        ? btcToRandPrice(dataTicker.askRate, globalState.bitcoinRandPrice)
        : 'n/d'}
    </span>
  )
}

export default CoinTicker
