import React from 'react';
import './App.css';
import champs from './ChampDate.js'
import ChampCard from './ChampCard'


class App extends React.Component {
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
      region: 'na1'
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
    />
  })

  this.setState({cards: cards})
}

  fetchSummonerInfo = () => {

let myHeaders = new Headers();
myHeaders.append("Accept", "*/*");
myHeaders.append("Cache-Control", "no-cache");
myHeaders.append("Host", "na1.api.riotgames.com");
myHeaders.append("Accept-Encoding", "gzip, deflate");
myHeaders.append("Connection", "keep-alive");
myHeaders.append("X-Riot-Token", "RGAPI-adc62aa6-0347-4f3e-b770-5cd08ed26794");

const requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch(`https://cors-anywhere.herokuapp.com/https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${this.state.name}?api_key=RGAPI-adc62aa6-0347-4f3e-b770-5cd08ed26794`, requestOptions)
  .then(response => response.json())
  .then(data => this.setState({id: data.id, accountId: data.accountId, puuid: data.puuid}))
  .catch(error => console.log('error', error));


  }

  fetchAmIBad = async (champId) => {
    let myHeaders = new Headers();
    myHeaders.append("Accept", "*/*");
    myHeaders.append("Cache-Control", "no-cache");
    myHeaders.append("Host", "na1.api.riotgames.com");
    myHeaders.append("Accept-Encoding", "gzip, deflate");
    myHeaders.append("Connection", "keep-alive");
    myHeaders.append("X-Riot-Token", "RGAPI-adc62aa6-0347-4f3e-b770-5cd08ed26794");

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    let badnessIndicator = 0

    fetch(`https://cors-anywhere.herokuapp.com/https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${this.state.accountId}?champion=${champId}&api_key=RGAPI-adc62aa6-0347-4f3e-b770-5cd08ed26794`, requestOptions)
      .then(response => response.json())
      .then(data => {
        this.setState({total: data.matches.length})
        data.matches.forEach(match => {
          setTimeout(() => {
          fetch(`https://cors-anywhere.herokuapp.com/https://na1.api.riotgames.com/lol/match/v4/matches/${match.gameId}?api_key=RGAPI-adc62aa6-0347-4f3e-b770-5cd08ed26794`, requestOptions)
        .then(response => response.json())
        .then(matchData => {
          const currentUser = matchData.participantIdentities.find(participant => {
          return participant.player.accountId === this.state.accountId
          })
          console.log(currentUser.participantId <= 5 && matchData.teams[0].win === 'Win');
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
    .catch(error => console.log('error', error));
  }

   qualityCalculator = () => {
    if (parseInt(this.state.percentage * 100) <= 50) {        this.setState({quality: 'BELOW AVERAGE'})
    }

    if (parseInt(this.state.percentage * 100) <= 40) {        this.setState({quality: 'BAD'})
    }

    if (parseInt(this.state.percentage * 100) <= 30) {        this.setState({quality: 'VERY BAD'})
    }

    if (parseInt(this.state.percentage * 100) >= 50) {        this.setState({quality: 'GOOD'})
    }
    console.log(parseInt(this.state.percentage * 100));
    if (parseInt(this.state.percentage * 100) >= 60) {        this.setState({quality: 'GREAT'})
    }

    if (parseInt(this.state.percentage * 100) >= 70) {        this.setState({quality: 'GOD'})
    }
  }

  render() {
  return (
    <main className="App">
    <section className="summoner-name">
    {this.state.quality}
    {parseInt(this.state.percentage * 100)}%
    <input type="text" onChange={(event) => {this.setState({name: event.target.value})}} placeholder="SUMMONER NAME" className="text-center"/>
    <select>
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
    </section>
    <section className="champs">
    {this.state.cards}
    </section>
    </main>
  );
}
}

export default App;
