import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/login.screen';
import ForgotPassword from '../screens/forgotPassword.screen';
import HomeTab from './home.tab';
import { Provider as PaperProvider } from 'react-native-paper';
import { connect } from 'react-redux';

const Stack = createNativeStackNavigator();

const NavContainer = ({ auth }) => {
	return (
		<NavigationContainer>
			<PaperProvider>
				<Stack.Navigator
					initialRouteName="LoginScreen"
					screenOptions={{ headerShown: false }}>
					{!auth ? (
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
						<Stack.Screen name="HomeTab" component={HomeTab} />
					)}
				</Stack.Navigator>
			</PaperProvider>
		</NavigationContainer>
	);
};

const mapStateToProps = state => ({
	auth: state.user.auth,
});

export default connect(mapStateToProps)(NavContainer);
