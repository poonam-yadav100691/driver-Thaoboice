import AsyncStorage from '@react-native-community/async-storage';
import Model from '../api/Model'; 
import Toast from 'react-native-simple-toast';
const Helper = {
    addWish: async ( productid ) => {
        let response = await Model.addWish( productid )
        if (response.status) {
            //Toast.show(response.errorMessage, Toast.LONG);
        }
    },
    deleteWish: async ( productid ) => {
        let response = await Model.deleteWish( productid )
        if(response.status){
            //Toast.show(response.errorMessage, Toast.LONG);
        }
    }
}

export default Helper;