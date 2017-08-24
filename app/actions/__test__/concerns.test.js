import * as actions from '../concerns';

jest.mock('../images', () => ({
  uploadNewConcernImages: () => {},
}));

jest.mock('../../constants/concernTypes', () => (
  ['Speeding', 'Visibility', 'Right of way', 'Violation']
));

describe('submit concern', () => {
  afterEach(() => {
  });

  it('creates SUBMIT_CONCERN_FULFILLED when successful', () => {

  });
});
