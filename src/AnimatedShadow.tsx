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
import Animated, { useSharedValue, useAnimatedProps, interpolate, Extrapolate } from 'react-native-reanimated';

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
	isAnim,
    option: {
        shadowColor,
        borderRadius,
        width,
        height,
        shadowRadius,
        shadowOpacity,
        shadowOffset,
        nativeWidth,
        nativeHeight,
		style,
    }
}:any) => {
    const innerRadius = borderRadius > 0 ? Math.max(0, borderRadius - shadowRadius / 2) : 0,
		outerRadius = borderRadius > 0 ? Math.max(0, borderRadius + shadowRadius / 2) : shadowRadius,
		innerWidth = width.value - shadowRadius,
		innerHeight = height.value - shadowRadius,
		outerWidth = width.value + shadowRadius,
		outerHeight = height.value + shadowRadius,
		borderWidth = (outerWidth - innerWidth) / 2;

    const rgb = hexToRgb(shadowColor);
	console.log(width, height)

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

    const styleT = StyleSheet.create({
		container: {
			position: 'absolute',
			// left: -shadowRadius / 2 - spread + offset.width,
			// top: -shadowRadius / 2 - spread + offset.height,
            left: shadowOffset.width,
			top: shadowOffset.height,
		}
	})

    return(
		<AnimView style={[styleT.container, style]}>
			<AnimSvg 
				width={outerWidth}
				height={outerHeight}
			>
				{renderRadiantGradient()}
				<AnimPath
					d={`
						M 0 ${outerRadius},
						a ${outerRadius} ${outerRadius} 0 0 1 ${outerRadius} ${-outerRadius}
						v ${shadowRadius}
						a ${innerRadius} ${innerRadius} 0 0 0 ${-innerRadius} ${innerRadius}
					`}
					fill="url(#leftTop)"
				/>
				<AnimPath
					d={`
						M ${outerWidth - outerRadius} 0,
						a ${outerRadius} ${outerRadius} 0 0 1 ${outerRadius} ${outerRadius}
						h ${-shadowRadius}
						a ${innerRadius} ${innerRadius} 0 0 0 ${-innerRadius} ${-innerRadius}
						z
					`}
					fill="url(#rightTop)"
				/>
				<AnimPath
					d={`
						M ${outerWidth} ${outerHeight - outerRadius},
						a ${outerRadius} ${outerRadius} 0 0 1 ${-outerRadius} ${outerRadius}
						v ${-shadowRadius}
						a ${innerRadius} ${innerRadius} 0 0 0 ${innerRadius} ${-innerRadius}
						z
				`}
				fill="url(#rightBottom)"
				/>
				<AnimPath
					d={`
						M ${outerRadius} ${outerHeight},
						a ${outerRadius} ${outerRadius} 0 0 1 ${-outerRadius} ${-outerRadius}
						h ${shadowRadius}
						a ${innerRadius} ${innerRadius} 0 0 0 ${innerRadius} ${innerRadius}
						z
				`}
				fill="url(#leftBottom)"
		
				/>
				<Rect
					x={outerRadius}
					y={0}
					width={interpolate(width.value,[0, 1],[0, 150], Extrapolate.CLAMP)}
					height={shadowRadius}
					fill="url(#top)"
				/>
				<Rect
					x={outerWidth - shadowRadius}
					y={outerRadius}
					width={shadowRadius}
					height={innerHeight - innerRadius * 2}
					fill="url(#right)"
				/>
				<Rect
					x={outerRadius}
					y={outerHeight - shadowRadius}
					width={innerWidth - innerRadius * 2}
					height={shadowRadius}
					fill="url(#bottom)"
				/>
				<Rect
					x={0}
					y={outerRadius}
					width={shadowRadius}
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
					fill={`rgba(${rgb.r},${rgb.g},${rgb.b},${shadowOpacity || 1})`}
				/>
        	</AnimSvg>
		</AnimView>
    )
}