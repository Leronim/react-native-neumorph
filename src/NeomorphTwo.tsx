import React from 'react';
import { View, Platform } from 'react-native';
import { InnerShadowSvg } from './InnerShadowSvg';
import { OuterShadowSvg } from './OuterShadowSvg';

export const NeomorphTwo: React.FC<Neomorph> = ({
    inner,
    children,
    style,
    blackShadowColor = 'black',
    whiteShadowColor = 'white'
}: Neomorph) => {
    const { backgroundColor } = style;

    const shadowDark = {
        ...style,
        shadowColor: blackShadowColor || 'black',
    }

    const shadowWhite = {
        ...style,
        shadowColor: whiteShadowColor || 'white',
    }

    if(inner) {
        return(
            <View style={{
                ...style
            }}>
                <View>
                    <InnerShadowSvg position="top" style={shadowDark}/>
                    <InnerShadowSvg position="bottom" style={shadowWhite}/>
                </View>
                <View>{children}</View>
            </View>
        )
    } else {
        if(Platform.OS === 'ios') {
            return(
                <>
                    <View style={{
                        ...shadowDark,
                        position: 'absolute'
                    }}/>
                    <View style={{...style}}>
                        {children}
                    </View>
                    <View
                        style={{
                            ...shadowWhite,
                            position: 'absolute'
                        }}
                    />
                </>
            )
        } else {
            return (
                <View style={{ ...style }}>
                    <OuterShadowSvg position="bottom" style={shadowDark}/>
                    <View style={{
                        zIndex: 1,
                        borderRadius: style.borderRadius,
                        backgroundColor: style.backgroundColor,
                        width: style.width,
                        height: style.height
                    }}>
                        {children}
                    </View>
                    <OuterShadowSvg position="top" style={shadowWhite}/>
                </View>
            )
        }
    }
}