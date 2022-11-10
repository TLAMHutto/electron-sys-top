const path = require('path');
const osu = require('node-os-utils');
const cpu = osu.cpu;
const mem = osu.mem;
const os = osu.os;



let cpuOverLoad = 80;
let alertFrequncy = 10;

// notifyUser({
//     title: 'CPU Overload',
//     body: `CPU is over ${cpuOverLoad}%`,
//     icon: path.join(__dirname, 'img', 'icon.png')
// })


//Run every 2 seconds
setInterval(()=> {
    //CPU usage
    cpu.usage().then(function(info) {
        document.getElementById('cpu-usage').innerHTML = info + '%';
        document.getElementById('cpu-progress').style.width = info + '%';
        if(info > cpuOverLoad){
            document.getElementById('cpu-progress').style.backgroundColor = 'red';
        }else{
            document.getElementById('cpu-progress').style.backgroundColor = 'green';
        }
    

    }).catch(function(err) {
        console.log(err);
    });

    cpu.free().then(info => {document.getElementById('cpu-free').innerHTML = info + '%';}).catch(function(err) {
        console.log(err);
    })
    document.getElementById('sys-uptime').innerHTML = secondsToDhms(os.uptime());
}, 2000);

//Set model
document.getElementById('cpu-model').innerHTML = cpu.model();
//Computer name
document.getElementById('comp-name').innerHTML = os.hostname();

//os
document.getElementById('os').innerHTML = `${os.type()} ${os.platform()} ${os.arch()}`;
console.log(osu);
//Total memory
mem.info().then(info => {
    document.getElementById('mem-total').innerHTML = info.totalMemMb;
});

function secondsToDhms(seconds){
    seconds =+seconds;
    const d = Math.floor(seconds / (3600*24));
    const h = Math.floor((seconds - d*3600*24) / 3600);
    const m = Math.floor((seconds - d*3600*24 - h*3600) / 60);
    const s = Math.floor(seconds - d*3600*24 - h*3600 - m*60);
    return `${d} days ${h} hours ${m} minutes ${s} seconds`;
}

function notifyUser(options){
    new Notification(options.title, options);
}