import * as React from 'react';
import { StatusBar, StyleSheet, Text, View,Button,Dimensions,Image ,TouchableOpacity,TextInput,Platform,ActivityIndicator} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
//import {AuthContext} from '../components/context';
import { actuatedNormalize, fontFamily} from '../config/Font';
import { JSHash, JSHmac, CONSTANTS } from "react-native-hash";
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';
import { PopLoader } from '../components/Parts';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {Header} from '../components/header';
import translations, { DEFAULT_LANGUAGE } from '../api/translations';

const Forgotpassword = ({navigation}) => {
const [data,setData] = React.useState({
  email: '',
  //check_textInputChange:false,
  isLoading:false
});


const textInputChange = (val) => {
  if (val.length != 0){
setData({
...data,
email:val,
//check_textInputChange:true
});
}else{
  setData({
    ...data,
    email:val,
    //check_textInputChange:true
  });
}
}


const forgotAPI = async(username) =>{
  console.log("param ====== data"  )
setData({isLoading:true})
  let deviceToken;
  deviceToken = null;
  try {
    deviceToken =  await AsyncStorage.getItem('deviceToken');
  } catch(e){
    console.log(e);
  }

  //console.log(username+" "+ password);
  //"LANGCODE":"EN"
		const params = '{"email":"'+username+'","frm_mode":"forgotPassword","uuid":"'+deviceToken+'","LANGCODE":"EN"}'
	console.log("param ====== " + params)
//  var paramjs = JSON.stringify(params);

JSHmac(params, "501ee1944b81bb7018c7d10316854971", CONSTANTS.HmacAlgorithms.HmacSHA256)
  .then(hash =>
    {
      console.log('--------------------------------------');
        console.log(hash);
        fetch('http://thaobo.com/ser_login_registration/forgotPassword', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
            , "doicex-signature": hash
          },
          body: params
        }).then((response) => response.json())
          .then((json) => {
            console.log("res:"+ JSON.stringify(json));
            if (json.status == 1) {
              let logged = true
	Toast.show(json.errorMessage, Toast.LONG);
          console.log('forgot successfull');
        //console.log("userId:"+ json.userInfo.user_id);
      // const userId = JSON.stringify(json.userInfo)
         setData({isLoading:false})
     navigation.goBack()

            }
          })
          .catch((error) => console.error(error))
          .finally(function() { setData({isLoading:false}) });
    } )
  .catch(e => console.log(e));

	}
  ValidateEmail = (mail) => {
  		var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  		if (reg.test(mail) == false) {
  			return false;
  		}
  		return true;
  	}
const forgotPasswordHandle = (username) =>{
  const vemail = this.ValidateEmail(username)
  		if (vemail===false){
  			Toast.show('Please enter a valid email.', Toast.LONG);
  			return false
  		}

      forgotAPI(username)

}

return(

  <View style = {styles.container}>
    <StatusBar backgroundColor = '#be14c7ß' barStyle = "light-content"/>
     <Header title={translations.FORGOT_PASS}onGoBack={()=>navigation.goBack() } />
 <KeyboardAwareScrollView>
   <Animatable.View animation = "fadeInUpBig" style = {styles.footer}>

   <View style = {styles.ImageContainer}>
     <Animatable.Image
     animation = "bounceIn"
     //  duration = "1500"
  //   source = {require('../assets/images/logochecker.png')}
  source = {require('../assets/images/headlogo.png')}
     style = {styles.logo}
     resizeMode = "contain" />
     </View>
<Text style ={{fontFamily:fontFamily.Bold,
fontSize:actuatedNormalize(22),textAlign :'center',marginTop:10, fontWeight:'900'}}>{translations.FORGOT_TITLE}</Text>

  <Text style ={styles.text_footer}></Text>

 <View style = {styles.action}>
<TextInput
placeholder= {translations.EMAIL}
style = {styles.textInput}
autoCapitalize = "none"
onChangeText={(val)=> textInputChange(val)}
/>
  </View>

 <View style = {styles.button}>
      <TouchableOpacity onPress = {()=>{forgotPasswordHandle(data.email)}}
      style = {styles.signIn}>
       <LinearGradient
       colors = {['#357ee2','#317de8']}
         style = {styles.signIn}
         >
<Text style ={[styles.textSign,{color:'#fff',fontFamily:fontFamily.Medium}]}>{translations.FORGOT_PASS}</Text>
</LinearGradient>
</TouchableOpacity>
 </View>


   </Animatable.View>
<PopLoader loading={data.isLoading} />
</KeyboardAwareScrollView>
</View>

);
};

export default Forgotpassword;

//<View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center',marginTop:30}}>
    // <View style={{flex:1, maxWidth: 700, flexDirection:'row', justifyContent:'flex-start'}}>
    //    <Text style = {{fontFamily:fontFamily.Light,fontSize:actuatedNormalize(12)}}>need an account?</Text>
    //    <TouchableOpacity onPress = {()=>navigation.navigate('SignUpScreen')}
    //   >
    //     <Text style = {{color:'#f7c15a',fontFamily:fontFamily.Medium,fontSize:actuatedNormalize(15)}}> Sign up</Text>
    //     </TouchableOpacity>
    // </View>

//</View>
const styles = StyleSheet.create({
  container:{
    flex:1,
   backgroundColor:'#ffffff',
   // justifyContent:'center',
   // alignItems:'center'

 },
 footer:{
   flex:1,
   backgroundColor:'#ffffff',
    justifyContent:'center',
    alignItems:'center',
    paddingLeft:15,
    paddingRight:15
 },
 text_footer:{
   color:'#05375a',
      fontSize:actuatedNormalize(18)
     },
action:{
  flexDirection:'row',
  marginTop:2,
  //borderWidth:0.4,
  backgroundColor:'#f2f5f8',
  borderRadius:10,
  height:50
},
textInput:{
  flex:1,
  marginTop:Platform.OS== 'ios' ? 0 : -6,
  paddingLeft:15,
 paddingRight: 15,
  color:'black',
  fontFamily:fontFamily.Medium,
  fontSize:actuatedNormalize(15)
},
InputIcon:{
  marginTop:12,
  paddingLeft:4,
  paddingRight:8
},
 title:{
   color:'#05375a',
   fontSize:actuatedNormalize(30),
  },
 text:{
   color:'grey',
   marginTop:5,
   fontFamily:fontFamily.Medium
 },
 button:{
   width : "100%",
   alignItems:'center',
   marginTop:30,

 },
 signIn:{
   width:"100%",
   height:55,
   justifyContent:'center',
   alignItems:'center',
   borderRadius:27,

 },
 textSign:{
   fontSize:actuatedNormalize(16),
   fontWeight:'bold',

 },
 ImageContainer:{
  flex:1,
  paddingTop:20
 },
 logo:{
   width:wp('95%'),
   height:wp('80%'),

 },
});
