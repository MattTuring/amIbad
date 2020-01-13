import React from 'react';
import { shallow, mount } from 'enzyme';
import { App ,mapStateToProps, mapDispatchToProps } from './App';
import { addChamp, addSummoner } from './actions';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { BrowserRouter as Router } from 'react-router-dom';



describe('App', () => {

  const mockStore = configureMockStore();
  const store = mockStore({});

  let wrapper;

   beforeEach(() => {
      wrapper = shallow(<App />);
   })
  it('should match the App snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('should invoke retrieveMovies after componentDidMount triggers', () => {
    wrapper.state().cards.length === 146
  });


    it('should undefined favChamps and favSummoner', () => {
      const mockState = {
        favChamps: undefined,
        favSummoner: undefined
      };
      const expected = {
        favChamps: undefined,
        favSummoner: undefined
      };
      const mappedProps = mapStateToProps(mockState);

      expect(mappedProps).toEqual(expected);
    });


    it('calls dispatch with addChamp', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = addChamp([{ sample: 'test' }]);
      const mappedProps = mapDispatchToProps(mockDispatch);

      mappedProps.addChamp([{ sample: 'test' }]);

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
  });

    it('calls dispatch with addSummoner', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = addSummoner([{ sample: 'test' }]);
      const mappedProps = mapDispatchToProps(mockDispatch);

      mappedProps.addSummoner([{ sample: 'test' }]);

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });

    it('qualityCalculator works 1', () => {

      wrapper.state().percentage = .1
      wrapper.instance().qualityCalculator()

      expect(wrapper.state().quality).toEqual('Very Bad')
      expect(wrapper.state().color).toEqual('#6b0000')
    });

    it('qualityCalculator works 2', () => {

      wrapper.state().percentage = .4
      wrapper.instance().qualityCalculator()

      expect(wrapper.state().quality).toEqual('Bad')
      expect(wrapper.state().color).toEqual('#ff0000')
    });

    it('qualityCalculator works 3', () => {

      wrapper.state().percentage = .49
      wrapper.instance().qualityCalculator()

      expect(wrapper.state().quality).toEqual('Below Average')
      expect(wrapper.state().color).toEqual('#ffd400')
    });

    it('qualityCalculator works 4', () => {
      wrapper.state().percentage = .5
      wrapper.instance().qualityCalculator()

      expect(wrapper.state().quality).toEqual('Average')
      expect(wrapper.state().color).toEqual('#76f580')
    });

    it('qualityCalculator works 5', () => {
      wrapper.state().percentage = .6
      wrapper.instance().qualityCalculator()

      expect(wrapper.state().quality).toEqual('Great')
      expect(wrapper.state().color).toEqual('#005613')
    });

    it('qualityCalculator works 6', () => {
      wrapper.state().percentage = .7
      wrapper.instance().qualityCalculator()

      expect(wrapper.state().quality).toEqual('Godlike')
      expect(wrapper.state().color).toEqual('#be83ff')
    });

    // it('onChange should add value to state', () => {
    //   const mockDispatch = jest.fn();
    //   const actionToDispatch = addSummoner([{ sample: 'test' }]);
    //   const mappedProps = mapDispatchToProps(mockDispatch);
    //
    //   mappedProps.addSummoner([{ sample: 'test' }]);
    //
    //   console.log(wrapper.props.favSummoner);
    //   const mockEvent = { target: { value: 'test'} };
    //   wrapper.find('input').dive('#onChange1').simulate('change', mockEvent);
    //   expect(wrapper.state().name).toEqual('test')
    // })
    //
    // it('onChange should add value to state', () => {
    //   const wrapper2 = mount(<Router><App favSummoner={['test']}/></Router>)
    //   const mockEvent = { target: { value: 'test'} };
    //   wrapper2.instance().state = {name:''}
    //   wrapper2.find('#onChange2').simulate('change', mockEvent);
    //
    //   expect(wrapper2.instance().state.name).toEqual('test')
    // })

    it('should fetch',() => {

    const mockResponse = {
      accountId: "byRQS7fYBBDWjkVFHyPcjqCkOdZoLHnVjNkiYlIFrZVrdfQ",
      id: "4OEY9z14nQlUZV3JVqorfNe5Hihb49JIsGeaN8MtfCZbA8M",
      name: "mtats",
      profileIconId: 2073,
      puuid: "WAehNrmVWtaT66dhn_j-D3WwNi6t1DBC7HfVcAk3bWPOdfwiSz2yqEkj1ZA3Z4FBsjU8-9tcg-p9lw",
      revisionDate: 1578537322000,
      summonerLevel: 170
    }
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });
    });
      wrapper.state().region = 'na1'
      wrapper.state().name = 'mtats'
      wrapper.state().APIkey = 'RGAPI-6ceadc4c-5120-4708-a843-d9b38a6962af'
      wrapper.instance().fetchSummonerInfo()

      expect(window.fetch).toHaveBeenCalled();
  });

  it('should fetch amIbad',() => {

  const mockResponse = {
    accountId: "byRQS7fYBBDWjkVFHyPcjqCkOdZoLHnVjNkiYlIFrZVrdfQ",
    id: "4OEY9z14nQlUZV3JVqorfNe5Hihb49JIsGeaN8MtfCZbA8M",
    name: "mtats",
    profileIconId: 2073,
    puuid: "WAehNrmVWtaT66dhn_j-D3WwNi6t1DBC7HfVcAk3bWPOdfwiSz2yqEkj1ZA3Z4FBsjU8-9tcg-p9lw",
    revisionDate: 1578537322000,
    summonerLevel: 170
  }
  window.fetch = jest.fn().mockImplementation(() => {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    });
  });
    wrapper.state().region = 'na1'
    wrapper.state().name = 'mtats'
    wrapper.state().APIkey = 'RGAPI-6ceadc4c-5120-4708-a843-d9b38a6962af'
    wrapper.instance().fetchAmIBad()

    expect(window.fetch).toHaveBeenCalled();
});



})
