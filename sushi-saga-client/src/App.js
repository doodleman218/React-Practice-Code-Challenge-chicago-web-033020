import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {

  constructor(){
    super()
    this.state = {
      sushis: [],
      indexNum: 0,
      money: 50,
      broke: false
    }
  }

  componentDidMount(){
    fetch(API)
    .then(resp => resp.json())
    .then(sushisArr =>{
      const updatedSushis = sushisArr.map (sushiObj => {
        return {
          ...sushiObj,
          isEaten: false
        }
      }) 
      this.setState({
        sushis: updatedSushis
      })
    })
  }

  renderFour = () => {
    return this.state.sushis.slice(this.state.indexNum,this.state.indexNum + 4)
  }

  moreSushi = () => {
    const newIndex = this.state.indexNum + 4
    this.setState({
      indexNum: newIndex
    })
  }

  eatSushi = (id, price) => {
    if (this.state.money - price >= 0){
    const updatedSushis = this.state.sushis.map(sushiObj => {
      if (sushiObj.id === id) {
        return {
          ...sushiObj,
          eaten: true
        } 
      } else {
        return sushiObj
      }
    })
    let newMoney = this.state.money - price
   
    this.setState({
      money: newMoney,
      sushis: updatedSushis
    })
    } else {
      this.setState({
        broke: true
      })
    }
  }

  
  render() {
    
    return (
      <div className="app">
        
        <SushiContainer sushis={this.renderFour()} moreSushi={this.moreSushi} eatSushi={this.eatSushi} />
        <Table money={this.state.money} eaten={this.state.sushis.filter(sushiObj => sushiObj.eaten)} broke={this.state.broke}/>
      </div>
    );
  }
}

export default App;


 // console.log(newMoney)
    // let newArray = this.state.sushis.filter( sushiObj => {
    //   if (sushiObj.id === id) {
    //     return sushiObj
    //   }
    // })
    // let eatenArray = [...this.state.eaten, ...newArray]