const path = require('path');
const osu = require('node-os-utils');
const cpu = osu.cpu;
const mem = osu.mem;
const os = osu.os;

//Run every 2 seconds
setInterval(()=> {
    //CPU usage
    cpu.usage().then(function(info) {
        document.getElementById('cpu-usage').innerHTML = info + '%';
    }).catch(function(err) {
        console.log(err);
    });

    cpu.free().then(info => {document.getElementById('cpu-free').innerHTML = info + '%';}).catch(function(err) {
        console.log(err);
    })
}, 2000);

//Set model
document.getElementById('cpu-model').innerHTML = cpu.model();
//Computer name
document.getElementById('comp-name').innerHTML = os.hostname();

//os
document.getElementById('os').innerHTML = `${os.type()} ${os.platform()} ${os.arch()}`;

//Total memory
mem.info().then(info => {
    document.getElementById('mem-total').innerHTML = info.totalMemMb;
});