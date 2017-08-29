/* eslint-disable no-unused-vars */
import * as actions from '../concerns';

jest.mock('../images', () => ({
  uploadNewConcernImages: () => {},
}));

jest.mock('../../constants/concernTypes', () => (
  ['Speeding', 'Visibility', 'Right of way', 'Violation']
));

jest.mock('firebase', () => ({
  database: () => ({
    ref: () => ({
      push: () => ({
        key: 'ZXCCVBNMSDFJK',
      }),
    }),
  }),
}));

const details = {
  address: '2715 Dwight way',
  latitude: 37.78821,
  longitude: -122.4224,
  title: 'Speeding Concern',
  id: 'XDFJKSJK129JK',
  description: 'test concern',
  numberOfImages: 1,
};

const images = [
  {
    key: 1,
    uri: 'file://sesfaf',
    location: {
      latitude: 37.78821,
      longitude: -122.4224,
    },
  },
];

describe('submit concern', () => {
  afterEach(() => {
  });

  it('creates SUBMIT_CONCERN_FULFILLED when successful', () => {
    submitConcern(details, images);
  });
});
