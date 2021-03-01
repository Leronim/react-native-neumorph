import { ViewStyle } from "react-native";

interface NeumorphStyle extends ViewStyle {
    backgroundColor?: string;
}

export interface rgbProps {
    r: number;
    b: number;
    g: number;
    alpha: number;
}

export interface NeumorphProps {
    inner?: boolean;
    style: NeumorphStyle | NeumorphStyle[];
    basin?:boolean;
    darkShadowColor?: string;
    lightShadowColor?: string;
    children?: React.ReactChild;
    swapShadow?: boolean;
}