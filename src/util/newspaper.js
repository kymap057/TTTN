const request = require('request');
const Axios = require('axios').default;
const url = 'http://gw.vnexpress.net/bt?site_id=1000000&category_id=1000000&showed_area=trangchu_beta:15,doanhnghiep:15,pageview:15,vne_anh:15&limit=15&data_select=title,share_url,thumbnail_url,lead,location_name'

module.exports = async (callback) => {
    var newspaper1 = [];
    const result = await Axios({
        method: 'get',
        url: url,
        responseType: 'json'
    })
        .then(response => {
           return response.data;
        })
        .catch(e => {
            return "connect sever fail...!";});
    if(!result.data){
        console.log("ERROR newspaper");
        callback(true,undefined);
    }
    else{
        newspaper1 =  newspaper1.concat(result.data.trangchu_beta.data);
        newspaper1 =  newspaper1.concat(result.data.doanhnghiep.data);
        newspaper1 =  newspaper1.concat(result.data.pageview.data);
        newspaper1 =  newspaper1.concat(result.data.vne_anh.data);
        console.log("array",newspaper1.length);
        callback(undefined,newspaper1);
    }
}