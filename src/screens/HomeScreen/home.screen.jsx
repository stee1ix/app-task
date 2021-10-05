import React, {
	forwardRef,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import {
	StyleSheet,
	Text,
	View,
	Dimensions,
	Image,
	Animated,
} from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from './card.component';
import data from './data';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('screen');

const Tab = forwardRef(({ item, onItemPress }, ref) => (
	<TouchableRipple onPress={onItemPress} style={{ zIndex: 2 }}>
		<View ref={ref} style={{ margin: 7 }}>
			<Text
				style={{
					fontSize: 18,
					fontFamily: 'Baloo-Regular',
					color: '#000',
				}}>
				{item.date}
			</Text>
		</View>
	</TouchableRipple>
));

const Indicator = ({ measures, scrollX }) => {
	const inputRange = data.map((item, index) => index * width);
	const indicatorWidth = scrollX.interpolate({
		inputRange,
		outputRange: measures.map(measure => measure.width + 24),
	});
	const indicatorHeight = scrollX.interpolate({
		inputRange,
		outputRange: measures.map(measure => measure.height + 18),
	});
	const translateX = scrollX.interpolate({
		inputRange,
		outputRange: measures.map(measure => measure.x - 12),
	});
	const translateY = scrollX.interpolate({
		inputRange,
		outputRange: measures.map(measure => measure.y - 9),
	});

	return (
		<Animated.View
			style={{
				position: 'absolute',
				height: indicatorHeight,
				width: indicatorWidth,
				borderRadius: 10,
				zIndex: 1,
				transform: [
					{
						translateX,
					},
					{
						translateY,
					},
				],
			}}>
			<LinearGradient
				colors={['#ff7e5f', '#feb47b']}
				style={{ height: '100%', width: '100%', borderRadius: 10 }}
				start={{ x: 0, y: 1 }}
				end={{ x: 1, y: 1 }}
			/>
		</Animated.View>
	);
};

const Tabs = ({ data, scrollX, onItemPress }) => {
	const [measures, setMeasures] = useState([]);
	const containerRef = useRef();
	useEffect(() => {
		const temporaryMeasures = [];
		data.forEach(item => {
			item.ref.current.measureLayout(
				containerRef.current,
				(x, y, width, height) => {
					temporaryMeasures.push({ x, y, width, height });
					if (temporaryMeasures.length === data.length) {
						setMeasures(temporaryMeasures);
					}
				}
			);
		});
	}, []);

	return (
		<View style={{ flexDirection: 'row' }}>
			<View ref={containerRef} style={styles.tabsContainer}>
				{data.map((item, index) => (
					<Tab
						key={item.key}
						item={item}
						ref={item.ref}
						onItemPress={() => onItemPress(index)}
					/>
				))}
			</View>
			{measures.length > 0 && (
				<Indicator measures={measures} scrollX={scrollX} />
			)}
		</View>
	);
};

const ITEM_SIZE = 150;

const Cards = ({ matches }) => {
	const scrollY = useRef(new Animated.Value(0)).current;

	return (
		<Animated.ScrollView
			onScroll={Animated.event(
				[
					{
						nativeEvent: {
							contentOffset: { y: scrollY },
						},
					},
				],
				{ useNativeDriver: true }
			)}
			showsVerticalScrollIndicator={false}>
			<View style={{ height: 8 }} />
			{matches.map((match, index) => {
				const inputRange = [
					-1,
					0,
					(ITEM_SIZE + 20) * index,
					(ITEM_SIZE - 20) * (index + 3),
				];

				const scale = scrollY.interpolate({
					inputRange,
					outputRange: [1, 1, 1, 0],
				});

				return (
					<Animated.View
						key={index}
						style={{
							transform: [{ scale }],
							backgroundColor: 'white',
						}}>
						<Card
							key={match.key}
							team1={match.team1}
							team2={match.team2}
							time={match.time}
							logo1={match.logo1}
							logo2={match.logo2}
						/>
						<View style={{ height: 20 }} />
					</Animated.View>
				);
			})}

			<View style={{ height: 400 }} />
		</Animated.ScrollView>
	);
};

const HomeScreen = () => {
	const scrollX = useRef(new Animated.Value(0)).current;
	const ref = useRef();
	const onItemPress = useCallback(itemIndex => {
		ref?.current?.scrollToOffset({
			offset: itemIndex * width,
		});
	});

	return (
		<SafeAreaView>
			<View style={styles.container}>
				<View style={styles.headerContainer}>
					<Text style={styles.helloText}>Hello, Rituraj</Text>
					<Image
						source={require('../../../assets/images/avatar2.jpg')}
						style={styles.avatar}
					/>
				</View>
				<Animated.View style={styles.tabsWrapper}>
					<Tabs
						data={data}
						scrollX={scrollX}
						onItemPress={onItemPress}
					/>
				</Animated.View>
				<View style={{ height: 20 }} />
				<Animated.FlatList
					ref={ref}
					data={data}
					keyExtractor={item => item.key.toString()}
					horizontal
					showsHorizontalScrollIndicator={false}
					pagingEnabled
					onScroll={Animated.event(
						[{ nativeEvent: { contentOffset: { x: scrollX } } }],
						{ useNativeDriver: false }
					)}
					renderItem={({ item }) => {
						return (
							<View
								style={{
									width,
									height,
									justifyContent: 'center',
								}}>
								{/* <Image
								source={{ uri: item.image }}
								style={{
									flex: 1,
									resizeMode: 'cover',
									zIndex: -1,
								}}
							/> */}

								<Cards matches={item.matches} />
							</View>
						);
					}}
				/>
			</View>
		</SafeAreaView>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
	},
	headerContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginHorizontal: 20,
		paddingTop: 30,
		paddingBottom: 30,
		// backgroundColor: 'orange',
	},
	helloText: {
		alignSelf: 'flex-end',
		// backgroundColor: 'grey',
		fontFamily: 'Baloo-Medium',
		fontSize: 30,
	},
	avatar: {
		width: 50,
		height: 50,
		borderRadius: 10,
		resizeMode: 'cover',
	},
	tabsWrapper: {},
	tabsContainer: {
		justifyContent: 'space-evenly',
		alignItems: 'center',
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		// backgroundColor: 'red',
	},
});
