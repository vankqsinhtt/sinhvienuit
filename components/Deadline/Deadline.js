import React from 'react';
import { StackNavigator } from 'react-navigation';
import ListScreen from './components/List';

const CourseNavigator = StackNavigator({
    DeadlineList: { screen: ListScreen },
});
export default CourseNavigator;