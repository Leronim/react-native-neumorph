import React from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import {Shadow} from './Shadow';
import { InnerShadowSvg } from './InnerShadowSvg';
import { hexToHsl, hslToHex } from './utils';
import { NeomorphProps } from '../global';

export const NeomorphTwo: React.FC<NeomorphProps> = ({
    inner,
    children,
	darkShadowColor,
	lightShadowColor,
    style: {
        height = 0,
        width = 0,
        borderRadius,
        backgroundColor,
        shadowOffset,
        shadowRadius = 1,
        shadowOpacity
    },
}: NeomorphProps) => {

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
            width,
            height,
            borderRadius,
            backgroundColor,
        }
    })

	const renderShadow = () => {
		if(Platform.OS === 'ios') {
			return (
				<>
					<View
						style={[
							insetLightSetting,
							{
								position: 'absolute'
							}
						]}
					/>
					<View
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
                        <InnerShadowSvg position="top" option={insetLightSetting}/>
                        <InnerShadowSvg position="bottom" option={insetDarkSetting}/>
                    </>
				)
			} else {
				return (
					<>
						<Shadow option={lightSetting} />
						<Shadow option={darkSetting} />
					</>
				)
			}
		}
	}

	if(inner) {
		return (
			<View style={{ ...viewStyle, backgroundColor}}>
				<View>
					<InnerShadowSvg position="top" option={insetDarkSetting}/>
					<InnerShadowSvg position="bottom" option={insetLightSetting}/>
				</View>
				<View style={{ ...viewStyle }}>{children}</View>
			</View>
		)
	} else {
		return (
			<View style={{ ...viewStyle }}>
				{renderShadow()}
				<View style={styles.view}>{children}</View>
			</View>
		)
	}
    
}