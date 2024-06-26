const searchInput=document.getElementById('search')
let DaySpan = document.getElementById('Day') 
let DateSpan = document.getElementById('Date') 
let countryNameee =document.getElementById('countryName')
let templateDegree=document.getElementById("templateDegrees")
let clearSpann=document.getElementById("clearSpan")
let imgApi=document.getElementById('imgApi')
let humidity=document.getElementById('humidity')
let Wind=document.getElementById('Wind')
let direction=document.getElementById('direction')
//////////////////////////////////// weather Today
let SecondDAy=document.getElementById('SecondDAy')
let imgtomorrow=document.getElementById('imgtomorrow')
let maxtem=document.getElementById('maxtem')
let mintemp=document.getElementById('mintemp')
let imgthirdday=document.getElementById('imgthirdday')
////////////////////////////////////weather Tomorrow
let thirdday=document.getElementById('thirdday')//
let maxtemthirdday=document.getElementById('maxtemthirdday')///
let mintemthirdday=document.getElementById('mintemthirdday')///
//////////////////////////////



if(navigator.geolocation){
  navigator.geolocation.getCurrentPosition(function(position){
 const lat = position.coords.latitude;
 const long = position.coords.longitude;
 weatherDate(`${lat}, ${long}`)
  })
}else{
 console.log('Undefined');
}
 async function weatherDate(NameCountry){
 let response= await fetch(`https://api.weatherapi.com/v1/forecast.json?q=${NameCountry}&days=3&key=059a076820fb45adac7180234241206`)
 let  responseData = await response.json()
 console.log(responseData);
 AddObjects(responseData)
 tommorow(responseData)
 third(responseData)
 console.log(response);
}
searchInput.addEventListener('input' , function(e){

 weatherDate(e.target.value)
})
////////Add Weather Today
function AddObjects(responseData){
console.log(responseData ,'responseData');
const lastDate=responseData.current.last_updated;
let DAte = new Date(lastDate)
const currentDay =DAte.toLocaleDateString('en-us' , {weekday:'long'})//asm l asbo3
const TodayNumber = DAte.getDate(); //asm l yom
const transMonth = DAte.toLocaleDateString("en-us" , {month:'long'})//asm l shahr
const CountryName = responseData.location.name
const temToday = responseData.current.temp_c
const clear =responseData.current.condition.text
const imgs =responseData.current.condition.icon
const humiditys =responseData.current.humidity
const Winds =responseData.current.wind_kph
const Kilo = 'm/h'
const percentage = '%'
const directions =responseData.current.wind_dir

DaySpan.innerHTML=currentDay;
DateSpan.innerHTML=`${TodayNumber} , ${transMonth}`
countryNameee.innerHTML=`${CountryName}`
templateDegree.innerHTML=`${temToday}℃`
clearSpann.innerHTML=`${clear}`
imgApi.setAttribute('src' , imgs)
humidity.innerHTML=`${humiditys}${ percentage}`
Wind.innerHTML=`${Winds} ${Kilo}`
direction.innerHTML=`${directions}`
}
//////// Tommorrow
function tommorow({ forecast}){
 SecondDAy.innerHTML= new Date(forecast.forecastday[1].date).toLocaleDateString('en-us',{weekday:'long'});
 console.log(forecast.forecastday);
 imgtomorrow.setAttribute('src', forecast.forecastday[1].day.condition.icon)//
 const maxtems=forecast.forecastday[1].day.maxtemp_c
 const mintemps=forecast.forecastday[1].day.mintemp_c
 maxtem.innerHTML=`${maxtems}℃`
 mintemp.innerHTML=`${mintemps}℃`
}
////////// Third Day
function third({ forecast}){
  thirdday.innerHTML= new Date(forecast.forecastday[2].date).toLocaleDateString('en-us',{weekday:'long'});
 console.log(forecast.forecastday);
 imgthirdday.setAttribute('src', forecast.forecastday[2].day.condition.icon)//
 const maxtemthirddays=forecast.forecastday[2].day.maxtemp_c
 const mintemthirddays=forecast.forecastday[2].day.mintemp_c

 maxtemthirdday.innerHTML=`${maxtemthirddays}℃`
 mintemthirdday.innerHTML=`${mintemthirddays}℃`
}
