
// ダミーデータ
var lineData = {
    labels: [1, 2, 3, 4, 5, 6, 7],
    datasets: [{
      label: '',
      data: [60, 77, 45, 88, 55, 49, 80],
      borderColor: '#E86560',
      fill: false,
      // backgroundColor: '#E86560',
    }]
  };

var pieData = {
  labels: ['talk'],
  datasets: [{
    data: [122, 53],
    backgroundColor: ['#E86560', '#0064b3']
  }]
};

var dominationData = {
  labels: ['domination',],
  datasets: [{
    data: [60,43],
    backgroundColor: ['#E86560', '#0064b3']
  }]
};

//データの取得

/*
 var inputData = document.getElementById("");
 var obj = JSON.parse(inputData);
 var posession = obj.posession;
 var topic = obj.topic;
 var active_percent = obj.active_percent;
 var scores = obj.score
*/

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

