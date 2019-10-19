

var lineData = {
    labels: [1, 2, 3, 4],
    datasets: [{
      label: '',
      data: [60, 77, 45, 88],
      // borderColor: 'rgb(0,139,52)',
      borderColor: 'skyblue',
      fill: false,
    }]
  };

var options = {
    scales: {
        yAxis: [{
            ticks: {
                suggestedMin: 0, 
                siggestedMax: 100,
                stepSize: 10,
            }
        }]
    },
    title : {
        display: true,
        text: "overview",
        fontSize: 18
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

var pieData = {
    labels: ['talk', 'silence'],
    datasets: [{
      data: [122, 53],
      // backgroundColor: ['rgb(0,139,52)', 'rgb(255,228,168)']
      backgroundColor: ['tomato', 'skyblue']
    }]
  };

var space = document.getElementById("space");
var spaceChart = new Chart(space, {
    type: 'doughnut',
    data: pieData,
    options: {
        cutoutPercentage: 40,
        responsive: true
    }
});

var dominationData = {
    labels: ['domination',],
    datasets: [{
      data: [60,43],
      backgroundColor: ['tomato', 'skyblue']
    }]
  };

var domination = document.getElementById("domination");
var domination = new Chart(domination, {
    type: 'doughnut',
    data: dominationData,
    options: {
        cutoutPercentage: 40
    }
});


