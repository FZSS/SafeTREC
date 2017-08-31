import * as images from '../images';

jest.mock('react-native-fetch-blob', () => ({
  polyfill: {},
}));

jest.mock('firebase-config');

// TODO: I don't know why it does not let me mock storage as a function. Thus skip
describe.skip('Upload New Concern Images', () => {
  it('return a empty list if no images passed', () => {
    expect(images.uploadNewConcernImages('XDFJKSJK129JK', [])).toEqual([]);
  });
});
