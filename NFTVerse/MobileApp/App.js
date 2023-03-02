import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Header from "./components/authorized-view/Header";
import ProfileOptions from "./components/authorized-view/profile/ProfileOptions";
import JoinContest from "./components/Pages/JoinContest";
import LiveMatch from "./components/Pages/LiveMatch";
import ThrowCard from "./components/Pages/ThrowCard";
import SpinTheWheel from "./components/SpinTheWheel/SpinTheWheel";
import AuthLanding from "./screens/AuthLanding";
import AuthorizedView from "./screens/AuthorizedView";
import EmailAuth from "./screens/EmailAuth";
import Onboarding from "./screens/Onboarding";
import SubmitOTP from "./screens/SubmitOTP";
import store, { persistor } from "./store/store";


<script src="http://localhost:8097"></script>
//react-devtools
export default function App() {



    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <NavigationContainer>
                    <StatusBar barStyle="light-content" />
                    <RootStack />
                </NavigationContainer>
            </PersistGate>
        </Provider>
    );
}

const RootStack = () => {
    const isLoggedIn = useSelector((state) => state.app.isLoggedIn);
    const Stack = createNativeStackNavigator();
    const appCtx = useSelector((state) => state.app);

    return (
        <Stack.Navigator>
            {!isLoggedIn ? (
                <>
                    {/* <Stack.Screen options={{ headerShown: false }} name="Onboarding" component={Onboarding} /> */}
                    <Stack.Screen
                        options={{ headerShown: false, animation: 'slide_from_bottom' }}
                        name="AuthLanding"
                        component={AuthLanding}
                    />
                    <Stack.Screen
                        options={{ headerShown: false, animation: 'fade_from_bottom' }}
                        name="EmailAuth"
                        component={EmailAuth}
                    />
                    <Stack.Screen
                        options={{ headerShown: false, animation: 'flip' }}
                        name="SubmitOTP"
                        component={SubmitOTP}
                    />
                    {/* <Stack.Screen
                        options={{ headerShown: true,headerTitle:'Terms of Service', animation: 'fade_from_bottom' }}
                        name="TAC"
                        component={TAC}
                    />
                    <Stack.Screen
                        options={{ headerShown: true, animation: 'fade_from_bottom' }}
                        name="PrivacyPolicy"
                        component={PrivacyPolicy}
                    /> */}
                </>
            ) : (
                <>
                    <Stack.Screen name="AuthorizedView" options={{ headerShown: false }} component={AuthorizedView} />
                    <Stack.Screen
                        options={{ headerShown: true, animation: 'slide_from_right', headerTitle: 'Profile Options' }}
                        name="ProfileOptions"
                        component={ProfileOptions}
                    />
                    <Stack.Screen
                        options={{ headerShown: true, animation: 'slide_from_right', header: () => <Header /> }}
                        name="JoinContest"
                        component={JoinContest}
                    />
                    <Stack.Screen
                        options={{ headerShown: true, animation: 'slide_from_right', header: () => <Header /> }}
                        name="LiveMatch"
                        component={LiveMatch}
                    />
                    <Stack.Screen
                        options={{ headerShown: true, animation: 'slide_from_right', header: () => <Header /> }}
                        name="ThrowCard"
                        component={ThrowCard}
                    />
                     <Stack.Screen
                        options={{ headerShown: true, animation: 'slide_from_bottom', header: () => <Header /> }}
                        name="SpinTheWheel"
                        component={SpinTheWheel}
                    />
                </>
            )}
        </Stack.Navigator>
    );
};
