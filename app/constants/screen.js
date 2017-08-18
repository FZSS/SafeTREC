import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
export const ASPECT_RATIO = width / height;
export const { windowWidth, windowHeight } = { width, height };
