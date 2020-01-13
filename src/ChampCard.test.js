import React from 'react';
import { shallow } from 'enzyme';
import ChampCard  from './ChampCard.js';

describe('Form', () => {
  let mockFunction = jest.fn()
  let mockFunction2 = jest.fn()

    const wrapper = shallow(<ChampCard
      name={'Aatrox'}
      image={'string.png'}
      champId={'12'}
      key={'12'}
      amIBad={mockFunction}
      addChampToProps={mockFunction}
      heart={'string.png'}
    />)


  it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot();
  });

  it('onClick for container', () => {
    wrapper.find('.container').simulate('click');
    expect(mockFunction).toHaveBeenCalled()
  });

  it('on click for heart', () => {
    wrapper.find('.favorite').simulate('click');
    expect(mockFunction).toHaveBeenCalled()
  });

  const wrapper2 = shallow(<ChampCard
    name={'Aatrox'}
    image={'string.png'}
    champId={'12'}
    key={'12'}
    amIBad={mockFunction2}
    heart={'string.png'}
  />)

  it('on click for heart', () => {
    wrapper2.find('.favorite').simulate('click');
    expect(mockFunction2).not.toHaveBeenCalled()
  });


})
