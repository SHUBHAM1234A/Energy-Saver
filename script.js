var result;
var temp;
function showPosition() {
  result = document.getElementById("result");
  document.getElementById("tempbtn").innerText = "Loading...";
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    result.innerHTML = "Getting the position information...";
  } else {
    document.getElementById("tempbtn").innerText = "Error";
    alert("Sorry, your browser does not support HTML5 geolocation.");
  }
}
async function successCallback(position) {
  var latlong = {
    lat: position.coords.latitude,
    lng: position.coords.longitude,
  };
  console.log(latlong);
  var a = Math.round(latlong.lat);
  var b = Math.round(latlong.lng);
  await fetch(`https://fcc-weather-api.glitch.me/api/current?lat=${a}&lon=${b}`)
    .then((response) => response.json())
    .then((json) => {
      console.log(JSON.stringify(json, null, 2));
      result.innerHTML = `${json.main.temp}&deg;C`;
      temp = json.main.temp;
      document.getElementById("toremove").remove();
      result.style.opacity = 1;
      document.getElementById("tempbtn").remove();
      if (json.weather[0].icon == undefined) {
        document.getElementById("imglol").src = "./Images/thermometer.png";
      } else {
        document.getElementById("imglol").src = json.weather[0].icon;
      }
    })
    .catch(function (err) {
      console.warn("Something went wrong.", err);
    });
  afterThat();
}
function errorCallback(error) {
  document.getElementById("tempbtn").innerText = "Error";
  result.style.opacity = 1;
  if (error.code == 1) {
    result.innerHTML =
      "You've decided not to share your position, but it's OK. We won't ask you again.";
  } else if (error.code == 2) {
    result.innerHTML =
      "The network is down or the positioning service can't be reached.";
  } else if (error.code == 3) {
    result.innerHTML =
      "The attempt timed out before it could get the location data.";
  } else {
    result.innerHTML = "Geolocation failed due to unknown error.";
  }
}
function afterThat() {
  var div = document.getElementById("td");
  var h3 = div.appendChild(document.createElement("h3"));
  h3.innerText = "Enter the details of your Geyser(Water Heater)";
  h3.setAttribute("id", "h39");
  h3.style.marginBottom = "40px";
  div.appendChild(document.createElement("div")).setAttribute("id", "input1");
  div.appendChild(document.createElement("div")).setAttribute("id", "input2");
  div.appendChild(document.createElement("div")).setAttribute("id", "input3");
  var p1 = document
    .getElementById("input1")
    .appendChild(document.createElement("p"));
  p1.innerText = "Capacity: ";
  var p2 = document
    .getElementById("input2")
    .appendChild(document.createElement("p"));
  p2.innerText = "Required Temperature: ";
  var p3 = document
    .getElementById("input3")
    .appendChild(document.createElement("p"));
  p3.innerText = "Rated Power: ";
  var ipt1 = document
    .getElementById("input1")
    .appendChild(document.createElement("input"));
  var ipt2 = document
    .getElementById("input2")
    .appendChild(document.createElement("input"));
  var ipt3 = document
    .getElementById("input3")
    .appendChild(document.createElement("input"));
  ipt1.setAttribute("type", "text");
  ipt2.setAttribute("type", "text");
  ipt3.setAttribute("type", "text");
  ipt1.setAttribute("placeholder", "Capacity(litres)");
  ipt2.setAttribute("placeholder", "Required Temperature(degC)");
  ipt3.setAttribute("placeholder", "Rated Power(watts)");
  ipt1.setAttribute("id", "cap");
  ipt2.setAttribute("id", "temp");
  ipt3.setAttribute("id", "pow");
  ipt1.setAttribute("value", "25");
  ipt2.setAttribute("value", "30");
  ipt3.setAttribute("value", "2500");
  var btn = div.appendChild(document.createElement("button"));
  btn.setAttribute("id", "btn");
  btn.innerText = "Calculate Time";
  btn.addEventListener("click", function () {
    var a1 = document.getElementById("cap").value;
    var b2 = document.getElementById("temp").value;
    var c3 = document.getElementById("pow").value;
    if (isNaN(a1) || isNaN(b2) || isNaN(c3)) {
      return alert("Please enter valid numbers");
    }
    var a = parseFloat(a1);
    var b = parseFloat(b2);
    var c = parseFloat(c3);
    var res = (a * 4184 * (b - temp)) / c;
    var element = document.getElementById("element");
    if (typeof element != "undefined" && element != null) {
      element.innerText = `${res} seconds`;
    } else {
      element = div.appendChild(document.createElement("h3"));
      element.setAttribute("id", "element");
      element.innerText = `${res} seconds`;
    }
    var timerBtn = div.appendChild(document.createElement("a"));
    timerBtn.setAttribute("id", "timerBtn");
    timerBtn.setAttribute("href", "timer.html");
    timerBtn.innerText = "Start Timer";
    localStorage.setItem("time", Math.round(res));
  });
}
