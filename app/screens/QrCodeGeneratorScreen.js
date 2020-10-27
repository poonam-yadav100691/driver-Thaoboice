
import  React , {useEffect,useState} from 'react';
import {  StyleSheet, Text, View ,Button,Image} from 'react-native';
import { Appbar } from 'react-native-paper';
import {Header} from '../components/header';
import { actuatedNormalize, fontFamily } from '../config/Font';
import translations, { DEFAULT_LANGUAGE } from '../api/translations';

const QrCodeGeneratorScreen = ({ route,navigation }) => {
  const { data } = route.params;



return(

  <View style = {styles.container}>
  <>
    <Header title={translations.QR_CODE} onGoBack={navigation.goBack}  />
  </>
<View style ={styles.subcontainer}>
<View style= {styles.qrConnectionmain}>
<Text style= {{padding:10,fontFamily:fontFamily.Bold,fontSize:actuatedNormalize(18)}}>{translations.DRIVER_ID}</Text>
<Image  source={{uri: data.driverQr}} style={{ width:180, height:180}} resizeMode="contain"  />
</View>
</View>
</View>

);


};
export default QrCodeGeneratorScreen;


const styles = StyleSheet.create({
  container:{
    flex:1

 },
 subcontainer:{
   flex: 1,
 alignItems: 'center',
 justifyContent: 'center'


},
qrConnectionmain:{
backgroundColor:'white',
width:300,
height:300,
alignItems: 'center',
justifyContent: 'center',
borderRadius:40
}
});
