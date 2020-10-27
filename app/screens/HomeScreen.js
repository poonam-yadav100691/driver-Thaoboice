import  React,{useContext} from 'react';
import {  StyleSheet, Text, View ,Button} from 'react-native';
import { Appbar } from 'react-native-paper';
import {Header} from '../components/header';

const HomeScreen = ({ navigation }: { navigation: DrawerNavigation }) => {

return(

  <View style = {styles.container}>
  <>
    <Header title="Home" onGoBack={navigation.toggleDrawer} />
  </>
<View style ={styles.subcontainer}>


   </View>
</View>

);


};
export default HomeScreen;


const styles = StyleSheet.create({
  container:{
    flex:1,

 },
 subcontainer:{
   flex:1,
   alignItems:'center',
   justifyContent:'center'

 },

});
