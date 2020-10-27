
import * as React from 'react';
import { StatusBar,ScrollView, StyleSheet, Text, View,Button,Dimensions,Image ,TouchableOpacity,TextInput,Platform} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { actuatedNormalize, fontFamily } from '../config/Font';
import {Header} from '../components/header';
import { PopLoader } from '../components/Parts';
import translations, { DEFAULT_LANGUAGE } from '../api/translations';

const EditProfileScreen = ({navigation}) => {
const [data,setData] = React.useState({
  firstname: '',
  lastname: '',
  email:'',
  old_password: '',
  new_password: '',
  confirm_new_password: '',
  firstnamecheck_textInputChange:false,
  lastnamecheck_textInputChange:false,
  emailcheck_textInputChange:false,
  old_secureTextEntry: true,
  new_secureTextEntry: true,
  confirm_new_secureTextEntry: true
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
const handleOldPasswordChange = (val) =>{
  setData({
    ...data,
    old_password:val
  })
}

const  updateOldSecureTextEntry = () =>{
  setData({
    ...data,
    old_secureTextEntry: !data.old_secureTextEntry
  });
}
const handleNewPasswordChange = (val) =>{
  setData({
    ...data,
    new_password:val
  })
}

const  updateNewSecureTextEntry = () =>{
  setData({
    ...data,
    new_secureTextEntry: !data.new_secureTextEntry
  });
}
const handleConfirmNewPasswordChange = (val) =>{
  setData({
    ...data,
    confirm_new_password:val
  })
}

const  updateConfirmNewSecureTextEntry = () =>{
  setData({
    ...data,
    confirm_new_secureTextEntry: !data.confirm_new_secureTextEntry
  });
}
return(
  <View style = {styles.container}>
   <StatusBar backgroundColor = '#be14c7ß' barStyle = "light-content"/>
     <Header title="Edit Profile" onGoBack={()=>navigation.goBack() } />
 <Animatable.View animation = "fadeInUpBig" style = {styles.footer}>
  <ScrollView showsVerticalScrollIndicator={false} style ={{marginTop:0}} >
   <View style = {styles.ImageContainer}>
<Animatable.Image
animation = "bounceIn"
//  duration = "1500"
source = {require('../assets/images/logo.png')}
style = {styles.logo}
resizeMode = "cover" />
</View>
 <View style={[styles.outerContainer2txt,styles.text_footer]}>
<View style={[styles.innerContainer,styles.action]}>
<FontAwesome
 name="user-o"
  size={20}
style = {styles.InputIcon}
 color="black"
 />
         <View style={styles.textInputContainer}>
         <TextInput
         placeholder= "Name"
         style = {styles.textInput}
         autoCapitalize = "none"
         onChangeText={(val)=> firstnametextInputChange(val)}
         />
         </View>
       </View>
       <View style={[styles.innerContainer,styles.action]}>
       <FontAwesome
        name=""
         size={20}
        color="black"
        style = {styles.fieldName}/>
         <View style={styles.textInputContainer}>
         <TextInput
         placeholder= "Last name"
         style = {styles.textInput}
         autoCapitalize = "none"
         onChangeText={(val)=> lastnametextInputChange(val)}
         />
         </View>
       </View>
     </View>

   <Text style ={[styles.text_footer,{marginTop:20}]}>Email</Text>
<View style = {styles.action}>
 <TextInput
placeholder= "Email"
style = {styles.textInput}
autoCapitalize = "none"
onChangeText={(val)=> emailtextInputChange(val)}
/>
</View>
   <Text style ={[styles.text_footer,{marginTop:35}]}> Old Password</Text>
   <View style = {styles.action}>
  <TextInput
  placeholder= " Old Password"
  secureTextEntry = {data.old_secureTextEntry ? true : false}
  style = {styles.textInput}
   autoCapitalize = "none"
 onChangeText={(val)=> handleOldPasswordChange(val)}
   />
   <TouchableOpacity
   onPress = {updateOldSecureTextEntry}
   >
  <Feather
  name="eye-off"
   size={20}
   style = {styles.InputIcon}
    color="gray" />
    </TouchableOpacity>
    </View>
    <Text style ={[styles.text_footer,{marginTop:35}]}>New Password</Text>
    <View style = {styles.action}>
   <TextInput
   placeholder= "New Password"
   secureTextEntry = {data.new_secureTextEntry ? true : false}
   style = {styles.textInput}
    autoCapitalize = "none"
   onChangeText={(val)=> handleNewPasswordChange(val)}
    />
    <TouchableOpacity
    onPress = {updateNewSecureTextEntry}
    >
   <Feather
   name="eye-off"
    size={20}
    style = {styles.InputIcon}
     color="gray" />
     </TouchableOpacity>
     </View>
     <Text style ={[styles.text_footer,{marginTop:35}]}>Comfirm New Password</Text>
     <View style = {styles.action}>
    <TextInput
    placeholder= "Confirm New Password"
    secureTextEntry = {data.confirm_new_secureTextEntry ? true : false}
    style = {styles.textInput}
     autoCapitalize = "none"
   onChangeText={(val)=> handleConfirmNewPasswordChange(val)}
     />
     <TouchableOpacity
     onPress = {updateConfirmNewSecureTextEntry}
     >
    <Feather
    name="eye-off"
     size={20}
     style = {styles.InputIcon}
      color="gray" />
      </TouchableOpacity>
      </View>

 <View style = {styles.button}>


      <TouchableOpacity onPress = {()=>alert('Click')}
      style = {styles.signIn}>
      <LinearGradient
       colors = {['#317de8','#317de8']}
         style = {styles.signIn}
         >
      <Text style ={[styles.textSign,{color:'#fff',fontFamily:fontFamily.Bold}]}>Save Change</Text>
      </LinearGradient>
      </TouchableOpacity>
  </View>
</ScrollView>
   </Animatable.View>
</View>
);
};

export default EditProfileScreen;


const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white',

 },
 // header:{
 //  // flex:1,
 //   justifyContent:'center',
 //   alignItems:'center',
 //  height: Platform.OS== 'ios' ? 88 : 80,
 //  backgroundColor:'grey'
 // },
 // text_header:{
 //   color:'#fff',
 //   fontWeight:'bold',
 //   fontSize:30 },
 footer:{
   flex:1,
   backgroundColor:'#fff',
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
  marginTop:8,
  borderWidth:0.2,
  height:50


},
textInput:{
  flex:1,
  marginTop: Platform.OS== 'ios' ? 0 : -6,
  paddingLeft:10,
 paddingRight: 10,
  color:'#05375a',
  fontFamily:fontFamily.Medium,
    fontSize:actuatedNormalize(15),
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
  // borderRadius:50
 },
 InputIcon:{
   marginTop: 12,//Platform.OS== 'ios' ? 10 : 8,
   paddingLeft:4,
   paddingRight:4
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
