import axios from 'axios';
import { JSHmac, CONSTANTS } from "react-native-hash";
import AsyncStorage from '@react-native-community/async-storage';
//const BASE_URL = 'http://ice.shreewebs.com';
//const BASE_URL = 'http://ice.shreewebs.com';
const BASE_URL = 'http://thaobo.com';
const Model = {
    async getLogin(username, password) {
        try {

          let deviceToken;
          deviceToken = null;
          try {
            deviceToken =  await AsyncStorage.getItem('deviceToken');
          } catch(e){
            console.log(e);
          }

            const LANG = await getLang()
            const PARAMS = '{"passphrase":"' + password + '","username":"' + username + '","frm_mode":"get_login","uuid":"'+deviceToken+'","LANGCODE":"EN"}'
console.log("-------------------------------");

console.log(PARAMS);
            const HMAC = await getHmac(PARAMS)
            const HEADER = getHeader(HMAC)


            const response = await axios.post(`${BASE_URL}/ser_login_registration/get_login`, PARAMS, { headers: HEADER});
            return response.data;
        }
        catch (err) {
            return [];
        }
    },
    async registerUser(postdata) {
        try {
const fname = postdata.first_name.trim()
const mname = postdata.middle_name.trim()
const lname = postdata.last_name.trim()
const email = postdata.email.trim()
const password = postdata.passphrase.trim()
const stateid = postdata.state_id
const districtid = postdata.district_id
const postcode = postdata.postcode.trim()
const address = postdata.address_1.trim()
const mobile = postdata.mobile.trim()
const lang = postdata.LANGCODE.trim()
const businesstype = postdata.business_type.trim()
const gender = postdata.gender.trim()
const uuid = postdata.uuid.trim()
//const frmmode = postdata.frm_mode.trim()

  const PARAMS = '{"passphrase":"' + password + '","first_name":"' + fname + '","last_name":"' + lname + '","middle_name":"' + mname + '","email":"' + email + '","mobile":"' + mobile + '","postcode":"' + postcode + '","address_1":"' + address + '","business_type":"' + businesstype + '","gender":"' + gender + '","state_id":"' + stateid + '","district_id":"' + districtid + '","frm_mode":"get_register","uuid":"'+uuid+'","LANGCODE":"'+lang+'"}'

            const HMAC = await getHmac(PARAMS)
            const HEADER = getHeader(HMAC)
              console.log("-------------------------------");
            console.log(PARAMS);
            const response = await axios.post(`${BASE_URL}/ser_login_registration/get_register`, PARAMS, { headers: HEADER});
              console.log(response.data);
            return response.data;
        }
        catch (err) {
            return [];
        }
    },
    async getProductList(categoryid='') {
        try {
            const LANG = await getLang()
            const USERID = await getUserId()
            const PARAMS = '{"frm_mode":"getProductsList","category_id":"'+categoryid+'","sub_category_id":"","keywords":"","sort_by":"price_lowtohigh","user_id":"'+USERID+'","uuid":"mobile_token","LANGCODE":"'+LANG+'"}';
            const HMAC = await getHmac(PARAMS)
            const HEADER = getHeader(HMAC)
            const response = await axios.post(`${BASE_URL}/ser_shop/getProductsList`, PARAMS, { headers: HEADER });
            return response.data;
        }
        catch (err) {
            return [];
        }
    },
    async getHome() {
        try {
            const LANG = await getLang()
            const USERID = await getUserId()
            const PARAMS = '{ "uuid": "1111", "user_id": "'+USERID+'", "frm_mode": "get_home_data","LANGCODE": "'+LANG+'" }';
            const HMAC = await getHmac(PARAMS)
            const HEADER = getHeader(HMAC)
            const response = await axios.post(`${BASE_URL}/ser_shop/get_home_page`, PARAMS, { headers: HEADER });
            return response.data;
        }
        catch (err) {
            console.log(err);
            return [];
        }
    },
    async getWishList(){
        try {
            const LANG = await getLang()
            const USERID = await getUserId()
            const PARAMS = '{"frm_mode": "getWishlist","product_id": "","user_id": "' + USERID + '","uuid": "mobile_token","LANGCODE": "' +LANG+'"}';
            const HMAC = await getHmac(PARAMS)
            const HEADER = getHeader(HMAC)
            const response = await axios.post(`${BASE_URL}/ser_shop/getWishlist`, PARAMS, { headers: HEADER });
            return response.data;
        }
        catch (err) {
            return [];
        }
    },
    /*,
    async addCarry(carryboy_id) {
        try {
          const token = await getDeviceToken()

            const USERID = await getUserId()

            const PARAMS = '{"frm_mode": "addCarryboy", "carryboy_id": "' + carryboy_id + '", "user_id": "' + USERID +'", "uuid": "'+ token +'","LANGCODE": "EN"}'

            const HMAC = await getHmac(PARAMS)
            const HEADER = getHeader(HMAC)

            const response = await axios.post(`${BASE_URL}/ser_shop/addCarryboy`, PARAMS, { headers: HEADER });
            return response.data;
        }
        catch (err) {
            return [];
        }
    },
    async deleteCarry(carryboy_id) {
        try {

           const token = await getDeviceToken()

            const USERID = await getUserId()

            const PARAMS = '{"frm_mode": "deleteCarryboy", "carryboy_id": "' + carryboy_id + '", "user_id": "' + USERID + '", "uuid": "'+ token +'","LANGCODE": "EN"}'
console.log('abcd=====1234== '+PARAMS );
            const HMAC = await getHmac(PARAMS)

            const HEADER = getHeader(HMAC)
            const response = await axios.post(`${BASE_URL}/ser_shop/deleteCarryboy`, PARAMS, { headers: HEADER });
            return response.data;
        }
        catch (err) {
            return [];
        }
    },
    async addWish(carryboy_id) {
        try {
          const token = await getDeviceToken()

            const USERID = await getUserId()

            const PARAMS = '{"frm_mode": "addCarryboyFavList", "carryboy_id": "' + carryboy_id + '", "user_id": "' + USERID +'", "uuid": "'+ token +'","LANGCODE": "EN"}'

            const HMAC = await getHmac(PARAMS)
            const HEADER = getHeader(HMAC)

            const response = await axios.post(`${BASE_URL}/ser_shop/addCarryboyFavList`, PARAMS, { headers: HEADER });
            return response.data;
        }
        catch (err) {
            return [];
        }
    },
    async deleteWish(carryboy_id) {
        try {

           const token = await getDeviceToken()

            const USERID = await getUserId()

            const PARAMS = '{"frm_mode": "deleteCarryboyFavList", "carryboy_id": "' + carryboy_id + '", "user_id": "' + USERID + '", "uuid": "'+ token +'","LANGCODE": "EN"}'
console.log('abcd=====1234== '+PARAMS );
            const HMAC = await getHmac(PARAMS)

            const HEADER = getHeader(HMAC)
            const response = await axios.post(`${BASE_URL}/ser_shop/deleteCarryboyFavList`, PARAMS, { headers: HEADER });
            return response.data;
        }
        catch (err) {
            return [];
        }
    },
    */
    async getStateList() {
        try {
            const LANG = await getLang()
            const USERID = await getUserId()
            const PARAMS = '{"frm_mode":"getStateDistictList","user_id":"'+USERID+'","uuid":"","LANGCODE":"'+LANG+'"}'
            const HMAC = await getHmac(PARAMS)
            const HEADER = getHeader(HMAC)
            const response = await axios.post(`${BASE_URL}/ser_login_registration/getStateDistictList`, PARAMS, { headers: HEADER });
            return response.data;
        }
        catch (err) {
            return [];
        }
    },
    async validateCouponCode(code) {
        try {
            const LANG = await getLang()
            const USERID = await getUserId()
            const PARAMS = '{"frm_mode":"validateCoupon","couponcode":"'+code+'","user_id":"'+USERID+'","uuid":"mobile_token","LANGCODE":"'+LANG+'"}'
            const HMAC = await getHmac(PARAMS)
            const HEADER = getHeader(HMAC)
            const response = await axios.post(`${BASE_URL}/ser_shop/validateCoupon`, PARAMS, { headers: HEADER });
            return response.data;
        }
        catch (err) {
            return [];
        }
    },
    async getAllShippingAddress() {
        try {
            const LANG = await getLang()
            const USERID = await getUserId()
            const PARAMS = '{"frm_mode":"getAddresses","user_id":"'+USERID+'","uuid":"mobile_token","LANGCODE":"'+LANG+'"}'
            const HMAC = await getHmac(PARAMS)
            const HEADER = getHeader(HMAC)
            const response = await axios.post(`${BASE_URL}/ser_shop/getAddresses`, PARAMS, { headers: HEADER });
            return response.data;
        }
        catch (err) {
            return [];
        }
    },
    async addAddress(PARAMS) {
        try {
            const HMAC = await getHmac(PARAMS)
            const HEADER = getHeader(HMAC)
            const response = await axios.post(`${BASE_URL}/ser_shop/add_address`, PARAMS, { headers: HEADER });
            return response.data;
        }
        catch (err) {
            return [];
        }
    },
    async updateAddress(PARAMS) {
        try {
            const HMAC = await getHmac(PARAMS)
            const HEADER = getHeader(HMAC)
            const response = await axios.post(`${BASE_URL}/ser_shop/updateAddress`, PARAMS, { headers: HEADER });
            return response.data;
        }
        catch (err) {
            return [];
        }
    },
    async checkout(PARAMS) {
        try {
            const HMAC = await getHmac(PARAMS)
            const HEADER = getHeader(HMAC)
            const response = await axios.post(`${BASE_URL}/ser_shop/confirm_order`, PARAMS, { headers: HEADER });
            return response.data;
        }
        catch (err) {
            return [];
        }
    },
    async orderList() {
        try {
            const LANG = await getLang()
            const USERID = await getUserId()
            const PARAMS = '{"frm_mode":"getOrderList","user_id":"'+USERID+'","uuid":"mobile_token","LANGCODE":"'+LANG+'"}'
            const HMAC = await getHmac(PARAMS)
            const HEADER = getHeader(HMAC)
            const response = await axios.post(`${BASE_URL}/ser_shop/getOrderList`, PARAMS, { headers: HEADER });
            return response.data;
        }
        catch (err) {
            return [];
        }
    },
    async getAbout() {
        try {
            const LANG = await getLang()
            const PARAMS = '{"frm_mode":"getPageData","section":"aboutus","LANGCODE":"'+LANG+'"}'
            const HMAC = await getHmac(PARAMS)
            const HEADER = getHeader(HMAC)
            const response = await axios.post(`${BASE_URL}/ser_login_registration/getPageData`, PARAMS, { headers: HEADER });
            return response.data;
        }
        catch (err) {
            return [];
        }
    },
    async getFAQ() {
        try {
            const LANG = await getLang()
            const PARAMS = '{"frm_mode":"getFAQ","LANGCODE":"'+LANG+'"}'
            const HMAC = await getHmac(PARAMS)
            const HEADER = getHeader(HMAC)
            const response = await axios.post(`${BASE_URL}/ser_login_registration/getFAQ`, PARAMS, { headers: HEADER });
            return response.data;
        }
        catch (err) {
            return [];
        }
    },
    async changePassword(oldpassword, newpassword) {
        try {
            const LANG = await getLang()
            const USERID = await getUserId()
            const PARAMS = '{"frm_mode":"changePassword","oldpassword":"'+oldpassword+'","newpassword":"'+newpassword+'","user_id":"'+USERID+'","uuid":"mobile_token","LANGCODE":"'+LANG+'"}'
            const HMAC = await getHmac(PARAMS)
            const HEADER = getHeader(HMAC)
            const response = await axios.post(`${BASE_URL}/ser_login_registration/changePassword`, PARAMS, { headers: HEADER });
            return response.data;
        }
        catch (err) {
            return [];
        }
    },
    async setPushNotification(active) {
        try {
            const LANG = await getLang()
            const USERID = await getUserId()
            const PARAMS = '{"frm_mode":"setPushNotification","push_notification":"'+active+'","user_id":"'+USERID+'","uuid":"mobile_token","LANGCODE":"'+LANG+'"}'
            const HMAC = await getHmac(PARAMS)
            const HEADER = getHeader(HMAC)
            const response = await axios.post(`${BASE_URL}/ser_login_registration/setPushNotification`, PARAMS, { headers: HEADER });
            return response.data;
        }
        catch (err) {
            return [];
        }
    },
    async setLanguage(newlang) {
        try {
            const LANG = await getLang()
            const USERID = await getUserId()
            const PARAMS = '{"frm_mode":"setUserLanguage","user_language":"'+newlang+'","user_id":"'+USERID+'","uuid":"mobile_token","LANGCODE":"'+LANG+'"}'
            const HMAC = await getHmac(PARAMS)
            const HEADER = getHeader(HMAC)
            const response = await axios.post(`${BASE_URL}/ser_login_registration/setUserLanguage`, PARAMS, { headers: HEADER });
            return response.data;
        }
        catch (err) {
            return [];
        }
    },
}

const getHeader = (HMAC) => {
    return { 'Accept': 'application/json', 'Content-Type': 'application/json', 'doicex-signature': HMAC };
}
const getHmac = async (params) => {
    const hash = await JSHmac(params, "501ee1944b81bb7018c7d10316854971", CONSTANTS.HmacAlgorithms.HmacSHA256)
    return hash;
}
const getLang = async () => {
    const lang =  await AsyncStorage.getItem('LANG');
    return lang.toString();
}



    const getDeviceToken = async () => {
    //  const lang =  await AsyncStorage.getItem('deviceToken');
    //  return lang.toString();
    return ''
    }

const getUserId = async () => {
    // const user = await AsyncStorage.getItem('USER');
    // if(user!==null){
    //     const userArr = await JSON.parse(user)
    //     return userArr.user_id;
    // }
    // else{
        return '';
  //  }
}
export default Model;
