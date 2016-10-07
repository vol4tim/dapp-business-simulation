import React from 'react'
import { Link } from 'react-router'
import Lot from './lot'

const Main = (props) => {
  const { address, lots, approveLot, dealLot, removeLot } = props
  return (<div>
    <h4>market <span className="label label-success">{address}</span></h4>
    <div className="btn-group" style={{ marginBottom: 10 }}>
      <Link to={'/dao/market/lot/' + address} className="btn btn-default">Добавить лот</Link>
    </div>
    <div>
      {lots.map((item, index) => (
        <Lot
          key={index}
          {...item}
          approveLotSale={() => approveLot(item.address, item.sale_address, item.sale_quantity)}
          approveLotBuy={() => approveLot(item.address, item.buy_address, item.buy_quantity)}
          dealLot={() => dealLot(item.address)}
          removeLot={() => removeLot(item.address)}
        />
      ))}
    </div>
  </div>)
}

export default Main
