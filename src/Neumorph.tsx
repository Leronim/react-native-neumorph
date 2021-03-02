import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { NeumorphProps, rgbProps } from '../global';
import { NativeNeumorph, IosNeumorph } from './nativeComponent';
import { hexToHsl, hslToHex, hexToRgb, refactorHexColor } from './utils';

export default class Neumorph extends React.PureComponent<NeumorphProps> {
    render() {
        const {
            inner = false,
            style,
            basin = false,
            darkShadowColor,
            lightShadowColor,
            children,
            swapShadow = false,
        } = this.props;
        const { 
            backgroundColor = "transparent",
            borderRadius = 0,
            shadowRadius = 8,
            shadowOpacity = 1,
        } = style instanceof Array ? StyleSheet.flatten(style) : style;
        const { h, s, l } = hexToHsl(backgroundColor);
        const light: string = hslToHex(h - 2 < 0 ? 0 : h - 2, s, l + 5 > 100 ? 100 : l + 5);
        const dark: string = hslToHex(h, s, l - 8 < 0 ? 0 : l - 20);
        if(Platform.OS === 'ios') {
            const iosLightShadow = lightShadowColor ? refactorHexColor(lightShadowColor) : light;
            const iosDarkShadow = darkShadowColor ? refactorHexColor(darkShadowColor) : dark;
            return (
                <IosNeumorph 
                    style={[style, { backgroundColor: 'transparent' }]}
                    inner={inner}
                    darkShadowColor={swapShadow ? iosLightShadow.replace('#', '') : iosDarkShadow.replace('#', '')}
                    lightShadowColor={swapShadow ? iosDarkShadow.replace('#', '') : iosLightShadow.replace('#', '')}
                    borderRadius={borderRadius}
                    shadowOpacity={shadowOpacity}
                    shadowRadius={shadowRadius}
                    color={refactorHexColor(backgroundColor).replace('#', '')}
                >
                    {children}
                </IosNeumorph>
            )
        } else {
            const _lightShadowColor: rgbProps = lightShadowColor ? hexToRgb(lightShadowColor, shadowOpacity) : hexToRgb(light, shadowOpacity);
            const _darkShadowColor: rgbProps = darkShadowColor ? hexToRgb(darkShadowColor, shadowOpacity) : hexToRgb(dark, shadowOpacity);
            return (
                <NativeNeumorph
                    inner={inner}
                    style={style}
                    basin={basin}
                    shadowRadius={shadowRadius}
                    backgroundColor={refactorHexColor(backgroundColor)}
                    borderRadius={borderRadius >= 100 ? borderRadius * 5 : borderRadius * 2}
                    darkShadowColor={swapShadow ? _lightShadowColor : _darkShadowColor}
                    lightShadowColor={swapShadow ? _darkShadowColor : _lightShadowColor}
                >
                    {children}
                </NativeNeumorph>
            )
        }
    }
}
