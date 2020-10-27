
import  React, { useState , useEffect} from 'react';
import { StatusBar,ScrollView, StyleSheet, Text, View,Button,Dimensions,Image ,TouchableOpacity,TextInput,Platform} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { actuatedNormalize, fontFamily } from '../config/Font';
import {Header} from '../components/header';
//import Model from '../api/Model';
import { JSHash, JSHmac, CONSTANTS } from "react-native-hash";
import AsyncStorage from '@react-native-community/async-storage';

import ImagePicker from 'react-native-image-crop-picker';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DropDownPicker from 'react-native-dropdown-picker';
import Toast from 'react-native-simple-toast';
import { TextButtonGroup, ButtonGroup, MyAppText, PopLoader, FloatingBacKButton } from '../components/Parts';
import CryptoJS from "react-native-crypto-js";
import translations, { DEFAULT_LANGUAGE } from '../api/translations';
const SignUpScreen = ({navigation}) => {
  const [state,setState] = React.useState({
    hasError: false
  });
const [isLoading, setLoading] = React.useState(false);
const [stateData,setStateData] = React.useState([]);
const [districtData,setDistrictData] = React.useState([]);
const [districtDataClone,setDistrictDataClone] = React.useState([]);
const [stateid,setStateid] = React.useState('')
const [districtid,setDistrictid] = React.useState('')
const [gender,setGender] = React.useState('')
const [langu,setLangu] = React.useState('EN')
const [imgprofile,setImgprofile] = React.useState(null)
const [data,setData] = React.useState({
  firstname: '',
  lastname: '',
  phonenumber: '',
  email:'',
  password: '',
  firstnamecheck_textInputChange:false,
  lastnamecheck_textInputChange:false,
  phonenumbercheck_textInputChange:false,
  emailcheck_textInputChange:false,
  secureTextEntry: true
  //,
//  confirm_secureTextEntry: true
});
const firstnametextInputChange = (val) => {
  if (val.length != 0){
setData({
...data,
firstname:val,
firstnamecheck_textInputChange:true
});
}else{
  setData({
    ...data,
    firstname:val,
    firstnamecheck_textInputChange:true
  });
}
}
const lastnametextInputChange = (val) => {
  if (val.length != 0){
setData({
...data,
lastname:val,
lastnamecheck_textInputChange:true
});
}else{
  setData({
    ...data,
    lastname:val,
    lastnamecheck_textInputChange:true
  });
}
}
const phonenumbertextInputChange = (val) => {
  if (val.length != 0){
setData({
...data,
phonenumber:val,
phonenumbercheck_textInputChange:true
});
}else{
  setData({
    ...data,
    phonenumber:val,
    phonenumbercheck_textInputChange:true
  });
}
}
const emailtextInputChange = (val) => {
  if (val.length != 0){
setData({
...data,
email:val,
emailcheck_textInputChange:true
});
}else{
  setData({
    ...data,
    email:val,
    emailcheck_textInputChange:true
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
useEffect(()=>{
getStateList()
  },[]);

const  getStateListres = async (response) => {
  		if(response.status){
  			const state = await response.stateData.map((o)=>{ o.label = o.name; o.value = o.state_id; return o;  })
      	if(state.length){
  				const districtClone = await response.districtData.map((o)=>{ o.label = o.name; o.value = o.state_id; return o;   })
  	    console.log('avxdddddddggggavx');
        console.log(districtClone);
         setStateData(state)
           setDistrictDataClone(districtClone)
  			}
  		}
  	}
  const	changeState = async (type, stateid) => {
  		const district = districtDataClone.filter((o) => o.state_id == stateid)
      setDistrictData(district)
      setStateid(stateid)
  	}

const getStateList = async() =>{
    const params = '{"user_id":"","frm_mode":"getStateDistictList","uuid":"","LANGCODE":"EN"}'
  console.log("param ==dash ==" + params)
  setLoading(true)
JSHmac(params, "501ee1944b81bb7018c7d10316854971", CONSTANTS.HmacAlgorithms.HmacSHA256)
  .then(hash =>
    {
      console.log('--------------------------------------');
        console.log(hash);
        fetch('http://thaobo.com/ser_login_registration/getStateDistictList', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
            , "doicex-signature": hash
          },
          body: params
        }).then(res => res.json())
        .then(res => {

getStateListres(res)

     })
        .catch(() => setState({ hasErrors: true }))
        .finally(function() { setLoading(false)});

    } )
  .catch(e => console.log(e));
  }

    const callApiForRegister = async(firstname,lastname,email,password,stateid,districtid,phonenumber) =>{
      let deviceToken;
      deviceToken = null;
    try {
        deviceToken =  await AsyncStorage.getItem('deviceToken');
      } catch(e){
        console.log(e);
      }
      setLoading(true)
      console.log("----"+firstname+"-------"+lastname+"----"+email+"-------"+password+"-----"+stateid+"----"+districtid+"-------"+phonenumber);

 //var HmacSHA256 = require("react-native-crypto-js").HmacSHA256;
    //var hash = CryptoJS.HmacSHA256("Hello everybody", "501ee1944b81bb7018c7d10316854971");




//console.log('==========================================');
//console.log(HmacSHA256("Hello",'501ee1944b81bb7018c7d10316854971'));
//console.log('==========================================');
//const PARAMS = '{"password":"' + password + '","first_name":"' + firstname + '","last_name":"' + lastname + '","middle_name":"","email":"' + email + '","mobile":"' + phonenumber + '","postcode":"","address_1":"","state_id":"' + stateid + '","district_id":"' + districtid + '","frm_mode":"driverRegistration","uuid":"'+deviceToken+'","LANGCODE":"EN"}'
    var keysecret = "501ee1944b81bb7018c7d10316854971"

    let formdata = new FormData();
    formdata.append("first_name",firstname)
    formdata.append("middle_name", '')
    formdata.append("last_name", lastname)
    formdata.append("email", email)
    formdata.append("password",password)
    formdata.append("state_id", stateid)
    formdata.append("district_id", districtid)
    formdata.append("mobile", phonenumber)
    formdata.append("frm_mode", 'driverRegistration')
    formdata.append("LANGCODE", langu)
    formdata.append("uuid", deviceToken)
    formdata.append("user_photo", imgprofile)
   console.log(JSON.stringify(formdata));
//console.log(PARAMS);
    JSHmac(formdata, "501ee1944b81bb7018c7d10316854971", CONSTANTS.HmacAlgorithms.HmacSHA256)
      .then(hash =>
        {

            fetch('http://thaobo.com/ser_login_registration/driverRegistration', {
              method: 'POST',
              headers: {
                // Accept: 'application/json',
                // 'Content-Type': 'application/json'
                // , "doicex-signature": hash
                'Content-Type': 'multipart/form-data',
                 'doicex-signature':hash
              },
              body: formdata
            }).then(res => res.json())
            .then(res => {
        console.log('======================================'+JSON.stringify(res));
         })
            .catch(() => setState({ hasErrors: true }))
            .finally(function() { setLoading(false)});

        } )
    //   .catch(e => console.log(e));

  //  console.log("Using payload as " + payload);

  // const token = "a,b"; // fake token
  // const secret = CryptoJS.enc.Utf8.parse(keysecret); //encode mySecret into UTF-8 as suggested in the comments
  // const CryptoJS = require('crypto-js');
  // var hash = CryptoJS.HmacSHA256(token.split(","), secret);
  // console.log(hash);

  //  var hash = hmacSHA256(formdata,keysecret);

//console.log('hash is ==='+hash);

  //  var hashInBase64 = Crypto.enc.Hex.stringify(hash);
    // fetch('http://ice.shreewebs.com/driverRegistration/driverRegistration',{
    //   method: 'post',
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //     'doicex-signature':hash
    //   },
    //   body: formdata
    //   }).then(response => {
    //     console.log("image uploaded")
    //     setLoading(false)
    //   Toast.show('Registration successfully completed ', Toast.LONG);
    // navigation.goBack()
    //   }).catch(err => {
    //     console.log(err)
    //   })
    //   .finally(function() { setLoading(false) });
    }


  const  registerUser = async (firstname,lastname,email,password,stateid,districtid,phonenumber) => {
  //console.log('-----------------------------------------');
    		if(firstname.trim()==''){
    			Toast.show('First Name is required....', Toast.LONG)
    			return false;
    		}
    		if(lastname.trim()==''){
    			Toast.show('Last Name is required....', Toast.LONG)
    			return false;
    		}
    		if(email.trim()==''){
    			Toast.show('Email is required....', Toast.LONG)
    			return false;
    		}
    		if(password.trim()==''){
    			Toast.show('Password is required....', Toast.LONG)
    			return false;
    		}
    		if(stateid.trim()==''){
    			Toast.show('State is required....', Toast.LONG)
    			return false;
    		}
    		if(districtid.trim()==''){
    			Toast.show('District is required....', Toast.LONG)
    			return false;
    		}
    		if(phonenumber.trim()==''){
    			Toast.show('Mobile is required....', Toast.LONG)
    			return false;
    		}

callApiForRegister(firstname,lastname,email,password,stateid,districtid,phonenumber)
    	}

const opengallery = () =>{

  ImagePicker.openPicker({
    width: 300,
    height: 400,
    cropping: true
  }).then(image => {
    console.log(image);
  });
}
const opengalleryForProfle = () =>{

  ImagePicker.openPicker({
    width: 300,
    height: 400,
    cropping: true
  }) .then((image) => {
        console.log('received image', image);
        setImgprofile({
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime,
          })

        })

      .catch((e) => alert(e));
}
const opencamera = () =>{
  ImagePicker.openCamera({
    width: 300,
    height: 400,
    cropping: true,
  }).then(image => {
    console.log(image);
  });
}




return(
  <View style = {styles.container}>
  <StatusBar backgroundColor = '#be14c7ß' barStyle = "light-content"/>
     <Header title={translations.REGISTER} onGoBack={()=>navigation.goBack() } />
 <Animatable.View animation = "fadeInUpBig" style = {styles.footer}>
<ScrollView showsVerticalScrollIndicator={false} style ={{marginTop:0}} >
<View style = {styles.ImageContainer}>
<TouchableOpacity onPress = {()=>opengalleryForProfle()}>
<Animatable.Image
animation = "bounceIn"
//  duration = "1500"
source = {(imgprofile == null)? require('../assets/images/logo.png') : imgprofile }
style = {styles.logo}
resizeMode = "cover" />
</TouchableOpacity>
</View>
 <View style={[styles.outerContainer2txt,styles.text_footer]}>
<View style={[styles.innerContainer,styles.action,{marginRight:5}]}>
<FontAwesome
 name="user-o"
  size={20}
style = {styles.InputIcon}
 color="black"
 />
         <View style={styles.textInputContainer}>
         <TextInput
         placeholder= {translations.NAME}
         style = {styles.textInput}
         autoCapitalize = "none"
         onChangeText={(val)=> firstnametextInputChange(val)}
         />
         </View>
       </View>
       <View style={[styles.innerContainer,styles.action,{marginLeft:5}]}>
       <FontAwesome
        name=""
         size={20}
        color="black"
        style = {styles.fieldName}/>
         <View style={styles.textInputContainer}>
         <TextInput
         placeholder= {translations.LAST_NAME}
         style = {styles.textInput}
         autoCapitalize = "none"
         onChangeText={(val)=> lastnametextInputChange(val)}
         />
         </View>
       </View>
     </View>

<Text style ={[styles.text_footer,{marginTop:20}]}>{translations.PHONE_NUMBER}</Text>
<View style = {styles.action}>

<TextInput
placeholder= {translations.PHONE_NUMBER}
style = {styles.textInput}
autoCapitalize = "none"
onChangeText={(val)=> phonenumbertextInputChange(val)}
/>
  </View>

  <Text style ={[styles.text_footer,{marginTop:35}]}>{translations.EMAIL}</Text>
  <View style = {styles.action}>
 <TextInput
 placeholder= {translations.EMAIL}
 style = {styles.textInput}
  autoCapitalize = "none"
onChangeText={(val)=> emailtextInputChange(val)}
  />
   </View>
   <Text style ={[styles.text_footer,{marginTop:35}]}>{translations.PASSWORD}</Text>
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
   size={20}
   style = {styles.InputIcon}
    color="gray" />
    </TouchableOpacity>
    </View>
    <Text style ={[styles.text_footer,{marginTop:35}]}>{translations.STATE}</Text>
    <View style = {[styles.action,{zIndex:1000}]}>
   <TextInput
   placeholder= {translations.SELECT_STATE}
   style = {styles.textInput}
    autoCapitalize = "none"
  //onChangeText={(val)=> handlePasswordChange(val)}
    />
    <DropDownPicker
							zIndex={5000}
							items={stateData}
							containerStyle={{padding:1,height: 48,width:'100%',position:'absolute'}}
							style={{ backgroundColor: '#fafafa',}}
							dropDownStyle={{ backgroundColor: '#fafafa' ,}}
							onChangeItem={item => changeState('state_id',item.value) }
						/>
    </View>
    <Text style ={[styles.text_footer,{marginTop:35}]}>{translations.DISTRICT}</Text>
    <View style = {[styles.action,{zIndex:800}]}>
   <TextInput
   placeholder= {translations.SELECT_DISTICT}
   style = {styles.textInput}
    autoCapitalize = "none"
  //onChangeText={(val)=> handlePasswordChange(val)}
    />
    <DropDownPicker
							zIndex={4000}
							items={districtData}
							containerStyle={{padding:1,height: 48,width:'100%',position:'absolute'}}
							style={{ backgroundColor: '#fafafa'}}
							dropDownStyle={{ backgroundColor: '#fafafa' }}
							onChangeItem={item => setDistrictid(item.value) }
						/>
    </View>
    <Text style ={[styles.text_footer,{marginTop:35}]}>{translations.GENDER}</Text>
    <View style = {[styles.action,{zIndex:500}]}>
   <TextInput
   placeholder= {translations.SELECT_GENDER}
   style = {styles.textInput}
    autoCapitalize = "none"
//  onChangeText={(val)=> handlePasswordChange(val)}
    />
    <DropDownPicker
							items={[
								{label: translations.MALE, value: 'Male'},
								{label: translations.FEMALE, value: 'Female'},
							]}
							defaultValue={gender}
							containerStyle={{padding:1,height: 48,width:'100%',position:'absolute'}}
							style={{ backgroundColor: '#fafafa'}}
							dropDownStyle={{ backgroundColor: '#fafafa' }}
							onChangeItem={item => setGender(item.value)}
						/>
    </View>
    <Text style ={[styles.text_footer,{marginTop:35}]}>{translations.LANGUAGE}</Text>
    <View style = {[styles.action,{zIndex:300}]}>
   <TextInput
   placeholder= {translations.SELECT_LANGUAGE}
   style = {styles.textInput}
    autoCapitalize = "none"
  //onChangeText={(val)=> handlePasswordChange(val)}
  />
  <DropDownPicker
            items={[
              {label: translations.ENGLISH, value: 'EN'},
              {label:translations.LAO, value: 'LA'},
            ]}
            defaultValue={langu}
            containerStyle={{padding:1,height: 48,width:'100%',position:'absolute'}}
          //  style={{ backgroundColor: '#fafafa'}}
            dropDownStyle={{ backgroundColor: '#fafafa' }}
            onChangeItem={item => setLangu(item.value) }
          />
    </View>
      <Text style ={[styles.text_footer,{fontFamily:fontFamily.Bold,marginTop:35,textAlign:"center"}]}>{translations.UPLOAD_DOCUMENT}</Text>
    <View style = {{flexDirection:'row', alignItems: 'center',
        justifyContent: 'space-between',paddingHorizontal:10,marginTop:20}}>
<View style = {{width:80,height:120,flex:1,flexDirection:'row', alignItems: 'center',
    justifyContent: 'center'}}>
         <TouchableOpacity onPress = {()=>{opengallery()}} style = {{width:'90%',height:'90%',alignItems: 'center',
             justifyContent: 'center',borderWidth:1,borderColor:'#14181c',borderRadius:10}}>

        <Text style ={[styles.textSign,{color:'#14181c',textAlign:'center',fontFamily:fontFamily.Bold}]}>+</Text>
         <Text style ={[styles.textSign,{color:'#14181c',textAlign:'center',fontFamily:fontFamily.Bold}]}>{translations.IDENTITY_CARD}</Text>

         </TouchableOpacity>
</View>
<View style = {{width:80,height:120,flex:1,flexDirection:'row', alignItems: 'center',
    justifyContent: 'center',}}>
         <TouchableOpacity onPress = {()=>{opengallery()}}
         style = {{width:'90%',height:'90%',alignItems: 'center',
             justifyContent: 'center',borderWidth:1,borderColor:'#14181c',borderRadius:10}}   >
        <Text style ={[styles.textSign,{color:'#14181c',textAlign:'center',fontFamily:fontFamily.Bold}]}>+</Text>
         <Text style ={[styles.textSign,{color:'#14181c',textAlign:'center',fontFamily:fontFamily.Bold}]}>{ translations.BANK_ACCOUNT}</Text>

           </TouchableOpacity>
  </View>

     </View>

 <View style = {styles.button}>


      <TouchableOpacity onPress = {()=>registerUser(data.firstname,data.lastname,data.email,data.password,stateid,districtid,data.phonenumber)}
      style = {styles.signIn}>
      <LinearGradient
       colors = {['#357ee2','#317de8']}
         style = {styles.signIn}
         >
      <Text style ={[styles.textSign,{color:'#fff',fontFamily:fontFamily.Bold}]}>{translations.DONE_BUTTON}</Text>
      </LinearGradient>
      </TouchableOpacity>
  </View>
  <View style = {{flex:1, height:50}}>
   </View>
</ScrollView>
   </Animatable.View>
</View>
);
};

export default SignUpScreen;


const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#ffffff',

 },
 footer:{
   flex:1,
   backgroundColor:'#ffffff',
   borderTopLeftRadius:0,
   borderTopRightRadius:0,
   paddingVertical:0,
   paddingHorizontal:30
 },
 text_footer:{
   color:'black',
      fontSize:actuatedNormalize(15),
      fontFamily:fontFamily.Light
     },
action:{
  flexDirection:'row',
  marginTop:5,
  borderWidth:1,
  borderRadius:10,
  height:50


},
textInput:{
  flex:1,
  marginTop: Platform.OS== 'ios' ? 0 : -6,
  paddingLeft:15,
 paddingRight: 15,
  color:'black',
  fontFamily:fontFamily.Medium,
  fontSize:actuatedNormalize(15)
},
 title:{
   color:'#05375a',
   fontSize:actuatedNormalize(30),
   fontWeight:'bold'
 },
 text:{
   color:'grey',
   marginTop:5
 },
 button:{
   width : "100%",
   alignItems:'center',
   marginTop:50
 },
 signIn:{
   width:"100%",
   height:50,
   justifyContent:'center',
   alignItems:'center',
   borderRadius:10,

 },
 textSign:{
   fontSize:actuatedNormalize(18),
 },

 ImageContainer:{

  flex:1,
   height:120,
   justifyContent:'center',
   alignItems:'center',

 },
 logo:{
   width:100,
   height:100,
   borderRadius:50
 },
 InputIcon:{
   marginTop: 12,//Platform.OS== 'ios' ? 10 : 8,
   paddingLeft:8,
   paddingRight:8
 },
 outerContainer2txt: {
       flex: 1,
       flexDirection: 'row',

     },
       innerContainer: {
         flex: 0.5,
         flexDirection: 'row'
       },
       fieldName: {
         //flex: 1,

       },
       textInputContainer: {
         flex: 3,
       },

});
