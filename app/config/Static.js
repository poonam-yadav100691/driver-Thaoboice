import {
	Dimensions, Platform, PixelRatio, NetInfo,
} from 'react-native';

export const colors = {
	app_color: '#3575D3',
	app_green: '#29C251',
	app_text_dark: '#091528',
	app_text_light: '#778291',
	app_text_label_inactive: '#6e809a',
	app_red: '#e0584f'
};

export const internetmsg = 'It seems your internet is not working';

export function normalize(size) {
	if (Platform.OS === 'ios') {
		return Math.round(PixelRatio.roundToNearestPixel(size));
	}
	return Math.round(PixelRatio.roundToNearestPixel(size)) - 2;
}
export async function isConnected() {
	return await NetInfo.isConnected.fetch();
}
export async function ucwords(str) {
	return await str.toLowerCase().replace(/\b[a-z]/g, (letter) => letter.toUpperCase());
}
export const dimensions = Dimensions.get('window');
