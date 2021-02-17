import React, { useEffect, useState, useRef } from 'react';
import { View, Platform, StyleSheet, InteractionManager } from 'react-native';
import { AnimatedInerShadowSvg } from './AnimatedInerShadowSvg';
import { hexToHsl, hslToHex } from './utils';
import Animated, { Easing, timing, useValue, block, interpolate } from 'react-native-reanimated';
import { NeomorphProps } from '../global';
import { AnimatedShadow } from './AnimatedShadow';

interface NeomorphAnimProps extends NeomorphProps {
    width: Animated.Value<number>;
    height: Animated.Value<number>;
}

export const AnimatedNeomorph: React.FC<any> = ({ 
    inner,
    children,
	darkShadowColor,
	lightShadowColor,
    width,
    height,
	isAnim,
    style: {
        borderRadius,
        backgroundColor,
        shadowOffset,
        shadowRadius = 1,
        shadowOpacity
    },
}: any) => {
	const [nativeWidth, setNativeWidth] = useState(width._value);
	const [nativeHeight, setNativeHeight] = useState(width._value);
	const containerRef: React.RefObject<Animated.View> = useRef(null);
    const { h, s, l } = hexToHsl(backgroundColor);
	const innerRadius = borderRadius > 0 ? Math.max(0, borderRadius - shadowRadius / 2) : 0;
	const outerRadius = borderRadius > 0 ? Math.max(0, borderRadius + shadowRadius / 2) : shadowRadius
    const light = hslToHex(h - 2 < 0 ? 0 : h - 2, s, l + 5 > 100 ? 100 : l + 5);
    const dark = hslToHex(h, s, l - 8 < 0 ? 0 : l - 20);
	const innerWidth = useValue(nativeWidth - shadowRadius - innerRadius * 2),
		innerHeight = useValue(nativeHeight - shadowRadius),
		outerWidth = useValue(nativeWidth + shadowRadius),
		outerHeight = useValue(nativeHeight + shadowRadius),
		borderWidth = useValue((outerWidth._value - innerWidth._value) / 2);
	const test = useValue(0);

	useEffect(() => {
		timing(innerWidth, {
			toValue: nativeWidth - shadowRadius - innerRadius * 2,
			duration: 1500,
			easing: Easing.ease
		}).start(),
		timing(innerHeight, {
			toValue: nativeHeight - shadowRadius - innerRadius * 2,
			duration: 1500,
			easing: Easing.ease
		}).start()
		timing(outerWidth, {
			toValue: nativeWidth + shadowRadius,
			duration: 1500,
			easing: Easing.ease
		}).start();
		timing(outerHeight, {
			toValue: nativeHeight + shadowRadius,
			duration: 1500,
			easing: Easing.ease
		}).start();
		console.log('=', nativeWidth, nativeHeight)
	}, [isAnim])

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
		innerWidth,
		innerHeight,
		outerWidth,
		outerHeight,
		innerRadius,
		outerRadius,
		borderWidth,
        nativeWidth,
        nativeHeight,
		...shadowStyle
    };
    
      const darkSetting = {
        shadowOffset: {
            width: shadowOffset.width,
            height: shadowOffset.height
        },
		innerWidth,
		innerHeight,
		outerWidth,
		outerHeight,
		borderWidth,
		innerRadius,
		outerRadius,
        nativeWidth,
        nativeHeight,
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
					<AnimatedShadow isAnim={isAnim} option={lightSetting} />
					<AnimatedShadow isAnim={isAnim} option={darkSetting} />
				</>
			)
		}
	}

	if(inner) {
		return (
			<Animated.View onLayout={(event) => {
				const { width, height } = event.nativeEvent.layout;
				setNativeWidth(width);
				setNativeHeight(height);
			}} style={{ ...viewStyle, backgroundColor}}>
				<View>
					<AnimatedInerShadowSvg position="top" option={insetDarkSetting}/>
					<AnimatedInerShadowSvg position="bottom" option={insetLightSetting}/>
				</View>
				<Animated.View style={{ ...viewStyle }}>{children}</Animated.View>
			</Animated.View>
		)
	} else {
		return (
			<Animated.View ref={containerRef} onLayout={(event) => {
				const { width, height } = event.nativeEvent.layout;
				setNativeWidth(width);
				setNativeHeight(height);
			}} style={{ ...viewStyle }}>
				{renderShadow()}
				<Animated.View style={[styles.view, { width, height }]}>{children}</Animated.View>
			</Animated.View>
		)
	}
};