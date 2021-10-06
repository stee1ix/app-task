import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from '../screens/HomeScreen/home.screen';
import VideoScreen from '../screens/video.screen';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}>
			<Stack.Screen name="HomeScreen" component={HomeScreen} />
			<Stack.Screen name="VideoScreen" component={VideoScreen} />
		</Stack.Navigator>
	);
};

export default HomeStack;
