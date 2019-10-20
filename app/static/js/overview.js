
// ダミーデータ
var lineData = {
    labels: [1, 2, 3, 4],
    datasets: [{
      label: '',
      data: [60, 77, 45, 88],
      borderColor: '#E86560',
      fill: false,
      // backgroundColor: '#E86560',
    }]
  };

var pieData = {
  labels: ['conversation','silence'],
  datasets: [{
    data: [122, 53],
    backgroundColor: ['#E86560', '#0064b3']
  }]
};

var dominationData = {
  labels: ['domination','Non-domination'],
  datasets: [{
    data: [60,43],
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

document.getElementById('line').onclick = function(e) {
  var activePoints = lineChart.getElementsAtEvent(e);
    if (activePoints.length > 0) {
      var clickedElementIndex = activePoints[0]['_index'] + 1;
      console.log(clickedElementIndex);
      window.location.href = '/log/' +  clickedElementIndex;
    }
  
};

