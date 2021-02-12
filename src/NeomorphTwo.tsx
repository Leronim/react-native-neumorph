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
    blackShadowColor = 'black',
    whiteShadowColor = 'white',
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

    let shadowDark = {
        ...styleShadow,
        shadowColor: blackShadowColor || 'black',
        shadowOpacity: shadowRadius ? shOpacityDark : 0,
        shadowOffset: {
            width: shadowRadius / 2,
            height: shadowRadius / 2
        }
    }

    let shadowWhite = {
        ...styleShadow,
        shadowColor: whiteShadowColor || 'white',
        shadowOpacity: shadowRadius ? shOpacityLight : 0,
        shadowOffset: {
            width: -shadowRadius / 2,
            height: -shadowRadius / 2
        }
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
                    <InnerShadowSvg position="top" style={shadowDark} />
                    <InnerShadowSvg position="bottom" style={shadowWhite} />
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
                    <OuterShadowSvg position="bottom" style={shadowDark} />
                    <View style={{
                        zIndex: 1,
                        borderRadius: style.borderRadius,
                        backgroundColor: style.backgroundColor,
                        width: style.width,
                        height: style.height
                    }}>
                        {children}
                    </View>
                    <OuterShadowSvg position="top" style={shadowWhite} />
                </View>
            )
        }
    }
}