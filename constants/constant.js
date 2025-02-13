import { Dimensions } from 'react-native';

export const getDeviceWidth = () => {
  return Dimensions.get('window').width;
};

/**
 * return device height
 * @returns
 */
export const getDeviceHeight = () => {
  return Dimensions.get('window').height;
};
