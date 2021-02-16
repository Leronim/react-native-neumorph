import React from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import { AnimatedInerShadowSvg } from './AnimatedInerShadowSvg';
import { hexToHsl, hslToHex } from './utils';
import Animated from 'react-native-reanimated';
import { NeomorphProps } from '../global';
import { AnimatedShadow } from './AnimatedShadow';

interface NeomorphAnimProps extends NeomorphProps {
    width: Animated.Value<number>;
    height: Animated.Value<number>;
}

const AnimatedView = Animated.createAnimatedComponent(View);

export const AnimatedNeomorph: React.FC<any> = ({ 
    inner,
    children,
	darkShadowColor,
	lightShadowColor,
    width,
    height,
    style: {
        borderRadius,
        backgroundColor,
        shadowOffset,
        shadowRadius = 1,
        shadowOpacity
    },
}: any) => {
        
    const { h, s, l } = hexToHsl(backgroundColor);
    const light = hslToHex(h - 2 < 0 ? 0 : h - 2, s, l + 5 > 100 ? 100 : l + 5);
    const dark = hslToHex(h, s, l - 8 < 0 ? 0 : l - 20);

	let _shadowOffset = {
		width: shadowRadius / 2,
		height: shadowRadius / 2,
	}

	if(shadowOffset?.width !== 0 || shadowOffset?.height !== 0) {
		_shadowOffset = {
			width: shadowOffset?.width || 0,
			height: shadowOffset?.height || 0
		}
	}

	console.log(_shadowOffset)

	const viewStyle = {
		borderRadius,
		width,
		height
	}

	const shadowStyle = {
		width,
		height,
		shadowRadius,
		borderRadius,
		shadowOpacity,
		backgroundColor
	}

    const lightSetting = {
        shadowOffset: {
            width: -shadowRadius + -shadowOffset.width,
            height: -shadowRadius + -shadowOffset.height
        },
        shadowColor: lightShadowColor ? lightShadowColor : light,
		...shadowStyle
    };
    
      const darkSetting = {
        shadowOffset: {
            width: shadowOffset.width,
            height: shadowOffset.height
        },
        shadowColor: darkShadowColor ? darkShadowColor : dark,
		...shadowStyle
    };

    const insetLightSetting = {
        shadowOffset: {
            width: -shadowOffset.width,
            height: -shadowOffset.height
        },
        shadowColor: lightShadowColor ? lightShadowColor : light,
		...shadowStyle
    };
    
    const insetDarkSetting = {
        shadowOffset: {
            width: shadowOffset.width,
            height: shadowOffset.height
        },
        shadowColor: darkShadowColor ? darkShadowColor : dark,
		...shadowStyle
    };

    const styles = StyleSheet.create({
        view: {
            // width,
            // height,
            borderRadius,
            backgroundColor,
        }
    })

	const renderShadow = () => {
		if(Platform.OS === 'ios') {
			return (
				<>
					<AnimatedView
						style={[
							insetLightSetting,
							{
								position: 'absolute'
							}
						]}
					/>
					<AnimatedView
						style={[
							insetDarkSetting,
							{
								position: 'absolute'
							}
						]}
					/>
				</>
			)
		} else {
			if(inner) {
				return (
					<>
                        {/* <AnimatedInerShadowSvg position="top" option={insetLightSetting}/> */}
                        {/* <AnimatedInerShadowSvg position="bottom" option={insetDarkSetting}/> */}
                    </>
				)
			} else {
				return (
					<>
						<AnimatedShadow option={lightSetting} />
						<AnimatedShadow option={darkSetting} />
					</>
				)
			}
		}
	}

	if(inner) {
		return (
			<AnimatedView style={{ ...viewStyle, backgroundColor}}>
				<View>
					<AnimatedInerShadowSvg position="top" option={insetDarkSetting}/>
					<AnimatedInerShadowSvg position="bottom" option={insetLightSetting}/>
				</View>
				<AnimatedView style={{ ...viewStyle }}>{children}</AnimatedView>
			</AnimatedView>
		)
	} else {
		return (
			<AnimatedView style={{ ...viewStyle }}>
				{renderShadow()}
				<AnimatedView style={styles.view}>{children}</AnimatedView>
			</AnimatedView>
		)
	}
};