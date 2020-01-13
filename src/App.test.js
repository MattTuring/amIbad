import React from 'react';
import { shallow } from 'enzyme';
import { App ,mapStateToProps, mapDispatchToProps } from './App';
import { addChamp, addSummoner } from './actions';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";



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

})
