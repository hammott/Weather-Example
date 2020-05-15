let uri = './sample-weather.json';
let req = new Request(uri, { method: 'GET' });
let container, df;

document.addEventListener('DOMContentLoaded', init);

function init(){
    container = document.getElementById('container');
    df = new DocumentFragment();

    fetch(req)
        .then((response) => {
            if(response.ok) {
                return response.json();
            }else{
                throw new Error('Bad Request HTTP');
            }
        })
        .then((jsonData) => {
            jsonData.hourly.data.forEach((hour) =>{
                let div = document.createElement('div');
                div.classList.add('hour');

                let timestamp = hour.time;
                div.id = 'ts_'+timestamp.toString();

                let temp = parseInt(hour.temperature);
                div.textContent = temp.toString().concat('\u00B0');
                div.title = hour.summary;
                let span = document.createElement('span');
                let timmy = new Date(timestamp * 1000)
                span.textContent = timmy.getHours().toString().concat(":00");
                div.appendChild(span);
                df.appendChild(div);
            })
            container.appendChild(df);
            //Highlight the times when it will be raining
            jsonData.hourly.data.filter((hour) => {
                if(hour.precipIntensity > 0.5) {
                    return true;
                }
                return false;
            }).map((hour) => {
                return hour.time;
            }).forEach((timestamp) => {
                let id = 'ts_'.concat(timestamp);
                document.getElementById(id).classList.add('precip');
            });
            let highObj = jsonData.hourly.data.reduce((accumulator , hour) => {
                if(hour.temperature > accumulator.temp){
                    return{temp : hour.temperature, time: hour.time};
                }else{
                    return accumulator;
                }
            }, {temp: -100, time:1000})

            let id ='ts_'+highObj.time;
            document.getElementById(id).classList.add('hot')
        })
        .catch((err) => {
            console.log(err.message);
        })
}