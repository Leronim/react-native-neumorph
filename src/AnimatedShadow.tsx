import React, { useEffect } from 'react';
import { Svg,
    Rect,
    Path,
    LinearGradient,
    RadialGradient,
    Defs,
    Stop
} from 'react-native-svg';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, { interpolate, useAnimatedProps, useAnimatedStyle, useDerivedValue } from 'react-native-reanimated';
import { constructAnimPath } from './utils'
import { getPathWithRadius } from './helpers';

const AnimSvg = Animated.createAnimatedComponent(Svg);
const AnimView = Animated.createAnimatedComponent(View);
const AnimPath = Animated.createAnimatedComponent(Path);
const AnimRect = Animated.createAnimatedComponent(Rect);

function hexToRgb(hex: any) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });
  
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
}

export const AnimatedShadow: React.FC<any> = ({
    width,
	height,
    option: {
        shadowColor,
        borderRadius,
        // width,
        // height,
        shadowRadius,
        shadowOpacity,
        shadowOffset,
        nativeWidth,
        nativeHeight,
    }
}:any) => {
    const innerRadius = borderRadius > 0 ? Math.max(0, borderRadius - shadowRadius / 2) : 0,
		outerRadius = borderRadius > 0 ? Math.max(0, borderRadius + shadowRadius / 2) : shadowRadius;
		// innerWidth = width.value - shadowRadius,
		// innerHeight = height.value - shadowRadius,
		// outerWidth = width.value + shadowRadius,
		// outerHeight = height.value + shadowRadius;
		// borderWidth = (outerWidth - innerWidth) / 2;
	const rgb = hexToRgb(shadowColor);
	
	const calculatingInnerWidth = (isInner: boolean = false) => {
		"worklet";
		if(isInner) {
			return width.value - shadowRadius - innerRadius * 2;
		} else {
			return width.value - shadowRadius;
		}
	}
	const calculatingOuterWidth = () => {
		"worklet";
		return width.value + shadowRadius;
	}

	const calculatingInnerHeight = (isInner: boolean = false) => {
		"worklet";
		if(isInner) {
			return height.value - shadowRadius - innerRadius * 2;
		} else {
			return height.value - shadowRadius
		}
	}
	const calculatingOuterHeight = () => {
		"worklet";
		return height.value + shadowRadius;
	}

	const calculatingBorderRadius = () => {
		"worklet";
		return (calculatingOuterWidth() - calculatingInnerWidth()) / 2;
	}


	const interpolateWidth = useDerivedValue(() => 
		interpolate(width.value, [0, 1], [width.value, width.value])
	);
	const interpolateHeight = useDerivedValue(() => 
		interpolate(height.value, [0, 1], [height.value, height.value])
	);
	const innerHeight = useDerivedValue(() => 
		interpolate(height.value, [0, 1], [calculatingInnerHeight(true), calculatingInnerHeight(true)])
	);
	const innerWidth = useDerivedValue(() => 
		interpolate(width.value, [0, 1], [calculatingInnerWidth(true), calculatingInnerWidth(true)])
	);
	const outerWidth = useDerivedValue(() => 
		interpolate(width.value, [0, 1], [calculatingOuterWidth(), calculatingOuterWidth()])
	);
	const outerHeight = useDerivedValue(() =>
		interpolate(height.value, [0, 1], [calculatingOuterHeight(), calculatingOuterHeight()])
	);
	const borderWidth = useDerivedValue(() => 
		interpolate(width.value, [0, 1], [
			calculatingBorderRadius(),
			calculatingBorderRadius()
		])
	);
	const borderWidthAddRadius = useDerivedValue(() => 
		interpolate(width.value, [0, 1], [
			calculatingBorderRadius() + innerRadius,
			calculatingBorderRadius() + innerRadius
		])
	)


    const rectTop = useAnimatedProps(() => ({
        width: interpolateWidth.value,
		x: outerRadius,
		y: 0,
		height: shadowRadius,
		rx: borderRadius
    }));

	const rectRight = useAnimatedProps(() => ({
		height: innerHeight.value,
		x: interpolateWidth.value,
		width: shadowRadius,
		y: outerRadius
	}));

	const rectBottom = useAnimatedProps(() => ({
		y: interpolateHeight.value,
		width: innerWidth.value,
		x: outerRadius,
		height: shadowRadius
	}));
	
	const rectLeft = useAnimatedProps(() => ({
		height: innerHeight.value,
		width: shadowRadius,
		y: outerRadius,
		x: 0
	}));

	const pathInner = useAnimatedProps(() => {
		const path = `
			M ${borderWidth.value} ${borderWidthAddRadius.value},
			a ${innerRadius} ${innerRadius} 0 0 1 ${innerRadius} ${-innerRadius}
			h ${innerWidth.value}
			a ${innerRadius} ${innerRadius} 0 0 1 ${innerRadius} ${innerRadius}
			v ${innerHeight.value}
			a ${innerRadius} ${innerRadius} 0 0 1 ${-innerRadius} ${innerRadius}
			h ${-innerWidth.value}
			a ${innerRadius} ${innerRadius} 0 0 1 ${-innerRadius} ${-innerRadius}
			z
		`
		return {
			d: path,
			fill: `rgba(${rgb.r},${rgb.g},${rgb.b},${shadowOpacity || 1})`
		}
	});

	const rightTopPath = useAnimatedProps(() => ({
		d: `
			M ${interpolateWidth.value} 0,
			a ${outerRadius} ${outerRadius} 0 0 1 ${outerRadius} ${outerRadius}
			h ${-shadowRadius}
			a ${innerRadius} ${innerRadius} 0 0 0 ${-innerRadius} ${-innerRadius}
			z
		`
	}));

	const rightBottomPath = useAnimatedProps(() => ({
		d: `
			M ${outerWidth.value} ${interpolateHeight.value},
			a ${outerRadius} ${outerRadius} 0 0 1 ${-outerRadius} ${outerRadius}
			v ${-shadowRadius}
			a ${innerRadius} ${innerRadius} 0 0 0 ${innerRadius} ${-innerRadius}
			z
		`
	}));

	const leftBottomPath = useAnimatedProps(() => ({
		d: `
			M ${outerRadius} ${outerHeight.value},
			a ${outerRadius} ${outerRadius} 0 0 1 ${-outerRadius} ${-outerRadius}
			h ${shadowRadius}
			a ${innerRadius} ${innerRadius} 0 0 0 ${innerRadius} ${innerRadius}
			z
		`
	}));

	const styleSvg = useAnimatedProps(() => ({
		width: interpolate(width.value, [0, 1], [width.value + shadowRadius, width.value + shadowRadius]),
		height: interpolate(height.value, [0, 1], [height.value + shadowRadius, height.value + shadowRadius]),
	}))

	const style = useAnimatedStyle(() => ({
		width: interpolate(width.value, [0, 1], [width.value, width.value]),
		height: interpolate(height.value, [0, 1], [height.value, height.value])
	}))

    const renderStop = (key: string) => {
		return[
				<Stop 
					offset="0" 
					stopColor={shadowColor}
					stopOpacity={shadowOpacity}
					key={`Box${key}Linear0`}
				/>,
				<Stop
					offset={Math.max(0, innerRadius / outerRadius).toString()}
					stopColor={shadowColor}
					stopOpacity={shadowOpacity}
					key={`Box${key}Linear1`}
				/>,
				<Stop 
					offset="1" 
					stopColor={shadowColor}
					stopOpacity="0" 
					key={`Box${key}Linear2`}
				/>
		]
	}

	const renderLinearStop = (key: string) => {
		return [
			<Stop
			  offset="0"
			  stopColor={shadowColor}
			  stopOpacity={shadowOpacity}
			  key={`Box` + key + 'Linear0'}
			/>,
			<Stop
			  offset="1"
			  stopColor={shadowColor}
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
	const absOffsetX = Math.abs(shadowOffset.width);
    const absOffsetY = Math.abs(shadowOffset.height);
	const styleT = StyleSheet.create({
		container: {
			position: 'absolute',
            left: shadowOffset.width,
			top: shadowOffset.height,
			// top: -shadowRadius - absOffsetY, left: -shadowRadius - absOffsetX
		}
	})
	const path = getPathWithRadius(width.value, height.value, borderRadius);

	console.log(shadowOffset)

	const generatePath = useAnimatedProps(() => {
		let path;
		if (borderRadius) {
			const APrefix = `A ${borderRadius}, ${borderRadius}, 0 0 1`;
			const ATopLeft = `${APrefix} ${borderRadius},0`;
			const ATopRight = `${APrefix} ${interpolateWidth.value},${borderRadius}`;
			const ABottomRight = `${APrefix} ${interpolateWidth.value - borderRadius},${interpolateHeight.value}`;
			const ABottomLeft = `${APrefix} 0,${interpolateHeight.value - borderRadius}`;
			path = `M 0,${borderRadius} ${ATopLeft} H ${
			  interpolateWidth.value - borderRadius
			  } ${ATopRight} V ${
			  interpolateHeight.value - borderRadius
			  } ${ABottomRight} H ${borderRadius} ${ABottomLeft} Z`;
		} else {
			path = `M 0,0 H ${width} V ${height} H 0 Z`;
		}
		// console.log('test',path)
		return {
			d: path
		}
	})
	
    return(
		<AnimView style={[styleT.container, style]}>
			<AnimSvg 
				animatedProps={styleSvg}
			>
				{/* <Path 
					d={`
						M 0,0 H ${outerWidth.value} V ${outerHeight.value} H 0 Z
					`} 
					fill={`rgba(${rgb.r},${rgb.g},${rgb.b},${shadowOpacity || 1})`}
				/> */}
				{/* <AnimPath 
					animatedProps={generatePath}
					// d={`
					// 	M 0, ${borderRadius} A ${borderRadius}, ${borderRadius}, 0 0 1 ${borderRadius}, 0
					// 	H ${outerWidth.value - borderRadius}
					// 	M 0, ${borderRadius} A ${borderRadius}, ${borderRadius}, 0 0 1 ${outerWidth.value}, ${borderRadius}
					// 	V ${outerHeight.value - borderRadius}
					// 	M 0, ${borderRadius} A ${borderRadius}, ${borderRadius}, 0 0 1 ${outerWidth.value - borderRadius}, ${outerHeight.value}
					// 	H ${borderRadius}
					// 	M 0, ${borderRadius} A ${borderRadius}, ${borderRadius}, 0 0 1 0, ${outerHeight.value - borderRadius} Z
					// `} 
					fill={`rgba(${rgb.r},${rgb.g},${rgb.b},${shadowOpacity || 1})`}
				/> */}
				{renderRadiantGradient()}
				{/* <Path
					d={`
						M 0 ${outerRadius},
						a ${outerRadius} ${outerRadius} 0 0 1 ${outerRadius} ${-outerRadius}
						v ${shadowRadius}
						a ${innerRadius} ${innerRadius} 0 0 0 ${-innerRadius} ${innerRadius}
					`}
					fill="url(#leftTop)"
				/>
				<AnimPath
					animatedProps={rightTopPath}
					fill="url(#rightTop)"
				/>
				<AnimPath
					animatedProps={rightBottomPath}
					fill="url(#rightBottom)"
				/>
				<AnimPath
					animatedProps={leftBottomPath}
					fill="url(#leftBottom)"
				/> */}
				<AnimRect
                    animatedProps={rectTop}
					fill="url(#top)"
				/>
				<AnimRect
					animatedProps={rectRight}
					fill="url(#right)"
				/>
				<AnimRect
					animatedProps={rectBottom}
					fill="url(#bottom)"
				/>
				<AnimRect
					animatedProps={rectLeft}
					fill="url(#left)"
				/>
				{/* <AnimPath
					animatedProps={pathInner}
				/> */}
        	</AnimSvg>
		</AnimView>
    )
}