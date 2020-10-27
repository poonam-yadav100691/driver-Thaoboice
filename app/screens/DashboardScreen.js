import  React, { useState , useEffect} from 'react';
import {  StyleSheet, Text, View ,Button,TextInput,FlatList,be,TouchableOpacity,Image,Platform,Alert} from 'react-native';
import { PopLoader } from '../components/Parts';
import { Card} from "react-native-elements";
import { Searchbar } from 'react-native-paper';
import { MaterialCommunityIcons,AntDesign,Entypo,FontAwesome,Feather } from '@expo/vector-icons';
import { actuatedNormalize, fontFamily } from '../config/Font';
import { JSHash, JSHmac, CONSTANTS } from "react-native-hash";
 import AsyncStorage from '@react-native-community/async-storage';
 import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
 import {  ButtonGroup, MyAppText, TextButtonGroup } from '../components/Parts';
 import LinearGradient from 'react-native-linear-gradient';
 import translations, { DEFAULT_LANGUAGE } from '../api/translations';
 import IconBadge from 'react-native-icon-badge';
 import firebase from "@react-native-firebase/app";
import messaging from '@react-native-firebase/messaging';
 import { imageSource } from '../config/Image';
 import {
  useIsFocused,
} from '@react-navigation/native';
//{JSON.stringify(item.orderInfo.invoice_no)}

const DashboardScreen = ({ navigation }) => {

  const [isLoading, setLoading] = useState(false);
  const [searchtext, setSearchtext] = useState('');
  const [tab, setTab] = React.useState('2');
  const [neworderCount,setNeworderCount] =  React.useState(0);
  const [onGoingCount,setOnGoingCountCount] =  React.useState(0);
    const [onCompletedCount,setonCompletedCount] =  React.useState(0);
  const [data, setData] = useState({
  status:'',
  message:'',
  orders:[],
  }
  );
  const [state, setState] = useState([]);


const onPressDetail = (item) => {

  if (item.orderInfo.order_status_id != '1'){
    navigation.navigate('DetailScreen2', {items: item.orderInfo,
            });
  }
console.log('Hello index=='+item.orderInfo);
//navigation.navigate('DetailScreen2')

}

const onPressbell = () => {
//console.log('Hello index=='+item.key);
//navigation.navigate('NewOrderScreen')
}
const searchFilterFunction =(text) =>{

if (data.orders == undefined){
  return false
}
  console.log('abc'+ text);

let filteredData = data.orders.filter(function (item) {
   return (item.orderInfo.shipping_firstname.includes(text) || item.orderInfo.shipping_lastname.includes(text)|| item.orderInfo.invoice_no.includes(text));
 });

  setData({status:1,message:'',orders:filteredData})
if (text == ''){
  resetOrderlist()
}

}

const OnRedioBtn = async(i) =>{
  switch (i) {
    case 1:
  getnewOrderList()
      break;
    case 2:
      getOrderList(1)
      break;
    case 3:
    getOrderList(2)
      break;
  }
  setTab(i)
}


useEffect(()=>{

  const unsubscribe = navigation.addListener('focus', () => {
setTab(2)
  getOrderList(1)
  getnewOrderListForCount()

      });
      return unsubscribe;

      firebase.messaging().getInitialNotification()
              .then(payload => {
                console.log("payload#####-----------", payload);
                console.log("payload data#####-----------", payload.data);
setTab(1)
getnewOrderList()
  getnewOrderListForCount()
              });
            messaging().setBackgroundMessageHandler(async remoteMessage => {
              console.log('Message handled in the background!', remoteMessage);
              setTab(1)
              getnewOrderList()
                getnewOrderListForCount()
            });

  },[]);

const getOrderList = async(typeIndex) =>{
  console.log('abcdf');
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
  console.log('abcdf');
    const params = '{"user_id":"'+userid+'","frm_mode":"driverOrdersList","uuid":"'+deviceToken+'","LANGCODE":"EN"}'
  console.log("param ==dash ==" + params)
  setLoading(true)
//  var paramjs = JSON.stringify(params);
JSHmac(params, "501ee1944b81bb7018c7d10316854971", CONSTANTS.HmacAlgorithms.HmacSHA256)
  .then(hash =>
    {
      console.log('--------------------------------------');
        console.log(hash);
        fetch('http://thaobo.com/ser_shop/driverOrdersList', {
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
        // setData({status:res.status,message:res.message,orders:res.results});
          console.log('fromserver '+ JSON.stringify(res));
console.log("type index===1"+typeIndex);

  console.log('abcdf');

   if (res.status == 0){
     setOnGoingCountCount(0)
     setonCompletedCount(0)
  setData({status:res.status,message:'',orders:[]})
   }else{

    if(typeIndex == '1'){

      let filteredData = res.results.filter(function (item) {
         return item.orderInfo.order_status_id.includes('2');
       });
       let filteredData2 = res.results.filter(function (item) {
           return item.orderInfo.order_status_id.includes('4');
         });

 if (filteredData.length == 0){
   setData({status:0,message:'',orders:[]})
   setOnGoingCountCount(0)

 }else{

setData({status:1,message:'',orders:filteredData})
setOnGoingCountCount(filteredData.length)
}
if (filteredData2.length == 0){

setonCompletedCount(0)

}else{

setonCompletedCount(filteredData2.length)

}
    }else{

let filteredData2 = res.results.filter(function (item) {
    return item.orderInfo.order_status_id.includes('4');
  });
if (filteredData2.length == 0){
 setData({status:0,message:'',orders:[]})
  setonCompletedCount(0)
}else{
setData({status:1,message:'',orders:filteredData2})
  setonCompletedCount(filteredData2.length)
}
}}

 const response = JSON.stringify(res)
AsyncStorage.setItem('ORDERLIST', response)

     })
        .catch(() => setState({ hasErrors: true }))
        .finally(function() {  setLoading(false)});

    } )
  .catch(e => console.log(e));
  }

  const resetOrderlist = async()=>{

    try {

      let  resjson =  await AsyncStorage.getItem('ORDERLIST');
      const res = JSON.parse(resjson);
      setData({status:res.status,message:res.message,orders:res.results});
    } catch(e){
      console.log(e);
    }

  }

  const getnewOrderList = async() =>{
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
    setLoading(true);
      const params = '{"user_id":"'+userid+'","frm_mode":"driverGetNewOrder","uuid":"'+deviceToken+'","LANGCODE":"EN"}'
    console.log("param ==dash ==" + params)
  //  var paramjs = JSON.stringify(params);
  JSHmac(params, "501ee1944b81bb7018c7d10316854971", CONSTANTS.HmacAlgorithms.HmacSHA256)
    .then(hash =>
      {
        console.log('--------------------------------------');
          console.log(hash);
          fetch('http://thaobo.com/ser_shop/driverGetNewOrder', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
              , "doicex-signature": hash
            },
            body: params
          }).then(res => res.json())
            .then(res => {
             setLoading(false);
       console.log(JSON.stringify(res));
if (res.status == 0){
  setNeworderCount(0)

 setData({status:res.status,message:res.message,orders:[]});
  }else{
    setNeworderCount(res.results.length)

 setData({status:res.status,message:res.message,orders:res.results});
 }



       })
          .catch(() => setState({ hasErrors: true }))
          .finally(function() { setLoading(false) });

      } )
    .catch(e => console.log(e));

    }

    const getnewOrderListForCount = async() =>{
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
      setLoading(true);
        const params = '{"user_id":"'+userid+'","frm_mode":"driverGetNewOrder","uuid":"'+deviceToken+'","LANGCODE":"EN"}'
      console.log("param ==dash ==" + params)
    //  var paramjs = JSON.stringify(params);
    JSHmac(params, "501ee1944b81bb7018c7d10316854971", CONSTANTS.HmacAlgorithms.HmacSHA256)
      .then(hash =>
        {
          console.log('--------------------------------------');
            console.log(hash);
            fetch('http://thaobo.com/ser_shop/driverGetNewOrder', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
                , "doicex-signature": hash
              },
              body: params
            }).then(res => res.json())
              .then(res => {
               setLoading(false);
        // console.log(JSON.stringify(res));
        if (res.status == 0){
          setNeworderCount(0)
        }else{
        setNeworderCount(res.results.length)
        }


    //  setData({status:res.status,message:res.message,orders:res.results});

         })
            .catch(() => setState({ hasErrors: true }))
            .finally(function() { setLoading(false) });

        } )
      .catch(e => console.log(e));

      }


    const apiForAcceptOrReject = async(orderid,ostatus) =>{
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
    console.log('accept or reject  3 =========='+orderid);
        const params = '{"user_id":"'+userid+'","order_id":"'+orderid+'","order_accepted_status":"'+ostatus+'","frm_mode":"driverAcceptOrder","uuid":"'+deviceToken+'","LANGCODE":"EN"}'
      console.log("param ==dash ==" + params)
    //  var paramjs = JSON.stringify(params);
    setLoading(true);
    JSHmac(params, "501ee1944b81bb7018c7d10316854971", CONSTANTS.HmacAlgorithms.HmacSHA256)
      .then(hash =>
        {
          console.log('--------------------------------------');
            console.log(hash);
            fetch('http://thaobo.com/ser_shop/driverAcceptOrder', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
                , "doicex-signature": hash
              },
              body: params
            }).then(res => res.json())
              .then(res =>  {
              console.log('---------------------abc='+JSON.stringify(res));
                  console.log(JSON.stringify(res));
                  getnewOrderList()

                setLoading(false);

          //  navigation.goBack()
              }
            )
            .catch(() => setState({ hasErrors: true }))
            .finally(function() { setLoading(false) });
        } )
      .catch(e => console.log(e));
      }




  const onPressAccept = (item) => {
  let oid = item.orderInfo.order_id;
  console.log('----- accept------------------oid='+oid);
  //apiForAcceptOrReject(oid,"1")

  Alert.alert(
               '',
               translations.ACCEPT_CONFIRM_ORDER_MSG,
               [
                   {
                       text: translations.TITEL_CANCEL,
                       onPress: () => console.log('Cancel Pressed'),
                       style: 'cancel',
                   },
                   {text: translations.TITEL_OK, onPress: () =>apiForAcceptOrReject(oid,"1")},
               ]
           );



  }

  const onPressReject = (item) => {
  let oid = item.orderInfo.order_id;
  console.log('-----------------------oid='+oid);
  //  apiForAcceptOrReject(oid,"2")

    Alert.alert(
               '',
               translations.REJECT_CONFIRM_ORDER_MSG,
               [
                   {
                       text: translations.TITEL_CANCEL,
                       onPress: () => console.log('Cancel Pressed'),
                       style: 'cancel',
                   },
                   {text: translations.TITEL_OK, onPress: () => apiForAcceptOrReject(oid,"2")},
               ]
           );
  }

  const getFullName=(fname,lname)=> {
      return fname + " " + lname;
    }
    const getFullAddress=(address,distict,state,pincode)=> {
        return address + " " + distict+ " " + state+ " " + pincode;
      }
 //borderColor: "#FFFFFF",backgroundColor:'#edf2f4'
return(
  <View style = {styles.container}>
  <View style ={[styles.subcontainer1]}>
  <View style = {{ height:'100%',flex:5,paddingLeft:20,paddingTop:10,marginTop:2,backgroundColor:'#FFFFFF',borderRadius:20}}>
  <Searchbar
      placeholder={translations.HOME_SEARCH_BAR}
      onChangeText={text => {searchFilterFunction(text)}}
      style = {{borderRadius:15,backgroundColor:'#edf2f4',borderWidth:0,borderColor:'#FFFFFF' ,fontSize:16,shadowOpacity:0,elevation:0}}
    />
  </View>
  <View style = {{backgroundColor:'white',flex:0.4,alignItems:'center',justifyContent:'center'}}>
<TouchableOpacity onPress = {()=>{onPressbell()}}>
    <Image source={imageSource.icon_bell} style={{width: wp('0%'), height: hp('0%'),alignItems:'flex-end', resizeMode:'contain',marginTop:8}} />
</TouchableOpacity>
  </View>
 </View>

 <View style ={styles.subcontainer2}>
<View style = {{flexDirection:'row',alignItems:'flex-start',justifyContent:'space-around',marginTop:10,width:'70%'}}>
 <View style={{ alignItems:'center',paddingTop:5}}>

 <IconBadge
   MainElement={
     <View style={{

width:75,

     }}>

     <TouchableOpacity onPress={() =>OnRedioBtn(1)  }  style ={{flexDirection:'column',alignItems:'center',justifyContent:'center' }}>

                {
               (tab == 1) ?
               <Image
                 source={imageSource.icon_Group590_selected}
                 style={{
                     width: 50,
                     height:50,
                     aspectRatio: 1, // <-- this
                     resizeMode: 'contain',

                 }}
     />
               :
               <Image
            source={imageSource.icon_Group590}
            style={{
              width: 50,
              height:50,
                aspectRatio: 1, // <-- this
                resizeMode: 'contain',
          }}/>

                }
                <Text style={{fontSize:actuatedNormalize(12),textAlign:'center',fontFamily:fontFamily.Light,color:(tab == 1) ? '#357ee2' : 'grey'}}>
                {translations.HOME_TAB_1}
                </Text>
              </TouchableOpacity>
         </View>
   }
   BadgeElement={
     <Text style={{color:'#FFFFFF',fontSize:actuatedNormalize(10),padding:2}}>{neworderCount}</Text>
   }
   IconBadgeStyle={
     {width:20,
     height:20,
     backgroundColor: '#007ee9',borderRadius:10,borderColor:'white',borderWidth:1
     }
   }

   Hidden={neworderCount == 0}
   />



 </View>

 <View style={{alignItems:'center',paddingTop:5}}>

 <IconBadge
   MainElement={
     <View style={{
  width:75

     }}>

     <TouchableOpacity onPress={() =>OnRedioBtn(2)  }  style ={{flexDirection:'column',alignItems:'center',justifyContent:'center'}}>

                  {
                    (tab == 2) ?
                    <Image
                 source={imageSource.ico_order_selected}
                 style={{
                   width: 50,
                   height:50,
                   aspectRatio: 1, // <-- this
                   resizeMode: 'contain',

                 }}/>
                    :
                    <Image
                 source={imageSource.ico_order}
                 style={{
                   width: 50,
                   height:50,
                   aspectRatio: 1, // <-- this
                   resizeMode: 'contain',

                  //   borderRadius:2,borderWidth:1,borderColor:'white'
                 }}/>
                  }
                  <Text style={{fontSize:actuatedNormalize(12),textAlign:'center',fontFamily:fontFamily.Light,color:(tab == 2) ? '#357ee2' : 'grey'}}>
                {translations.HOME_TAB_2}
                  </Text>

        </TouchableOpacity>

         </View>
   }
   BadgeElement={
     <Text style={{color:'#FFFFFF',fontSize:actuatedNormalize(10),padding:2}}>{onGoingCount}</Text>
   }
   IconBadgeStyle={
     {
       width:20,
       height:20,
       backgroundColor: '#007ee9',borderRadius:10,borderColor:'white',borderWidth:1
   }
   }
   Hidden={onGoingCount == 0}
   />





  </View>
  <View style={{width:75,paddingTop:5}}>


   <IconBadge
     MainElement={
       <View style={{
    width:75

       }}>

       <TouchableOpacity onPress={() =>OnRedioBtn(3)  }  style ={{flexDirection:'column',alignItems:'center',justifyContent:'center'}}>

                    {
                      (tab == 3) ?
                      <Image
                   source={imageSource.icon_done_selected}
                   style={{
                     width: 50,
                     height:50,
                     aspectRatio: 1, // <-- this
                     resizeMode: 'contain',

                   }}/>
                      :
                      <Image
                   source={imageSource.icon_done}
                   style={{
                     width: 50,
                     height:50,
                     aspectRatio: 1, // <-- this
                     resizeMode: 'contain',

                   }}/>
                    }
                    <Text style={{fontSize:actuatedNormalize(11),textAlign:'center',fontFamily:fontFamily.Light,color:(tab == 3) ? '#357ee2' : 'grey'}}>
                   {translations.HOME_TAB_3}
                    </Text>

          </TouchableOpacity>

           </View>
     }
     BadgeElement={
       <Text style={{color:'#FFFFFF',fontSize:actuatedNormalize(10),padding:2}}>{onCompletedCount}</Text>
     }
     IconBadgeStyle={
       {
         width:20,
         height:20,
         backgroundColor: '#007ee9',borderRadius:10,borderColor:'white',borderWidth:1
     }
     }
     Hidden={onCompletedCount == 0}
     />

   </View>


</View>

</View>
<View style ={styles.subcontainer3}>
{
  (data.status != 0) ?

  <FlatList
        data = {data.orders}
        renderItem={({ item}) => {
          return (
    <TouchableOpacity onPress = {()=>{onPressDetail(item)}}>
    <Card >
<
View style = {{flex:1,flexDirection:'row' }}>

 <View style = {{flex:1,flexDirection:'row'}}>
  <View style = {{flex:0.5,alignItems:'center',justifyContent:'center'}}>
  <TouchableOpacity onPress = {()=>{console.log('copy order button');}}>
  <Image source={imageSource.icon_inventory} style={{width: wp('7%'), height: wp('7%'),alignItems:'flex-end', resizeMode:'contain'}} />
  </TouchableOpacity>
  </View>
<View style = {{flex:3}}>
 <Text style = {[styles.text_footer_title_1,{fontFamily:fontFamily.Light,padding:2}]}>{translations.ORDER_TAP}</Text>
 <Text style = {[styles.text_footer_val_1,{padding:2}]}>{item.orderInfo.invoice_no}</Text>
</View>
<View style = {{flex:2,justifyContent:'center'}}>
 <Text style = {[styles.text_footer_title_1,{fontFamily:fontFamily.Light,padding:2,fontSize:actuatedNormalize(11),color:'red'}]}>{(tab == 1)? item.orderInfo.date_added :item.orderInfo.order_delivery_date_expected}</Text>

</View>
</View>
</View>
<View style = {{flex:1,alignItems:'stretch',backgroundColor:'grey',height:0.5}}></View>

<View style = {{flex:1,alignItems:'center',flexDirection:'row'}}>
<Text style={styles.text_footer_title}>{translations.CUROMER}:</Text>
<Text style={styles.text_footer_val}>{getFullName(item.orderInfo.shipping_firstname,item.orderInfo.shipping_lastname)}</Text>
</View>
<View style = {{flex:1,alignItems:'center',flexDirection:'row'}}>
<Text style={[styles.text_footer_title,{alignSelf:'flex-start'}]}>{translations.LOCATION}:</Text>
<Text style={[styles.text_footer_val,{flexShrink: 1}]} numberOfLines = {5} adjustsFontSizeToFit > {getFullAddress(item.orderInfo.shipping_address_1,item.orderInfo.shipping_district_name,item.orderInfo.shipping_state_name,item.orderInfo.shipping_postcode)}</Text>
</View>
<View style = {{flex:1,alignItems:'center',flexDirection:'row'}}>
<Text style={styles.text_footer_title}>{translations.ITEMS_COUNT}:</Text>
<Text style={styles.text_footer_val}>{item.orderInfo.no_items}</Text>
</View>
<View style = {{flex:1,alignItems:'center',flexDirection:'row'}}>
<Text style={styles.text_footer_title}>{translations.WEIGHT}:</Text>
<Text style={styles.text_footer_val}>{item.orderInfo.wieght} kg</Text>
</View>
<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<View style={{flexDirection:'row'}}>

{
 (item.orderInfo.payment_method != 'COD') ?
  <Image source={imageSource.icon_credit} style={{width: wp('7%'), height: hp('4%'), resizeMode:'contain'}} />
:
<Image source={imageSource.icon_dollar} style={{width: wp('7%'), height: hp('4%'), resizeMode:'contain'}} />

}

<Text style={styles.text_footer_title_1} >
{item.orderInfo.payment_method}
</Text>
</View>
<View>
<Text style={styles.text_footer_val_1} >
{item.orderInfo.total} LAK
</Text>
</View>
</View>
{
(item.orderInfo.order_status_id == '1') ?
(<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<View  style ={{width : "48%",alignItems:'center',marginTop:10}}>

<TouchableOpacity onPress = {()=>{onPressAccept(item)}}
style = {styles.signIn}>
<LinearGradient
 colors = {['#317de8','#317de8']}
   style = {styles.signIn}
   >
<Text style ={[styles.textSign,{color:'#fff',fontFamily:fontFamily.Bold}]}>{translations.ORDER_ACCEPT}</Text>
</LinearGradient>
</TouchableOpacity>
</View>
<View style ={{width : "48%",alignItems:'center',marginTop:10}}>
<TouchableOpacity onPress = {()=>{onPressReject(item)}}
style = {styles.signIn}>
<LinearGradient
 colors = {['#e8380a','#e8380a']}
   style = {styles.signIn}
   >
<Text style ={[styles.textSign,{color:'#fff',fontFamily:fontFamily.Bold}]}>{translations.ORDER_REJECT}</Text>
</LinearGradient>
</TouchableOpacity>
</View>
</View>)

: null
}



</Card>
  </TouchableOpacity>
          );
        }}
        keyExtractor={(item, index) => index}
      />
:

<View style={{ flex:1 , justifyContent:'center' , alignItems:'center'}}>
                  <View style={{ alignItems:'center', position: 'relative' }}>
                      <Image source={imageSource.icon_order} style={{width: wp('28%'), height: wp('28%'), resizeMode:'contain' ,marginBottom:45}}/>
                      <View style={{ position:'absolute', bottom: 0  }}>
                          <MyAppText style={{ color: '#B8BBC6', fontSize: actuatedNormalize(22), textAlign:'center' }}>{translations.NO_ORDER}</MyAppText>
                          <MyAppText style={{ color: '#B8BBC6', fontSize: actuatedNormalize(16), textAlign: 'center' }}></MyAppText>
                      </View>
                  </View>
                  <View style={{ width:'80%'}}>
                     <ButtonGroup onPress={()=>{OnRedioBtn(tab)}} buttonTitle={translations.RELOAD} />
                  </View>
              </View>

  }

  <PopLoader loading={isLoading} />

</View>
<View style = {{height:15}}></View>
  </View>
);


};
export default DashboardScreen;

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white'
 },
 subcontainer1:{
// flex:1,
backgroundColor:'white',
   height:60,
   flexDirection:'row',
   marginTop:Platform.OS == 'ios' ? 38 : 14,

 }
,
subcontainer2:{
//flex:1,
marginTop:0,
  backgroundColor:'white',
   height:105
}
,
subcontainer3:{
  flex:4,
 backgroundColor:'white'
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
fontSize:actuatedNormalize(12)
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

});
