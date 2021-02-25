import React from 'react';
import { NativeNeumorph } from './nativeComponent';
import Animated from 'react-native-reanimated';
import { StyleSheet } from 'react-native';
import { rgbProps, NeumorphProps } from '../global';
import { hexToHsl, hslToHex, hexToRgb, refactorHexColor } from './utils';

const AnimNeumorph = Animated.createAnimatedComponent(NativeNeumorph);

export const AnimatedNeumorph: React.FC<NeumorphProps> = ({
    style,
    inner = false,
    basin = false,
    darkShadowColor,
    lightShadowColor,
    swapShadow
}: NeumorphProps) => {
    const { 
        backgroundColor = "transparent",
        borderRadius = 0,
        shadowRadius = 8,
        shadowOpacity = 1
    } = style instanceof Array ? StyleSheet.flatten(style) : style;
    const { h, s, l } = hexToHsl(backgroundColor);
    const light: string = hslToHex(h - 2 < 0 ? 0 : h - 2, s, l + 5 > 100 ? 100 : l + 5);
    const dark: string = hslToHex(h, s, l - 8 < 0 ? 0 : l - 20);
    const _lightShadowColor: rgbProps = lightShadowColor ? hexToRgb(lightShadowColor, shadowOpacity) : hexToRgb(light, shadowOpacity);
    const _darkShadowColor: rgbProps = darkShadowColor ? hexToRgb(darkShadowColor, shadowOpacity) : hexToRgb(dark, shadowOpacity);

    return (
        <AnimNeumorph
            inner={inner}
            basin={basin}
            style={style}
            shadowRadius={shadowRadius}
            backgroundColor={refactorHexColor(backgroundColor)}
            borderRadius={borderRadius === 0 ? borderRadius : borderRadius * 2}
            darkShadowColor={swapShadow ? _lightShadowColor : _darkShadowColor}
            lightShadowColor={swapShadow ? _darkShadowColor : _lightShadowColor}
        />
    )
}