import React, {Component} from 'react';
import {View} from 'react-native';
import {StackNavigator} from 'react-navigation';
import MLocation from "./MLocation";
import Tabs from '../js/Tabs';
const ChildPages=StackNavigator(
    {
    Tab:{screen:Tabs},
    MLocation:{screen:MLocation},
    }
);
export default ChildPages;