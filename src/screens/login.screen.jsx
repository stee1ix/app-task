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
  Image,
} from 'react-native';
import { FAB, Divider, TouchableRipple } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { MotiView, MotiText, AnimatePresence } from 'moti';

const Login = () => {
  const [username, onChangeUsername] = useState(null);
  const [password, onChangePassword] = useState(null);
  const [email, onChangeEmail] = useState(null);
  const [login, setLogin] = useState(true);
  const [hidePassword, setHidePassword] = useState(true);

  // toggles login value
  async function toggleLogin() {
    onChangeEmail('');
    onChangeUsername('');
    onChangePassword('');
    setHidePassword(true);
    await setLogin(!login);
  }

  const validateEmail = address => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(address.toLowerCase())) {
      console.log(
        `Valid Email Address ${Math.random() * (10 - 2) + 2} email = ${email}`
      );
      onChangeEmail(address.toLowerCase());
    } else {
      console.log(
        `Invalid Email Address ${Math.random() * (10 - 2) + 2} email = ${email}`
      );
      onChangeEmail(address.toLowerCase());
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/loginbg2.png')}
        style={styles.backgroundImage}
      >
        {/* Keyboard will dismiss on pressing anywhere outside the input box */}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            {/* View Login screen button */}
            <MotiView animate={{ translateX: login ? 120 : 0 }}>
              <TouchableRipple
                borderless
                style={styles.loginWrapper}
                onPress={() => toggleLogin()}
              >
                <Text style={styles.loginText}>Login</Text>
              </TouchableRipple>
            </MotiView>

            {/* Title */}
            <AnimatePresence exitBeforeEnter>
              {!login ? (
                <MotiText
                  key='1'
                  from={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  style={styles.loginTitle}
                >
                  Register
                </MotiText>
              ) : (
                <MotiText
                  key='2'
                  from={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  style={styles.loginTitle}
                >
                  Login
                </MotiText>
              )}
            </AnimatePresence>

            {/* Input boxes conatiner holding username, email and password */}
            <MotiView
              animate={{ height: !login ? 210 : 140 }}
              style={styles.inputsHolder}
            >
              {/* Username input */}
              <MotiView
                animate={{ translateY: login ? 35 : 0 }}
                style={styles.inputWrapper}
              >
                <Ionicons name='ios-person-outline' size={20} color='grey' />
                <TextInput
                  style={styles.input}
                  placeholder='Username'
                  onChangeText={onChangeUsername}
                  value={username}
                />
              </MotiView>

              {/* Divider */}
              <MotiView animate={{ translateY: login ? 35 : 0 }}>
                <Divider />
              </MotiView>

              {/* Email input */}
              <MotiView
                animate={{
                  translateX: login ? -Dimensions.get('screen').width - 40 : 0,
                }}
                style={styles.inputWrapperEmail}
              >
                <Ionicons name='mail-outline' size={20} color='grey' />
                <TextInput
                  style={styles.input}
                  placeholder='Email'
                  autoCompleteType='email'
                  onChangeText={onChangeEmail}
                  value={email}
                  textContentType='emailAddress'
                />
              </MotiView>

              {/* Drawer */}
              <MotiView animate={{ translateY: login ? -35 : 0 }}>
                <Divider />
              </MotiView>

              {/* Password Input */}
              <MotiView
                animate={{ translateY: login ? -35 : 0 }}
                style={styles.inputWrapper}
              >
                <Ionicons name='lock-closed-outline' size={20} color='grey' />
                <TextInput
                  style={styles.input}
                  placeholder='Password'
                  onChangeText={onChangePassword}
                  value={password}
                  autoCompleteType='off'
                  secureTextEntry={hidePassword}
                />
                <Text
                  style={{ color: '#11111185' }}
                  onPress={() => setHidePassword(!hidePassword)}
                >
                  {hidePassword ? 'Show' : 'Hide'}
                </Text>
              </MotiView>

              {/* Submit Button */}
              <FAB
                style={styles.fab}
                icon='arrow-right'
                loading={false}
                color='#fff'
                onPress={() => validateEmail(email)}
              />
            </MotiView>

            {/* Forgot password button, visible only on login screen */}
            <TouchableOpacity onPress={() => null}>
              <MotiText
                animate={{ opacity: login ? 1 : 0 }}
                style={styles.forgotText}
              >
                Forgot?
              </MotiText>
            </TouchableOpacity>

            {/* Google button */}
            <MotiView animate={{ translateX: login ? -85 : 0 }}>
              <TouchableRipple
                borderless
                style={styles.googleOption}
                onPress={() => null}
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
                onPress={() => toggleLogin()}
              >
                <Text style={styles.registerText}>Register</Text>
              </TouchableRipple>
            </MotiView>
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
  fab: {
    position: 'absolute',
    right: -25,
  },
  forgotText: {
    fontFamily: 'Baloo-Regular',
    alignSelf: 'flex-end',
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
