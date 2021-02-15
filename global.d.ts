import { StyleProp, ViewStyle } from "react-native";

export interface NeomorphProps {
    children: React.ReactChild;
    inner?: boolean;
    style: ViewStyle;
    darkShadowColor?: string;
    lightShadowColor?: string;
    swapShadow?: boolean;
    
}