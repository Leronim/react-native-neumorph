import { StyleProp, View, ViewStyle } from "react-native";

export interface NeomoprhStyle extends ViewStyle {
    backgroundColor?: "transparent" | string;
    // shadowOffset?: {
    //     width: number;
    //     height
    // }
}

export interface rgbProps {
    r: number;
    b: number;
    g: number;
    alpha: number;
}

export interface NeomorphProps {
    inner?: boolean;
    style?: NeomoprhStyle;
    basin?:boolean;
    darkShadowColor?: string;
    lightShadowColor?: string;
    children?: React.ReactChild;
    swapShadow?: boolean;
}