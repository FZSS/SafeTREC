/**
 * This file describes the times of concerns supported in the app right, should be updated if
 * in the future more types are identified.
 * Each of the type listed should have an representing image in images/concernTypes/{type}.jpg
 */
export default ['Speeding', 'Visibility', 'Right of way', 'Violation'];

/**
 * A dictionary of pictures with respect to the images
 * @type {{Speeding: *, Visibility: *, Right of way: *, Violation: *}}
 */
export const concernTypeImages = {
  /* eslint global-require:0 */
  Speeding: require('../images/concernTypes/Speeding.jpg'),
  Visibility: require('../images/concernTypes/Visibility.jpg'),
  'Right of way': require('../images/concernTypes/Right of way.jpg'),
  Violation: require('../images/concernTypes/Violation.jpg'),
  Other: require('../images/concernTypes/Other.png'),
};

