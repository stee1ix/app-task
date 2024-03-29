import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { TouchableRipple } from 'react-native-paper';

const Card = ({
	team1 = 'team1',
	team2 = 'team2',
	logo1,
	logo2,
	time = '8:00am',
}) => {
	const navigation = useNavigation();

	return (
		<TouchableRipple
			onPress={() => navigation.navigate('VideoScreen')}
			borderless
			style={styles.container}>
			<View
				style={{ width: '100%', height: '100%', paddingVertical: 10 }}>
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
			</View>
		</TouchableRipple>
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
		// paddingVertical: 10,
	},
	teamName: {
		fontFamily: 'Baloo-Medium',
		fontSize: 16,
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
	logo: {
		width: 70,
		height: 70,
		resizeMode: 'contain',
	},
});
