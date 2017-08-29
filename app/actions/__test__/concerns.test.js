/* eslint-disable no-unused-vars */
import * as concerns from '../concerns';

jest.mock('firebase');

jest.mock('../images', () => ({
  uploadNewConcernImages: () => {},
}));

jest.mock('../../constants/concernTypes', () => (
  ['Speeding', 'Visibility', 'Right of way', 'Violation']
));

// probably should put mocks somewhere else to be reusable
// jest.mock('../../config/firebase', () => ({
//   database: () => ({
//     ref: () => ({
//       push: () => ({
//         key: 'ZXCCVBNMSDFJK',
//       }),
//     }),
//   }),
// }));

const details = {
  address: '2715 Dwight way',
  coordinate: {
    latitude: 37.78821,
    longitude: -122.4224,
  },
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
    concerns.submitConcern(details, images);
  });
});
