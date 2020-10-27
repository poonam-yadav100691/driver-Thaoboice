
import  React , {useEffect,useState} from 'react';
import {  StyleSheet, Text, View ,Button,Image} from 'react-native';
import { Appbar } from 'react-native-paper';
import {Header} from '../components/header';
import { actuatedNormalize, fontFamily } from '../config/Font';
import translations, { DEFAULT_LANGUAGE } from '../api/translations';

const QrCodeOrderScreen = ({ route,navigation }) => {
  const { data } = route.params;
return(
  <View style = {styles.container}>
  <>
    <Header title={translations.QR_CODE} onGoBack={navigation.goBack}  />
  </>
<View style ={styles.subcontainer}>
<View style= {styles.qrConnectionmain}>
<Text style= {{padding:10,fontFamily:fontFamily.Bold,fontSize:actuatedNormalize(18)}}>{translations.DRIVER_ID}</Text>
<Image  source={{uri: data.driverQr}} style={{ width:100, height:100}}  />
</View>
</View>
</View>

);


};
export default QrCodeOrderScreen;


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
width:250,
height:250,
alignItems: 'center',
justifyContent: 'center',
borderRadius:40
}
});
