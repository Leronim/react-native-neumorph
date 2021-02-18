import React, { useEffect, useState, useRef } from 'react';
import { View, Platform, StyleSheet, InteractionManager } from 'react-native';
import { AnimatedInerShadowSvg } from './AnimatedInerShadowSvg';
import { hexToHsl, hslToHex } from './utils';
import Animated, { interpolate, Extrapolate, useAnimatedStyle } from 'react-native-reanimated';
import { NeomorphProps } from '../global';
import { AnimatedShadow } from './AnimatedShadow';
import { useLazyRef } from './useLazyRef';

interface NeomorphAnimProps extends NeomorphProps {
	height: Animated.SharedValue<number>;
	width: Animated.SharedValue<number>;
	style: any;
}

export const AnimatedNeomorph: React.FC<NeomorphAnimProps> = ({ 
    inner,
    children,
	darkShadowColor,
	lightShadowColor,
	height,
	width,
    style: {
        borderRadius,
        backgroundColor,
        shadowOffset,
        shadowRadius = 1,
        shadowOpacity,
    }
}) => {
    const { h, s, l } = hexToHsl(backgroundColor);
	const innerRadius = borderRadius > 0 ? Math.max(0, borderRadius - shadowRadius / 2) : 0;
	const outerRadius = borderRadius > 0 ? Math.max(0, borderRadius + shadowRadius / 2) : shadowRadius
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

	const viewStyle = {
		borderRadius,
	}

	const shadowStyle = {
		width,
		height,
		shadowRadius: shadowRadius * 2,
		borderRadius,
		shadowOpacity,
		backgroundColor
	}

    const lightSetting = {
        shadowOffset: {
            width: -shadowOffset.width,
            height: -shadowOffset.height
			// width: -shadowOffset.width * 3,
			// height: -shadowOffset.height * 3,
        },
        shadowColor: lightShadowColor ? lightShadowColor : light,
		innerRadius,
		outerRadius,
		...shadowStyle
    };
    
      const darkSetting = {
        shadowOffset: {
            width: shadowOffset.width,
            height: shadowOffset.height
        },
		innerRadius,
		outerRadius,
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

    const test = useAnimatedStyle(() => {
        return {
            width: interpolate(width.value, [0, 1], [width.value, width.value]),
            height: interpolate(height.value, [0, 1], [height.value, height.value])
        }
    })

    const styles = StyleSheet.create({
        view: {
            borderRadius,
            backgroundColor,
        }
    })

	const renderShadow = () => {
		if(Platform.OS === 'ios') {
			return (
				<>
					<Animated.View
						style={[
							insetLightSetting,
							{
								position: 'absolute'
							}
						]}
					/>
					<Animated.View
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
			return (
				<>
					{/* <AnimatedShadow width={width} height={height} option={lightSetting} /> */}
					<AnimatedShadow width={width} height={height} option={darkSetting} />
				</>
			)
		}
	}

	if(inner) {
		return (
			<>
				<View>
					<AnimatedInerShadowSvg position="top" width={width} height={height} option={insetDarkSetting}/>
					<AnimatedInerShadowSvg position="bottom" width={width} height={height} option={insetLightSetting}/>
				</View>
				<Animated.View style={[test]}>{children}</Animated.View>
			</>
		)
	} else {
		return (
			<>
				{renderShadow()}
				{/* <Animated.View style={[styles.view, test]}>{children}</Animated.View> */}
			</>
		)
	}
};