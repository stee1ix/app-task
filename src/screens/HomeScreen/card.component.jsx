import React from 'react';
import { Dimensions, StyleSheet, Text, View, Image } from 'react-native';

const { width, height } = Dimensions.get('window');

const Card = ({ team1, team2, logo1, logo2, time = '8:00am' }) => {
	return (
		<View style={styles.container}>
			{/* <View style={styles.headerWrapper}>
				<Text style={styles.teamName}>{team1}</Text>
				<Text style={styles.time}>{time}</Text>
				<Text style={styles.teamName}>{team2}</Text>
			</View> */}

			<View style={styles.teamWrapper1}>
				<Text style={styles.teamName}>{team1}</Text>
				<Image source={{ uri: logo1 }} style={styles.logo} />
			</View>
			<View style={styles.timeVSWrapper}>
				<Text style={styles.time}>{time}</Text>
				<Text style={{ fontFamily: 'Baloo-Medium' }}>VS</Text>
			</View>
			<View style={styles.teamWrapper2}>
				<Text style={styles.teamName}>{team2}</Text>
				<Image source={{ uri: logo2 }} style={styles.logo} />
			</View>

			{/* <View style={styles.imagesWrapper}>
				<Image source={{ uri: logo1 }} style={styles.logo} />
				<Text style={{ fontFamily: 'Baloo-Medium' }}>VS</Text>
				<Image source={{ uri: logo2 }} style={styles.logo} />
			</View> */}
		</View>
	);
};

export default Card;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		height: 150,
		// borderWidth: 1,
		elevation: 10,
		backgroundColor: 'white',
		borderRadius: 20,
		marginHorizontal: 20,
		paddingVertical: 10,
	},
	// headerWrapper: {
	// 	backgroundColor: 'orange',
	// 	justifyContent: 'space-between',
	// 	flexDirection: 'row',
	// 	width: '100%',
	// },
	teamName: {
		fontFamily: 'Baloo-Medium',
		fontSize: 16,
		// marginBottom: 10,
	},

	teamWrapper1: {
		position: 'absolute',
		alignItems: 'center',
		left: 25,
		height: '100%',
		justifyContent: 'space-evenly',
		// backgroundColor: 'green',
	},
	teamWrapper2: {
		position: 'absolute',
		alignItems: 'center',
		right: 25,
		height: '100%',
		justifyContent: 'space-evenly',
		// backgroundColor: 'green',
	},
	timeVSWrapper: {
		alignItems: 'center',
		// backgroundColor: 'red',
		height: '100%',
	},
	time: {
		marginBottom: 45,
		fontFamily: 'Baloo-Regular',
	},
	// imagesWrapper: {
	// 	flex: 1,
	// 	width: '100%',
	// 	// backgroundColor: 'green',
	// 	flexDirection: 'row',
	// 	justifyContent: 'space-between',
	// 	paddingHorizontal: 30,
	// 	alignItems: 'center',
	// },
	logo: {
		width: 70,
		height: 70,
		resizeMode: 'contain',
	},
});
