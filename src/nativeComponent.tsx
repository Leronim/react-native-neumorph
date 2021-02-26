import { requireNativeComponent, StyleProp, ViewStyle } from 'react-native';
import { rgbProps } from '../global';

interface NativeProps {
    inner?: boolean;
    style?: StyleProp<ViewStyle>;
    backgroundColor?: string;
    basin?: boolean;
    darkShadowColor?: rgbProps;
    lightShadowColor?: rgbProps;
    shadowOffset?: {
        width: number;
        height: number;
    },
    borderRadius?: number;
    shadowRadius?: number;
    borderColor?: string;
    borderWidth?: number;
    shadowOpacity?: number;
}

export const NativeNeumorph = requireNativeComponent<Readonly<NativeProps>>('RNCNeumorph');
export const IosNeumorph = requireNativeComponent('Neumorph');
