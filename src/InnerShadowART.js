/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { ShadowARTType } from './types';
import { transformShadowPropsForAndroid } from './helpers';
import { Svg, Rect, Defs, LinearGradient, Stop } from 'react-native-svg';
import Animated from 'react-native-reanimated';

const AnimSvg = Animated.createAnimatedComponent(Svg);
const AnimRect = Animated.createAnimatedComponent(Rect);

export default class InnerShadowART extends React.Component {
	renderStop = (backgroundColor, shadowProps) => {
		return[
				<Stop 
					offset="0.1" 
					stopColor={backgroundColor || 'white'}
					stopOpacity="0"
					key={`Box${this.props.position}Linear0`}
				/>,
				<Stop 
					offset="0" 
					stopColor={shadowProps.shadowColor || 'white'} 
					stopOpacity="0.3" 
					key={`Box${this.props.position}Linear1`}
				/>
		]
	}
	renderLinearGradient = (backgroundColor, shadowProps) => {
		if(this.props.position === 'top') {
			return(
				<Defs>
					<LinearGradient id="shadow1" x1="0%" x2="0%" y1="0%" y2="100%">
						{this.renderStop(backgroundColor, shadowProps)}
					</LinearGradient>
					<LinearGradient id="shadow2" x1="0%" y1="0%" x2="100%" y2="0%">
						{this.renderStop(backgroundColor, shadowProps)}
					</LinearGradient>
				</Defs>
			)
		} else {
			return(
				<Defs>
					<LinearGradient id="shadow1" x1="100%" y1="0%" x2="0%" y2="0%">
						{this.renderStop(backgroundColor, shadowProps)}
					</LinearGradient>
					<LinearGradient id="shadow2" x1="0%" x2="0%" y1="100%" y2="0%">
						{this.renderStop(backgroundColor, shadowProps)}
					</LinearGradient>
				</Defs>
			)
		}
	}
	render() {
		const {
			width = 0,
			height = 0,
			borderRadius,
			shadowRadius,
			shadowOffset,
			shadowOpacity,
			shadowColor,
			backgroundColor,
		} = this.props;

		const shadowProps = transformShadowPropsForAndroid({
			shadowOpacity,
			shadowOffset,
			shadowRadius,
			shadowColor,
		});

		const absOffsetX = Math.abs(shadowOffset.x);
		const absOffsetY = Math.abs(shadowOffset.y);
		let stroke = 30;
		if (absOffsetX >= absOffsetY) {
			stroke += absOffsetX;
		} else {
			stroke += absOffsetY;
		}
		return (
			<AnimSvg height={height} width={width} style={{ position: 'absolute' }}>
				{this.renderLinearGradient(backgroundColor, shadowProps)}
				<AnimRect rx={borderRadius} ry={borderRadius} width={width} height={height} fill="url(#shadow1)" />
				<AnimRect rx={borderRadius} ry={borderRadius} width={width} height={height} fill="url(#shadow2)" />
			</AnimSvg>
		);
	}
}

InnerShadowART.propTypes = ShadowARTType;
