import { Platform, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('screen');

const DeviceInfo = {
    isIOS: Platform.OS === 'ios',
    width,
    height,
    headerPadding: Platform.OS === 'ios' && height > 800 ? 60 : 0,
    footerPadding: Platform.OS === 'ios' && height > 800 ? 60 : 0,
}

export default DeviceInfo;