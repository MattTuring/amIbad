import React from 'react';
import './App.css';
import champs from './ChampData.js'
import ChampCard from './ChampCard'
import yummi from './imgs/yummi.gif'
import teemo from './imgs/teemo.gif'
import zoe from './imgs/zoe.gif'
import heart from './imgs/heart.svg'
import heartSelected from './imgs/heartSelected.svg'
import { addChamp, addSummoner } from './actions'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import gear from './imgs/gear.svg'
import back from './imgs/diagonal-arrow.svg'
import { Link, Route } from 'react-router-dom'

export class App extends React.Component {
  constructor() {
    super()
    this.state = {
      name: null,
      id: null,
      accountId: null,
      puuid: null,
      cards: null,
      percentage: 0,
      quality: null,
      total: null,
      region: 'na1',
      APIkey: 'RGAPI-6ceadc4c-5120-4708-a843-d9b38a6962af',
      champName: null,
      color: 'grey'
    }
  }

componentDidMount() {
  const mappedChamps = Object.values(champs[0]).map(champ=> {
    return {id:champ.id, key:champ.key, image:`https://ddragon.leagueoflegends.com/cdn/10.1.1/img/champion/${champ.image.full}`}
  })

  const cards = mappedChamps.map(champ => {
    return <ChampCard
      name={champ.id}
      image={champ.image}
      champId={champ.key}
      key={champ.key}
      amIBad={this.fetchAmIBad}
      addChampToProps={this.addChampToProps}
      heart={heart}
    />
  })

  this.setState({cards: cards})
}

fetchSummonerInfo = () => {

  let myHeaders = new Headers();
  myHeaders.append("Accept", "*/*");
  myHeaders.append("Cache-Control", "no-cache");
  myHeaders.append("Host", `na1.api.riotgames.com`);
  myHeaders.append("Accept-Encoding", "gzip, deflate");
  myHeaders.append("Connection", "keep-alive");
  myHeaders.append("X-Riot-Token", `${this.state.APIkey}`);

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch(`https://cors-anywhere.herokuapp.com/https://${this.state.region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${this.state.name}?api_key=${this.state.APIkey}`, requestOptions)
    .then(response => response.json())
    .then(data => this.setState({id: data.id, accountId: data.accountId, puuid: data.puuid}))
    .catch(error => console.log('error', error));
  }

fetchAmIBad = (champId, name) => {
    this.setState({champName: name})
    let myHeaders = new Headers();
    myHeaders.append("Accept", "*/*");
    myHeaders.append("Cache-Control", "no-cache");
    myHeaders.append("Host", `${this.state.region}.api.riotgames.com`);
    myHeaders.append("Accept-Encoding", "gzip, deflate");
    myHeaders.append("Connection", "keep-alive");
    myHeaders.append("X-Riot-Token", `${this.state.APIkey}`);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    let badnessIndicator = 0

    fetch(`https://cors-anywhere.herokuapp.com/https://${this.state.region}.api.riotgames.com/lol/match/v4/matchlists/by-account/${this.state.accountId}?champion=${champId}&api_key=${this.state.APIkey}`, requestOptions)
      .then(response => response.json())
      .then(data => {
        this.setState({total: data.matches.length})
        data.matches.forEach(match => {
          setTimeout(( ) => {
          fetch(`https://cors-anywhere.herokuapp.com/https://${this.state.region}.api.riotgames.com/lol/match/v4/matches/${match.gameId}?api_key=${this.state.APIkey}`, requestOptions)
        .then(response => response.json())
        .then(matchData => {
          const currentUser = matchData.participantIdentities.find(participant => {
          return participant.player.accountId === this.state.accountId
          })

          if (currentUser.participantId <= 5 && matchData.teams[0].win === 'Win') {
            badnessIndicator+=1
            this.setState({percentage:badnessIndicator/this.state.total});
            this.qualityCalculator()
          }

          if (currentUser.participantId > 5 && matchData.teams[1].win === 'Win') {
            badnessIndicator+=1
            this.setState({percentage:badnessIndicator/this.state.total});
            this.qualityCalculator()
          }
        })
      },200)
      })
    }).then(this.qualityCalculator)
    .catch(error => this.setState({quality: 'noob', percentage: 0, color:'grey'}));
  }

   qualityCalculator = () => {
    if (parseInt(this.state.percentage * 100) < 50) {this.setState({quality: 'Below Average', color: '#ffd400' })}
    if (parseInt(this.state.percentage * 100) === 50) {this.setState({quality: 'Average', color: '#76f580'})}
    if (parseInt(this.state.percentage * 100) <= 40) {this.setState({quality: 'Bad', color: '#ff0000'})}
    if (parseInt(this.state.percentage * 100) <= 30) {this.setState({quality: 'Very Bad', color:'#6b0000'})}
    if (parseInt(this.state.percentage * 100) > 50) {this.setState({quality: 'Good', color:'#0bb300'})}
    if (parseInt(this.state.percentage * 100) >= 60) {this.setState({quality: 'Great', color: '#005613'})}
    if (parseInt(this.state.percentage * 100) >= 70) {this.setState({quality: 'Godlike', color:'#be83ff'})}
  }

  addChampToProps = (name, champId, image) => {
    this.props.addChamp(
      <ChampCard
      name={name}
      image={image}
      champId={champId}
      key={'unique'+champId}
      amIBad={this.fetchAmIBad}
      heart={heartSelected}
    />)
  }

  render() {
  return (
    <main className="App">

    <Route
       exact path="/"
       render={() => {
         return (
           <>
           <section className="summoner-name" style={{backgroundColor: this.state.color}}>
             {this.state.champName && <><span>{this.state.champName}</span>
             <span>{this.state.quality}</span>
             <span>{parseInt(this.state.percentage * 100)}%</span> </>}
             {this.state.id &&<span><img src={heart} className='favorite' alt="favorite" onClick={() => {this.props.addSummoner({summoner:this.state.name})}}/>{this.state.name}</span>}
             {this.props.favSummoner.length > 0 &&   <select onChange={(event) => {this.setState({name: event.target.value}); this.fetchSummonerInfo();}}>
                 {this.props.favSummoner.map(summoner => {
                     return <option value={summoner.summoner}>{summoner.summoner}</option>
                 })}
             </select>}
             <input type="text" onChange={(event) => {this.setState({name: event.target.value}); if(this.state.id) {this.setState({id: null})} }} placeholder="SUMMONER NAME" className="text-center"/>
             <select onChange={(event) => this.setState({region: event.target.value})}>
               <option value="na1">NA</option>
               <option value="ru">RU</option>
               <option value="kr">KR</option>
               <option value="br1">BR</option>
               <option value="oc1">OC</option>
               <option value="jp1">JP1</option>
               <option value="eun1">EUN</option>
               <option value="euw1">EUW</option>
               <option value="tr1">TR</option>
               <option value="la1">LA1</option>
               <option value="la2">LA2</option>
           </select>
           <button onClick={this.fetchSummonerInfo}>SUBMIT</button>
           <section>
              <Link to='/favorites'><img src={gear} className="favorite" alt="manage favorites"/></Link>
           </section>
           </section>
           {this.state.id &&
             <><section className='champs'>
               {this.props.favChamps}
             </section></>
           }
           {this.state.id ? <section className="champs">{this.state.cards}</section>:<section className="submit-name"><h1>SUMBIT YOUR SUMMONER NAME</h1><img alt='yummi' src={yummi}/><img alt='teemo' src={teemo}/><img alt='zoe' src={zoe}/></section>}
           </>
         )
       }}
     />
     <Route
        exact path="/favorites"
        render={() => {
          return (
            <>
            <section className="summoner-name" style={{backgroundColor: this.state.color}}>
              {this.state.champName && <><span>{this.state.champName}</span>
              <span>{this.state.quality}</span>
              <span>{parseInt(this.state.percentage * 100)}%</span> </>}
              {this.state.id &&<span><img src={heart} className='favorite' alt="favorite" onClick={() => {this.props.addSummoner({summoner:this.state.name})}}/>{this.state.name}</span>}
              {this.props.favSummoner.length > 0 &&   <select onChange={(event) => {this.setState({name: event.target.value}); this.fetchSummonerInfo();}}>
                  {this.props.favSummoner.map(summoner => {
                      return <option value={summoner.summoner}>{summoner.summoner}</option>
                  })}
              </select>}
              <input type="text" onChange={(event) => {this.setState({name: event.target.value}); if(this.state.id) {this.setState({id: null})} }} placeholder="SUMMONER NAME" className="text-center"/>
              <select onChange={(event) => this.setState({region: event.target.value})}>
                <option value="na1">NA</option>
                <option value="ru">RU</option>
                <option value="kr">KR</option>
                <option value="br1">BR</option>
                <option value="oc1">OC</option>
                <option value="jp1">JP1</option>
                <option value="eun1">EUN</option>
                <option value="euw1">EUW</option>
                <option value="tr1">TR</option>
                <option value="la1">LA1</option>
                <option value="la2">LA2</option>
            </select>
            <button onClick={this.fetchSummonerInfo}>SUBMIT</button>
            <section>
               <Link to='/'><img src={back} className="favorite" alt="manage favorites"/></Link>
            </section>
            </section>
            {this.state.id &&
              <><section className='champs'>
                {this.props.favChamps}
              </section></>
            }
            </>
          )
        }}
      />

    </main>
  );
}
}

export const mapDispatchToProps = dispatch => ({
  addChamp: champInfo => dispatch(addChamp( champInfo )),
  addSummoner: summonerInfo => dispatch(addSummoner( summonerInfo ))
})

export const mapStateToProps = state => ({
  favChamps: state.champ,
  favSummoner: state.summoner
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App))
