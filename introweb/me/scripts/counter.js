let counter = window.localStorage;
let count;
if(counter.getItem("count") > 0) {
    count = counter.getItem("count");
} else {
    counter.setItem("count", 0);
    count = counter.getItem("count")
}
document.getElementById("counterDisp").innerHTML = count;
function clicked() {
    counter.setItem("count", ++count);
    document.getElementById("counterDisp").innerHTML = count;
}
function clearCount() {
    counter.setItem("count", count-=count);
    document.getElementById("counterDisp").innerHTML = count;
}