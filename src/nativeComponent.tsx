import { requireNativeComponent, StyleProp, ViewStyle } from 'react-native';

interface NativeProps {
    inner?: boolean;
    style?: StyleProp<ViewStyle>;
    backgroundColor?: string;
    basin?: boolean;
    darkShadowColor?: string;
    lightShadowColor?: string;
    shadowOffset?: {
        width: number;
        height: number;
    },
    borderRadius?: number;
    shadowRadius?: number;
}

export const NativeNeumorph = requireNativeComponent<Readonly<NativeProps>>('RNCNeumorph');
