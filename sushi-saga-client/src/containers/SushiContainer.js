import React, { Fragment } from 'react'
import MoreButton from '../components/MoreButton'
import Sushi from '../components/Sushi'

const SushiContainer = (props) => {
  
  const renderSushis = () => {
    return props.sushis.map(sushiObj => {
      return <Sushi sushi={sushiObj} key={sushiObj.id} eatSushi={props.eatSushi} />
    })
  }
 
  return (
    <Fragment>
      <div className="belt">
         {renderSushis()}
        <MoreButton moreSushi={props.moreSushi} />
      </div>
    </Fragment>
  )
}

export default SushiContainer