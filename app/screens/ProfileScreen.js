import  React , {useEffect,useState,useContext} from 'react';
import {  StyleSheet, Text, View ,Button,Image,ScrollView,TouchableOpacity,Platform} from 'react-native';
import { Card} from "react-native-elements";
import { actuatedNormalize, fontFamily } from '../config/Font';
import { imageSource } from '../config/Image';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import AddDriverScreen from './AddDriverScreen';
import { MaterialIcons } from '@expo/vector-icons';
import { JSHash, JSHmac, CONSTANTS } from "react-native-hash";
 import AsyncStorage from '@react-native-community/async-storage';
 import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
 import Modal from 'react-native-modal';
 import Toast from 'react-native-simple-toast';
 import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
 import {
  useIsFocused,
} from '@react-navigation/native';
import { PopLoader,MyAppText,RadioBox } from '../components/Parts';
import {LocalizationContext} from '../api/LocalizationContext';
import translations, { DEFAULT_LANGUAGE } from '../api/translations';

const ProfileScreen = ({ navigation }) => {
  const {setAppLanguage} = useContext(
    LocalizationContext,
  );
  const [isLoading, setLoading] = useState(false);
  const [hasError, setErrors] = useState(false);
  const [carryBoy, setCarryBoy] = React.useState([]);
const [visiblePopUp, setVisiblePopUp] = useState(false);
const [language,setDefaultLanguage] = React.useState('EN');
  const [userdata, setUserData] = useState({
userid : '',
first_name : '',
last_name:'',
mobile:'',
image:''

  });

   const [state, setState] =  React.useState({
cod: '',
credit:'',
pending_order:'',
completed:'',
rejected:'',
//carryBoy:[],
   });

  useEffect(()=>{
const unsubscribe = navigation.addListener('focus', () => {


  getUserData()
  getDriverProfile()
    getData()
    });
    return unsubscribe;
    },[]);

const getUserData = async()=>{

  try {

    let  userres =  await AsyncStorage.getItem('USER');
    const obj = JSON.parse(userres);

setUserData({ userId:obj.user_id,first_name:obj.user_fname, last_name:obj.user_lname,image:obj.user_photo,mobile:obj.mobile,driverQr:obj.qr_code})
  console.log("--------------------------------");
      console.log(JSON.stringify(obj));
  } catch(e){
    console.log(e);
  }

}


    const getDriverProfile = async() =>{
      let deviceToken;
      deviceToken = null;
      let  userid = ''
      try {
        deviceToken =  await AsyncStorage.getItem('deviceToken');
        let  userres =  await AsyncStorage.getItem('USER');
        const obj = JSON.parse(userres);
            userid =  obj.user_id
        } catch(e){
        console.log(e);
      }

    		const params = '{"user_id":"'+userid+'","frm_mode":"driverDashboard","uuid":"'+deviceToken+'","LANGCODE":"EN"}'
    	console.log("param == " + params)
    //  var paramjs = JSON.stringify(params);
setLoading(true)
    JSHmac(params, "501ee1944b81bb7018c7d10316854971", CONSTANTS.HmacAlgorithms.HmacSHA256)
      .then(hash =>
        {
          console.log('--------------------------------------');
            console.log(hash);
            fetch('http://thaobo.com/ser_shop/driverDashboard', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
                , "doicex-signature": hash
              },
              body: params
            }).then(res => res.json())
              .then(res => {
                console.log('fromserver '+ JSON.stringify(res));
               setState({ cod:res.results.cod,credit:res.results.credit, pending_order:res.results.pending_order,completed:res.results.completed,rejected:res.results.rejected})
                setCarryBoy(res.results.carryBoy)
            }
           )
            .catch(() => setState({ hasErrors: true }))
            .finally(function() { setLoading(false) });
        } )
      .catch(e => console.log(e));
    	}

      const  deleteCarryBoy = async (carryboy_id) => {

          let deviceToken;
          deviceToken = null;
          let  userid = ''
          try {
            deviceToken =  await AsyncStorage.getItem('deviceToken');
            let  userres =  await AsyncStorage.getItem('USER');
            const obj = JSON.parse(userres);
                userid =  obj.user_id
            } catch(e){
            console.log(e);
          }

            const params = '{"frm_mode": "deleteCarryboy", "carryboy_id": "' + carryboy_id + '", "user_id": "' + userid + '", "uuid": "'+ deviceToken +'","LANGCODE": "EN"}'

          console.log("param == " + params)
        //  var paramjs = JSON.stringify(params);
      //  setLoading(true)
        JSHmac(params, "501ee1944b81bb7018c7d10316854971", CONSTANTS.HmacAlgorithms.HmacSHA256)
          .then(hash =>
            {
              console.log('--------------------------------------');
                console.log(hash);
                fetch('http://thaobo.com/ser_shop/deleteCarryboy', {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                    , "doicex-signature": hash
                  },
                  body: params
                }).then(res => res.json())
                  .then(res => {
                    if (res.status) {
                      getDriverProfile();
                      Toast.show(res.errorMessage);
                    }

                }
               )
                .catch(() => setState({ hasErrors: true }))
                .finally(function() { setLoading(false) });
            } )
          .catch(e => console.log(e));


        }

        const callApiForLanguage = async(lang) =>{
                 let deviceToken;
                 deviceToken = null;
                 let  userid = ''
                 try {
                   deviceToken =  await AsyncStorage.getItem('deviceToken');
                   let  userres =  await AsyncStorage.getItem('USER');
                   const obj = JSON.parse(userres);
                       userid =  obj.user_id
                   } catch(e){
                   console.log(e);
                 }
                 deviceToken ='12345'
                 const params = '{"frm_mode":"setUserLanguage","user_language":"'+lang+'","user_id":"'+userid+'","uuid":"'+deviceToken+'","LANGCODE":"'+"EN"+'"}'
                      console.log("param == " + params)

              setLoading(true)
               JSHmac(params, "501ee1944b81bb7018c7d10316854971", CONSTANTS.HmacAlgorithms.HmacSHA256)
                 .then(hash =>
                   {
                     console.log('--------------------------------------');
                       console.log(hash);
                       fetch('http://thaobo.com/ser_login_registration/setUserLanguage', {
                         method: 'POST',
                         headers: {
                           Accept: 'application/json',
                           'Content-Type': 'application/json'
                           , "doicex-signature": hash
                         },
                         body: params
                       }).then(res => res.json())
                         .then(res => {

                           if(res.status){
                           setLanguageRes(value)
                               Toast.show(res.errorMessage, Toast.LONG)
                           }
                           else{
                               setState({ language: 'EN'})
                           }
                       }
                      )
                       .catch(() => setState({ hasErrors: true }))
                       .finally(function() { setLoading(false) });
                   } )
                 .catch(e => console.log(e));
                }
       const getfullname = (fname,mname,lname) => {
         return fname + " "+mname +" "+lname;
       }
       const setLanguageRes = async(value) => {
             await  AsyncStorage.setItem('LANG', value);
          // console.log('language res +'+JSON.stringify(value));
        handleSetLanguage(value.toLowerCase())
          }
       const getData = async() => {
              const lang =  await AsyncStorage.getItem('LANG');
              console.log("================="+lang);
              //setState({language: lang })
              setLanguage(lang)
          }
       const  setLanguage = async(value) => {
            setDefaultLanguage(value)
             // callApiForLanguage(value)
            setLanguageRes(value)
          }

       const  handleSetLanguage = async(language) => {
            console.log('language res +'+JSON.stringify(language));
               setAppLanguage(language);
              }



return(


  <View style = {styles.container}>
<ScrollView bounces = {false}>

  <View style = {styles.subcontainer1}>
  <View style = {{flex:3,flexDirection:'row'}}>
  <View style = {{flex:1,flexDirection:'row'}}>
  <TouchableOpacity onPress = {()=>{
    //navigation.navigate('EditProfileScreen')
  }}  style = {{flex:1,alignItems:'center',justifyContent:'center',margin:10}}>

  <Image source={(userdata.image != "") ? {uri: userdata.image} : imageSource.image_avtar} style={{ width:90, height:90,padding:5,borderRadius:45}}  />

  </TouchableOpacity>
  <View style = {{flex:2,justifyContent:'center'}}>
  <Text style = {{padding:5,fontFamily:fontFamily.Light,fontSize:actuatedNormalize(18)}}>{userdata.first_name} {userdata.last_name}</Text>
  <Text style = {{padding:5,fontFamily:fontFamily.Light,fontSize:actuatedNormalize(16)}}>{userdata.mobile}</Text>
  </View>
  </View>
  <View style = {{flex:0.4,alignItems:'flex-end',marginTop:30,marginRight:10}}>
  <TouchableOpacity onPress = {()=>navigation.navigate('QrCodeGeneratorScreen',{data:userdata})}>
   <Image source={imageSource.ico_scan} style={{ width:35, height:35,alignItems:'flex-end'}}  />
   </TouchableOpacity>
   <View style={{ width: 40, height: 40 ,padding:1,marginTop:10}} >
<MaterialIcons name="language" size={40} color="#75d2fb"  onPress = {()=>setVisiblePopUp(true)} />
  </View>

  </View>
 </View>
 </View>
<Text style = {{fontFamily:fontFamily.Light,fontSize:actuatedNormalize(16),textAlign:'center',fontWeight:'500',color:'grey',paddingVertical:10}}>{translations.ORDER_AMOUNT}</Text>
<View style = {{flex:1,alignItems:'stretch',backgroundColor:'lightgrey',height:2}}></View>

  <View style = {{flex:1,flexDirection:'row',alignItems:'center',marginTop:10}}>
  <View style = {{flex:1,flexDirection:'row'}}>
  <View style = {{flex:1,alignItems:'center',justifyContent:'center',margin:10,flexDirection:'row'}}>
 <View style = {{alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
 <Image source={imageSource.icon_dollar} style={{width: wp('5%'), height: hp('2.5%'),alignItems:'flex-end', resizeMode:'contain'}} />
 <Text style = {{fontFamily:fontFamily.Bold,fontSize:actuatedNormalize(16),paddingLeft:8}}>{translations.COD}</Text>
</View>
</View>
</View>

  <View style = {{flex:1,alignItems:'center'}}>
  <View style = {{flex:1,alignItems:'flex-start',justifyContent:'center',margin:10,flexDirection:'row'}}>
<View style = {{alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
<Image source={imageSource.icon_credit} style={{width: wp('5%'), height: hp('2.5%'),alignItems:'flex-end', resizeMode:'contain'}} />
<Text style = {{fontFamily:fontFamily.Bold,fontSize:actuatedNormalize(16),paddingLeft:8}}>{translations.CREDIT} </Text>
</View>
  </View>
  </View>
  </View>

  <View style = {{flex:1,flexDirection:'row',alignItems:'center',marginBottom:10}}>
  <View style = {{flex:1,flexDirection:'row'}}>
  <View style = {{flex:1,alignItems:'center',justifyContent:'center',margin:5,flexDirection:'row'}}>
  <View style = {{flex:1,alignItems:'center',justifyContent:'center'}}>
  <Text style = {{textAlign:'center',fontFamily:fontFamily.Bold,fontSize:actuatedNormalize(16)}}>{state.cod}</Text>
  </View>
  </View>
  </View>

  <View style = {{flex:1,alignItems:'flex-start'}}>
  <View style = {{flex:1,alignItems:'flex-start',justifyContent:'center',margin:5,flexDirection:'row'}}>
  <View style = {{flex:1,alignItems:'center',justifyContent:'center'}}>
  <Text style = {{textAlign:'center',fontFamily:fontFamily.Bold,fontSize:actuatedNormalize(16)}}> {state.credit}</Text>
  </View>
  </View>
  </View>
  </View>

    <View style = {{flex:1,alignItems:'stretch',backgroundColor:'lightgrey',height:2}}></View>


  <View style = {styles.subcontainer2}>

  <View style = {{flex:1,flexDirection:'row',alignItems:'center',marginTop:5}}>
  <View style = {{flex:1,flexDirection:'row'}}>
  <View style = {{flex:1,alignItems:'center',justifyContent:'center',margin:10,flexDirection:'row'}}>
  <View style = {{alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
  <Image source={imageSource.ico_orderList} style={{width: wp('5%'), height: hp('3%'),alignItems:'flex-end', resizeMode:'contain',tintColor:'#fe6a3f'}} />
  <Text style = {{fontFamily:fontFamily.Bold,fontSize:actuatedNormalize(16),color:'#fe6a3f',paddingLeft:8}}>{translations.PENDING}</Text>
  </View>
  </View>
  </View>
 <View style = {{flex:1,alignItems:'center'}}>
  <View style = {{flex:1,alignItems:'flex-start',justifyContent:'center',margin:10,flexDirection:'row'}}>
  <View style = {{alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
  <Image source={imageSource.icon_received} style={{width: wp('5%'), height: hp('3%'),alignItems:'flex-end', resizeMode:'contain',tintColor:'#75d2fb'}}  />
 <Text  style = {{fontFamily:fontFamily.Bold,fontSize:actuatedNormalize(16),textAlign:'left',color:'#75d2fb',paddingLeft:8}}>{translations.RECEIVED} </Text>
  </View>
  </View>
  </View>
  </View>

  <View style = {{flex:1,flexDirection:'row',alignItems:'center',marginBottom:8}}>
  <View style = {{flex:1,flexDirection:'row'}}>
  <View style = {{flex:1,alignItems:'center',justifyContent:'center',margin:5,flexDirection:'row'}}>
  <View style = {{flex:1,alignItems:'center',justifyContent:'center'}}>
  <Text style = {{textAlign:'center',fontFamily:fontFamily.Bold,fontSize:actuatedNormalize(20)}}>{state.pending_order}</Text>
  </View>
  </View>
  </View>

  <View style = {{flex:1,alignItems:'flex-start'}}>
  <View style = {{flex:1,alignItems:'flex-start',justifyContent:'center',margin:5,flexDirection:'row'}}>
  <View style = {{flex:1,alignItems:'center',justifyContent:'center'}}>
  <Text style = {{textAlign:'center',fontFamily:fontFamily.Bold,fontSize:actuatedNormalize(20)}}>{state.completed}</Text>
  </View>
  </View>
  </View>
  </View>



    <View style = {{flex:1,flexDirection:'row',alignItems:'center',marginBottom:8}}>
    <View style = {{flex:1,flexDirection:'row'}}>
    <View style = {{flex:1,alignItems:'center',justifyContent:'center',margin:5,flexDirection:'row'}}>
    <View style = {{alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
    <Image source={imageSource.icon_record} style={{width: wp('5%'), height: hp('3%'),alignItems:'flex-end', resizeMode:'contain',tintColor:'#fe6a3f'}}  />

    <Text style = {{fontFamily:fontFamily.Bold,fontSize:actuatedNormalize(16),color:'#fe6a3f',paddingLeft:8}}>{translations.RECORD}</Text>
   </View>
    </View>
    </View>
    </View>
    <View style = {{flex:1,flexDirection:'row',alignItems:'center'}}>
    <View style = {{flex:1,flexDirection:'row'}}>
    <View style = {{flex:1,alignItems:'center',justifyContent:'center',margin:5,flexDirection:'row'}}>
    <View style = {{flex:1,alignItems:'center',justifyContent:'center'}}>
    <Text style = {{textAlign:'center',fontFamily:fontFamily.Bold,fontSize:actuatedNormalize(20)}}>{state.rejected}</Text>
    </View>
    </View>
    </View>
    </View>



</View>
<View style = {{flex:1,alignItems:'stretch',backgroundColor:'lightgrey',height:2}}></View>

<View style = {styles.subcontainer3}>
<View style = {{flex:1,flexDirection:'row',justifyContent:'space-between',marginTop:10 }}>
<Text style = {{flex:4,fontFamily:fontFamily.Bold,fontSize:actuatedNormalize(18),paddingTop:4,paddingLeft:10}}>{translations.CARRY_BOY} </Text>
<Text style = {{flex:1,fontFamily:fontFamily.Bold,fontSize:actuatedNormalize(18),color:'red',paddingTop:10}}></Text>
<TouchableOpacity style={{flex:0.5}} onPress = {()=>navigation.navigate('AddDriverScreen')} >
    <Image source={imageSource.ico_plus_bg} style={{ resizeMode: "contain", width: wp('14%'), height: wp('14%') ,alignSelf:'flex-end'}} />
</TouchableOpacity>
</View>
  <ScrollView>
<View style = {{flex:2,alignItems:'flex-start',paddingLeft:10,marginTop:10}}>

{


  carryBoy.map((o,i)=>{
        return(

          <View style = {{flex:1,alignItems:'stretch',justifyContent:'space-between',flexDirection:'row',padding:3}}>

          <Text style = {{flex:4,padding:2,fontFamily:fontFamily.Bold,fontSize:actuatedNormalize(15),color:'red'}}>{i+1}. {o.first_name} {o.last_name}</Text>
          <TouchableOpacity style= {{flex:0.4}} onPress={() => {deleteCarryBoy(o.carryboy_id) } } >
              <Image source={imageSource.icon_cross} style={{ resizeMode: "contain", width: wp('4%'), height: wp('4%') }} />
          </TouchableOpacity>

          </View>

        )
     })

}

</View>
</ScrollView>
</View>
</ScrollView>
<Modal
                  style={{flex:1,backgroundColor: 'transparent',margin: 0, alignItems: undefined,justifyContent: undefined}}
                 // animationType="slide"
                 // transparent={true}
                  isVisible={visiblePopUp}
                  hasBackdrop={false}

                  swipeDirection={'down'}
                  onBackButtonPress={()=>setVisiblePopUp(false)}
                  onBackdropPress={()=>setVisiblePopUp(false)}
                  propagateSwipe={true}
                  onSwipeComplete={()=>setVisiblePopUp(false)}

              >
                  <KeyboardAwareScrollView style={{flex:1}} contentContainerStyle={{ flex:1, justifyContent:'flex-end', backgroundColor: 'rgba(0,0,0,0.5)'  }}>
                      <View style={{  backgroundColor:'#FFF', borderWidth: 0.3, borderColor:'#EAEAEA', borderTopLeftRadius: 25, borderTopRightRadius: 25,padding:20,paddingVertical:10, paddingBottom: (Platform.OS=='android' ? 10 : 40) }}>
                      <MyAppText style={{color: '#000000', fontSize: 16}}>{translations.LANGUAGE_CHANGE}</MyAppText>
                   <View style={{marginVertical:10}}>
                       <TouchableOpacity onPress={()=>setLanguage('EN')} style={{flexDirection:'row', alignItems:'center', marginVertical: 10}}>
                           <View style={{flex:1, alignItems:'center', flexDirection:'row'}}>
                               <Image source={imageSource.ico_language_english_flag} style={{ width: 20, height:20, marginRight: 10 }}/>
                               <MyAppText style={{color: (language=='EN') ? '#2574FF' : '#5D6169', fontSize: 18}}>{translations.ENGLISH}</MyAppText>
                           </View>
                           <RadioBox active={(language=='EN') ? 1 : 0} />
                       </TouchableOpacity>
                       <TouchableOpacity onPress={()=>setLanguage('LA')} style={{flexDirection:'row', alignItems:'center', marginVertical: 10}}>
                           <View style={{flex:1, alignItems:'center', flexDirection:'row'}}>
                               <Image source={imageSource.ico_language_lao_flag} style={{ width: 20, height:20, marginRight: 10 }}/>
                               <MyAppText style={{color: (language=='LA') ? '#2574FF' : '#5D6169', fontSize: 18}}>{translations.LAO}</MyAppText>
                           </View>
                           <RadioBox active={(language=='LA') ? 1 : 0} />
                       </TouchableOpacity>
                   </View>

                      </View>
                  </KeyboardAwareScrollView>
              </Modal>

<PopLoader loading={isLoading} />
</View>


);

};
ProfileScreen.contextType = LocalizationContext;
export default ProfileScreen;


const styles = StyleSheet.create({
  container:{
    flex:1,
  backgroundColor:'#FFFFFF'
//  alignItems:'center',
  //justifyContent:'center',
//  height:200
 },
 subcontainer1:{
   flex:2,
//  backgroundColor:'blue',
  justifyContent:'center',
    alignItems:'center',
backgroundColor:'#FFFFFF' ,
 marginTop:Platform.OS == 'ios' ? 38 : 14,
padding:1
 },
 subcontainer2:{
   flex:1.5,
     alignItems:'center',
    justifyContent:'center',
  //backgroundColor:'red'
 },
 subcontainer3:{
   flex:2,
    // alignItems:'center',
  //  justifyContent:'center',
    //  backgroundColor:'green'

 },
});
