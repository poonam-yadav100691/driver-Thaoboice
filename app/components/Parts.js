import React, { useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, Image, Dimensions, ActivityIndicator, StatusBar, Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment'
import IconBadge from 'react-native-icon-badge';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'react-native-modal'
import { actuatedNormalize, fontFamily } from '../config/Font';
import { imageSource } from '../config/Image';
import { getStatusBarHeight } from '../config/getHeight'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import translations, { DEFAULT_LANGUAGE } from '../api/translations';
export const StatusBarHeight = getStatusBarHeight(true);


const deviceWidth = Dimensions.get('window').width;
const deviceheight = Dimensions.get('window').height;

export const MyAppText = (props) => {
    return (
        <Text {...props} style={[{fontFamily:fontFamily.Medium, position:'relative'},props.style]}>{props.children}
            {
                (props.isRequired) ?
                <MyAppText style={{ color: 'red', left: 5, top: -20, position:'absolute' }}>&#42;</MyAppText>
                :
                null
            }
        </Text>
    )
}

export const StatusBarGroup = (props) => {
    if(Platform.OS=='ios'){
        return (
            <View style={{height:20}}>
                <StatusBar backgroundColor={props.bg} barStyle={props.bs}/>
            </View>
        )
    }
    else{
        return (
            <StatusBar backgroundColor={props.bg} barStyle={props.bs} />
        )
    }
}

export const Header = (props) => {
    const navigation = useNavigation();
    if(props.isback){
        return (
            <View style={{ paddingTop: StatusBarHeight, backgroundColor: '#FFF', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 15, borderBottomColor: '#EAEAEA', borderBottomWidth: 1 }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 25, height: 25 }}>
                    <View>
                        <Image source={imageSource.icon_back_arrow} style={{ width: 25, height: 25 }} />
                    </View>
                </TouchableOpacity>
                <MyAppText style={{ flex: 1, padding: 10, textAlign: 'center', fontSize: actuatedNormalize(18) }}>{props.title}</MyAppText>
                <View style={{ width: 25, height: 25 }} />
            </View>
        )
    }
    else if(props.title=='Address'){
        return (
            <View style={[{ paddingTop: StatusBarHeight, flexDirection: 'row', alignItems: 'center', paddingVertical: 10,paddingHorizontal:20, borderBottomColor: '#EAEAEA', borderBottomWidth: 1 }, props.style]} >
                <View style={{ width: 20, height: 20 }} />
                <MyAppText style={{ fontSize: wp('6%'), flex:1, textAlign:'center' }}>{props.title}</MyAppText>
                <TouchableOpacity >
                    <MyAppText style={{ fontSize: wp('8%'), paddingRight:0 }}>&#x2b;</MyAppText>
                </TouchableOpacity>
            </View>
        )
    }
    else if(props.title=='Choose Address'){
        return (
            <View style={[{ paddingTop: StatusBarHeight, flexDirection: 'row', alignItems: 'center', paddingVertical: 10,paddingHorizontal:20, borderBottomColor: '#EAEAEA', borderBottomWidth: 1 }, props.style]} >
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 25, height: 25 }}>
                    <View>
                        <Image source={imageSource.icon_back_arrow} style={{ width: 25, height: 25 }} />
                    </View>
                </TouchableOpacity>
                <MyAppText style={{ fontSize: wp('6%'), flex:1, textAlign:'center' }}>{props.title}</MyAppText>
                <View style={{ width: 25, height: 25 }} />
            </View>
        )
    }
    else if(props.title=='Shipping Address'){
        return (
            <View style={[{ paddingTop: StatusBarHeight, flexDirection: 'row', alignItems: 'center', paddingVertical: 10,paddingHorizontal:20, borderBottomColor: '#EAEAEA', borderBottomWidth: 1 }, props.style]} >
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 25, height: 25 }}>
                    <View>
                        <Image source={imageSource.icon_back_arrow} style={{ width: 25, height: 25 }} />
                    </View>
                </TouchableOpacity>
                <MyAppText style={{ fontSize: wp('6%'), flex:1, textAlign:'center' }}>{props.title}</MyAppText>
                <View style={{ width: 25, height: 25 }} />
            </View>
        )
    }
    else{
        return (
            <View style={[{ paddingTop: StatusBarHeight, justifyContent: 'center', alignItems: 'center', paddingVertical: 10, marginTop: 10, borderBottomColor: '#EAEAEA', borderBottomWidth:1 }, props.style]} >
                <MyAppText style={{ fontSize: wp('6%') }}>{props.title}</MyAppText>
            </View>
        )
    }
}
export const TextButtonGroup = (props) => {
    return (
        <View style={[props.style]}>
            {
            props.label &&
            <MyAppText style={[{ postion:'relative', fontSize: actuatedNormalize(15), paddingBottom: 5, color: '#4f4f4f' }, props.labelStyle]}>
                {props.label}
                {
                    (props.isRequired) ?
                    <MyAppText style={{ color: 'red', left: 5, top: -20, position:'absolute' }}>&#42;</MyAppText>
                    :
                    null
                }
            </MyAppText>
            }
            <TextInput {...props} secureTextEntry={props.secureTextEntry} style={{ fontSize: actuatedNormalize(15),fontFamily: fontFamily.Medium, borderRadius: 5, borderColor: '#EAEAEA', borderWidth: 1, paddingHorizontal: 10, height:50 }} onChangeText={props.onChangeText} value={props.value} />
        </View>
    )
}

export const ButtonGroup = (props) => {
    let onPress = () => { }
    if(!props.loading){
        onPress = props.onPress;
    }
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[{ flexDirection:'row', alignItems:'center', justifyContent:'center', backgroundColor:'#007ee9', padding: 10, marginVertical: 20, borderRadius: 5 }, props.style]}>
                {
                    props.imageSource && <Image source={props.imageSource} style={{width:18, height:18, marginRight:5, resizeMode:'contain'}} />
                }
                <MyAppText style={[{ textAlign: 'center', color: '#FFF', fontSize: actuatedNormalize(15) }, props.textStyle]}>{props.buttonTitle}</MyAppText>
            </View>
        </TouchableOpacity>
    )
}
export const PopLoader = (props) => {
    if(!props.loading){
        return null
    }
    return (
        <View style={{position:'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000, justifyContent:'center', alignItems:'center'}}>
            <ActivityIndicator size={'large'} />
        </View>
    )
}
export const RowGroup = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress} style={[{ flexDirection: 'row', paddingVertical: 12, alignItems:'center' }, props.style]}>
            <View style={[props.iconStyle]}>
                <Image style={[{ resizeMode: 'contain', width: 35, height: 35, }]} source={props.icon} />
            </View>
            <MyAppText style={{ fontSize: actuatedNormalize(16), flex: 1, marginLeft: 10 }}>{props.title}</MyAppText>
            <Image style={{ resizeMode: 'contain', width: 15, height: 15 }} source={imageSource.icon_right} />
        </TouchableOpacity>
    )
}

export const CategoryCard = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress} style={{ width:deviceWidth/2-20, borderColor:'#EAEAEA', borderWidth:0.5,  backgroundColor: 'white', borderRadius: 10, margin: 5, overflow: "hidden",}}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15 }}>
                <View style={{ flex: 1 }}>
                    <MyAppText style={{ fontSize: hp('1.8%')}}>{props.data.name}</MyAppText>
                    <MyAppText style={{ fontSize: hp('1.5%')}} numberOfLines={1}>{props.data.description}</MyAppText>
                </View>
                <Image style={{ width: wp('13%'), height: wp('20%'), resizeMode:"contain" }} source={{ uri: props.data.image}} />
            </View>
        </TouchableOpacity>
    )
}

export const PopularCard = (props) => {
    return (
        <TouchableOpacity onPress={() => props.onPress(props.data)} style={[{ borderWidth: 0.5, borderColor: '#EAEAEA',elevation: 1, backgroundColor: '#FFF', borderRadius: 10, width: Dimensions.get('window').width / 2.4, margin: 5, padding: 10}, props.style]}>
            <View style={{ position: 'absolute', right: 8, top: 8 }}>
                {
                    (parseInt(props.data.wishistflag)) ?
                    <TouchableOpacity onPress={() =>{ props.deleteWish(props.data.product_id)} }>
                        <Image source={imageSource.icon_fav_mark_active} style={{ resizeMode: "contain", width: wp('8%'), height: wp('6%') }} />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => { props.addWish(props.data.product_id) } } >
                        <Image source={imageSource.icon_fav_mark} style={{ resizeMode: "contain", width: wp('8%'), height: wp('6%') }} />
                    </TouchableOpacity>
                }
            </View>
            <View style={{ marginTop: hp('3.5%') }}>
                <Image style={{ width: wp('25%'), height: wp('30%'), alignSelf: "center", resizeMode: "contain" }} source={{uri: props.data.image}} />
            </View>
            <View style={{ paddingVertical: 10 }}>
                <MyAppText style={{ fontSize: hp('2.5%'), padding: 3 }} numberOfLines={1}>{props.data.name}</MyAppText>
                <MyAppText style={{ fontSize: hp('2%'), padding: 3 }}>{props.data.price}</MyAppText>
                <MyAppText style={{ fontSize: hp('2.5%'), color: 'orange', padding: 3 }}>{props.data.price_formated}</MyAppText>
            </View>
        </TouchableOpacity>
    )
}

export const PopularCard2 = (props) => {
    return (
        <TouchableOpacity onPress={() => props.onPress(props.data)}  style={[{ borderWidth: 0.5, borderColor: '#EAEAEA',elevation: 1, backgroundColor: '#FFF', borderRadius: 10, width: Dimensions.get('window').width / 2.4, margin: 5, padding: 10 }, props.style]}>
            <View style={{ position: 'absolute', right: 8, top: 8 }}>
                {
                (parseInt(props.data.wishistflag)) ?
                    <TouchableOpacity onPress={() =>{ props.deleteWish(props.data.product_id)} } >
                        <Image source={imageSource.icon_fav_mark_active} style={{ resizeMode: "contain", width: wp('7%'), height: wp('7%') }} />
                    </TouchableOpacity>
                :
                    <TouchableOpacity onPress={() =>{ props.addWish(props.data.product_id)} } >
                        <Image source={imageSource.icon_fav_mark} style={{ resizeMode: "contain", width: wp('7%'), height: wp('7%') }} />
                    </TouchableOpacity>
                }
            </View>
            <View style={{ marginTop: hp('3.5%') }}>
                <Image style={{ width: wp('20%'), height: wp('20%'), alignSelf: "center" }} source={{ uri: props.data.image }} />
            </View>
            <View style={{ flex:1, paddingVertical: 10 }}>
                <MyAppText style={{ fontSize: hp('2.3%'), padding: 2 }} numberOfLines={1}>{props.data.name}</MyAppText>
                <MyAppText style={{ fontSize: hp('2%'), padding: 2 }}>{props.data.price}</MyAppText>
                <MyAppText style={{ fontSize: hp('2.3%'),color: 'orange', padding: 2 }}>{props.data.price_formated}</MyAppText>
            </View>
        </TouchableOpacity>
    )
}
export const SearchBox = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress} style={{ zIndex:100, borderRadius: 10, borderWidth: 0.5, borderColor: '#EAEAEA', paddingHorizontal: 10, backgroundColor: '#FFF', position: 'absolute', bottom: -20, left: 15, right: 15, flexDirection: 'row', alignItems: 'center', height:50 }}>
            <Image source={imageSource.icon_search} style={{ width: 20, height: 20 }} />
            <View style={{ fontFamily: fontFamily.Medium, paddingHorizontal: 10, flex:1, height:50, justifyContent:'center'}}><MyAppText style={{ color: '#999' }}>{'Search'}</MyAppText></View>
        </TouchableOpacity>
    )
}

export const LoadingBox = () => {
    return (
        <View style={{height: 80, justifyContent:'center', alignItems:'center', width: '100%' }}>
            <ActivityIndicator />
        </View>
    )
}


export const RadioBox = (props) => {
    return (
        <View style={[{ width: 20, height: 20, borderRadius: 15, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: (props.bgColor) ? props.bgColor : '#25BCCA' }, props.style]}>
            {
                (props.active) ?
                    <View style={{ width: 10, height: 10, borderRadius: 10, backgroundColor:(props.bgColor) ? props.bgColor : '#25BCCA'}}></View>
                :
                null
            }
        </View>
    )
}
export const CartCount = (props) => {
    const [count, setCount] = React.useState((props.count) ? props.count : 0);
    React.useEffect(() => {
        const interval = setInterval(async () => {
            let cart = await AsyncStorage.getItem('CART');
            if (cart !== null) {
                cart = await JSON.parse(cart)
                setCount(cart.length)
            }
        }, 2000);
        return () => clearInterval(interval);
    }, []);
    return (
        <IconBadge
            MainElement={(props.focused) ? <Image style={{ width: 18, height: 18, resizeMode: 'contain' }} source={imageSource.ico_cart_active} /> : <Image style={{ width: 18, height: 18, resizeMode: 'contain' }}source={imageSource.ico_cart_disabled} />}
            BadgeElement={ <MyAppText style={{color:'#FFFFFF', padding: 3, fontSize: actuatedNormalize(11)}}>{count}</MyAppText> }
            IconBadgeStyle={
                {
                    position: 'absolute',
                    right:-15,
                    top: -15,
                    minWidth: 25,
                    minHeight: 25,
                    backgroundColor: (props.focused) ? '#007FEA' : '#9B9B9B'
                }
            }
            Hidden={count==0}
        />
    )
}
export const ProductPop = (props) => {
    if(typeof  props.data.name == 'undefined'){
        return null;
    }
    if(props.visible==false){
        return null;
    }

    const [itemqty, setItemQty] = React.useState(1);

    React.useEffect(() => {
        let itemkey = props.cartItem.map((o) => { return o.product_uuid }).indexOf(props.data.product_uuid);
        if (itemkey > -1) {
            let qty = (typeof props.cartItem[itemkey].item_qty != 'undefined') ? props.cartItem[itemkey].item_qty : 1;
            setItemQty(qty)
        }
    }, 1);
    const manipulateQuantity = (type) => {
        if(type == 'INCREMENT'){
            setItemQty(itemqty+1)
        }
        else{
            setItemQty((itemqty > 2) ? itemqty - 1 : 1 )
        }
    }
    return (
        <Modal
            style={{backgroundColor: 'transparent',margin: 0, alignItems: undefined,justifyContent: undefined}}
            //animationType="slide"
            //transparent={true}
            isVisible={props.visible}
            hasBackdrop={false}
            swipeDirection={'down'}
            onBackButtonPress={props.closePop}
            onBackdropPress={props.closePop}
            propagateSwipe={true}
            onSwipeComplete={props.closePop}
        >
            <View style={{ flex:1, justifyContent:'flex-end', backgroundColor: 'rgba(0,0,0,0.5)'  }}>
                <View style={{  backgroundColor:'#FFF', borderWidth: 0.3, borderColor:'#EAEAEA', borderTopLeftRadius: 25, borderTopRightRadius: 25 }}>
                    <View style={{ alignItems: 'center', marginBottom:30, marginTop:3}}>
                        <View style={{ backgroundColor: '#242424', borderRadius:3, width: 100, height:5}}></View>
                    </View>
                    <View style={{ alignItems: 'center', borderBottomColor: '#C5C5C5', borderBottomWidth:0.5}}>
                        <Image style={{ width: wp('60%'), height: wp('60%'), resizeMode:'contain' }} source={{ uri: props.data.image }}/>
                        <View style={{ flexDirection:'row', alignItems:'center', justifyContent:'space-between', width:'100%', padding: 20}}>
                            <View>
                                <MyAppText style={{ fontSize: actuatedNormalize(16), color: '#1E2432' }}>{props.data.name}</MyAppText>
                                <MyAppText style={{ fontSize: actuatedNormalize(14), color: '#FF9D00', marginTop: 5 }}>{props.data.price_formated}</MyAppText>
                            </View>
                            {
                                (parseInt(props.data.wishistflag)) ?
                                    <TouchableOpacity onPress={()=>props.deleteWish(props.data.product_id)} style={{}}>
                                        <Image source={imageSource.icon_fav_mark_active} style={{ resizeMode: 'contain', width: 25, height: 25 }} />
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity onPress={()=>props.addWish(props.data.product_id)}  style={{}}>
                                        <Image source={imageSource.icon_fav_mark} style={{ resizeMode: 'contain', width: 25, height: 25 }} />
                                    </TouchableOpacity>
                            }
                        </View>
                    </View>
                    <View style={{ marginTop: 10, alignItems:'center', justifyContent:'center'}}>
                        <MyAppText style={{ padding: 10, color: '#707070', fontSize: actuatedNormalize(14) }}>Quantity</MyAppText>
                        <View style={{ marginTop:10, flexDirection:'row', alignItems:'center', width: '50%' }}>
                            <TouchableOpacity onPress={() => manipulateQuantity('DECREMENT') } style={{ justifyContent:'center', alignItems:'center', borderWidth: 1, borderColor:'#CBC9C9', borderRadius:7}}>
                                <MyAppText style={{ fontSize: actuatedNormalize(25),padding: 0, paddingHorizontal:12 }}>&#x2212;</MyAppText>
                            </TouchableOpacity>
                            <MyAppText style={{ fontSize: actuatedNormalize(25), flex: 1, textAlign: 'center', color: '#007FEA' }}>{itemqty}</MyAppText>
                            <TouchableOpacity onPress={() => manipulateQuantity('INCREMENT')} style={{ justifyContent: 'center', alignItems: 'center',  borderWidth: 1, borderColor: '#CBC9C9', borderRadius: 7 }}>
                                <MyAppText style={{ fontSize: actuatedNormalize(25),padding: 0, paddingHorizontal:12 }}>&#x2b;</MyAppText>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => props.manipulateCart(itemqty)} style={{ alignSelf: 'center', width: '80%', backgroundColor: '#007ee9', padding: 15, marginVertical: 30, borderRadius: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <MyAppText style={{ textAlign: 'center', color: '#FFF', fontSize: actuatedNormalize(14) }}>Add to Cart</MyAppText>
                        <MyAppText style={{ textAlign: 'center', color: '#FFF', fontSize: actuatedNormalize(14) }}>{parseInt(props.data.price)*itemqty}</MyAppText>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export const ForgetPop = (props) => {

    return (
        <Modal
            style={{backgroundColor: 'transparent',margin: 0, alignItems: undefined,justifyContent: undefined}}
            //animationType="slide"
            //transparent={true}
            isVisible={props.visible}
            hasBackdrop={false}
            swipeDirection={'down'}
            onBackButtonPress={props.closePop}
            onBackdropPress={props.closePop}
            propagateSwipe={true}
            onSwipeComplete={props.closePop}
        >
            <View style={{ flex:1, justifyContent:'flex-end', backgroundColor: 'rgba(0,0,0,0.5)'  }}>
                <View style={{  backgroundColor:'#FFF', borderWidth: 0.3, borderColor:'#EAEAEA', borderTopLeftRadius: 25, borderTopRightRadius: 25 }}>
                    <View style={{ alignItems: 'center', marginBottom:30, marginTop:3}}>
                        <View style={{ backgroundColor: '#242424', borderRadius:3, width: 100, height:5}}></View>
                    </View>
                    <View style={{ alignItems: 'center', borderBottomColor: '#C5C5C5', borderBottomWidth:0.5}}>
                        <MyAppText style={{ fontSize: actuatedNormalize(16), color: '#1E2432' }}>Change Password</MyAppText>
                        <View style={{ width:'100%', padding: 20}}>
                            <TextButtonGroup secureTextEntry={true} style={{ marginTop: 20 }} isRequired={true} label={'Existing Password'} onChangeText={(value) => props.updatePasswordContent('oldpassword', value) } value={props.data.oldpassword}/>
                            <TextButtonGroup secureTextEntry={true} style={{ marginTop: 20 }} isRequired={true} label={'New Password'} onChangeText={(value) => props.updatePasswordContent('newpassword', value) } value={props.data.newpassword}/>
                            <TextButtonGroup secureTextEntry={true} style={{ marginTop: 20 }} isRequired={true} onChangeText={(value) => props.updatePasswordContent('confirmpassword', value) } value={props.data.confirmpassword}/>
                        </View>
                    </View>
                    <TouchableOpacity onPress={props.onPress} style={{ alignSelf: 'center', width: '80%', backgroundColor: '#007ee9', padding: 15, marginVertical: 30, borderRadius: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <MyAppText style={{ textAlign: 'center', color: '#FFF', fontSize: actuatedNormalize(14) }}>Save Changes</MyAppText>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}
export const FloatingBacKButton = (props) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ zIndex: 100, position: 'absolute', top: StatusBarHeight+10, left: 20, width: 25, height: 25 }}>
            <Image source={(props.image) ? props.image : imageSource.icon_back_arrow} style={{ width: 25, height: 25 }} />
        </TouchableOpacity>
    )
}

export const CarryBox = (props) => (
    <View style={{ backgroundColor: '#FFFFFF', marginHorizontal: 20, marginVertical:5, borderRadius:5, borderWidth: 0.5, borderColor: '#EAEAEA' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 3, alignItems: 'flex-start',padding: 10 }}>

            <View style={{ flex:3}}>
                <MyAppText style={{ fontSize: actuatedNormalize(16),padding:2}}>{props.data.first_name} {props.data.last_name}</MyAppText>
                <MyAppText style={{ fontSize: actuatedNormalize(14),padding:2}}>{translations.MOBILE}:{props.data.mobile}</MyAppText>
            </View>
            <View style ={{alignItems: 'flex-end', flex:1}} >
{
            (parseInt(props.data.favflag)) ?
            <TouchableOpacity onPress={() =>{ props.deleteWish(props.data.carryboy_id)} }>
                <Image source={imageSource.icon_fav_mark_active} style={{ resizeMode: "contain", width: wp('8%'), height: wp('6%') }} />
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={() => { props.addWish(props.data.carryboy_id) } } >
                <Image source={imageSource.icon_fav_mark} style={{ resizeMode: "contain", width: wp('8%'), height: wp('6%') }} />
            </TouchableOpacity>
}
<FontAwesome name="plus-circle" size={wp('8%')} color="#007ee9" style={{alignSelf:'flex-end',paddingTop:10,paddingRight:2}} onPress={() => { props.addCarryBoy(props.data.carryboy_id) } } />
            </View>
        </View>
    </View>
)



//   <View style={{ flex:1,padding:5}}>
// <Image style={{ width: wp('16%'), height: wp('16%'), resizeMode:"cover" }} source={{ uri: props.data.profile_pic}} />
//   </View>
