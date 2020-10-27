import AsyncStorage from '@react-native-community/async-storage';
const cartHelper = {
    manipulateItem: async (instance, data, item, action) => {
        let findprod = await data.map((o) => { return o.product_uuid }).indexOf(item.product_uuid)
        if(action=='INCREMENT'){
            if(findprod > -1){
                data[findprod]['item_qty'] = (typeof data[findprod]['item_qty'] != 'undefined') ? data[findprod]['item_qty'] + 1 : 2;  
            }
            else{
                item['item_qty'] = 2
                data.push(item);
            }
        } 
        else{
            if (findprod > -1) {
                data[findprod]['item_qty'] = (typeof data[findprod]['item_qty'] != 'undefined') ? data[findprod]['item_qty'] - 1 : 0;  
                if (data[findprod]['item_qty']==0){
                    data.splice(findprod, 1);
                }
            }    
        }
        instance.setState({ cartItem: data });        
    },
    finalCart: async (instance, data, item) => {
        let findprod = await data.map((o) => { return o.product_uuid }).indexOf(item.product_uuid)
        let cart = await AsyncStorage.getItem('CART');
        let ncart = await JSON.parse(cart)
        if(findprod > -1){            
            let cartIndex = await ncart.map((o)=>{ return o.product_uuid }).indexOf( item.product_uuid );
            if(cartIndex > -1){
                ncart[cartIndex] = data[findprod] 
            }
            else{
                ncart.push( data[findprod] ) 
            }
            instance.props.route.params.setFinalCart(JSON.stringify(ncart))
        }
        else{
            item['item_qty'] = 1
            ncart.push(item);  
            data.push(item);          
            instance.props.route.params.setFinalCart(JSON.stringify(ncart))
            instance.setState({ cartItem: data });
        }
        
    } 
}   

export default cartHelper;