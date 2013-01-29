
window.localStorage._from_station_telecode = "NFF"
setInterval(function(){ ;
if(window.localStorage._from_station_telecode == "NFF"){window.frames[0].document.querySelector("#fromStation").value="XUN";window.localStorage._from_station_telecode="XUN"}else{window.frames[0].document.querySelector("#fromStation").value="NFF";window.localStorage._from_station_telecode = "NFF"};
window.frames[0].document.querySelector("#submitQuery").click()
},
10000
)