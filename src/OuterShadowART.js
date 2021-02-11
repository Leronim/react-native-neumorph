import React from 'react';
import { ShadowARTType } from './types';
import { StyleSheet } from 'react-native';
import { Surface, Shape, Group } from '@react-native-community/art';
import { getPathWithRadius, transformShadowPropsForAndroid } from './helpers';
import { Rect, Svg, Defs, LinearGradient, Stop } from 'react-native-svg';

export default class OuterShadowART extends React.PureComponent {
	renderStop = (backgroundColor, shadowProps, type) => {
		return[
				<Stop 
					offset="0"
					stopColor={backgroundColor || 'white'} 
					stopOpacity="0.1"
					key={`Box${this.props.position}Linear0`}
				/>,
				<Stop 
					offset="1" 
					stopColor={type === 'shadow' ? shadowProps.shadowColor : 'white'}
					stopOpacity="0" 
					key={`Box${this.props.position}Linear1`}
				/>
		]
	}
	renderLinearGradient = (backgroundColor, shadowProps) => {
		if(this.props.position === 'top') {
			return(
				<Defs>
					<LinearGradient id="shadow1" x1="0%" x2="0%" y1="0%" y2="100%">
						{this.renderStop(backgroundColor, shadowProps, 'shadow')}
					</LinearGradient>
					<LinearGradient id="shadow2" x1="0%" y1="0%" x2="100%" y2="0%">
						{this.renderStop(backgroundColor, shadowProps, 'shadow')}
					</LinearGradient>
				</Defs>
			)
		} else {
			return(
				<Defs>
					<LinearGradient id="shadow1" x1="0%" y1="0%" x2="0%" y2="0%">
						{this.renderStop(backgroundColor, shadowProps, 'white')}
					</LinearGradient>
					<LinearGradient id="shadow2" x1="0%" x2="0%" y1="100%" y2="0%">
						{this.renderStop(backgroundColor, shadowProps, 'white')}
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

		const path = getPathWithRadius(width, height, borderRadius);
		const absOffsetX = Math.abs(shadowOffset.x);
		const absOffsetY = Math.abs(shadowOffset.y);

		const top = this.props.position === 'top' ? -10 : 10;
		const left = this.props.position === 'top' ? -15 : 15


		return (
			<Svg 
				height={height} 
				width={width} 
				style={{ position: 'absolute', top: top, left: left}}
			>
				{this.renderLinearGradient(backgroundColor, shadowProps)}
				<Rect width={width + borderRadius} height={height + borderRadius} fill="url(#shadow1)"/>
				<Rect width={width + borderRadius} height={height + borderRadius} fill="url(#shadow2)"/>
			</Svg>
			// <Surface
			//   height={height + shadowRadius * 2 + absOffsetY * 2}
			//   width={width + shadowRadius * 2 + absOffsetX * 2}
			//   style={[
			//     styles.surface,
			//     { top: -shadowRadius - absOffsetY, left: -shadowRadius - absOffsetX },
			//   ]}>
			//   <Group x={shadowRadius + absOffsetX} y={shadowRadius + absOffsetY}>
			//     <Shape d={path} fill={backgroundColor} {...shadowProps} />
			//   </Group>
			// </Surface>
		);
	}
}

const styles = StyleSheet.create({
	surface: {
		backgroundColor: 'transparent',
		position: 'absolute',
	},
});

OuterShadowART.propTypes = ShadowARTType;
