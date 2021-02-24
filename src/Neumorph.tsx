import React from 'react';
import { StyleSheet, NativeModules } from 'react-native';
import { NeomoprhStyle, NeomorphProps, rgbProps } from '../global';
import { NativeNeumorph } from './nativeComponent';
import { hexToHsl, hslToHex, hexToRgb, refactorHexColor } from './utils';

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
        borderRadius = 0,
        shadowRadius = 8,
        shadowOpacity = 1
    }: NeomoprhStyle = style instanceof Array ? StyleSheet.flatten(style) : style;
    const { h, s, l } = hexToHsl(backgroundColor);
    const light: string = hslToHex(h - 2 < 0 ? 0 : h - 2, s, l + 5 > 100 ? 100 : l + 5);
    const dark: string = hslToHex(h, s, l - 8 < 0 ? 0 : l - 20);
    const _lightShadowColor: rgbProps = lightShadowColor ? hexToRgb(lightShadowColor, shadowOpacity) : hexToRgb(light, shadowOpacity);
    const _darkShadowColor: rgbProps = darkShadowColor ? hexToRgb(darkShadowColor, shadowOpacity) : hexToRgb(dark, shadowOpacity);

    return (
        <NativeNeumorph
            inner={inner}
            style={style}
            basin={basin}
            shadowRadius={shadowRadius}
            backgroundColor={refactorHexColor(backgroundColor)}
            borderRadius={borderRadius === 0 ? borderRadius : borderRadius * 2}
            darkShadowColor={swapShadow ? _lightShadowColor : _darkShadowColor}
            lightShadowColor={swapShadow ? _darkShadowColor : _lightShadowColor}
        >
            {children}
        </NativeNeumorph>
    )
}
