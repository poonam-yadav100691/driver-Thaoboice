import  React, { useState , useEffect,useContext} from 'react';
import {  StyleSheet, Text, View ,Button,TextInput,TouchableOpacity,Platform,ScrollView,Dimensions} from 'react-native';
import { Appbar } from 'react-native-paper';
import {Header} from '../components/header';
import { actuatedNormalize, fontFamily} from '../config/Font';
import LinearGradient from 'react-native-linear-gradient';
import {AuthContext} from '../components/context';
import { JSHash, JSHmac, CONSTANTS } from "react-native-hash";
import AsyncStorage from '@react-native-community/async-storage';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { CarryBox, LoadingBox, ButtonGroup, StatusBarHeight } from '../components/Parts';
import Toast from 'react-native-simple-toast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { PopLoader } from '../components/Parts';
import translations, { DEFAULT_LANGUAGE } from '../api/translations';

const initialLayout = { width: Dimensions.get('window').width };

const AddDriverScreen = ({ navigation }) => {
  const [isLoading, setLoading] = React.useState(false);
  const [arr,setArr] = React.useState([])

useEffect(()=>{
getCarryBoyList()
  },[]);

const getCarryBoyList = async() =>{
  let deviceToken;
  deviceToken = null;
  let  userid = ''
  try {
    deviceToken =  await AsyncStorage.getItem('deviceToken');
    let  userres =  await AsyncStorage.getItem('USER');
    const obj = JSON.parse(userres);
    console.log("== dashboard" + JSON.stringify(obj.user_id))
      userid =  obj.user_id
      console.log(userid);
  } catch(e){
    console.log(e);
  }

    const params = '{"user_id":"'+userid+'","frm_mode":"getCarryBoyList","uuid":"'+deviceToken+'","LANGCODE":"EN"}'
  console.log("param ==dash ==" + params)
  setLoading(true)
JSHmac(params, "501ee1944b81bb7018c7d10316854971", CONSTANTS.HmacAlgorithms.HmacSHA256)
  .then(hash =>
    {
      console.log('--------------------------------------');
        console.log(hash);
        fetch('http://thaobo.com/ser_shop/getCarryBoyList', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
            , "doicex-signature": hash
          },
          body: params
        }).then(res => res.json())
        .then(res => {
           setLoading(false)
           setArr(res.results)
	console.log('-------------------------------------');
     })
        .catch(() => setState({ hasErrors: true }))
        .finally(function() { setLoading(false)});

    } )
  .catch(e => console.log(e));
  }


  const AllRoute = (props) => {

      return(
          <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingVertical: 20 }} >

              {
                arr.map((o,i)=>{
                      return(
                       <CarryBox addWish={addWish} deleteWish={deleteWish} addCarryBoy={addCarryBoy}  data={o}/>
                            )
                   })

              }
          </ScrollView>
      )
  };

  const FavouriteRoute = (props) => (


      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingVertical: 20 }} >

          {


arr.filter((item) => item.favflag == '1').map((o,i)=>{
            console.log('=============='+ JSON.stringify(o));


                               return(
                         <CarryBox addWish={addWish} deleteWish={deleteWish} addCarryBoy={addCarryBoy} data={o}/>
                               )
                           })

          }
      </ScrollView>
  );

  const TabViewExample = (props) => {
      //console.log(props)
  	//	console.log('------------props2'+JSON.stringify(props));
      const [index, setIndex] = React.useState(0);
      const [routes] = React.useState([
          { key: 'Favourite', title: translations.FAVOURITETAB },
          { key: 'All', title: translations.ALLTAB  },
      ]);
  		const renderScene = SceneMap({
  		        Favourite: FavouriteRoute,
                All: AllRoute,
  		    });

      return (
          <TabView
              renderTabBar={props => (
                      <TabBar {...props}
                          activeColor={'#340000'}
                          inactiveColor={'grey'}
                          style={{backgroundColor:'#FFF'}}
                          indicatorStyle={{ backgroundColor: '#037FEA', marginLeft: 50, width: 110, height:5 }}
                      />
                  )
              }
               //{...props}
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={setIndex}
              initialLayout={initialLayout}
          />
      );
  }





const  addCarryBoy = async (carryboy_id) => {


    let deviceToken;
    deviceToken = null;
    let  userid = ''
    try {
      deviceToken =  await AsyncStorage.getItem('deviceToken');
      let  userres =  await AsyncStorage.getItem('USER');
      const obj = JSON.parse(userres);
      console.log("== dashboard" + JSON.stringify(obj.user_id))
        userid =  obj.user_id
        console.log(userid);
    } catch(e){
      console.log(e);
    }
    const params = '{"frm_mode": "addCarryboy", "carryboy_id": "' + carryboy_id + '", "user_id": "' + userid +'", "uuid": "'+ deviceToken+'","LANGCODE": "EN"}'

      console.log("param ==dash ==" + params)
    setLoading(true)

  JSHmac(params, "501ee1944b81bb7018c7d10316854971", CONSTANTS.HmacAlgorithms.HmacSHA256)
    .then(hash =>
      {
        console.log('--------------------------------------');
          console.log(hash);
          fetch('http://thaobo.com/ser_shop/addCarryboy', {
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
               getCarryBoyList();
               Toast.show(res.errorMessage);
              //  setLoading(false)
             }
        })
          .catch(() => setState({ hasErrors: true }))
          .finally(function() { setLoading(false)});

      } )
    .catch(e => console.log(e));
  }


  const  addWish = async (carryboy_id) => {

      let deviceToken;
      deviceToken = null;
      let  userid = ''
      try {
        deviceToken =  await AsyncStorage.getItem('deviceToken');
        let  userres =  await AsyncStorage.getItem('USER');
        const obj = JSON.parse(userres);
        console.log("== dashboard" + JSON.stringify(obj.user_id))
          userid =  obj.user_id
          console.log(userid);
      } catch(e){
        console.log(e);
      }

      const params = '{"frm_mode": "addCarryboyFavList", "carryboy_id": "' + carryboy_id + '", "user_id": "' + userid +'", "uuid": "'+ deviceToken+'","LANGCODE": "EN"}'

        console.log("param ==dash ==" + params)
    setLoading(true)
    //  var paramjs = JSON.stringify(params);
    JSHmac(params, "501ee1944b81bb7018c7d10316854971", CONSTANTS.HmacAlgorithms.HmacSHA256)
      .then(hash =>
        {
          console.log('--------------------------------------');
            console.log(hash);
            fetch('http://thaobo.com/ser_shop/addCarryboyFavList', {
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
                 getCarryBoyList();
                 Toast.show(res.errorMessage);
                  //  setLoading(false)
               }
         })
            .catch(() => setState({ hasErrors: true }))
            .finally(function() { setLoading(false)});

        } )
      .catch(e => console.log(e));
    }

  const  deleteWish = async (carryboy_id) => {


      let deviceToken;
      deviceToken = null;
      let  userid = ''
      try {
        deviceToken =  await AsyncStorage.getItem('deviceToken');
        let  userres =  await AsyncStorage.getItem('USER');
        const obj = JSON.parse(userres);
        console.log("== dashboard" + JSON.stringify(obj.user_id))
          userid =  obj.user_id
          console.log(userid);
      } catch(e){
        console.log(e);
      }
      const params = '{"frm_mode": "deleteCarryboyFavList", "carryboy_id": "' + carryboy_id + '", "user_id": "' + userid + '", "uuid": "'+ deviceToken+'","LANGCODE": "EN"}'

        console.log("param ==dash ==" + params)
      setLoading(true)
    //  var paramjs = JSON.stringify(params);
    JSHmac(params, "501ee1944b81bb7018c7d10316854971", CONSTANTS.HmacAlgorithms.HmacSHA256)
      .then(hash =>
        {
          console.log('--------------------------------------');
            console.log(hash);
            fetch('http://thaobo.com/ser_shop/deleteCarryboyFavList', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
                , "doicex-signature": hash
              },
              body: params
            }).then(res => res.json())
            .then(res => {
               //setLoading(false)
               if (res.status) {
                 getCarryBoyList();
                 Toast.show(res.errorMessage);
               }
         })
            .catch(() => setState({ hasErrors: true }))
            .finally(function() { setLoading(false)});

        } )
      .catch(e => console.log(e));
    }


return(

  <View style = {styles.container}>
  <>
    <Header title={translations.CARRY_BOY} onGoBack={navigation.goBack} />
  </>

		<TabViewExample data = {arr}  />
 <PopLoader loading={isLoading} />
 </View>

);
};
export default AddDriverScreen;


const styles = StyleSheet.create({
  container:{
    flex:1,

 },
 subcontainer:{
   flex:1,

   },
 footer:{
   flex:4,
   backgroundColor:'#fff',
   borderTopLeftRadius:3,
   borderTopRightRadius:0,
   paddingVertical:30,
   paddingHorizontal:30
 },
 text_footer:{
   color:'#05375a',
      fontSize:actuatedNormalize(14),
			textAlign:'left'

     },
action:{
  flexDirection:'row',
  marginTop:2,
  borderWidth:0.2,
  height:44

},
textInput:{
  flex:1,
  marginTop:Platform.OS== 'ios' ? 0 : -10,
  paddingLeft:10,
 paddingRight: 10,
  color:'#05375a',
  fontFamily:fontFamily.Medium,
	fontSize:actuatedNormalize(15)
},

 text:{
   color:'grey',
   marginTop:5,
   fontFamily:fontFamily.Medium
 },
 button:{
   width : "100%",
   alignItems:'center',
   marginBottom:50
 },
 add:{
   width:"90%",
   height:50,
   justifyContent:'center',
   alignItems:'center',
   borderRadius:10,

 },
 textadd:{
   fontSize:actuatedNormalize(18),
   fontWeight:'bold'
 },
});
