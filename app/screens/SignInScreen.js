
import * as React from 'react';
import { StatusBar, StyleSheet, Text, View,Button,Dimensions,Image ,TouchableOpacity,TextInput,Platform,ActivityIndicator} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import {AuthContext} from '../components/context';
import { actuatedNormalize, fontFamily} from '../config/Font';
import { JSHash, JSHmac, CONSTANTS } from "react-native-hash";
 import AsyncStorage from '@react-native-community/async-storage';
 import Toast from 'react-native-simple-toast';
import { PopLoader } from '../components/Parts';
import translations, { DEFAULT_LANGUAGE } from '../api/translations';
 import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const SignInScreen = ({navigation}) => {

const [data,setData] = React.useState({
  username: '',
  password:'',
  check_textInputChange:false,
  secureTextEntry: true,
  isLoading:false
});

const {signIn} = React.useContext(AuthContext) ;
const textInputChange = (val) => {
  if (val.length != 0){
setData({
...data,
username:val,
check_textInputChange:true
});
}else{
  setData({
    ...data,
    username:val,
    check_textInputChange:true
  });
}
}

const handlePasswordChange = (val) =>{
  setData({
    ...data,
    password:val
  })
}

const  updateSecureTextEntry = () =>{
  setData({
    ...data,
    secureTextEntry: !data.secureTextEntry
  });
}
const signinAPI = async(username,password) =>{
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
		const params = '{"passphrase":"'+password+'","username":"'+username+'","frm_mode":"get_login","uuid":"'+deviceToken+'","LANGCODE":"EN"}'
	console.log("param == " + params)
//  var paramjs = JSON.stringify(params);

JSHmac(params, "501ee1944b81bb7018c7d10316854971", CONSTANTS.HmacAlgorithms.HmacSHA256)
  .then(hash =>
    {
      console.log('--------------------------------------');
        console.log(hash);
        fetch('http://thaobo.com/ser_login_registration/get_login', {
          method: 'POST',
          headers: {
          Accept: 'application/json',
            'Content-Type': 'application/json',

             "doicex-signature": hash
          },
          body: params
        }).then((response) => response.json())
          .then((json) => {
            if (json.status == 1 && json.userInfo.user_type == "DRI") {
              let logged = true
          console.log('Login successfull');

            console.log(JSON.stringify(json.userInfo));

        const userId = JSON.stringify(json.userInfo);
         setData({isLoading:false})
             AsyncStorage.setItem('USER', userId)
        signIn(username,password);
      }else{
    	Toast.show("Invalid account", Toast.LONG);
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

    //const vemail = this.ValidateEmail(username)
    		// if (vemail===false){
    		// 	Toast.show('Please enter a valid email.', Toast.LONG);
    		// 	return false
    		// }
const loginHandle = (username,password) =>{

      if (username == undefined){
  	Toast.show('Please enter  email or mobile number.', Toast.LONG);
  return false
    }

      if (username.trim()=='') {
        Toast.show('Email or mobile number cannot be blank.', Toast.LONG);
        return false
      }
      if (password == undefined){
        Toast.show('Please enter password.', Toast.LONG);
      return false
    }

  		if (password.trim()=='') {
  			Toast.show('Password cannot be blank.', Toast.LONG);
  			return false
  		}
      signinAPI(username,password)

}


// if(data.isLoading){
//
// return (
//   <View style = {{flex:1,justifyContent:'center',alignItems:'center'}}>
// <ActivityIndicator size = "large"/>
// </View>
// );
//
// }

return(

  <View style = {styles.container}>
    <StatusBar backgroundColor = '#be14c7ß' barStyle = "dark-content"/>
    <View style = {styles.header}>

      <View style = {styles.ImageContainer}>
      <Animatable.Image
      animation = "bounceIn"
      //  duration = "1500"
      source = {require('../assets/images/headlogo.png')}
      style = {styles.logo}
      resizeMode = "contain" />
        <Text style ={styles.text_header}>{translations.FORDRIVER}</Text>
      </View>

   </View>
   <Animatable.View animation = "fadeInUpBig" style = {styles.footer}>
<Text style ={{fontFamily:fontFamily.Bold,
fontSize:actuatedNormalize(25),textAlign :'center',marginTop:20}}>{translations.LOGIN}</Text>

  <Text style ={styles.text_footer}></Text>

 <View style = {styles.action}>
<TextInput
placeholder= {translations.EMAIL_MOBILE}
style = {styles.textInput}
autoCapitalize = "none"
onChangeText={(val)=> textInputChange(val)}
/>
{data.check_textInputChange ?
  <Animatable.View animation = "bounceIn" >
<Feather
name="check-circle"
 size={20}
 style ={styles.InputIcon}
  color="green" />
  </Animatable.View>
  : null}
  </View>
  <Text style ={[styles.text_footer,{marginTop:20}]}></Text>
  <View style = {styles.action}>
  <TextInput
 placeholder= {translations.PASSWORD}
 secureTextEntry = {data.secureTextEntry ? true : false}
 style = {styles.textInput}
  autoCapitalize = "none"
onChangeText={(val)=> handlePasswordChange(val)}
  />
  <TouchableOpacity
  onPress = {updateSecureTextEntry}
  >

 <Feather
 name="eye"
  size={24}
  style = {styles.InputIcon}
   color="gray" />
   </TouchableOpacity>
   </View>

 <View style = {styles.button}>
      <TouchableOpacity onPress = {()=>{loginHandle(data.username,data.password)}}
      style = {styles.signIn}>
       <LinearGradient
       colors = {['#357ee2','#317de8']}
         style = {styles.signIn}
         >
<Text style ={[styles.textSign,{color:'#fff',fontFamily:fontFamily.Medium}]}>{translations.LOGIN}</Text>
</LinearGradient>
</TouchableOpacity>
 </View>
 <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center',marginTop:30}}>
     <View style={{flex:1, maxWidth: 700, flexDirection:'row', justifyContent:'center'}}>
        <Text style = {{fontFamily:fontFamily.Light,fontSize:actuatedNormalize(14)}}>{translations.NOT_A_MEMBER}</Text>
        <TouchableOpacity onPress = {()=>navigation.navigate('SignUpScreen')}
       >
         <Text style = {{marginTop:Platform.OS == 'ios' ? 0 : -4,color:'#fe734b',fontFamily:fontFamily.Medium,fontSize:actuatedNormalize(14)}}> {translations.REGISTER}</Text>
         </TouchableOpacity>
     </View>

 </View>

   </Animatable.View>
<PopLoader loading={data.isLoading} />
</View>
);
};

export default SignInScreen;


const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#69d2ef',

 },
 header:{
   flex:2,
   justifyContent:'center',
   alignItems:'center'
 },
 text_header:{
   color:'#fff',
   fontSize:actuatedNormalize(15),
   fontWeight:'500'
 },
 footer:{
   flex:4,
   backgroundColor:'#ffffff',
   borderTopLeftRadius:30,
   borderTopRightRadius:30,
   paddingVertical:4,
   paddingHorizontal:30,
   shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: -11,
},
shadowOpacity: 0.55,
shadowRadius: 14.78,

elevation: 22,
 },
 text_footer:{
   color:'#05375a',
      fontSize:actuatedNormalize(18)
     },
action:{
  flexDirection:'row',
  marginTop:8,
  borderWidth:0.4,
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
  fontSize:actuatedNormalize(15),

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
   marginTop:30
 },
 signIn:{
   width:"100%",
   height:50,
   justifyContent:'center',
   alignItems:'center',
   borderRadius:10,

 },
 textSign:{
   fontSize:actuatedNormalize(16),
   fontWeight:'bold'
 },
 ImageContainer:{

  flex:1,
   height:140,
   justifyContent:'center',
   alignItems:'center',

 },
 logo:{
   width:wp('55%'),
   height:wp('30%'),

 },
});



// <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center',marginTop:30}}>
//     <View style={{flex:1, maxWidth: 700, flexDirection:'row', justifyContent:'flex-end'}}>
//        <TouchableOpacity onPress = {()=> navigation.navigate('Forgotpassword')}
//       >
//        <Text style = {{color:'#fe6b40',fontFamily:fontFamily.Medium,fontSize:actuatedNormalize(14)}} >{translations.FORGOT_PASS}</Text>
//         </TouchableOpacity>
//     </View>
// </View>
