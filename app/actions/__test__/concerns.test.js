/* eslint-disable no-unused-vars */
/** README:
 *  A few tests are not well-written. And they may require a lot of work
 *  including intensive mocks and refactoring code to be unit-testable
 *  They are marked TODO: improve
 */
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as concerns from '../concerns';
import concernTypes from '../../constants/concernTypes';

const axiosMock = new MockAdapter(axios);

jest.mock('firebase-config');

jest.mock('../images', () => ({
  uploadNewConcernImages: () => [],
}));

// TODO: improve
describe('submit concern', () => {
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
      uri: 'file://something',
      location: {
        latitude: 37.78821,
        longitude: -122.4224,
      },
    },
  ];
  concerns.submitConcern(details, images);

  it('creates concern ref in firebase', () => {
  });

  it('creates images in firebase storage', () => {
  });
});

// TODO: improve
describe.skip('delete concern', () => {
  const concernID = 'XDFJKSJK129JK';
  it('deletes the concern ref from firebase', () => {
    concerns.deleteConcern(concernID);
  });
  it('deletes the concern images from firebase');
});

describe('update new concern address from Geocode', () => {
  const latitude = 37.78821;
  const longitude = -122.4224;

  axiosMock.onGet('https://maps.googleapis.com/maps/api/geocode/json?',
  ).reply(200, {
    results: [
      { formatted_address: 'Correct Address 1' },
      { formatted_address: 'Another Address 2' },
    ],
    status: 'SUCCESSFUL',
  });

  it('has the right status code', async () => {
    const res = await concerns.updateNewConcernAddressFromGeocode(latitude, longitude).payload;
    expect(res.data.status).toEqual('SUCCESSFUL');
  });

  it('has the right number of results', async () => {
    const res = await concerns.updateNewConcernAddressFromGeocode(latitude, longitude).payload;
    expect(res.data.results).toHaveLength(2);
  });
});

describe('update new concern address', () => {
  it('has the right payload', () => {
    const address = concerns.updateNewConcernAddress('Somewhere').payload;
    expect(address).toEqual('Somewhere');
  });
});

describe('update new concern coordinates', () => {
  it('has the right payload', () => {
    const latitude = 37.78821;
    const longitude = -122.4224;
    const coordinates = concerns.updateNewConcernCoordinates(latitude, longitude).payload;
    expect(coordinates.latitude).toEqual(latitude);
    expect(coordinates.longitude).toEqual(longitude);
  });
});

// TODO: after implmenting the backend and action, should write extensive tests
describe('update concern types', () => {
  it('has the right payload', () => {
    const types = concerns.updateConcernTypes().types;
    expect(types).toEqual(concernTypes);
  });
});
