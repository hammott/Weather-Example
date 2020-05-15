// let uri = './sample-weather.json';


// let req = new Request(uri,{method:'GET'});
let containernew;


document.addEventListener('DOMContentLoaded', weather);

function weather (){
    containernew = document.getElementById('Newcontainer');

    fetch(req)
        .then((response) => {
            if(response.status == 200){
                console.log('ok',response);
                return response.json();
            }else{
                throw new Error ('Bad Request HTTP')
            }
        })
        .then((json) => {
            console.log(json);
            json.hourly.data.forEach((hour) => {
                let temp = parseInt(hour.temperature);
                let timestamp = hour.time;
                let getTime = new Date(timestamp*1000);
                let id = 'tt_'+timestamp.toString();


                containernew.innerHTML += `
                <div class="hour" id="${id}">
                    ${temp.toString()+'\u00B0'}
                    <span>
                        ${getTime.getHours().toString()+":00"}
                    </span>
                </div>
                `
            })
            json.hourly.data.filter((hour) => {
                if(hour.precipIntensity > 0.5 ){
                    return true;
                }
                return false;
            }).map((hour) => {
                return hour.time;
            }).forEach((precip) => {
                let newid = 'tt_'+precip;
                console.log(newid);
                document.getElementById(newid).classList.add('precip');
            })
            let highTemp = json.hourly.data.reduce((acc,hour) => {
                if (hour.temperature > acc.temp) {
                    return{temp : hour.temperature, time: hour.time};
                }else{
                    return acc
                }
            }, {temp:-100 , time:1000})
            let newid ='tt_'+highTemp.time;
            document.getElementById(newid).classList.add('hot')
        })
        .catch((err) => console.log(err.message))
}