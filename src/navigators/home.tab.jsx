import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen/home.screen';
const Tab = createBottomTabNavigator();

function SettingsScreen() {
	return (
		<View
			style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text>Settings!</Text>
		</View>
	);
}

function ProfileScreen() {
	return (
		<View
			style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text>Profile!</Text>
		</View>
	);
}

const HomeTab = () => {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;

					if (route.name === 'HomeScreen') {
						iconName = focused ? 'ios-home' : 'ios-home-outline';
					} else if (route.name === 'ProfileScreen') {
						iconName = focused
							? 'ios-person'
							: 'ios-person-outline';
					} else if (route.name === 'SettingsScreen') {
						iconName = focused
							? 'ios-settings'
							: 'ios-settings-outline';
					}

					return <Ionicons name={iconName} size={size} />;
				},
				// tabBarActiveTintColor: colors.blue,
				tabBarHideOnKeyboard: true,
				tabBarShowLabel: false,
				headerShown: false,
				// tabBarStyle: styles.tabBarStyle,
			})}>
			<Tab.Screen name="HomeScreen" component={HomeScreen} />
			<Tab.Screen name="ProfileScreen" component={ProfileScreen} />
			<Tab.Screen name="SettingsScreen" component={SettingsScreen} />
		</Tab.Navigator>
	);
};

export default HomeTab;
