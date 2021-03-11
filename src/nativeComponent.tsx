import { requireNativeComponent, StyleProp, ViewStyle } from 'react-native';
import { rgbProps } from '../global';

interface AndroidNativeProps {
    inner?: boolean;
    style?: StyleProp<ViewStyle>;
    backgroundColor?: string;
    basin?: boolean;
    darkShadowColor?: rgbProps;
    lightShadowColor?: rgbProps;
    borderRadius: {
        type: boolean;
        radius: number;
    };
    shadowRadius?: number;
    borderColor?: string;
    borderWidth?: number;
    shadowOpacity?: number;
    swapShadow: boolean;
    size?: {
        width: any;
        height: any;
    }
}

interface IosNativeProps {
    inner?: boolean;
    style?: StyleProp<ViewStyle>;
    color?: string;
    darkShadowColor?: string;
    lightShadowColor?: string;
    borderRadius?: number;
    shadowRadius?: number;
    shadowOpacity?: number;
}

export const NativeNeumorph = requireNativeComponent<Readonly<AndroidNativeProps>>('RNCNeumorph');
export const IosNeumorph = requireNativeComponent<Readonly<IosNativeProps>>('Neumorph');
