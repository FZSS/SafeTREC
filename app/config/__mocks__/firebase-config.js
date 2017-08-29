const firebase = jest.genMockFromModule('firebase-config');

const database = () => ({
  ref: () => ({
    push: () => ({
      key: 'ZXCCVBNMSDFJK',
    }),
  }),
});

const storage = () => ({
  ref: () => ({
    push: () => ({
      key: 'ZXCCVBNMSDFJK',
    }),
  }),
});

firebase.database = database;
firebase.storage = storage;

export default firebase;
