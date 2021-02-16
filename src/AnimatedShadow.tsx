import React from 'react';
import { Svg,
    Rect,
    Path,
    LinearGradient,
    RadialGradient,
    Defs,
    Stop
} from 'react-native-svg';
import { View, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';

const AnimSvg = Animated.createAnimatedComponent(Svg);
const AnimView = Animated.createAnimatedComponent(View);
const AnimPath = Animated.createAnimatedComponent(Path);
const AnimRect = Animated.createAnimatedComponent(Rect);
const AnimDefs = Animated.createAnimatedComponent(Defs);
const AnimStop = Animated.createAnimatedComponent(Stop);
const AnimLinearGradient = Animated.createAnimatedComponent(LinearGradient);
const AnimRadialGradient = Animated.createAnimatedComponent(RadialGradient);

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
    option: {
        shadowColor,
        borderRadius,
        width,
        height,
        shadowRadius,
        shadowOpacity,
        shadowOffset
    }
}:any) => {

    const innerRadius = borderRadius > 0 ? Math.max(0, borderRadius - shadowRadius / 2) : 0,
		outerRadius = borderRadius > 0 ? Math.max(0, borderRadius + shadowRadius / 2) : shadowRadius,
		innerWidth = width - shadowRadius,
		innerHeight = height - shadowRadius,
		outerWidth = width + shadowRadius,
		outerHeight = height + shadowRadius,
		borderWidth = (outerWidth - innerWidth) / 2;

    const rgb = hexToRgb(shadowColor);

    const renderStop = (key: string) => {
		return[
				<AnimStop 
					offset="0" 
					stopColor={shadowColor}
					stopOpacity={shadowOpacity}
					key={`Box${key}Linear0`}
				/>,
				<AnimStop
					offset={Math.max(0, innerRadius / outerRadius).toString()}
					stopColor={shadowColor}
					stopOpacity={shadowOpacity}
					key={`Box${key}Linear1`}
				/>,
				<AnimStop 
					offset="1" 
					stopColor={shadowColor}
					stopOpacity="0" 
					key={`Box${key}Linear2`}
				/>
		]
	}

	const renderLinearStop = (key: string) => {
		return [
			<AnimStop
			  offset="0"
			  stopColor={shadowColor}
			  stopOpacity={shadowOpacity}
			  key={`Box` + key + 'Linear0'}
			/>,
			<AnimStop
			  offset="1"
			  stopColor={shadowColor}
			  stopOpacity="0"
			  key={'Box' + key + 'Linear1'}
			/>,
        ];
	}

    const renderRadiantGradient = () => {
		return(
			<AnimDefs>
				<AnimLinearGradient id="top" x1="0%" x2="0%" y1="100%" y2="0%">
					{renderLinearStop('top')}
				</AnimLinearGradient>
				<AnimLinearGradient id="bottom" x1="0%" x2="0%" y1="0%" y2="100%">
					{renderLinearStop('bottom')}
				</AnimLinearGradient>
				<AnimLinearGradient id="left" x1="100%" x2="0%" y1="0%" y2="0%">
					{renderLinearStop('left')}
				</AnimLinearGradient>
				<AnimLinearGradient id="right" x1="0%" x2="100%" y1="0%" y2="0%">
					{renderLinearStop('right')}
				</AnimLinearGradient>
				<AnimRadialGradient
					id="leftTop"
					rx="100%"
					ry="100%"
					cx="100%"
					cy="100%"
					fx="100%"
					fy="100%"
				>
					{renderStop('leftTop')}
				</AnimRadialGradient>
				<AnimRadialGradient
					id="leftBottom"
					rx="100%"
					ry="100%"
					cx="100%"
					cy="0%"
					fx="100%"
					fy="0%"
				>
					{renderStop('leftBottom')}
				</AnimRadialGradient>
				<AnimRadialGradient
					id="rightTop"
					rx="100%"
					ry="100%"
					cx="0%"
					cy="100%"
					fx="0%"
					fy="100%"
				>
					{renderStop('rightTop')}
				</AnimRadialGradient>
				<AnimRadialGradient
					id="rightBottom"
					rx="100%"
					ry="100%"
					cx="0%"
					cy="0%"
					fx="0%"
					fy="0%"
				>
					{renderStop('rightBottom')}
				</AnimRadialGradient>
			</AnimDefs>
		)
	}

    const style = StyleSheet.create({
		container: {
			width: width,
			height: height,
			position: 'absolute',
			// left: -shadowRadius / 2 - spread + offset.width,
			// top: -shadowRadius / 2 - spread + offset.height,
            left: shadowOffset.width,
			top: shadowOffset.height,
		}
	})

    return(
		<AnimView style={style.container}>
			<AnimSvg width={outerWidth} height={outerHeight}>
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
				<AnimRect
					x={outerRadius}
					y={0}
					width={innerWidth - innerRadius * 2}
					height={shadowRadius}
					fill="url(#top)"
				/>
				<AnimRect
					x={outerWidth - shadowRadius}
					y={outerRadius}
					width={shadowRadius}
					height={innerHeight - innerRadius * 2}
					fill="url(#right)"
				/>
				<AnimRect
					x={outerRadius}
					y={outerHeight - shadowRadius}
					width={innerWidth - innerRadius * 2}
					height={shadowRadius}
					fill="url(#bottom)"
				/>
				<AnimRect
					x={0}
					y={outerRadius}
					width={shadowRadius}
					height={innerHeight - innerRadius * 2}
					fill="url(#left)"
				/>
				<AnimPath
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