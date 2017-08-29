const firebase = jest.genMockFromModule('firebase-config');

const database = () => ({
  ref: () => ({
    push: () => ({
      key: 'ZXCCVBNMSDFJK',
    }),
  }),
});

firebase.database = database;

export default firebase;
