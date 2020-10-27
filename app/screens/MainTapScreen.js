import  React, { useState , useEffect} from 'react';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Text, View, TextInput,Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ProfileScreen from './ProfileScreen';
import DashboardScreen from './DashboardScreen';
import SignOutScreen from './SignOutScreen';
import NewOrderScreen from './NewOrderScreen';
import DetailScreen2 from './DetailScreen2';
import AddDriverScreen from './AddDriverScreen';
import QrCodeGeneratorScreen from './QrCodeGeneratorScreen';
import QrCodeOrderScreen from './QrCodeOrderScreen';
import { imageSource } from '../config/Image';
import EditProfileScreen from './EditProfileScreen';
import translations, { DEFAULT_LANGUAGE } from '../api/translations';

import { actuatedNormalize, fontFamily } from '../config/Font';
const Tab = createBottomTabNavigator();
const ProfileStack = createStackNavigator();
function ProfileStackScreen() {
 return (
   <ProfileStack.Navigator screenOptions={{
    headerShown: false
  }}>
    <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} />
     <ProfileStack.Screen name="AddDriverScreen" component={AddDriverScreen} />
     <ProfileStack.Screen name="QrCodeGeneratorScreen" component={QrCodeGeneratorScreen} />
      <ProfileStack.Screen name="EditProfileScreen" component={EditProfileScreen} />
   </ProfileStack.Navigator>
  );
}
const HomeStack = createStackNavigator();
function HomeStackScreen() {
 return (
   <HomeStack.Navigator screenOptions={{
    headerShown: false
  }}>
    <HomeStack.Screen name="DashboardScreen" component={DashboardScreen} />
     <HomeStack.Screen name="NewOrderScreen" component={NewOrderScreen}/>
     <HomeStack.Screen name="DetailScreen2" component={DetailScreen2} />

     </HomeStack.Navigator>
  );
}

const DetailStack = createStackNavigator();
function DetailStackScreen() {
 return (
   <DetailStack.Navigator screenOptions={{
    headerShown: false,
    tabBarVisible: false
  }}>
   <DetailStack.Screen name="DetailScreen1" component={DetailScreen1} />
   <DetailStack.Screen name="DetailScreen2" component={DetailScreen2}

    />

   </DetailStack.Navigator>
  );
}

function MainTapScreen() {

  useEffect(()=>{
 console.log("Hello tab refreshed");
    // const unsubscribe = navigation.addListener('focus', () => {
    // console.log("Hello tab refreshed");
    //     });
    //     return unsubscribe;

 //jumpToIndex(0)
    },[]);






  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size,padding }) => {

  //    if (route.name === 'Dashboard') {
  //     let  iconName = focused
  //       ? 'ios-information-circle'
  //       : 'ios-information-circle-outline';
  // return <MaterialCommunityIcons name="view-dashboard" size={24} color={color} />
  //     } else if (route.name === 'SignOut') {
  //     let  iconName = focused
  //       ? 'poweroff'
  //       : 'poweroff';
  //     return  <View style={{paddingBottom:35,width:120,alignItems:'center',justifyContent:'center'}} >
  //     <View style={{backgroundColor:'lightgrey',width:60,height:60,borderRadius:30,alignItems:'center',justifyContent:'center'}} >
  //
  //     <View style={{backgroundColor:'grey',width:50,height:50,borderRadius:30,alignItems:'center',justifyContent:'center'}} >
  //          <AntDesign name="poweroff" size={24} color={color} />
  //        </View>
  //        </View>
  //        </View>;
  //     }
  //     else if (route.name === 'Profile') {
  //     let  iconName = focused
  //       ? 'ios-bookmark'
  //       : 'ios-bookmark';
  // return <Entypo name="user" size={24} color= {color} />
  //     }
  //       },



  if (route.name === translations.DASHBOARD_TAP) {
   let  iconName = focused
     ? 'ios-information-circle'
     : 'ios-information-circle-outline';
return <Image source ={imageSource.icon_dashboard} style={{ height: 25, width: 25, tintColor: color }} />
   } else if (route.name === translations.SIGNOUT_TAP) {
   let  iconName = focused
     ? 'poweroff'
     : 'poweroff';
   return <Image source = {imageSource.icon_signout} style={{ height: 50, width:50,marginBottom:20  }} />
   }
   else if (route.name === translations.PROFILE_TAP) {
   let  iconName = focused
     ? 'ios-bookmark'
     : 'ios-bookmark';
return <Image source = {imageSource.icon_account_circle} style={{ height: 25, width: 25, tintColor: color }} />
   }
     },

      })}
      tabBarOptions={{
      activeTintColor: '#357ee2',
      inactiveTintColor: 'grey',

      labelStyle: {
                         fontFamily: fontFamily.Light,
                         fontSize: actuatedNormalize(11),
                     }
      }}
  initialRouteName = {translations.DASHBOARD_TAP}
    >
        <Tab.Screen name= {translations.DASHBOARD_TAP} component={HomeStackScreen} />
        <Tab.Screen name= {translations.SIGNOUT_TAP} component={SignOutScreen} />
        <Tab.Screen name= {translations.PROFILE_TAP} component={ProfileStackScreen} />
    </Tab.Navigator>
  );
}
export  default MainTapScreen;
