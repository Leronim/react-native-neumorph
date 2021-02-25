import React from 'react';
import { View, ViewStyle } from 'react-native';
import { color } from 'react-native-reanimated';

export const ShadowIos: React.FC<any> = ({
    children,
    inner,
    style,
    darkShadow,
    lightShadow,
}) => {
    const { 
        width, 
        height, 
        shadowOffset = { width: 0, height: 0 },
        backgroundColor,
        borderRadius
    }: ViewStyle = style;

    const topShadowOffset = {
        width: -shadowOffset.width * 2,
        height: -shadowOffset.height * 2
    }
    const topShadowStyle: ViewStyle = {
        height,
        width,
        backgroundColor: 'green',
        borderColor: 'transparent',
        borderWidth: 6,
        overflow: 'hidden',
        shadowColor: darkShadow,
        shadowRadius: 6,
        shadowOpacity: 1,
        shadowOffset,

    }
    const bottomShadowStyle: ViewStyle = {
        height,
        width,
        backgroundColor: 'blue',
        borderColor: 'transparent',
        borderWidth: 7,
        overflow: 'hidden',
        shadowColor: lightShadow,
        shadowRadius: 5,
        shadowOpacity: 1,
        shadowOffset: topShadowOffset,
        justifyContent: 'center',
        alignItems: 'center',
    }

    return(
        <View style={topShadowStyle}>
            <View style={bottomShadowStyle}>
                <View style={{ width: '100%', backgroundColor: 'red' }}>
                    {children}
                </View>
            </View>
        </View>
    )
}