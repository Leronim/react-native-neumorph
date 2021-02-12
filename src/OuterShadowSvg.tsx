import React from 'react';
import { Svg, Rect, LinearGradient, Defs, Stop, RadialGradient, Path } from 'react-native-svg';
import { StyleSheet, View } from 'react-native';

const convertToRGB = (color: string) => {
	const aRgbHex:any = color.match(/.{1,2}/g);
	const aRgb = [
		parseInt(aRgbHex[0], 16),
		parseInt(aRgbHex[1], 16),
		parseInt(aRgbHex[2], 16)
	]
	return aRgb;
}

export const OuterShadowSvg: React.FC<any> = ({
	width,
	height,
	borderRadius,
	shadowRadius,
	shadowOffset,
	shadowOpacity,
	shadowColor,
	backgroundColor,
	position,
	color,
	spread,
	offsetX,
	offsetY,
	blur,
	opacity
}:any) => {

    const top = position === 'top' ? -10 : 10;
	const left = position === 'top' ? -15 : 15;

	console.log(borderRadius)
	
	const innerRadius = borderRadius > 0 ? Math.max(0, borderRadius + spread - blur / 2) : 0;
	const outerRadius = borderRadius > 0 ? Math.max(0, borderRadius + spread + blur / 2) : blur;
	const innerWidth = width + spread * 2 - blur;
	const innerHeight = height + spread * 2 - blur;
	const outerWidth = width + spread * 2 + blur;
	const outerHeight = height + spread * 2 + blur;
	const borderWidth = (outerWidth - innerWidth) / 2;
	
	const rgb = convertToRGB(color.replace('#',''));

    const renderStop = (key: string) => {
		return[
				<Stop 
					offset="0" 
					stopColor={color}
					stopOpacity="1"
					key={`Box${key}Linear0`}
				/>,
				<Stop
					offset={Math.max(0, innerRadius / outerRadius).toString()}
					stopColor={color}
					stopOpacity="1"
					key={`Box${key}Linear1`}
				/>,
				<Stop 
					offset="1" 
					stopColor={color}
					stopOpacity="0" 
					key={`Box${key}Linear2`}
				/>
		]
	}

	const renderLinearStop = (key: string) => {
		return [
			<Stop
			  offset="0"
			  stopColor={color}
			  stopOpacity="1"
			  key={`Box` + key + 'Linear0'}
			/>,
			<Stop
			  offset="1"
			  stopColor={color}
			  stopOpacity="0"
			  key={'Box' + key + 'Linear1'}
			/>,
		  ];
	}

	const renderRadiantGradient = () => {
		return(
			<Defs>
				<LinearGradient id="top" x1="0%" x2="0%" y1="100%" y2="0%">
					{renderLinearStop('top')}
				</LinearGradient>
				<LinearGradient id="bottom" x1="0%" x2="0%" y1="0%" y2="100%">
					{renderLinearStop('bottom')}
				</LinearGradient>
				<LinearGradient id="left" x1="100%" x2="0%" y1="0%" y2="0%">
					{renderLinearStop('left')}
				</LinearGradient>
				<LinearGradient id="right" x1="0%" x2="100%" y1="0%" y2="0%">
					{renderLinearStop('right')}
				</LinearGradient>
				<RadialGradient
					id="leftTop"
					rx="100%"
					ry="100%"
					cx="100%"
					cy="100%"
					fx="100%"
					fy="100%"
				>
					{renderStop('leftTop')}
				</RadialGradient>
				<RadialGradient
					id="leftBottom"
					rx="100%"
					ry="100%"
					cx="100%"
					cy="0%"
					fx="100%"
					fy="0%"
				>
					{renderStop('leftBottom')}
				</RadialGradient>
				<RadialGradient
					id="rightTop"
					rx="100%"
					ry="100%"
					cx="0%"
					cy="100%"
					fx="0%"
					fy="100%"
				>
					{renderStop('rightTop')}
				</RadialGradient>
				<RadialGradient
					id="rightBottom"
					rx="100%"
					ry="100%"
					cx="0%"
					cy="0%"
					fx="0%"
					fy="0%"
				>
					{renderStop('rightBottom')}
				</RadialGradient>
			</Defs>
		)
	}
	
	const style = StyleSheet.create({
		container: {
			width: width,
			height: height,
			position: 'absolute',
			left: -blur / 2 - spread + offsetX,
			top: -blur / 2 - spread + offsetY,
		}
	})

    return(
		<View style={style.container}>
			<Svg width={outerWidth} height={outerHeight}>
				{renderRadiantGradient()}
				<Path
					d={`
						M 0 ${outerRadius},
						a ${outerRadius} ${outerRadius} 0 0 1 ${outerRadius} ${-outerRadius}
						v ${blur}
						a ${innerRadius} ${innerRadius} 0 0 0 ${-innerRadius} ${innerRadius}
					`}
					fill="url(#leftTop)"
				/>
				<Path
					d={`
						M ${outerWidth - outerRadius} 0,
						a ${outerRadius} ${outerRadius} 0 0 1 ${outerRadius} ${outerRadius}
						h ${-blur}
						a ${innerRadius} ${innerRadius} 0 0 0 ${-innerRadius} ${-innerRadius}
						z
					`}
					fill="url(#rightTop)"
				/>
				<Path
					d={`
						M ${outerWidth} ${outerHeight - outerRadius},
						a ${outerRadius} ${outerRadius} 0 0 1 ${-outerRadius} ${outerRadius}
						v ${-blur}
						a ${innerRadius} ${innerRadius} 0 0 0 ${innerRadius} ${-innerRadius}
						z
				`}
				fill="url(#rightBottom)"
				/>
				<Path
					d={`
						M ${outerRadius} ${outerHeight},
						a ${outerRadius} ${outerRadius} 0 0 1 ${-outerRadius} ${-outerRadius}
						h ${blur}
						a ${innerRadius} ${innerRadius} 0 0 0 ${innerRadius} ${innerRadius}
						z
				`}
				fill="url(#leftBottom)"
		
				/>
				<Rect
					x={outerRadius}
					y={0}
					width={innerWidth - innerRadius * 2}
					height={blur}
					fill="url(#top)"
				/>

				<Rect
					x={outerWidth - blur}
					y={outerRadius}
					width={blur}
					height={innerHeight - innerRadius * 2}
					fill="url(#right)"
				/>
				<Rect
					x={outerRadius}
					y={outerHeight - blur}
					width={innerWidth - innerRadius * 2}
					height={10}
					fill="url(#bottom)"
				/>
				<Rect
					x={0}
					y={outerRadius}
					width={blur}
					height={innerHeight - innerRadius * 2}
					fill="url(#left)"
				/>
				<Path
					d={`
						M ${borderWidth} ${borderWidth + innerRadius},
						a ${innerRadius} ${innerRadius} 0 0 1 ${innerRadius} ${-innerRadius}
						h ${innerWidth - innerRadius * 2}
						a ${innerRadius} ${innerRadius} 0 0 1 ${innerRadius} ${innerRadius}
						v ${innerHeight - innerRadius * 2}
						a ${innerRadius} ${innerRadius} 0 0 1 ${-innerRadius} ${innerRadius}
						h ${-innerWidth + innerRadius * 2}
						a ${innerRadius} ${innerRadius} 0 0 1 ${-innerRadius} ${-innerRadius}
						z
					`}
					fill={`rgba(${rgb[0]},${rgb[1]},${rgb[2]},${0})`}
				/>
        	</Svg>
		</View>
    )
}