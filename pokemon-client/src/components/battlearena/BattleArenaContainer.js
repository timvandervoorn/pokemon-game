import React from 'react'
import './battleArena.css'
import ToggleDisplay from 'react-toggle-display';

export default class BattleArenaContainer extends React.PureComponent{
    constructor() {
        super();
        this.state = { show: true };
      }

    handleClick = (e) => {
        e.preventDefault();
        this.setState({
            show: !this.state.show
        });
    }

    handleAttack = (e) => {
        e.preventDefault();
        this.setState({
            show: !this.state.show
        });
    }

    render(){
    return (
        <div class="battle-scene">
            <div class="box-top-left">
            {this.props.pokemon &&
             <h2 class="pokemon">{this.props.pokemon[0].name}</h2>
            }
          <div class="hp-bar-top">
            <div class="hp-bar-fill">
            </div>
          </div>
          <h4 class="level">lvl. </h4>
        </div>
            
        <div class="box-top-right">
          <img class="pokemon-top" src={require('../../images/charmander.png')}/>
        </div>
         <div class="box-bottom-left">
           <img class="pokemon-bottom" src={require('../../images/bulbasaur.png')} />
        </div>
        <div class="box-bottom-right">
        {this.props.pokemon &&
           <h2 class="pokemon">{this.props.pokemon[1].name}</h2>
        }
          <div class="hp-bar-bottom">
            <div class="hp-bar-fill"></div>
          </div>
          <h4 class="level">lvl. </h4>
          {this.props.pokemon &&
          <h4 class="hp">{this.props.pokemon[1].health}/100 hp</h4>
          }
        </div>
        <div class="bottom-menu">
          <div class="battle-text text-box-left">
          </div>
          <ToggleDisplay show={this.state.show}>
            <div class="text-box-right">
              <h4 class="battle-text-top-left" onClick={this.handleClick } >Fight</h4>
              <h4 class="battle-text-bottom-left"onClick={this.handleClick } >Item</h4>
              <h4 class="battle-text-top-right" onClick={this.handleClick } >Pokemon</h4>
              <h4 class="battle-text-bottom-right" onClick={this.handleClick } >Run</h4>   
          </div>
          </ToggleDisplay>
          <ToggleDisplay if={!this.state.show}>
            <div class="text-box-right">
            {this.props.pokemon &&
            <div>
              <h4 class="battle-text-top-left" onClick={this.handleAttack} >{this.props.pokemon[1].attacks[0].name}</h4>
              <h4 class="battle-text-bottom-left" onClick={this.handleAttack}>{this.props.pokemon[1].attacks[1].name}</h4>
              <h4 class="battle-text-top-right" onClick={this.handleAttack }>{this.props.pokemon[1].attacks[2].name}</h4>
              <h4 class="battle-text-bottom-right" onClick={this.handleAttack}>{this.props.pokemon[1].attacks[3].name}</h4>   
              </div>
            }
          </div>
          </ToggleDisplay>
        </div>
        
      
      </div> 
    )
  }
}
  
