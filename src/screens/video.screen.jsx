import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
	StyleSheet,
	TouchableOpacity,
	View,
	Text,
	Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import WebView from 'react-native-webview';
import { MotiView } from '@motify/components';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import YoutubePlayer from 'react-native-youtube-iframe';
import LottieView from 'lottie-react-native';

const VideoScreen = ({ navigation }) => {
	const tabBarHeight = useBottomTabBarHeight();

	const playerRef = useRef();

	const [playing, setPlaying] = useState(true);
	const [playerReady, setPlayerReady] = useState(false);

	const onStateChange = useCallback(state => {
		if (state === 'ended') {
			setPlaying(false);
		}
	}, []);

	const togglePlaying = useCallback(() => {
		setPlaying(prev => !prev);
	}, []);

	const skipForward = () => {
		playerRef.current
			?.getDuration()
			.then(getDuration => playerRef.current.seekTo(getDuration));
	};

	useEffect(() => {
		navigation.getParent().setOptions({
			tabBarStyle: {
				display: 'none',
			},
		});
		return () => {
			navigation.getParent().setOptions({
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
		};
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity
					onPress={() => navigation.goBack()}
					style={styles.backArrow}>
					<Feather name="arrow-left" color="#000" size={30} />
				</TouchableOpacity>
				<MotiView
					style={{ flexDirection: 'row' }}
					animate={{
						translateX: !playing ? 47 : !playerReady ? 90 : 0,
					}}>
					<MotiView>
						<TouchableOpacity
							onPress={togglePlaying}
							style={[styles.backArrow, { marginRight: 20 }]}>
							<Feather
								name={playing ? 'pause' : 'play'}
								color="#000"
								size={30}
							/>
						</TouchableOpacity>
					</MotiView>
					<MotiView>
						<TouchableOpacity
							disabled={!playing}
							onPress={skipForward}
							style={styles.backArrow}>
							<Feather
								name="skip-forward"
								color="#000"
								size={30}
							/>
						</TouchableOpacity>
					</MotiView>
				</MotiView>
			</View>
			<MotiView
				animate={{ opacity: playerReady ? 0 : 1 }}
				style={{
					position: 'absolute',
					top: 200,
					left: 0,
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: '#fff',
					width: Dimensions.get('window').width,
				}}>
				<LottieView
					style={styles.videoLottie}
					source={require('../../assets/videoLoadAnimation.json')}
					autoPlay
				/>
				<Text style={{ fontFamily: 'Baloo-Medium', fontSize: 25 }}>
					Loading...
				</Text>
			</MotiView>
			<MotiView
				animate={{ opacity: !playerReady ? 0 : 1 }}
				style={{ flex: 1 }}>
				<View pointerEvents="none">
					<YoutubePlayer
						ref={playerRef}
						play={playing}
						videoId={'rDEcVPCoYIA'}
						onChangeState={onStateChange}
						onReady={() => setPlayerReady(prev => !prev)}
						height={200}
						initialPlayerParams={{
							controls: false,
						}}
					/>
				</View>

				<View style={styles.webView}>
					<WebView
						source={{
							uri: 'https://www.youtube.com/live_chat?v=86YLFOog4GM',
						}}
						scalesPageToFit={false}
					/>
				</View>
			</MotiView>
			<View style={{ height: tabBarHeight }} />
		</SafeAreaView>
	);
};

export default VideoScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	header: {
		flexDirection: 'row',
		padding: 10,
		justifyContent: 'space-between',
	},
	videoContainer: {},
	backArrow: {},
	webView: {
		flex: 1,
	},
	videoLottie: {
		height: 200,
		width: 200,
		marginBottom: 30,
	},
});
