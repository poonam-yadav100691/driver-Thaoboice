import  React,{useContext,useEffect} from 'react';
import {  StyleSheet, Text, View ,Button,Alert,TouchableOpacity} from 'react-native';
import { Appbar } from 'react-native-paper';
import {AuthContext} from '../components/context';
import { actuatedNormalize, fontFamily } from '../config/Font';
import translations, { DEFAULT_LANGUAGE } from '../api/translations';
 import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const SignOutScreen = ({ navigation }: { navigation: DrawerNavigation }) => {
const {signOut} = React.useContext(AuthContext) ;

return(

  <View style = {styles.container}>
  <Text style = {styles.title} >{translations.LOGOUT_CONFIRM}</Text>
<View style ={styles.subcontainer}>
<View style = {{flex:1,flexDirection:'row',justifyContent:'space-around'}}>
<TouchableOpacity
 style={{ width:"40%",height:50,justifyContent:'center',alignItems:'center',borderRadius:10,backgroundColor:'#007ee9'}}
       onPress={() =>{

     navigation.navigate('DashboardScreen'),

         signOut()}}
     >
       <Text style = {{
         fontSize:actuatedNormalize(16),textAlign:'center',padding:10,color:'#FFF'}}>{translations.TITEL_OK}</Text>
     </TouchableOpacity>


 <TouchableOpacity
       style={{width:"40%",height:50,justifyContent:'center',alignItems:'center',borderRadius:10,backgroundColor:'#007ee9'}}
       onPress={()=>{
            navigation.navigate('ProfileScreen');
         }}
     >
       <Text style={{fontSize: actuatedNormalize(16),textAlign:'center',padding:10,color:'#FFF'}}>{translations.TITEL_GO_TO_PROFILE}</Text>
     </TouchableOpacity>
</View>
</View>
</View>

);


};
export default SignOutScreen;


const styles = StyleSheet.create({
  container:{
  flex:1,
    alignItems:'center',
    justifyContent:'center'
 },
 subcontainer:{
   alignItems:'center',
   marginTop:30,
   flexDirection:'row'
 },
 title:{
   fontFamily:fontFamily.Bold,
   fontSize:actuatedNormalize(20),
   textAlign :'center',
   marginTop:100
 },
 buttonContainer:{ height:50,
 width:140
}

});
