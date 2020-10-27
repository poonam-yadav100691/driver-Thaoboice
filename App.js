import  React , {useEffect,Fragment} from 'react';
import {  View,ActivityIndicator } from 'react-native';
 import SplashScreen from './app/screens/SplashScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainTapScreen from './app/screens/MainTapScreen';
import RootStackScreen from './app/screens/RootStackScreen';
import ProfileScreen from './app/screens/ProfileScreen';
import DashboardScreen from './app/screens/DashboardScreen';
import {AuthContext} from './app/components/context';
 import AsyncStorage from '@react-native-community/async-storage';
import { YellowBox } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import firebase from "@react-native-firebase/app";
import { LocalizationProvider } from './app/api/LocalizationContext';
import RNLocation from "react-native-location";
import moment from "moment";

import {db} from './app/config/config';
import BackgroundTimer from 'react-native-background-timer';
const Stack = createStackNavigator();
YellowBox.ignoreWarnings([
	'Non-serializable values were found in the navigation state',
]);

function App() {
requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      getFcmToken() //<---- Add this
      console.log('Authorization status:', authStatus);
    }
  }

  getFcmToken = async () => {
      const fcmToken = await messaging().getToken();
      let deviceToken;
      deviceToken = null;
    if (fcmToken) {
       console.log(fcmToken);
       console.log("Your Firebase Token is:", fcmToken);
       try {
          deviceToken = fcmToken
           await AsyncStorage.setItem('deviceToken', deviceToken)

  // Toast.show("Your Firebase Token is:"+ fcmToken);

       } catch(e){
         console.log(e);
       }

      } else {
       console.log("Failed", "No token received");
      }
    }

const initialLoginState ={
  isLoading:true,
  userName:null,
  userToken:null,
};
const loginReducer = (prevState, action) =>{
  switch (action.type) {
    case 'RETRIEVE_TOKEN':
    return{
      ...prevState,
      userToken:action.token,
      isLoading:false,
    };


   case 'LOGIN':
      return{
        ...prevState,
        userName:action.id,
        userToken:action.token,
        isLoading:false,
      };


    case 'LOGOUT':
          return{
            ...prevState,
              userName:null,
            userToken:null,
            isLoading:false,
          };

  case 'REGISTER':
        return{
            ...prevState,
            userName:action.id,
            userToken:action.token,
            isLoading:false,
                  };


  }
};

const [loginState, dispatch] = React.useReducer(loginReducer,initialLoginState);

const authContext = React.useMemo(()=>({
  signIn:async(userName,password) => {

let userToken;
userToken = null;
if ( userName != '' && password != ''){
console.log('validated');
try {
    userToken = 'abcde';
    await AsyncStorage.setItem('userToken', userToken)
} catch(e){
  console.log(e);
}


}
addUserLocation()
BackgroundTimer.runBackgroundTimer(() => {
//code that will be called every 3 seconds
updateUserLocation()
},
10000);

//setInterval(updateUserLocation,50000);
console.log("user token: ", userToken)
dispatch({type:'LOGIN', id:userName,token:userToken});

},
  signOut:async() => {
  try {
BackgroundTimer.stopBackgroundTimer();
    userToken =  await AsyncStorage.removeItem('userToken');
  } catch(e){
    console.log(e);
  }
 clearInterval(updateUserLocation)
  dispatch({type:'LOGOUT'});
},
  signUp:() => {
  setUserToken("abc");
  setIsLoading(false);
},
}),[]);



const updateUserLocation = async() =>{

  let deviceToken;
  deviceToken = null;
  try {
console.log('abcd---------------');
    let  locationObj =  await AsyncStorage.getItem('CURRENTLOCATION');
    deviceToken =   await AsyncStorage.getItem('deviceToken');
  const obj = JSON.parse(locationObj);
  let  userres =  await AsyncStorage.getItem('USER');
  const userobj = JSON.parse(userres);
  console.log('abcd---------------'+obj.latitude+'====='+obj.longitude+'====='+deviceToken);
  db.ref('/driverlocation').child(userobj.user_id).update( {
    device_id: deviceToken,
    lat: obj.latitude,
    long:obj.longitude
  }
  );

  // db.ref('/driverlocation').update({
  //  [userobj.user_id]: {
  //        device_id: userToken,
  //        lat: obj.latitude ,
  //        long:obj.longitude
  //
  //      },
  //      });

  } catch(e){
    console.log(e);
  }




}
const addUserLocation = async() =>{
  let deviceToken;
  deviceToken = null;
  try {
console.log('abcd---------------');
    let  locationObj =  await AsyncStorage.getItem('CURRENTLOCATION');
    deviceToken =   await AsyncStorage.getItem('deviceToken');
    let  userres =  await AsyncStorage.getItem('USER');
    const userobj = JSON.parse(userres);


  const obj = JSON.parse(locationObj);
  console.log('abcd---------------'+obj.latitude+'====='+obj.longitude+'====='+deviceToken);

//this.dbRef.child(`YOUR_CUSTOM_UNIQUE_KEY`).set(item)
db.ref('/driverlocation').child(userobj.user_id).set( {
  device_id: deviceToken,
  lat: obj.latitude,
  long:obj.longitude
}
);

  // db.ref('/driverlocation').push({
  //      [userobj.user_id]: {
  //        device_id: userToken,
  //        lat: obj.latitude,
  //        long:obj.longitude
  //      },
  //      });

  } catch(e){
    console.log(e);
  }




}





const requestUserLocationPermission = async() => {

  RNLocation.configure({
       distanceFilter: 5.0
     });

     RNLocation.requestPermission({
       ios: "whenInUse",
       android: {
         detail: "fine",
         rationale: {
           title: "Location permission",
           message: "We use your location to demo the library",
           buttonPositive: "OK",
           buttonNegative: "Cancel"
         }
       }
     }).then(granted => {
       if (granted) {
           console.log("location is=== granted" );
      _startUpdatingLocation();
       }
     });

}

 _startUpdatingLocation = () => {
  locationSubscription = RNLocation.subscribeToLocationUpdates(
      locations => {
        console.log("location is=== "+ JSON.stringify(locations[0]));
             AsyncStorage.setItem('CURRENTLOCATION', JSON.stringify(locations[0]))
      }
    );
  };

 _stopUpdatingLocation = () => {
    locationSubscription && locationSubscription();
      setLocation(null)
  };

  _openRepoUrl = () => {
    Linking.openURL(repoUrl).catch(err =>
      console.error("An error occurred", err)
    );
  };



useEffect(()=>{
  requestUserLocationPermission();

 requestUserPermission();

setTimeout(async() => {
let userToken;
userToken = null;
try {
  userToken =  await AsyncStorage.getItem('userToken');
} catch(e){
  console.log(e);
}
console.log("user token: ", userToken)
dispatch({type:'REGISTER', token:userToken});
}, 1000);
},[]);


// if(loginState.isLoading){
//
// return (
//   <View style = {{flex:1,justifyContent:'center',alignItems:'center'}}>
// <ActivityIndicator size = "large"/>
// </View>
// );
//
// }
  return (
    <LocalizationProvider>
<AuthContext.Provider value={authContext}>
        <NavigationContainer>
        <Stack.Navigator headerMode = 'none'>
          {loginState.isLoading ? (
            // We haven't finished checking for the token yet
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
          ) : loginState.userToken == null ? (
            // No token found, user isn't signed in
            <Stack.Screen
              name="RootStackScreen"
              component={RootStackScreen}
              options={{
                title: 'SignInScreen',
            // When logging out, a pop animation feels intuitive
                animationTypeForReplace: loginState.isSignout ? 'pop' : 'push',
              }}
            />



          ) : (
            // User is signed in
            <Stack.Screen name="MainTapScreen" component={MainTapScreen} />

          )}
        </Stack.Navigator>
      </NavigationContainer>
 </AuthContext.Provider>
      </LocalizationProvider>

  );
}

export default App;

//
//
// <LocalizationProvider>
// <AuthContext.Provider value = {authContext}>
// <NavigationContainer>
//
// {
// loginState.userToken != null ?
// (
//
// <MainTapScreen />
// ):
// <RootStackScreen/>
//
// }
// </NavigationContainer>
// </AuthContext.Provider>
//   </LocalizationProvider>
