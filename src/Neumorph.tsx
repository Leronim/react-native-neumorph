import React from 'react';
import { StyleSheet } from 'react-native';
import { NeomoprhStyle, NeomorphProps } from '../global';
import { NativeNeumorph } from './nativeComponent';
import { hexToHsl, hslToHex } from './utils';

export const Neumorph: React.FC<NeomorphProps> = ({ 
    inner = false,
    style,
    basin = false,
    darkShadowColor,
    lightShadowColor,
    children,
    swapShadow = false,
}: NeomorphProps) => {
    const { 
        backgroundColor = "transparent",
        shadowOffset = { width: 20, height: 20 },
        borderRadius = 0,
        shadowRadius = 0
    }: NeomoprhStyle = style instanceof Array ? StyleSheet.flatten(style) : style;
    const { h, s, l } = hexToHsl(backgroundColor);
    const light: string = hslToHex(h - 2 < 0 ? 0 : h - 2, s, l + 5 > 100 ? 100 : l + 5);
    const dark: string = hslToHex(h, s, l - 8 < 0 ? 0 : l - 20);
    const _lightShadowColor: string = lightShadowColor ? lightShadowColor : light;
    const _darkShadowColor: string = darkShadowColor ? darkShadowColor : dark;

    return (
        <NativeNeumorph
            inner={inner}
            style={style}
            basin={basin}
            shadowRadius={shadowRadius}
            backgroundColor={backgroundColor}
            shadowOffset={shadowOffset}
            borderRadius={borderRadius === 0 ? borderRadius : borderRadius * 2}
            darkShadowColor={swapShadow ? _lightShadowColor : _darkShadowColor}
            lightShadowColor={swapShadow ? _darkShadowColor : _lightShadowColor}
        >
            {children}
        </NativeNeumorph>
    )
}
