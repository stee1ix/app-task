import React, { useEffect, useState } from 'react';
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
	Image,
	ToastAndroid,
} from 'react-native';
import { FAB, Divider, TouchableRipple } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { MotiView, MotiText, AnimatePresence } from 'moti';
import { setUsername, toggleAuth } from '../redux/user/user.actions';
import { connect } from 'react-redux';
import {
	addDataToFirestore,
	auth,
	signInWithGoogle,
} from '../firebase/firebase.util';
import data from './HomeScreen/data';

const Login = ({ navigation, toggleAuth, setDisplayName }) => {
	const [username, onChangeUsername] = useState(null);
	const [password, onChangePassword] = useState(null);
	const [email, onChangeEmail] = useState(null);
	const [login, setLogin] = useState(true);
	const [hidePassword, setHidePassword] = useState(true);
	const [fabLoading, setFabLoading] = useState(false);

	// toggles login value
	async function toggleLogin() {
		onChangeEmail('');
		onChangeUsername('');
		onChangePassword('');
		setHidePassword(true);
		await setLogin(!login);
	}

	const validatePassword = pass => {
		if (pass.length >= 6) {
			onChangePassword(pass);
			console.log(`Valid Password = ${pass}`);
		} else {
			//TODO -> Toast(Password Length Must be atleast 6 characters long)
			//TODO -> https://github.com/scalessec/Toast-Swift
			ToastAndroid.show(
				'Password length must be 6 characters !',
				ToastAndroid.SHORT
			);
			console.log('Password length must be 6 characters');
		}
	};

	const validateEmail = address => {
		if (address !== null) {
			const re =
				/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			if (re.test(address.toLowerCase())) {
				console.log(
					`Valid Email Address ${
						Math.random() * (10 - 2) + 2
					} email = ${email}`
				);
				onChangeEmail(address.toLowerCase());
				validatePassword(password);
			}
		} else {
			ToastAndroid.show(
				'Invalid Email Address Format !',
				ToastAndroid.SHORT
			);
			//TODO -> https://github.com/scalessec/Toast-Swift
			console.log(
				`Invalid Email Address ${
					Math.random() * (10 - 2) + 2
				} email = ${email}`
			);
		}
		null;
	};

	const registerSubmit = async () => {
		try {
			// await validateEmail(email);
			await validatePassword(password);
			setFabLoading(true);
			const { user } = await auth.createUserWithEmailAndPassword(
				email,
				password
			);

			await user.updateProfile({ displayName: username });

			setDisplayName(username);

			// await createUserProfileDocument(user, { username });

			// this.setState({
			// 	displayName: '',
			// 	email: '',
			// 	password: '',
			// 	confirmPassword: '',
			// });
			toggleAuth();
		} catch (error) {
			setFabLoading(false);
			console.error(error);
		}
	};

	const loginSubmit = async () => {
		// await validateEmail(email);
		await validatePassword(password);
		try {
			setFabLoading(true);
			await auth.signInWithEmailAndPassword(email, password);
			// this.setState({ email: '', password: '' });
			const name = auth.currentUser.displayName;
			setDisplayName(name);

			toggleAuth();
		} catch (error) {
			setFabLoading(false);
			// ToastAndroid.show('User does not exist !', ToastAndroid.SHORT);
			console.log(error);
		}
	};

	const googleAuth = async () => {
		await signInWithGoogle();
	};

	// useEffect(() => {
	// 	addDataToFirestore(
	// 		'data',
	// 		data.map(({ key, date, matches }) => ({ key, date, matches }))
	// 	);
	// }, []);

	return (
		<View style={styles.container}>
			<ImageBackground
				source={require('../../assets/loginbg2.png')}
				style={styles.backgroundImage}>
				{/* Keyboard will dismiss on pressing anywhere outside the input box */}
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<KeyboardAvoidingView
						behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
						{/* View Login screen button */}
						<MotiView animate={{ translateX: login ? 120 : 0 }}>
							<TouchableRipple
								borderless
								style={styles.loginWrapper}
								onPress={() => toggleLogin()}>
								<Text style={styles.loginText}>Login</Text>
							</TouchableRipple>
						</MotiView>

						{/* Title */}
						<AnimatePresence exitBeforeEnter>
							{!login ? (
								<MotiText
									key="1"
									from={{ opacity: 0, scale: 0 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0 }}
									style={styles.loginTitle}>
									Register
								</MotiText>
							) : (
								<MotiText
									key="2"
									from={{ opacity: 0, scale: 0 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0 }}
									style={styles.loginTitle}>
									Login
								</MotiText>
							)}
						</AnimatePresence>

						{/* Input boxes conatiner holding username, email and password */}
						<MotiView
							animate={{ height: !login ? 210 : 140 }}
							style={styles.inputsHolder}>
							{/* Email input */}
							<MotiView
								animate={{ translateY: login ? 35 : 0 }}
								style={styles.inputWrapper}>
								<Ionicons
									name="mail-outline"
									size={20}
									color="grey"
								/>
								<TextInput
									style={styles.input}
									placeholder="Email"
									onChangeText={onChangeEmail}
									value={email}
									textContentType="emailAddress"
									autoCompleteType="email"
								/>
							</MotiView>

							{/* Divider */}
							<MotiView animate={{ translateY: login ? 35 : 0 }}>
								<Divider />
							</MotiView>

							{/* Username input */}
							<MotiView
								animate={{
									translateX: login
										? -Dimensions.get('screen').width - 40
										: 0,
								}}
								style={styles.inputWrapperEmail}>
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
								/>
							</MotiView>

							{/* Drawer */}
							<MotiView animate={{ translateY: login ? -35 : 0 }}>
								<Divider />
							</MotiView>

							{/* Password Input */}
							<MotiView
								animate={{ translateY: login ? -35 : 0 }}
								style={styles.inputWrapper}>
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
									autoCompleteType="off"
									secureTextEntry={hidePassword}
								/>
								<TouchableOpacity
									onPress={() =>
										setHidePassword(!hidePassword)
									}
									style={styles.showPasswordEye}>
									<Ionicons
										name={hidePassword ? 'eye-off' : 'eye'}
										size={20}
										color="darkgrey"
									/>
								</TouchableOpacity>
							</MotiView>

							{/* Submit Button */}
							<FAB
								style={styles.fab}
								icon={login ? 'arrow-right' : 'check'}
								loading={fabLoading}
								color="#fff"
								onPress={() => {
									// validateEmail(email);
									if (login) {
										loginSubmit();
									} else {
										registerSubmit();
									}
								}}
							/>
						</MotiView>

						{/* Forgot password button, visible only on login screen */}
						<View style={styles.forgotTextWrapper}>
							<TouchableOpacity
								onPress={() =>
									login
										? navigation.navigate('ForgotPassword')
										: {}
								}>
								<MotiText
									animate={{ scale: login ? 1 : 0 }}
									style={styles.forgotText}>
									Forgot?
								</MotiText>
							</TouchableOpacity>
						</View>

						{/* Google button */}
						<MotiView>
							<TouchableRipple
								borderless
								style={styles.googleOption}
								// onPress={() => googleAuth()}
							>
								<Image
									source={require('../../assets/images/google.png')}
									style={styles.googleLogo}
								/>
							</TouchableRipple>
						</MotiView>

						{/* View Register screen button */}
						<MotiView animate={{ translateX: !login ? -120 : 0 }}>
							<TouchableRipple
								borderless
								style={styles.registerWrapper}
								onPress={() => toggleLogin()}>
								<Text style={styles.registerText}>
									Register
								</Text>
							</TouchableRipple>
						</MotiView>
					</KeyboardAvoidingView>
				</TouchableWithoutFeedback>
			</ImageBackground>
		</View>
	);
};

const mapDispatchToProps = dispatch => ({
	toggleAuth: () => dispatch(toggleAuth()),
	setDisplayName: username => dispatch(setUsername(username)),
});

export default connect(null, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	},
	backgroundImage: {
		flex: 1,
		resizeMode: 'cover',
		backgroundColor: '#fff',
		width: Dimensions.get('screen').width,
		height: Dimensions.get('screen').height,
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		zIndex: -1,
		paddingTop: 60,
	},

	loginWrapper: {
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'flex-end',
		// borderWidth: 1,
		height: 55,
		borderBottomLeftRadius: 50,
		borderTopLeftRadius: 50,
		width: 130,
		right: -30,
		marginTop: 30,
		marginBottom: 20,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.29,
		shadowRadius: 4.65,
		backgroundColor: 'white',
		elevation: 2,
	},
	loginText: {
		fontFamily: 'Baloo-Medium',
		color: '#f48f95',
		fontSize: 18,
		marginRight: 20,
	},
	loginTitle: {
		alignSelf: 'center',
		// marginTop: 200,
		marginBottom: 30,
		fontFamily: 'Baloo-Medium',
		fontSize: 30,
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
	inputWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		marginHorizontal: 16,
	},
	inputWrapperEmail: {
		// position: 'absolute',
		flexDirection: 'row',
		alignItems: 'center',
		marginHorizontal: 16,
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
	showPasswordEye: {
		marginRight: 30,
	},
	fab: {
		position: 'absolute',
		right: -25,
	},
	forgotTextWrapper: {
		alignItems: 'flex-end',
	},
	forgotText: {
		fontFamily: 'Baloo-Regular',
		color: 'lightgrey',
		fontSize: 18,
		marginTop: 20,
		marginRight: 20,
	},
	registerWrapper: {
		justifyContent: 'center',
		alignItems: 'center',
		// borderWidth: 1,
		height: 55,
		borderBottomRightRadius: 50,
		borderTopRightRadius: 50,
		width: 130,
		left: -30,
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
		fontSize: 18,
		marginLeft: 20,
	},
	googleOption: {
		justifyContent: 'center',
		alignItems: 'center',
		// borderWidth: 1,
		height: 55,
		borderBottomRightRadius: 50,
		borderTopRightRadius: 50,
		width: 85,
		left: -15,
		// marginTop: 50,
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
	googleLogo: {
		width: 25,
		height: 25,
	},
});
