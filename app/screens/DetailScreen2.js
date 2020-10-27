
import  React, { useState , useEffect} from 'react';
import {  StyleSheet, Text, View ,Button,TextInput,TouchableOpacity,ScrollView,FlatList,Image,Linking,ActivityIndicator} from 'react-native';
import { Appbar } from 'react-native-paper';
import { OrderBox,  LoadingBox, ButtonGroup, StatusBarHeight } from '../components/Parts';
import {Header2} from '../components/header';
import {Header} from '../components/header';
import { imageSource } from '../config/Image';
import { actuatedNormalize, fontFamily} from '../config/Font';
import LinearGradient from 'react-native-linear-gradient';
import {AuthContext} from '../components/context';
import MapView, {PROVIDER_GOOGLE,Marker } from "react-native-maps"
import { JSHash, JSHmac, CONSTANTS } from "react-native-hash";
 import AsyncStorage from '@react-native-community/async-storage';
 import Modal from 'react-native-modal';
 import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { MaterialCommunityIcons,AntDesign,Entypo,FontAwesome,Feather } from '@expo/vector-icons';
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'
import { PopLoader } from '../components/Parts';
import Toast from 'react-native-simple-toast';
import { Card} from "react-native-elements";
import getDirections from 'react-native-google-maps-directions'
import translations, { DEFAULT_LANGUAGE } from '../api/translations';
import IconBadge from 'react-native-icon-badge';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
const DetailScreen2 = ({route, navigation }) => {
  const [isLoading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [orderQr, setorderQr] = useState(false);
  const [state, setState] = useState([]);
  const [currentlatlong,setCurrentlatlong] = React.useState({
    latitude:0,
    longitude:0
  })
const [distanceVal, setdistance] = useState(0);
  const [data, setData] = useState({
    reasonTxt:'',
    reasonTxtInputChange:false
  }
  );
  const reasonTxtInputChange = (val) => {
    if (val.length != 0){
  setData({
  ...data,
  reasonTxt:val,
  reasonTxtInputChange:true
  });
  }else{
    setData({
      ...data,
      reasonTxt:val,
      reasonTxtInputChange:true
    });
  }
  }


  const { items } = route.params;

  const cancelJobAPI = async(orderId,reason) =>{
      console.log("orderId-------- " + orderId)
        console.log("reason-------- " + reason)
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


  const params = '{"user_id":"'+userid+'","order_id":"'+orderId+'","reason":"'+reason+'","frm_mode":"driverCancelOrderJob","uuid":"'+deviceToken+'","LANGCODE":"EN"}'
    console.log("param ==dash ==" + params)
  //  var paramjs = JSON.stringify(params);
  setLoading(true)
  JSHmac(params, "501ee1944b81bb7018c7d10316854971", CONSTANTS.HmacAlgorithms.HmacSHA256)
    .then(hash =>
      {
        console.log('--------------------------------------');
          console.log(hash);
          fetch('http://thaobo.com/ser_shop/driverCancelOrderJob', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
              , "doicex-signature": hash
            },
            body: params
          }).then(res => res.json())
            .then(res =>  {
              console.log(JSON.stringify(res));
          setLoading(false)
          navigation.goBack()

            }


          )
          .catch(() => setState({ hasErrors: true }))
          .finally(function() { setLoading(false) });
      } )
    .catch(e => console.log(e));
    }



const canceljob =(oid)=>{
setVisible(true)
}

const closePop = () => {
      setVisible(false)
    }


  const  submitContent = async (oid) => {
         const postdata = data.reasonTxt

         if(postdata==''){
             Toast.show('Please write the reason to cancel.', Toast.LONG);
             return false;
         }
          console.log('----------------'+postdata+'reason----'+oid);
           setVisible(false)

      cancelJobAPI(oid,postdata)

     }





const  dialCall = (number) => {
      let phoneNumber = '';
      if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
      else {phoneNumber = `telprompt:${number}`; }
      Linking.openURL(phoneNumber);
   };

const completeJobBtnPressed = (items)=>{
  console.log('job btn');
  //navigation.navigate('QrCodeGeneratorScreen',{data:items})
  setorderQr(true)
}

Array.prototype.sum = function (prop) {
  var total = 0.0
  for ( var i = 0, _len = this.length; i < _len; i++ ) {
      total += parseFloat(this[i][prop])
  }
  return total
}


const handleGetDirections = (lat,lng) => {
  console.log('=====lat===='+lat);
    console.log('=====long===='+lng);
    const data = {
       source: {
        latitude: currentlatlong.latitude,
        longitude:currentlatlong.longitude
      },
      destination: {
        latitude: lat,
        longitude:lng
            },
      params: [
        {
          key: "travelmode",
          value: "driving"        // may be "walking", "bicycling" or "transit" as well
        },
        {
          key: "dir_action",
          value: "navigate"       // this instantly initializes navigation using the given travel mode
        }
      ]
    }

        getDirections(data)
      }


      useEffect(() => {
         const interval = setInterval(() => {
          getDistace()
        }, 2000);

         return () => {
           clearInterval(interval);
         };
       }, []);





      function distance(lat1, lon1, lat2, lon2, unit) {

      	if ((lat1 == lat2) && (lon1 == lon2)) {
      		return 0;
      	}
      	else {
      		var radlat1 = Math.PI * lat1/180;
      		var radlat2 = Math.PI * lat2/180;
      		var theta = lon1-lon2;
      		var radtheta = Math.PI * theta/180;
      		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      		if (dist > 1) {
      			dist = 1;
      		}
      		dist = Math.acos(dist);
      		dist = dist * 180/Math.PI;
      		dist = dist * 60 * 1.1515;
      		if (unit=="K") { dist = dist * 1.609344 }
      		if (unit=="N") { dist = dist * 0.8684 }
      		return dist;
      	}
      }


const getDistace = async () => {
  const locationObj =  await AsyncStorage.getItem('CURRENTLOCATION');
    const obj = JSON.parse(locationObj);

    console.log('-------latlong-----'+obj.latitude+'-----'+obj.longitude+'------'+items.shipping_latitude+'-----'+items.shipping_longitude);
  const distanceVal =  distance(obj.latitude,obj.longitude,Number(items.shipping_latitude),Number(items.shipping_longitude),'K')
  console.log('-------latlong-----');
  console.log(distanceVal);
  setCurrentlatlong({latitude:obj.latitude,longitude:obj.longitude})
setdistance(distanceVal)
}

return(
  <View style = {styles.container}>
  <>

{
(items.order_satus_code == "4") ?
<Header title= {translations.ORDER_NO+": #"+items.invoice_no} onGoBack={navigation.goBack}  />
:
  <Header2 title= {translations.ORDER_NO+": #"+items.invoice_no} onGoBack={navigation.goBack}  onCancelJob={()=>{canceljob(items.order_id)}}/>

}


  </>
<View style ={styles.subcontainer}>
<ScrollView>
<View style={{flex:0.75,flexDirection:'row'}}>
<View style={{justifyContent:'center',paddingLeft:20,flex:1}}>
<Text style= {{fontFamily:fontFamily.Medium,fontSize:actuatedNormalize(13),paddingVertical:3}}>{translations.CLIENT}</Text>
<Text style= {{fontFamily:fontFamily.Medium,fontSize:actuatedNormalize(16)}}>{items.shipping_firstname} {items.shipping_lastname}</Text>
</View>
<View style={{alignItems:'flex-end',flex:1,justifyContent:'center',paddingRight:12}}>


<TouchableOpacity onPress = {()=>{dialCall(items.telephone)}}>
  <Image source={imageSource.ico_phone} style={{width: wp('8%'), height: wp('8%'),alignItems:'flex-end', resizeMode:'contain'}} />
  </TouchableOpacity>

</View>
</View>
<View style={{flex:3}}>
  <Text style={[styles.text_footer_val_1,{paddingLeft:20}]}>
  {translations.PICKUP_LOCATION}
  </Text>
<View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'flex-start'}}>
   <View style = {{marginTop:8,paddingLeft:15}} >
  <Image source={imageSource.icon_placeholder} style={{width: wp('5%'), height: wp('5%'), resizeMode:'contain'}} />
   </View>
   <View style = {{flex:4}} >

   <Text style = {{textAlign:'left',margin:7,fontSize:actuatedNormalize(12),fontFamily:fontFamily.Light,flexShrink: 1}} numberOfLines = {5} adjustsFontSizeToFit> {items.shipping_address_1} {items.shipping_district_name } {items.shipping_state_name} {items.shipping_postcode}</Text>
   </View>
  <View style = {{flex:2}}>
  <Text style = {{textAlign:'left',margin:7,fontSize:actuatedNormalize(12),fontFamily:fontFamily.Light, flexShrink:1}}>{distanceVal.toFixed(2)} Km aways from you</Text>
 </View>
</View>

   <MapView
   style={{flex:1,height:200}}
    provider={PROVIDER_GOOGLE}
    showsUserLocation = {false}
    followUserLocation = {false}
    userInteraction = {false}
        zoomEnabled = {false}
        scrollEnabled = {false}
   initialRegion={{
   latitude: (items.shipping_latitude != null) ? Number(items.shipping_latitude) : 22.719568,
   longitude: (items.shipping_longitude != null) ? Number(items.shipping_longitude) : 75.857727,
   latitudeDelta: 0.922,
     longitudeDelta: 0.421,
   }}
   >
       <Marker coordinate = {{latitude:(items.shipping_latitude != null)? Number(items.shipping_latitude) : 22.719568,longitude:(items.shipping_longitude != null)? Number(items.shipping_longitude) :75.857727}}
        pinColor = {"purple"} // any color
        title={items.shipping_address_1}
        description={items.shipping_district_name}
          onPress = {()=>handleGetDirections(Number(items.shipping_latitude),Number(items.shipping_longitude))} />

   </MapView>

</View>
<View style={{flex:5,marginTop:10}}>

<View style={{flexDirection: 'row',alignItems: 'flex-start',justifyContent: 'flex-start',margin:0}}>
  <IconBadge
    MainElement={
      <View style={{
        width:90,
        height:30,

      }}><Text style ={[styles.text_footer_val_1,{paddingLeft:18,paddingBottom:5}]}>{translations.ITEMS}</Text></View>
    }
    BadgeElement={
      <Text style={{color:'#FFFFFF'}}>{items.products.length}</Text>
    }
    IconBadgeStyle={
      {width:20,
      height:20,
marginTop:5,
      backgroundColor: 'grey'}
    }
    Hidden={items.products.length==0}
    />

</View>


<FlatList
        data={items.products}
        renderItem={({ item}) => {
          return (
    <View style ={{paddingLeft:30,paddingRight:30}}>
    <View style = {{flex:1,flexDirection:'row' }}>
     <View style = {{flex:1,flexDirection:'row'}}>
      <View style = {{flex:1,alignItems:'center',justifyContent:'center'}}>

        <Image source={{uri: item.image }} style={{ width:60, height:60,padding:5}} />
      </View>
      </View>
    <View style = {{flex:3,marginLeft:4}}>
     <Text style = {{padding:5,fontFamily:fontFamily.Medium,fontSize:actuatedNormalize(14)}}>{item.name}</Text>
     <Text style = {{padding:5,fontFamily:fontFamily.Light,fontSize:actuatedNormalize(12)}}>{item.kg_bag}</Text>
     <Text style = {{padding:5,fontFamily:fontFamily.Light,fontSize:actuatedNormalize(12)}}>{item.quantity}x{item.price}</Text>
      </View>
    <View style = {{flex:1.5,alignItems:'flex-end',justifyContent:'center'}}>
     <Text style = {{padding:5,fontFamily:fontFamily.Bold,fontSize:actuatedNormalize(12)}}>{Number(item.total).toFixed(0)} LAK</Text>
    </View>
    </View>
   </View>
          );
        }}
        keyExtractor={(item, index) => index}
      />
</View>
<View style ={{flex:1}}>

<View style = {{height:5, alignItems:'stretch',backgroundColor:"lightgrey" }}>
</View>
<View style = {{flexDirection:'row', justifyContent:'space-between',marginTop:10 }}>
 <Text style = {{paddingLeft:20,fontFamily:fontFamily.Light,fontSize:actuatedNormalize(14)}}>{translations.SUBTOTAL}</Text>
 <Text style = {{paddingRight:20,fontFamily:fontFamily.Bold,fontSize:actuatedNormalize(14)}}>{items.products.sum('total')} LAK</Text>
</View>

</View>
<View style = {{flex:1,alignItems:'stretch',backgroundColor:'grey',height:0.5,margin:15}}></View>
<View style ={{flex:1}}>
<View style = {{flexDirection:'row', justifyContent:'space-between',marginTop:8 }}>
 <Text style = {{paddingLeft:20,fontFamily:fontFamily.Medium,fontSize:actuatedNormalize(14)}}>{translations.PRICE_TOTAL}</Text>
 <Text style = {{paddingRight:20,fontFamily:fontFamily.Bold,fontSize:actuatedNormalize(14),color:'#317de8'}}>{items.products.sum('total')} LAK</Text>
</View>
</View>
<View style = {styles.button}>
{
(items.order_satus_code == "4") ? null
:
     <TouchableOpacity onPress = {()=>completeJobBtnPressed(items)}
     style = {styles.jobBtn}>
      <LinearGradient
      colors = {['#357ee2','#317de8']}
        style = {styles.jobBtn}
        >
<Text style ={[styles.textBtn,{color:'#fff',fontFamily:fontFamily.Medium}]}>{translations.COMP_ORDER}</Text>
</LinearGradient>
</TouchableOpacity>
}
</View>
<View style = {{height:50}}></View>
</ScrollView>

<Modal
                   style={{flex:1,backgroundColor: 'transparent',margin: 0, alignItems: undefined,justifyContent: undefined}}
                  // animationType="slide"
                  // transparent={true}
                   isVisible={visible}
                   hasBackdrop={false}

                   swipeDirection={'down'}
                   onBackButtonPress={()=>setVisible(false)}
                   onBackdropPress={()=>setVisible(false)}
                   propagateSwipe={true}
                   onSwipeComplete={()=>setVisible(false)}

               >
                   <KeyboardAwareScrollView style={{flex:1}} contentContainerStyle={{ flex:1, justifyContent:'flex-end', backgroundColor: 'rgba(0,0,0,0.5)'  }}>
                       <View style={{  backgroundColor:'#FFF', borderWidth: 0.3, borderColor:'#EAEAEA', borderTopLeftRadius: 25, borderTopRightRadius: 25,padding:20,paddingVertical:10, paddingBottom: (Platform.OS=='android' ? 10 : 40) }}>
                          <Text style={{fontFamily:fontFamily.Medium,fontSize:actuatedNormalize(12)}}>{translations.REASON_HINT}</Text>
                           <TextInput
                               placeholder={translations.REASON_HINT}
                               multiline={true}
                              // value={'Please write something nice'}
                              onChangeText={(val)=> reasonTxtInputChange(val)}
                               style={{ textAlignVertical: "top",fontFamily:fontFamily.Light,height: 100, borderWidth: 1, borderColor: '#EAEAEA', padding:10,fontSize:14}}
                           />
                           <ButtonGroup onPress={()=>{submitContent(items.order_id)}} buttonTitle={translations.SUBMITE_BTN}/>
                           <TouchableOpacity onPress = {()=>setVisible(false)}>
                            <Text style = {{color:'red',fontFamily:fontFamily.Medium,fontSize:actuatedNormalize(15),textAlign:'center'}}> {translations.TITEL_CANCEL}</Text>
                            </TouchableOpacity>
                       </View>
                   </KeyboardAwareScrollView>
               </Modal>
               <Modal
                                  style={{flex:1,backgroundColor: 'transparent',margin: 0, alignItems: undefined,justifyContent:undefined}}
                                 // animationType="slide"
                                 // transparent={true}
                                  isVisible={orderQr}
                                  hasBackdrop={false}

                                swipeDirection={'down'}
                                onBackButtonPress={()=>setorderQr(false)}
                                onBackdropPress={()=>setorderQr(false)}
                                 propagateSwipe={true}
                                onSwipeComplete={()=>setorderQr(false)}

                              >
                                  <KeyboardAwareScrollView style={{flex:1}} contentContainerStyle={{ flex:1, justifyContent:'center', backgroundColor: 'rgba(0,0,0,0.5)'  }}>
                                      <View style={{  backgroundColor:'#FFF', borderWidth: 0.3, borderColor:'#EAEAEA', justifyContent:'center',alignItems:'center'}}>
                                         <View style= {styles.qrConnectionmain}>
                                         <Text style= {{padding:10,fontFamily:fontFamily.Bold,fontSize:actuatedNormalize(18)}}>{translations.O_QR_CODE}</Text>
                                         <Image  source={{uri:items.qr_code}} style={{ width:180, height:180}} resizeMode ="contain" />
                                         </View>
                                         <TouchableOpacity onPress = {()=>setorderQr(false)} style = {{paddingBottom:30}} >
                                           <Text style = {{color:'red',fontFamily:fontFamily.Medium,fontSize:actuatedNormalize(15),textAlign:'center'}}>{translations.TITEL_CANCEL}</Text>
                                           </TouchableOpacity>
                                      </View>
                                  </KeyboardAwareScrollView>
                              </Modal>
  <PopLoader loading={isLoading} />
 </View>
 </View>

);


};
export default DetailScreen2;

//
// <View style = {{flexDirection:'row', justifyContent:'space-between',marginTop:10 }}>
//  <Text style = {{paddingLeft:20,fontFamily:fontFamily.Light,fontSize:actuatedNormalize(12)}}>Shipping</Text>
//  <Text style = {{paddingRight:20,fontFamily:fontFamily.Bold,fontSize:actuatedNormalize(14),color:'green'}}>{items.products.sum('total')} LAK</Text>
// </View>

const styles = StyleSheet.create({
  container:{
    flex:1,
backgroundColor:'#FFF'
 },
 subcontainer:{
   flex:1,

   },
  text_footer_title:{
  padding:5,
  fontFamily:fontFamily.Light,
  fontSize:actuatedNormalize(12)

     },
text_footer_val:{
padding:5,
fontFamily:fontFamily.Medium,
fontSize:actuatedNormalize(12)
         },
text_footer_val_1:{
padding:5,
fontFamily:fontFamily.Bold,
fontSize:actuatedNormalize(14)
},
text_footer_title_1:{
  padding:5,
fontFamily:fontFamily.Bold,
fontSize:actuatedNormalize(14)
 },
 button:{
   width : "100%",
   alignItems:'center',
   marginTop:15
 },
 jobBtn:{
   width:"95%",
   height:50,
   justifyContent:'center',
   alignItems:'center',
   borderRadius:10,

 },
 textBtn:{
   fontSize:actuatedNormalize(18)
 },
 qrConnectionmain:{
 backgroundColor:'white',
 width:250,
 height:250,
 alignItems: 'center',
 justifyContent: 'center',
 borderRadius:40
 }
});

// <View style = {{flexDirection:'row', justifyContent:'space-between',marginTop:5 }}>
//  <Text style = {{paddingLeft:20,fontFamily:fontFamily.Medium,fontSize:actuatedNormalize(14)}}>{translations.TOTAL_PAYMENT}</Text>
//  <Text style = {{paddingRight:20,fontFamily:fontFamily.Medium,fontSize:actuatedNormalize(14),color:'#317de8'}}>{items.products.sum('total')} LAK</Text>
// </View>
