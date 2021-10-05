import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/login.screen';
import HomeTab from './src/navigators/home.tab';
import { StyleSheet, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import ForgotPassword from './src/screens/forgotPassword.screen';

const Stack = createNativeStackNavigator();

export default function App() {
	const [appIsReady, setAppIsReady] = useState(false);
	const [authenticated, setAuthenticated] = useState(true);

	useEffect(() => {
		async function prepare() {
			try {
				await SplashScreen.preventAutoHideAsync();

				await Font.loadAsync({
					'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
					'Montserrat-Light': require('./assets/fonts/Montserrat-Light.ttf'),
					'Montserrat-Medium': require('./assets/fonts/Montserrat-Medium.ttf'),
					'Baloo-Regular': require('./assets/fonts/Baloo2-Regular.ttf'),
					'Baloo-Medium': require('./assets/fonts/Baloo2-Medium.ttf'),
					'Baloo-SemiBold': require('./assets/fonts/Baloo2-SemiBold.ttf'),
				});

				// await new Promise(resolve => setTimeout(resolve, 1000));
			} catch (error) {
				console.warn(error);
			} finally {
				setAppIsReady(true);
			}
		}

		prepare();
	}, []);

	const onLayoutRootView = useCallback(async () => {
		if (appIsReady) {
			await SplashScreen.hideAsync();
		}
	}, [appIsReady]);

	if (!appIsReady) {
		return null;
	}

	return (
		<>
			<StatusBar style="dark" backgroundColor="#fff" />
			<SafeAreaProvider>
				<View style={styles.container} onLayout={onLayoutRootView}>
					<NavigationContainer>
						<PaperProvider>
							<Stack.Navigator
								initialRouteName="LoginScreen"
								screenOptions={{ headerShown: false }}>
								{!authenticated ? (
									<>
										<Stack.Screen
											name="LoginScreen"
											component={Login}
										/>
										<Stack.Screen
											name="ForgotPassword"
											component={ForgotPassword}
										/>
									</>
								) : (
									<Stack.Screen
										name="HomeTab"
										component={HomeTab}
									/>
								)}
							</Stack.Navigator>
						</PaperProvider>
					</NavigationContainer>
				</View>
			</SafeAreaProvider>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
