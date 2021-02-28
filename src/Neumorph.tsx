import React from 'react';
import { StyleSheet, Platform, Text, View, ViewStyle, StyleProp } from 'react-native';
import { NeomoprhStyle, NeumorphProps, rgbProps } from '../global';
import { NativeNeumorph, IosNeumorph } from './nativeComponent';
import { hexToHsl, hslToHex, hexToRgb, refactorHexColor, transformStyleProps } from './utils';
import { InnerShadowSvg } from './InnerShadowSvg';

interface NeomorphViewStyle {
    shadowStyle: StyleProp<ViewStyle>,
    outerStyle: StyleProp<ViewStyle>
}

export const Neumorph: React.FC<NeumorphProps> = ({ 
    inner = false,
    style,
    basin = false,
    darkShadowColor,
    lightShadowColor,
    children,
    swapShadow = false,
}: NeumorphProps) => {
    const { 
        backgroundColor = "transparent",
        borderRadius = 0,
        shadowRadius = 8,
        shadowOpacity = 1,
        width,
        height,
        shadowOffset = {
            width: 2,
            height: 4
        }
    }: NeomoprhStyle = style instanceof Array ? StyleSheet.flatten(style) : style;
    const { h, s, l } = hexToHsl(backgroundColor);
    const light: string = hslToHex(h - 2 < 0 ? 0 : h - 2, s, l + 5 > 100 ? 100 : l + 5);
    const dark: string = hslToHex(h, s, l - 8 < 0 ? 0 : l - 20);
    const _lightShadowColor: rgbProps = lightShadowColor ? hexToRgb(lightShadowColor, shadowOpacity) : hexToRgb(light, shadowOpacity);
    const _darkShadowColor: rgbProps = darkShadowColor ? hexToRgb(darkShadowColor, shadowOpacity) : hexToRgb(dark, shadowOpacity);
    const viewStyle: NeomorphViewStyle = transformStyleProps(style, Platform.OS);

    if(Platform.OS === 'ios') {
        const iosLightShadow = lightShadowColor ? lightShadowColor : light;
        const iosDarkShadow = darkShadowColor ? darkShadowColor : dark;
        const shadowStyle = {
            width,
            height,
            shadowRadius,
            borderRadius,
            shadowOpacity,
            backgroundColor
        }
        const insetLightSetting = {
            shadowOffset: {
                width: -shadowOffset.width,
                height: -shadowOffset.height
            },
            shadowColor: iosLightShadow,
            ...shadowStyle
        };
        
        const insetDarkSetting = {
            shadowOffset: {
                width: shadowOffset.width,
                height: shadowOffset.height
            },
            shadowColor: iosDarkShadow,
            ...shadowStyle
        };
        return (
            <IosNeumorph 
                style={style}
                inner={inner}
                darkShadowColor={iosDarkShadow.replace('#', '')}
                lightShadowColor={iosLightShadow.replace('#', '')}
                borderRadius={borderRadius}
                shadowOpacity={shadowOpacity}
                color={backgroundColor.replace('#', '')}
            />
        )
    } else {
        console.log(viewStyle.outerStyle)
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
}
