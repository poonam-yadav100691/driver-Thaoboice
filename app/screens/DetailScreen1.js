
import  React,{useContext} from 'react';
import {  StyleSheet, Text, View ,Button,TextInput,TouchableOpacity,ScrollView,FlatList} from 'react-native';
import { Appbar } from 'react-native-paper';
import {Header2} from '../components/header';
import { actuatedNormalize, fontFamily} from '../config/Font';
import LinearGradient from 'react-native-linear-gradient';
import {AuthContext} from '../components/context';
import MapView, {PROVIDER_GOOGLE } from "react-native-maps"
import { MaterialCommunityIcons,AntDesign,Entypo,FontAwesome,Feather } from '@expo/vector-icons';
import translations, { DEFAULT_LANGUAGE } from '../api/translations';

import { Card} from "react-native-elements";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
const DetailScreen1 = ({ navigation }) => {
  var markers = [
    {
      latitude: 22.719568,
      longitude: 75.857727,
      title: 'Indore',
      subtitle: 'Madhya Pradesh, India'
    }
  ];

  const onPressDetail = (item) => {
  console.log('Hello index=='+item.key);
  navigation.navigate('DetailScreen2')
  }
return(
  <View style = {styles.container}>
  <>
    <Header2 title="Job" onGoBack={navigation.goBack}  onCancelJob={()=>{console.log('search');}}/>
  </>
<View style ={styles.subcontainer}>
<ScrollView>
<View style={{flex:0.75,flexDirection:'row'}}>
<View style={{justifyContent:'center',paddingLeft:20,flex:1}}>
<Text style= {{fontFamily:fontFamily.Medium,fontSize:actuatedNormalize(14)}}>Client</Text>
<Text style= {{fontFamily:fontFamily.Medium,fontSize:actuatedNormalize(18)}}>DPLUS CLUB</Text>
</View>
<View style={{alignItems:'flex-end',flex:1,justifyContent:'center',paddingRight:20}}>
<Feather name="phone" size={24} color="green" style = {{padding:5,borderRadius:12,backgroundColor:'white'}} />
</View>
</View>
<View style={{flex:3}}>
  <Text style={[styles.text_footer_val_1,{paddingLeft:20}]}>
  Pick up Location
  </Text>
<View style={{height:30,flexDirection:'row',justifyContent:'flex-start',alignItems:'flex-start'}}>
   <View style = {{margin:5,paddingLeft:15}} >
    <FontAwesome name="map-marker" size={20} color="black" />
   </View>
   <View style = {{}} >
   <Text style = {{textAlign:'left',margin:7,fontSize:actuatedNormalize(12),fontFamily:fontFamily.Light}}>Vientine center</Text>
   </View>
  <View style = {{}}>
  <Text style = {{textAlign:'left',margin:7,fontSize:actuatedNormalize(12),fontFamily:fontFamily.Light}}>.7 Km aways from you</Text>
 </View>
</View>
 <MapView
        style={{flex:1,height:200}}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        initialRegion={{
        latitude: 22.719568,
        longitude: 75.857727,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1}}
         annotations={markers}
   />
</View>
<View style={{flex:5}}>
<FlatList
        data={[
          {key: 'Devin'},
          {key: 'Dan'},
          {key: 'Dominic'},
          {key: 'Jackson'},
          {key: 'James'},
          {key: 'Joel'},
          {key: 'John'},
          {key: 'Jillian'},
          {key: 'Jimmy'},
          {key: 'Julie'},
          ]}
        renderItem={({ item}) => {
          return (
    <TouchableOpacity onPress = {()=>{onPressDetail(item)}}>
    <Card >
<
View style = {{flex:1,flexDirection:'row' }}>

 <View style = {{flex:1,flexDirection:'row'}}>
  <View style = {{flex:0.5,alignItems:'center',justifyContent:'center'}}>

  <FontAwesome name="font-awesome" size={24} color="black" style ={{alignItems:'flex-end'}} onPress = {console.log('button bell')}/>
  </View>
<View style = {{flex:4}}>
 <Text style = {[styles.text_footer_title_1,{fontFamily:fontFamily.Light,padding:2}]}>Order</Text>
 <Text style = {[styles.text_footer_val_1,{padding:2}]}>6576547456756</Text>
</View>
</View>
</View>
<View style = {{flex:1,alignItems:'stretch',backgroundColor:'grey',height:0.5}}></View>

<View style = {{flex:1,alignItems:'center',flexDirection:'row'}}>
<Text style={styles.text_footer_title}>Customer:</Text>
<Text style={styles.text_footer_val}>Vinod</Text>
</View>
<View style = {{flex:1,alignItems:'center',flexDirection:'row'}}>
<Text style={styles.text_footer_title}>Location:</Text>
<Text style={styles.text_footer_val}>Indore</Text>
</View>
<View style = {{flex:1,alignItems:'center',flexDirection:'row'}}>
<Text style={styles.text_footer_title}>No. of item:</Text>
<Text style={styles.text_footer_val}>200</Text>
</View>
<View style = {{flex:1,alignItems:'center',flexDirection:'row'}}>
<Text style={styles.text_footer_title}>Weight (kg):</Text>
<Text style={styles.text_footer_val}>1000 kg</Text>
</View>
<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<View style={{flexDirection:'row'}}>
<Entypo name="credit-card" size={20} color="green" style = {{padding:5}} />

<Text style={styles.text_footer_title_1} >
Credit card
</Text>
</View>
<View>
<Text style={styles.text_footer_val_1} >
1,500,000 LAK
</Text>
</View>
</View>
</Card>
  </TouchableOpacity>
          );
        }}
        keyExtractor={(item, index) => index}
      />
</View>
</ScrollView>
 </View>
 </View>

);


};
export default DetailScreen1;


const styles = StyleSheet.create({
  container:{
    flex:1,

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

});
