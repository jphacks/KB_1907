// var jsonData = {'topic': ['サラリーマン', '史上', '最長'], 'possesion': {'2': 0.40429419826404744, '1': 0.5957058017359526}, 'active_rate': 0.6541799908634081, 'score': [0.25399028452463523, 0.14656488549618274, 0.1289607232717812, 0.4616793893129767, 0.5370914073204129, 1.0, 0.0029963615609610583, 0.8254019814844926, 0.0, 0.23688432926532732]
// };
// console.log(jsonData);
// console.log(typeof(jsonData));
var json = document.getElementById("json").value;
// json = json.slice(1);
// json = json.slice(0, -1);
console.log(json);
json = JSON.stringify(json);
var obj = JSON.parse(json);

console.log(typeof(obj));

json = JSON.stringify(json);
var obj = JSON.parse(json);
// console.log(obj);

var topics = obj.topic;
var topic1 = document.getElementById("topic1");
topic1.textContent = topics[0];
var topic2 = document.getElementById("topic2");
topic2.textContent = topics[1];
var topic3 = document.getElementById("topic3");
topic3.textContent = topics[2];

var scores = [];
var domination = Math.round(obj.possesion['1'] * 100);
var talk = Math.round(obj.active_rate * 100);


obj.score.forEach(function(value) {
  scores.push(Math.round(value * 100));
});
// ダミーデータ
var lineData = {
    labels: [1, 2, 3, 4, 5, 6, 7],
    datasets: [{
      label: '',
      data: scores,
      borderColor: '#E86560',
      fill: false,
      // backgroundColor: '#E86560',
    }]
  };

var pieData = {
  labels: ['conversation','silence'],
  datasets: [{
    data: [talk, 100 - talk],
    backgroundColor: ['#E86560', '#0064b3']
  }]
};

var dominationData = {
  labels: ['domination','Non-domination'],
  datasets: [{
    data: [domination, 100 - domination],
    backgroundColor: ['#E86560', '#0064b3']
  }]
};

var lineOptions = {
    scales: {
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Score",              
              fontSize: 14,
              fontColor: "#d0d2ff"

            },
            ticks: {
                suggestedMin: 0, 
                siggestedMax: 100,
                stepSize: 10,
                fontColor: "#d0d2ff"
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
            labelString: "Time",
            fontsize: 14,
            fontColor: "#d0d2ff"
          },
          ticks :{
            fontColor: "#d0d2ff"
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
        text: "Conversation Log",
        fontSize: 20,
        fontColor: "#d0d2ff"
    },
    legend: {
        display: false
    },
    tooltips: {
        mode: 'point'
    }
};

var line = document.getElementById("line");
var lineChart = new Chart(line, {
    type: 'line',
    data: lineData,
    options: lineOptions
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

var domination = document.getElementById("domination");
var domination = new Chart(domination, {
    type: 'doughnut',
    data: dominationData,
    options: {
        cutoutPercentage: 40,
        title : {
          display: true,
          fontSize: 20,
          text: "Domination Rate",
          fontColor: "#d0d2ff"
        },
        legend: {
          display: false
          // fontColor: "#d0d2ff",
        }
    }
});


