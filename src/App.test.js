import React from 'react';
import { shallow } from 'enzyme';
import { App, mapStateToProps, mapDispatchToProps } from './App';
import { addChamp, addSummoner } from '../actions';

describe('App', () => {
  it('should match the App snapshot', () => {
    let wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  })

  it('should invoke retrieveMovies after componentDidMount triggers', () => {
    let wrapper = shallow(<App />);
    expect(retrieveMovies).toHaveBeenCalled();
  });

  describe('mapsStateToProps', () => {
    it('should return only movies and loading properties from the store', () => {
      const mockState = {
        movies: [],
        user: {},
        loading: true
      };
      const expected = {
        movies: [],
        loading: true
      };
      const mappedProps = mapStateToProps(mockState);

      expect(mappedProps).toEqual(expected);
    });
  });

  describe('mapDispatchToProps', () => {
    it('calls dispatch with an addMovies action when addMovies is called', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = addMovies([{ sample: 'movie' }]);
      const mappedProps = mapDispatchToProps(mockDispatch);

      mappedProps.addMovies([{ sample: 'movie' }]);

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
  });
})
