import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import Splash from '../containers/Splash';
import Login from '../containers/Login';
import Forget from '../containers/Forget';
import Registration from '../containers/Registration';
import Tabs from '../containers/TabNavigation';
import Settings from '../containers/Settings';
import Aboutus from '../containers/Aboutus';
import HelpCenter from '../containers/HelpCenter';
import Category from '../containers/Category';
import MyCart from '../containers/MyCart';
import MostPopular from '../containers/MostPopular';
import AddressList from '../containers/AddressList';
import AddAddress from '../containers/AddAddress';
import OrderSuccess from '../containers/OrderSuccess';


const Stack = createStackNavigator();

const AppNavigator = (props) => {
    return (
        <NavigationContainer>
				<Stack.Navigator initialRouteName='Splash' screenOptions={{ headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}>
					<Stack.Screen name="Splash" component={Splash} initialParams={props.initialParams}/>
					<Stack.Screen name="Login" component={Login} initialParams={props.initialParams}/>
					<Stack.Screen name="Registration" component={Registration} initialParams={props.initialParams}/>
					<Stack.Screen name="Forget" component={Forget} initialParams={props.initialParams}/>
					<Stack.Screen name="Tabs" component={Tabs} initialParams={props.initialParams}/>
					<Stack.Screen name="Settings" component={Settings} initialParams={props.initialParams}/>
					<Stack.Screen name="Aboutus" component={Aboutus} initialParams={props.initialParams}/>
					<Stack.Screen name="HelpCenter" component={HelpCenter} initialParams={props.initialParams}/>
					<Stack.Screen name="Category" component={Category} initialParams={props.initialParams}/>
					<Stack.Screen name="MyCart" component={MyCart} initialParams={props.initialParams}/>
					<Stack.Screen name="MostPopular" component={MostPopular} initialParams={props.initialParams}/>
					<Stack.Screen name="AddressList" component={AddressList} initialParams={props.initialParams}/>
					<Stack.Screen name="AddAddress" component={AddAddress} initialParams={props.initialParams}/>
					<Stack.Screen name="OrderSuccess" component={OrderSuccess} initialParams={props.initialParams}/>
				</Stack.Navigator>
			</NavigationContainer>
    )
} 
export default AppNavigator;
