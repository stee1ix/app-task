import React, { useState } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	ImageBackground,
	Dimensions,
	KeyboardAvoidingView,
	Keyboard,
	TouchableWithoutFeedback,
	TouchableOpacity,
} from 'react-native';
import { FAB, Divider, TouchableRipple } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const Login = () => {
	const [username, onChangeUsername] = useState(null);
	const [password, onChangePassword] = useState(null);

	return (
		<View style={styles.container}>
			<ImageBackground
				source={require('../../assets/loginbg2.png')}
				resizeMode="stretch"
				style={styles.backgroundImage}>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<KeyboardAvoidingView
						behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
						<Text style={styles.loginTitle}>Login</Text>

						<View style={styles.inputsHolder}>
							<View style={styles.inputWrapper}>
								<Ionicons
									name="ios-person-outline"
									size={20}
									color="grey"
								/>
								<TextInput
									style={styles.input}
									placeholder="Username"
									onChangeText={onChangeUsername}
									value={username}
									ke
								/>
							</View>
							<Divider />
							<View style={styles.inputWrapper}>
								<Ionicons
									name="lock-closed-outline"
									size={20}
									color="grey"
								/>
								<TextInput
									style={styles.input}
									placeholder="Password"
									onChangeText={onChangePassword}
									value={password}
									// secureTextEntry={true}
								/>
							</View>

							<FAB
								style={styles.fab}
								icon="arrow-right"
								loading={false}
								color="#fff"
								onPress={() => {}}
							/>
						</View>

						<TouchableOpacity onPress={() => null}>
							<Text style={styles.forgotText}>Forgot?</Text>
						</TouchableOpacity>

						<View>
							<TouchableRipple
								borderless
								style={styles.registerWrapper}
								onPress={() => null}>
								<Text style={styles.registerText}>
									Register
								</Text>
							</TouchableRipple>
						</View>
					</KeyboardAvoidingView>
				</TouchableWithoutFeedback>
			</ImageBackground>
		</View>
	);
};

export default Login;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// backgroundColor: '#fff',
		// justifyContent: 'center',
	},
	backgroundImage: {
		flex: 1,
		backgroundColor: '#fff',
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,
		// position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		zIndex: -1,
	},
	loginTitle: {
		alignSelf: 'center',
		marginTop: 150,
		marginBottom: 60,
		fontFamily: 'Baloo-Medium',
		fontSize: 40,
		color: '#11111185',
	},
	inputsHolder: {
		justifyContent: 'center',
		backgroundColor: '#fff',
		height: 140,
		marginRight: 40,
		borderTopEndRadius: 100,
		borderBottomEndRadius: 100,

		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.27,
		shadowRadius: 4.65,

		elevation: 6,
	},
	input: {
		flex: 1,
		height: 70,
		marginLeft: 10,
		marginRight: 10,
		// borderWidth: 1,
		fontFamily: 'Baloo-Medium',
		fontSize: 18,
		padding: 10,
	},
	inputWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		marginHorizontal: 16,
	},
	fab: {
		position: 'absolute',
		right: -25,
	},
	forgotText: {
		fontFamily: 'Baloo-Regular',
		alignSelf: 'flex-end',
		color: 'lightgrey',
		fontSize: 20,
		marginTop: 20,
		marginRight: 20,
	},
	registerWrapper: {
		justifyContent: 'center',
		alignItems: 'center',
		// borderWidth: 1,
		height: 65,
		borderBottomRightRadius: 50,
		borderTopRightRadius: 50,
		width: 120,
		marginTop: 50,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.29,
		shadowRadius: 4.65,
		backgroundColor: 'white',
		elevation: 1,
	},
	registerText: {
		fontFamily: 'Baloo-Medium',
		color: '#f48f95',
		fontSize: 20,
	},
});
