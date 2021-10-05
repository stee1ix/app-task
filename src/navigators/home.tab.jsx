import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import {
	createBottomTabNavigator,
	useBottomTabBarHeight,
} from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen/home.screen';
import { LinearGradient } from 'expo-linear-gradient';

const Tab = createBottomTabNavigator();

function SettingsScreen() {
	return (
		<View
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: '#fff',
			}}>
			<Image
				source={require('../../assets/images/minion2.png')}
				style={{
					position: 'absolute',

					width: 300,
					height: 300,
					resizeMode: 'contain',
				}}
			/>
		</View>
	);
}

function ProfileScreen() {
	const tabHeight = useBottomTabBarHeight();

	return (
		<View
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: '#fff',
			}}>
			<Image
				source={require('../../assets/images/minion1.png')}
				style={{
					position: 'absolute',
					bottom: tabHeight,
					width: 300,
					height: 300,
					resizeMode: 'contain',
				}}
			/>
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
						iconName = focused ? 'apple1' : 'apple-o';
					} else if (route.name === 'ProfileScreen') {
						iconName = focused ? 'appstore1' : 'appstore-o';
					} else if (route.name === 'SettingsScreen') {
						iconName = focused ? 'star' : 'staro';
					}

					return (
						<AntDesign name={iconName} size={size} color={color} />
					);
				},
				tabBarHideOnKeyboard: true,
				tabBarShowLabel: false,
				headerShown: false,
				tabBarStyle: styles.tabBarStyle,
				tabBarBackground: () => (
					<LinearGradient
						colors={['#49E2A2', '#13B8FF']}
						style={{
							width: '100%',
							height: '100%',
							padding: 3,
							paddingBottom: 5,
							justifyContent: 'center',
							alignItems: 'center',
						}}
						start={{ x: 0, y: 1 }}
						end={{ x: 1, y: 1 }}>
						<View
							style={{
								backgroundColor: '#fff',
								width: '100%',
								height: '100%',
								borderTopStartRadius: 200,
								borderBottomStartRadius: 80,
								borderTopEndRadius: 200,
								borderBottomEndRadius: 80,
							}}
						/>
					</LinearGradient>
				),
				tabBarInactiveTintColor: '#13B8FF',
				tabBarActiveTintColor: '#13B8FF',
			})}>
			<Tab.Screen name="HomeScreen" component={HomeScreen} />
			<Tab.Screen name="ProfileScreen" component={ProfileScreen} />
			<Tab.Screen name="SettingsScreen" component={SettingsScreen} />
		</Tab.Navigator>
	);
};

export default HomeTab;

const styles = StyleSheet.create({
	tabBarStyle: {
		position: 'absolute',
		bottom: 0,
		height: 60,
		borderTopStartRadius: 200,
		borderBottomStartRadius: 80,
		borderTopEndRadius: 200,
		borderBottomEndRadius: 80,
		marginHorizontal: 10,
		overflow: 'hidden',
		elevation: 5,
	},
});
