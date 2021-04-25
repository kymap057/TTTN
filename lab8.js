const url = require('url');
const link = "https://test.com?lab=8";

var linkParse = url.parse(link,true);
console.log(linkParse);
