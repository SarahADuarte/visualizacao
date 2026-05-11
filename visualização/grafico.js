

let sliders = [];
let variables = [
  "Investimento em Marketing",
  "Qualidade do Produto",
  "Treinamento da Equipe",
  "Tecnologia",
  "Atendimento"
];

let bestScore = 0;
let bestScenario = [];

function setup() {
  createCanvas(1200, 700);
  textFont("Arial");

  for (let i = 0; i < variables.length; i++) {

    let slider = createSlider(0, 100, 50);

    slider.position(40, 120 + i * 90);
    slider.style("width", "280px");

    sliders.push(slider);
  }
}

function draw() {

  background(242);

  drawHeader();

  drawControlPanel();

  let data = calculatePerformance();

  drawPerformanceChart(data);

  drawAnalysisPanel(data);

  updateBestScenario(data.score);
}


function drawHeader() {

  fill(20);
  textSize(32);
  text("Dashboard Inteligente de Simulação", 35, 45);

  fill(90);
  textSize(16);

  text(
    "Altere os parâmetros para descobrir o melhor desempenho do modelo",
    35,
    75
  );
}


function drawControlPanel() {

  fill(255);
  stroke(220);

  rect(20, 100, 340, 520, 20);

  fill(25);
  noStroke();

  textSize(22);
  text("Painel de Variáveis", 40, 140);

  textSize(15);

  for (let i = 0; i < variables.length; i++) {

    let value = sliders[i].value();

    fill(40);

    text(
      variables[i] + ": " + value + "%",
      40,
      180 + i * 90
    );

    // Barra visual
    fill(220);
    rect(40, 195 + i * 90, 260, 12, 10);

    fill(60, 120, 255);
    rect(
      40,
      195 + i * 90,
      map(value, 0, 100, 0, 260),
      12,
      10
    );
  }
}



function calculatePerformance() {

  let marketing = sliders[0].value();
  let quality = sliders[1].value();
  let training = sliders[2].value();
  let tech = sliders[3].value();
  let service = sliders[4].value();

  let score =
    marketing * 0.25 +
    quality * 0.30 +
    training * 0.15 +
    tech * 0.20 +
    service * 0.10;

  let efficiency =
    (quality + service + training) / 3;

  let growth =
    (marketing + tech) / 2;

  return {
    score: score.toFixed(1),
    efficiency: efficiency.toFixed(1),
    growth: growth.toFixed(1)
  };
}



function drawPerformanceChart(data) {

  fill(255);
  stroke(220);

  rect(400, 100, 760, 360, 20);

  fill(25);
  noStroke();

  textSize(24);
  text("Desempenho do Modelo", 430, 140);

  let chartData = [
    Number(data.score),
    Number(data.efficiency),
    Number(data.growth)
  ];

  let labels = [
    "Performance",
    "Eficiência",
    "Crescimento"
  ];

  let colors = [
    [52, 152, 219],
    [46, 204, 113],
    [241, 196, 15]
  ];

  let startX = 500;
  let barWidth = 120;

  for (let i = 0; i < chartData.length; i++) {

    let value = chartData[i];

    let h = map(value, 0, 100, 0, 220);

    let x = startX + i * 180;
    let y = 380 - h;

    fill(colors[i][0], colors[i][1], colors[i][2]);

    rect(x, y, barWidth, h, 12);

    fill(30);
    textAlign(CENTER);

    textSize(20);
    text(value + "%", x + barWidth / 2, y - 15);

    textSize(16);
    text(labels[i], x + barWidth / 2, 410);
  }

  stroke(255, 80, 80);
  strokeWeight(2);

  line(430, 220, 1120, 220);

  noStroke();
  fill(255, 80, 80);

  textSize(14);
  text("Meta ideal", 1080, 210);
}



function drawAnalysisPanel(data) {

  fill(255);
  stroke(220);

  rect(400, 500, 760, 140, 20);

  fill(20);
  noStroke();

  textSize(24);
  text("Análise Inteligente", 430, 540);

  let analysis = "";

  if (data.score >= 85) {

    analysis =
      "Excelente cenário. O modelo apresenta alta eficiência e ótimo potencial de crescimento.";

  } else if (data.score >= 70) {

    analysis =
      "Bom desempenho geral. Pequenos ajustes podem melhorar ainda mais os resultados.";

  } else if (data.score >= 50) {

    analysis =
      "Desempenho moderado. Recomenda-se aumentar investimento em tecnologia e qualidade.";

  } else {

    analysis =
      "Baixo desempenho detectado. O cenário atual apresenta riscos operacionais.";
  }

  fill(60);

  textSize(16);

  text(
    analysis,
    430,
    585,
    680
  );
  fill(0, 150, 80);

  textSize(18);

  text(
    "Melhor performance encontrada: " + bestScore + "%",
    430,
    620
  );
}

/

function updateBestScenario(currentScore) {

  currentScore = Number(currentScore);

  if (currentScore > bestScore) {

    bestScore = currentScore;

    bestScenario = sliders.map(s => s.value());
  }
}
