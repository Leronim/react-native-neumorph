import React from 'react';
import { View, Platform } from 'react-native';
import { InnerShadowSvg } from './InnerShadowSvg';
import { OuterShadowSvg } from './OuterShadowSvg';
import { transformStyleProps,
    calcOpacityFromRange,
    brightnessToOpacity,
    brightness
} from './helpers';

export const NeomorphTwo: React.FC<Neomorph> = ({
    inner,
    children,
    style,
    blackShadowColor = '#000000',
    whiteShadowColor = '#ffffff',
    swapShadow = false
}: Neomorph) => {

    let { 
        outsideViewStyle,
        insideViewStyle,
        allShadowProps: {
            width,
            height,
            borderRadius,
            shadowOpacity,
            shadowOffset,
            shadowRadius,
            backgroundColor
        }
    } = transformStyleProps(style, true);

    const viewStyle = {
        borderRadius,
        width,
        height
    }

    const styleShadow = {
        backgroundColor,
        shadowRadius,
        ...viewStyle
    }

    let opacity, shOpacityLight, shOpacityDark;

    if(shadowOpacity) {
        shOpacityDark = shadowOpacity;
        shOpacityLight = shadowOpacity;
    } else {
        opacity = brightnessToOpacity(brightness(backgroundColor));
        shOpacityLight = calcOpacityFromRange(opacity, 0.025, 1);
        shOpacityDark = calcOpacityFromRange(1 - opacity, 0, 0.35);
    }

    let defaultShadowOffset = {
        x: shadowRadius / 2,
        y: shadowRadius / 2,
    }
    if(shadowOffset.x !== 0 || shadowOffset.y !== 0) {
        defaultShadowOffset = {
            x: shadowOffset.x || 0,
            y: shadowOffset.y || 0
        }
    }

    let shadowDark = {
        ...styleShadow,
        shadowColor: blackShadowColor || '#000000',
        shadowOpacity: shadowRadius ? shOpacityDark : 0,
        shadowOffset: defaultShadowOffset,
    }

    let shadowWhite = {
        ...styleShadow,
        shadowColor: whiteShadowColor || '#ffffff',
        shadowOpacity: shadowRadius ? shOpacityLight : 0,
        shadowOffset: {
            x: -defaultShadowOffset.x,
            y: -defaultShadowOffset.y
        }
    }

    const whiteSetting = {
        width,
        height,
        blur: 10,
        spread: 0,
        borderRadius,
        radius: 0,
        color: inner ? '#000000' : '#ffffff',
        offsetX: inner ? -2 : -4,
        offsetY: inner ? -2 : -4,
        opacity: 1
    }

    const darkSetting = {
        width,
        height,
        blur: 10,
        spread: 0,
        radius: 0,
        color: inner ? '#ffffff' : '#000000',
        offsetX: inner ? 2 : 3,
        offsetY: inner ? 2 : 3,
        opacity: 1
    }

    if(swapShadow) {
        let bubble = { ...shadowWhite };
        shadowWhite = { ...shadowDark };
        shadowDark = bubble;
    }

    if (inner) {
        return (
            <View style={{
                ...viewStyle,
                ...outsideViewStyle,
                backgroundColor
            }}>
                <View>
                    <InnerShadowSvg position="top" {...shadowDark} />
                    <InnerShadowSvg position="bottom" {...shadowWhite} />
                </View>
                <View style={{ ...viewStyle, ...insideViewStyle }}>{children}</View>
            </View>
        )
    } else {
        if (Platform.OS === 'ios') {
            return (
                <View style={{ ...viewStyle, ...outsideViewStyle }}>
                    <View style={[
                        shadowDark,
                        {
                            position: 'absolute',
                            shadowRadius: style.shadowRadius,
                        }
                    ]} />
                    <View
                        style={[
                            shadowWhite,
                            {
                                position: 'absolute',
                                shadowRadius: style.shadowRadius,
                            }
                        ]}
                    />
                    <View style={{
                        backgroundColor,
                        ...viewStyle,
                        ...insideViewStyle
                    }}>
                        {children}
                    </View>
                </View>
            )
        } else {
            return (
                <View style={{ ...style, ...outsideViewStyle }}>
                    <>
                        <OuterShadowSvg {...darkSetting} />
                        <OuterShadowSvg {...whiteSetting} />
                    </>
                    <View style={{
                        zIndex: 1,
                        borderRadius: style.borderRadius,
                        backgroundColor: style.backgroundColor,
                        width: style.width,
                        height: style.height
                    }}>
                        {children}
                    </View>
                </View>
            )
        }
    }
}