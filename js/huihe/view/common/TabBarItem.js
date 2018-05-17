import React, {Component} from 'react';
import {Image} from "react-native";
export default class TabBarItem extends Component {


    constructor(props) {
        super(props);
    }

    static defaultProps = {
        tintColor: '#c92a3a',
        focused: false,
        normalImage: NaN,
        selectedImage: NaN,
    };


    render() {
        return (
            <Image source={ this.props.focused ? this.props.selectedImage : this.props.normalImage }
                   style={ {tintColor: this.props.tintColor, width: 25, height: 25} }
            />
        );
    }
}