var input= document.querySelector('input#location'),
    language = document.querySelector('#language')
    frm = document.querySelector('form'),
    info= document.querySelector('.inf-weather'),
    iconWeb= document.querySelector('#icon-web'),
    notification= document.createElement('p'),
    temp = document.createElement('p'), 
    detail = document.createElement('p')
    image= document.createElement('img');
var rdoTemp = document.querySelector('.rdo-temp');
var checkTemp = document.querySelectorAll('input[name="temp-style"]');
var tempsC ={};
var tempsF ={};
notification.className='notification';
info.appendChild(notification);
notification.textContent='loading...';

temp.className='temp';
detail.className='description';

frm.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(input.value===''){
        notification.style.color ="red";
        notification.textContent="Vui lòng nhập vị trí...!";
        return;
    }
    fetch(`/weather-app?address=${input.value}&lang=${language.value}`)
    .then((response) => {
        response.json().then((data) => {
            if (data.error) {
                notification.textContent=data.error;
                info.removeChild(image);
                info.removeChild(temp);
                info.removeChild(detail);
            }
            else {
                // weatherInf.location=data.location;
                // weatherInf.temp=data.dataWeather.temps.temp;
                // weatherInf.description=data.dataWeather.description;
                // weatherInf.icon=data.dataWeather.icon; 
                //notification.textContent= JSON.stringify(data);
                info.innerHTML='';
                notification.style.color ="black";
                image.src=`./img/icons/${data.dataWeather.icon}.png`;
                temp.textContent= `${data.dataWeather.tempsC.temp.toFixed(2)}°C`;
                notification.textContent= `${data.dataWeather.position.name},${data.dataWeather.position.country}`;
                detail.textContent= data.dataWeather.description;
                tempsC = data.dataWeather.tempsC;
                tempsF =data.dataWeather.tempsF;
                checkTemp[0].checked =true;
                info.appendChild(image)
                info.appendChild(temp);
                info.appendChild(notification);
                info.appendChild(detail);
                rdoTemp.style.display = 'flex'; 
                iconWeb.href=`./img/icons/${data.dataWeather.icon}.png`;
            }
        })
    });
});
for (let i = 0; i < checkTemp.length; i++) {
    checkTemp[i].addEventListener('change',()=>{
        if(checkTemp[i].value=='0'){
            temp.textContent= `${tempsC.temp.toFixed(2)}°C`;
            return;
        }
        if(checkTemp[i].value=='1'){
            temp.textContent= `${tempsF.temp.toFixed(2)}°F`;
            return;
        }
    })
}