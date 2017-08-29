const firebase = jest.genMockFromModule('firebase');

const database = () => ({
  ref: () => ({
    push: () => ({
      key: 'ZXCCVBNMSDFJK',
    }),
  }),
});

firebase.database = database;

export default firebase;
