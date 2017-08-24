import thunk from 'redux-thunk';
import * as actions from '../map';
import geofire from '../../config/geofire';
jest.mock('../config/geofire');

describe('Get concerns in region', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('gets all concerns', async () => {

  });
});
