import  React, {useEffect,useContext} from 'react';
import {  StyleSheet, Text, View,Dimensions,Image ,SafeAreaView} from 'react-native';
import { StatusBarGroup } from '../components/Parts';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { imageSource } from '../config/Image';
import {LocalizationContext} from '../api/LocalizationContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
const SplashScreen = ({navigation}) => {
 const {setAppLanguage} = useContext(
     LocalizationContext,
   );
  useEffect(()=>{

 getLang();


  setTimeout(async() => {
  let userToken;
  userToken = null;

  try {
    userToken =  await AsyncStorage.getItem('userToken');


  } catch(e){
    console.log(e);
  }


  console.log("user token: ", userToken)
  dispatch({type:'LOGIN', token:userToken});
//navigation.navigate("SignInScreen");
}, 5000);
  },[]);

const  getLang = async () => {
  let lang;
  lang = "EN";
  try {
    lang =  await AsyncStorage.getItem('LANG');
  } catch(e){
    console.log(e);
  }
    setAppLanguage(lang.toLowerCase());
  	}
return(
  <SafeAreaView style={{  flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#FFF'}} >
				<StatusBarGroup bg={'#FFF'} bs={'dark-content'} />
				<Image style={{ width: wp('70%'), height: hp('70%'), resizeMode:'contain'  }} source = {require('../assets/images/splash.png')} />
			</SafeAreaView>
);
};
SplashScreen.contextType = LocalizationContext;
export default SplashScreen;
