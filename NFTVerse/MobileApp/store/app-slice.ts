import { createSlice,  } from '@reduxjs/toolkit';

const appSliceInitialState = {
    user: {
        userId: null,
        firstName: null,
        lastName: null,
        email: null,
        mobile: null,
        avatar: null,
        authToken: null,
        userName: null,
        bio: null,
        gender: null,
    },
    isLoggedIn: false,
    walletAddress: [{ address: '' }],
    authToken: '',
    frontSide: '',
    backSide: '',
    picture: '',
    cameraPicture: '',
    country: '',
    verified: false,
    rejection: null,
    taleAmount: 0,
    nft:'',
};

const appSlice = createSlice({
    name: 'app',
    initialState: appSliceInitialState,
    reducers: {
        login(state) {
            state.isLoggedIn = true;
        },
        logout(state) {
            state.isLoggedIn = false;
        },
        updateUser(state, action) {
            state.user.userId = action.payload.userId;
            state.user.firstName = action.payload.firstName;
            state.user.lastName = action.payload.lastName;
            state.user.email = action.payload.email;
            state.user.mobile = action.payload.mobile;
            state.user.avatar = action.payload.avatar;
            state.user.authToken = action.payload.authToken;
            state.user.userName = action.payload.userName;
            state.user.bio = action.payload.bio;
        },
        setWalletAddress(state, action) {
            state.walletAddress = action.payload;
        },
        updateAuthToken(state, action) {
            state.authToken = action.payload;
        },
        setFrontSide(state, action) {
            state.frontSide = action.payload;
        },
        setBackSide(state, action) {
            state.backSide = action.payload;
        },
        setCountry(state, action) {
            state.country = action.payload;
        },
        setPicture(state, action) {
            state.picture = action.payload;
        },
        setCameraPicture(state, action) {
            state.cameraPicture = action.payload;
        },
        setVerified(state, action) {
            state.verified = action.payload;
        },
        setRejection(state, action) {
            state.rejection = action.payload;
        },
        setTaleAmount(state, action) {
            state.taleAmount = action.payload;
        },
        setNft(state, action){
            state.nft = action.payload;
        }
    },
});

export const appActions = appSlice.actions;
export const appReducer = appSlice.reducer;
