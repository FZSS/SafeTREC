import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
/* eslint import/prefer-default-export:1 */
export const ASPECT_RATIO = width / height;
