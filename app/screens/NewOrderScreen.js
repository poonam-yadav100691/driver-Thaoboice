import  React, { useState , useEffect} from 'react';
import {  StyleSheet, Text, View ,Button,TextInput,FlatList,Image,TouchableOpacity} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {  ButtonGroup, MyAppText, TextButtonGroup } from '../components/Parts';
import { Card} from "react-native-elements";
import { Searchbar } from 'react-native-paper';
import { actuatedNormalize, fontFamily } from '../config/Font';
import { JSHash, JSHmac, CONSTANTS } from "react-native-hash";
 import AsyncStorage from '@react-native-community/async-storage';
import { Appbar } from 'react-native-paper';
import {Header} from '../components/header';
import LinearGradient from 'react-native-linear-gradient';
import { imageSource } from '../config/Image';
import { PopLoader } from '../components/Parts';
import translations, { DEFAULT_LANGUAGE } from '../api/translations';

const NewOrderScreen = ({ navigation }) => {
const [isLoading, setLoading] = React.useState(false);

const [state, setState] = React.useState([]);
const [data, setData] = useState({
status:'',
message:'',
orders:[],
}
);
useEffect(()=>{
getnewOrderList()
},[]);

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

  setData({status:res.status,message:res.message,orders:res.results});


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
}

const onPressReject = (item) => {
let oid = item.orderInfo.order_id;
console.log('-----------------------oid='+oid);


}
const getFullName=(fname,lname)=> {
    return fname + " " + lname;
  }
  const getFullAddress=(address,distict,state,pincode)=> {
      return address + " " + distict+ " " + state+ " " + pincode;
    }

return(
  <View style = {styles.container}>
    <Header title={translations.NEW_ORDERS} onGoBack={navigation.goBack}   />
<View style ={styles.subcontainer1}>
{
    (data.status != 0) ?
<FlatList
        data = {data.orders}
        renderItem={({ item}) => {
          return (

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
 <Text style = {[styles.text_footer_title_1,{fontFamily:fontFamily.Light,padding:2,fontSize:actuatedNormalize(11),color:'red'}]}>{item.orderInfo.date_added}</Text>

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
<Text style={[styles.text_footer_val,{flexShrink: 1}]} numberOfLines = {2} adjustsFontSizeToFit> {getFullAddress(item.orderInfo.shipping_address_1,item.orderInfo.shipping_district_name,item.orderInfo.shipping_state_name,item.orderInfo.shipping_postcode)}</Text>
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
<View style={{flexDirection:'row',justifyContent:'space-between'}}>
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
</View>
</Card>
          );
        }}
        keyExtractor={(item, index) => index}
      />
      :
      <View style={{ flex:1 , justifyContent:'center' , alignItems:'center'}}>
                        <View style={{ alignItems:'center', position: 'relative' }}>
                            <Image source={imageSource.icon_order} style={{width: wp('30%'), height: hp('30%'), resizeMode:'contain' }}/>
                            <View style={{ position:'absolute', bottom: 10  }}>
                                <MyAppText style={{ color: '#B8BBC6', fontSize: actuatedNormalize(20), textAlign:'center' }}>{translations.NO_ORDER_AVAILABEL}</MyAppText>
                                <MyAppText style={{ color: '#B8BBC6', fontSize: actuatedNormalize(16), textAlign: 'center' }}></MyAppText>
                            </View>
                        </View>
                        <View style={{ width:'80%'}}>
                            <ButtonGroup onPress={()=>navigation.goBack()} buttonTitle={translations.GOBACK} />
                        </View>
                    </View>


  }
      <PopLoader loading={isLoading} />
</View>
  </View>
);


};
export default NewOrderScreen;

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white'
 },

subcontainer1:{
flex:1,
marginTop:0,
  backgroundColor:'white',
   height:105
}
,

text_footer_title:{
padding:5,
fontFamily:fontFamily.Light,
fontSize:actuatedNormalize(14)

  },
text_footer_val:{
padding:5,
fontFamily:fontFamily.Medium,
fontSize:actuatedNormalize(14)
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
