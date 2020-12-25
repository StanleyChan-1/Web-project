const api =
  "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=en";
const modal = document.getElementById("myModal");
const btn = document.getElementById("location-select-btn");
const span = document.getElementsByClassName("close")[0];

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

var getForecastData = () => {
  fetch(
    "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=fnd&lang=en"
  )
    .then((response) => response.json())
    .then((data) => {
      displayForecastData(data);
    })
    .catch((e) => {
      console.log(e);
    });
};

var getTempStats = () => {
  fetch(
    "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=flw&lang=en"
  )
    .then((response) => response.json())
    .then((data) => {
      displayTempUi(data);
    })
    .catch((e) => {
      console.log(e);
    });
};

var displayTempUi = (data) => {
  // generalSituation tcInfo fireDangerWarning forecastPeriod forecastDesc outlook updateTime
  const generalSituation = data.generalSituation;
  const tcInfo = data.tcInfo;
  const fireDangerWarning = data.fireDangerWarning;
  const forecastPeriod = data.forecastPeriod;
  const forecastDesc = data.forecastDesc;
  const outlook = data.outlook;
  const updateTime = data.updateTime;
  document.getElementById(
    "temp-status"
  ).innerHTML = `<div class="forecast-content">${generalSituation}</div>
  <div class="forecast-content">${tcInfo}</div>
  <div class="forecast-content">${fireDangerWarning}</div>
  <div class="forecast-content">${forecastPeriod}</div>
  <div class="forecast-content">${forecastDesc}</div>
  <div class="forecast-content">Outlook : ${outlook}</div>
  <div class="forecast-content">${updateTime}</div>
  `;
};

var getResult = () => {
  fetch(api)
    .then((response) => response.json())
    .then((data) => {
      locationSelection(data);
      displayDate(data);
      displayReport(data);
      // console.log(data);
    })
    .catch((e) => {
      console.log(e);
    });
};

var displayResult = () => {
  var index = getTemperatureIndex();
  fetch(api)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("place").innerText =
        data.temperature.data[index].place;

      document.getElementById(
        "degree"
      ).innerHTML = `${data.temperature.data[index].value}<span style="font-size:50px">°c</span>`;

      modal.style.display = "none";
    })
    .catch((e) => {
      console.log(e);
    });
};

var displayReport = (data) => {
  var updateTime = getRecordDate(data).time;

  // There is uvindex
  if (data.uvindex === "") {
    const humidity = data.humidity.data[0]; // value place
    const hkoTemp = data.temperature.data[1];
    const reportElement = `<div id="report">
                    <div class="report-container">
                        <img class="report-img"
                            src="https://upload.wikimedia.org/wikipedia/zh/thumb/1/11/Hong_Kong_Observatory_Logo_%282018%29.svg/1200px-Hong_Kong_Observatory_Logo_%282018%29.svg.png"
                            alt="hko temp">
                        <h3>${humidity.place} temperature</h3>

                        <p>
                            At ${updateTime} at the ${humidity.place} the air temperature was ${hkoTemp.value} degrees
                            Celsius
                        </p>
                    </div>
                    <div class="report-container">
                        <img class="report-img"
                            src="https://static-int.testo.com/media/4c/fa/4655130c014a/Teaser-Unterseiten-2000x1500pix_master.jpg"
                            alt="humidity">
                        <h3>Relative humidity</h3>

                        <p>
                            The relative humidity ${humidity.value} percent
                        </p>
                    </div>

                    
                </div>`;
    document.getElementById("report-section").innerHTML = reportElement;
  }
  // There is not uvindex
  else {
    const uv = data.uvindex.data[0];
    // place value desc
    const humidity = data.humidity.data[0]; // value place
    const hkoTemp = data.temperature.data[1];
    const reportElement = `         <div id="report">
                    <div class="report-container">
                        <img class="report-img"
                            src="https://upload.wikimedia.org/wikipedia/zh/thumb/1/11/Hong_Kong_Observatory_Logo_%282018%29.svg/1200px-Hong_Kong_Observatory_Logo_%282018%29.svg.png"
                            alt="hko temp">
                        <h3>${humidity.place} temperature</h3>

                        <p>
                            At ${updateTime} at the ${humidity.place} the air temperature was ${hkoTemp.value} degrees
                            Celsius
                        </p>
                    </div>
                    <div class="report-container">
                        <img class="report-img"
                            src="https://static-int.testo.com/media/4c/fa/4655130c014a/Teaser-Unterseiten-2000x1500pix_master.jpg"
                            alt="humidity">
                        <h3>Relative humidity</h3>

                        <p>
                            The relative humidity ${humidity.value} percent
                        </p>
                    </div>

                    <div class="report-container">
                        <img class="report-img" src="https://image.flaticon.com/icons/png/512/1959/1959413.png"
                            alt="uv">
                        <h3>UV Index</h3>

                        <p>
                            During the past hour the mean UV Index recorded at ${uv.place} was ${uv.value} The intensity
                            of UV
                            radiation was ${uv.desc}.
                        </p>
                    </div>
                </div>`;
    document.getElementById("report-section").innerHTML = reportElement;
  }
};

var displayDate = (data) => {
  var recordTime = getRecordDate(data);

  document.getElementById("current-date").innerText = recordTime.date;
  document.getElementById(
    "update-time"
  ).innerText = `Latest Update: ${recordTime.time}`;
};

var locationSelection = (data) => {
  const temperatureData = data.temperature.data;
  var toggle = false;
  btn.onclick = function () {
    modal.style.display = "block";

    temperatureData.forEach((result, index) => {
      if (toggle !== true) {
        document.getElementById(
          "location-selecter"
        ).innerHTML += `<option class="modal-place id="modal-place${index}" value=${index}>
        ${result.place}
        
        </option>`;
      } else {
        // Prevent duplication
      }
    });

    toggle = true;
  };
};

var getTemperatureIndex = () => {
  var index = document.getElementById("location-selecter").value;
  return index;
};

var getRecordDate = (data) => {
  var recordTime = data.temperature.recordTime.split("");
  var date = "";
  var time = "";
  var toggle = false;

  recordTime.forEach((str) => {
    if (str === "T") {
      toggle = true;
    }
    if (toggle === true) {
      time += str;
    } else {
      date += str;
    }
  });

  return {
    time: time.slice(1, 6),
    date: date,
  };
};

var displayForecastData = (data) => {
  var toggle = false;
  if (toggle === false) {
    data.weatherForecast.forEach((item) => {
      document.getElementById(
        "forecast-nine"
      ).innerHTML += ` <div id="forecast-nine">
            <div class="forecast-card">
                <h2>${item.forecastDate} <span>${item.week}</span></h2>

                <img src="https://www.hko.gov.hk/images/wxicon/pic54.png" alt="icon">
                <p>${item.forecastWind}</p>
                <p>${item.forecastWeather}</p>
                <div>Temperature: <span>${item.forecastMintemp.value}c -
                        ${item.forecastMaxtemp.value}c</span></div>
                <div>Humidity: <span>${item.forecastMinrh.value}% -
                        ${item.forecastMaxrh.value}%</span></div>
            </div>


        
        </div>
           <a class="prev" onclick="plusSlides(false)">&#10094;</a>
            <a class="next" onclick="plusSlides(true)">&#10095;</a>
        `;
    });
  }
  document.getElementsByClassName("forecast-card")[0].className =
    "forecast-card active";
  toggle = true;
};

var plusSlides = (n) => {
  var card = document.getElementsByClassName("forecast-card");
  var length = card.length;
  var currentDisplay = 0;
  if (n === true) {
    for (let i = 0; i < length; i++) {
      if (card[i].classList.length === 2) {
        card[i].className = "forecast-card";
        currentDisplay = i + 1;
        // max= 8
      }
    }
  } else {
    for (let i = 0; i < length; i++) {
      if (card[i].classList.length === 2) {
        card[i].className = "forecast-card";
        currentDisplay = i - 1;
        // min = 0
      }
    }
  }
  if (currentDisplay > 8) {
    currentDisplay = 0;
  } else if (currentDisplay < 0) {
    currentDisplay = 8;
  }
  card[currentDisplay].className = "forecast-card active";
  console.log(currentDisplay);
};

getResult();
getTempStats();
getForecastData();
