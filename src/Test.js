import React from 'react';
import { View, Text, PanResponder } from 'react-native';
import { Svg, Rect } from 'react-native-svg'

export default class Test extends React.PureComponent {
    render() {
        (this.props.width)
        return(
            <Svg width={this.props.width} height="60">
                <Rect
                x="25"
                y="5"
                width='150'
                height="50"
                fill="rgb(0,0,255)"
                strokeWidth="3"
                stroke="rgb(0,0,0)"
                />
          </Svg>
        )
    }
}