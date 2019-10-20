var json = document.getElementById("json-data").textContent;
var obj = JSON.parse(json);
console.log(obj);

var topics = obj.topics;
var topic1 = document.getElementById("topic1");
topic1.textContent = topics[0];
var topic2 = document.getElementById("topic2");
topic2.textContent = topics[1];
var topic3 = document.getElementById("topic3");
topic3.textContent = topics[2];

var scores = [];
var talkSum = 0;
var talk;
var active_rate = [];

obj.logs.forEach(function(value) {
  active_rate.push(Math.round(value.active_rate * 100));
});

for (var i = 0; i < active_rate.length; i++) {
  talkSum += active_rate[i];
}
talk = talkSum / active_rate.length;

obj.logs.forEach(function(value) {
  scores.push(Math.round(value.score * 100));
});

var array = [...Array(obj.logs.length).keys()];
console.log(array);

// ダミーデータ
var lineData = {
    labels: [...Array(obj.logs.length).keys()],
    datasets: [{
      label: '',
      data: scores,
      borderColor: '#E86560',
      fill: false,
    }]
  };

var pieData = {
  labels: ['conversation','silence'],
  datasets: [{
    data: [talk, 100 - talk],
    backgroundColor: ['#E86560', '#0064b3']
  }]
};



//データの取得

var options = {
    scales: {
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Score",              
              fontSize: 14,
              fontColor: "#d0d2ff",
              

            },
            ticks: {
                suggestedMin: 0, 
                siggestedMax: 100,
                stepSize: 10,
                fontColor: "#d0d2ff",
            },
            gridLines: {
              // color: "#d0d2ff"
              color: "#105E7F"
            }
        }
      ],
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "ID",
            fontsize: 14,
            fontColor: "#d0d2ff"
          },
          ticks :{
            fontColor: "#d0d2ff",
           
          },
          gridLines: {
            // color: "#d0d2ff"
            color: "#105E7F"
          }
        }
      ]
  
    },
    title : {
        display: true,
        text: "overview",
        fontSize: 20,
        fontColor: "#d0d2ff"
    },
    legend: {
        display: false
    }
};

var line = document.getElementById("line");
var lineChart = new Chart(line, {
    type: 'line',
    data: lineData,
    options: options
});

var space = document.getElementById("space");
var spaceChart = new Chart(space, {
    type: 'doughnut',
    data: pieData,
    options: {
        cutoutPercentage: 40,
        responsive: true,
        title: {
          display: true,
          fontSize: 20,
          text: "Conversation Rate",
          fontColor: "#d0d2ff"
        },
        legend: {
          display: false
        }
    }
});

// var domination = document.getElementById("domination");
// var domination = new Chart(domination, {
//     type: 'doughnut',
//     data: dominationData,
//     options: {
//         cutoutPercentage: 40,
//         title : {
//           display: true,
//           fontSize: 20,
//           text: "Domination Rate",
//           fontColor: "#d0d2ff"
//         },
//         legend: {
//           display: false
//           // fontColor: "#d0d2ff",
//         }
//     }
// });

document.getElementById('line').onclick = function(e) {
  var activePoints = lineChart.getElementsAtEvent(e);
    if (activePoints.length > 0) {
      var clickedElementIndex = activePoints[0]['_index'] + 1;
      console.log(clickedElementIndex);
      window.location.href = '/log/' +  clickedElementIndex;
    }
  
};

