const INITIAL_STATE = {
	auth: false,
	username: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case 'TOGGLE_AUTH':
			return {
				...state,
				auth: !state.auth,
			};

		case 'SET_USERNAME':
			return {
				...state,
				username: action.payload,
			};

		default:
			return state;
	}
};

export default userReducer;
