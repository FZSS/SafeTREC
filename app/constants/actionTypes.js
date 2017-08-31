const actionTypes = {
  EnableImagePrediction: 'ENABLE_IMAGE_PREDICTION',
  SubmitConcern: 'SUBMIT_CONCERN',
  DeleteConcern: 'DELETE_CONCERN',
  GetConcernsInArea: 'GET_CONCERNS_IN_AREA',
  UpdateConcernTypes: 'UPDATE_CONCERN_TYPES',
  UpdateMapRegion: 'UPDATE_MAP_REGION',
  UpdateUserLocation: 'UPDATE_USER_LOCATION',
  UpdateNewConcernAddressFromGeocode: 'UPDATE_ADDRESS_FROM_GEOCODE',
  UpdateNewConcernAddress: 'UPDATE_NEW_CONCERN_ADDRESS',
  UpdateNewConcernCoordinates: 'UPDATE_NEW_CONCERN_COORDINATES',
  UpdateNewConcernModeOfTransportation: 'UPDATE_NEW_CONCERN_MODE',
  ResetNewConcernImages: 'RESET_NEW_CONCERN_IMAGES',
  AddANewConcernImage: 'ADD_A_NEW_CONCERN_IMAGE',
  GetConcernImages: 'GET_CONCERN_IMAGES',
  DeleteANewConcernImage: 'DELETE_A_NEW_CONCERN_IMAGE',
  GetImagePredictions: 'GET_IMAGE_PREDICTIONS',
  AddToConcernsInMapRegion: 'ADD_TO_CONCERNS_IN_MAP_REGION',
  RemoveFromConcernsInMapRegion: 'REMOVE_FROM_CONCERNS_IN_MAP_REGION',
  InitializeGeoQuery: 'INITIALIZE_GEO_QUERY',
};

export default actionTypes;
