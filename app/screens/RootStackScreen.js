import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';



import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import Forgotpassword from './Forgotpassword';
const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) =>(
<RootStack.Navigator headerMode = 'none'>

<RootStack.Screen name = "SignInScreen" component = {SignInScreen}/>
<RootStack.Screen name = "SignUpScreen" component = {SignUpScreen}/>
<RootStack.Screen name = "Forgotpassword" component = {Forgotpassword}/>
</RootStack.Navigator>

);

export  default RootStackScreen;
