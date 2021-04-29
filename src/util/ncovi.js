const
    axios = require('axios'),
    https = require('https'),
    { parse } = require('node-html-parser'),
    config = {
        method: 'get',
        url: 'https://ncov.moh.gov.vn/vi',
        headers: {},
        httpsAgent: new https.Agent({ rejectUnauthorized: false })
    }


const nCoV= async ()=> {
    let nCoV_Result=[];
    await axios(config).then(function (response) {
        const root = parse(response.data);
        //console.log(root);
        const table = root.querySelector('#sailorTable').toString();
        table.match(/<tr[\s\S]*?<\/tr>/g).forEach(async tr => { 
            if(tr.match(/<td[\s\S]*?<\/td>/g) != null){
                const data = await tr.match(/<td[\s\S]*?<\/td>/g);
                // console.log("success..!");
                await nCoV_Result.push({
                    bn: data[0].replace(/(<([^>]+)>)/gi, ""),
                    age: data[1].replace(/(<([^>]+)>)/gi, ""),
                    city: data[2].replace(/(<([^>]+)>)/gi, ""),
                    status: data[3].replace(/(<([^>]+)>)/gi, ""),
                    country: data[4].replace(/(<([^>]+)>)/gi, "")
                   // cai5: data[5].replace(/(<([^>]+)>)/gi, "")
                })
            }
        })
    }).catch(function (error) {
        return null;
    });
    return nCoV_Result;
}
module.exports.SumCov1 = async ()=>{
    const data = await nCoV();
    //sum1: đang trị, sum2: khỏi, sum3:tử
    var sum1 = 0, sum2=0, sum3 =0;
    data.forEach(x=>{
        if(x.status==='Đang điều trị')
            sum1 = sum1 +1*1;
        else if(x.status==='Khỏi')
            sum2 =sum2+1*1;
        else 
            sum3=sum3+1*1;
    })
    var sum = sum1+sum2+sum3*1;
    return {sum,sum1,sum2,sum3,data};
}
