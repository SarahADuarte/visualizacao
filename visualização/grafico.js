let conjuntos = [
  {
    nome: "Conjunto 1",
    desempenho: 51,
    interchange: "1,8%",
    utilizacao: "35%",
    lgd: "15%",
    inadFisica: "4%",
    inadFinanceira: "3%",
    limite: "R$ 12.000"
  },

  {
    nome: "Conjunto 2",
    desempenho: 71,
    interchange: "2,1%",
    utilizacao: "55%",
    lgd: "25%",
    inadFisica: "7%",
    inadFinanceira: "6%",
    limite: "R$ 25.000"
  },

  {
    nome: "Conjunto 3",
    desempenho: 89,
    interchange: "2,6%",
    utilizacao: "78%",
    lgd: "40%",
    inadFisica: "12%",
    inadFinanceira: "11%",
    limite: "R$ 50.000"
  }
];

let hoveredBar = -1;

function setup() {

  createCanvas(1450, 1020);

  textFont("Arial");
}

function draw() {

  background(247);

  hoveredBar = -1;

  drawLeftPanel();

  drawChart();

  drawBottomCard();
}

function drawLeftPanel() {

  fill(255);
  stroke(225);

  rect(30, 30, 420, 940, 18);

  noStroke();

  fill(15);

  textSize(28);

  text(
    "Conjuntos de Parâmetros",
    55,
    75
  );

  let startY = 110;

  for (let i = 0; i < conjuntos.length; i++) {

    drawConjuntoCard(
      conjuntos[i],
      startY + i * 280
    );
  }
}

function drawConjuntoCard(conjunto, y) {

  fill(248);
  stroke(230);

  rect(50, y, 380, 250, 14);

  fill(37, 99, 235);
  noStroke();

  rect(70, y + 20, 140, 38, 8);

  fill(255);

  textSize(18);

  text(
    conjunto.nome,
    88,
    y + 45
  );

  fill(45);

  textSize(14);

  let labelX = 70;
  let valueX = 335;

  let startTextY = y + 95;

  let spacing = 32;

  text(
    "Interchange",
    labelX,
    startTextY
  );

  text(
    conjunto.interchange,
    valueX,
    startTextY
  );

  text(
    "Taxa média de utilização",
    labelX,
    startTextY + spacing
  );

  text(
    conjunto.utilizacao,
    valueX,
    startTextY + spacing
  );

  text(
    "Loss Given Default",
    labelX,
    startTextY + spacing * 2
  );

  text(
    conjunto.lgd,
    valueX,
    startTextY + spacing * 2
  );

  text(
    "Inadimplência física máxima",
    labelX,
    startTextY + spacing * 3
  );

  text(
    conjunto.inadFisica,
    valueX,
    startTextY + spacing * 3
  );

  text(
    "Inadimplência financeira máxima",
    labelX,
    startTextY + spacing * 4
  );

  text(
    conjunto.inadFinanceira,
    valueX,
    startTextY + spacing * 4
  );

  text(
    "Limite máximo concedível",
    labelX,
    startTextY + spacing * 5
  );

  text(
    conjunto.limite,
    290,
    startTextY + spacing * 5
  );
}

function drawChart() {

  fill(255);
  stroke(225);

  rect(490, 30, 920, 670, 18);

  noStroke();

  fill(15);

  textSize(34);

  text(
    "Comparação dos Conjuntos",
    525,
    85
  );

  fill(90);

  textSize(20);

  text(
    "Resultado da base de clientes",
    525,
    120
  );

  let chartX = 610;
  let chartY = 180;
  let chartHeight = 380;
  let chartWidth = 650;

  stroke(230);

  line(
    chartX,
    chartY + chartHeight,
    chartX + chartWidth,
    chartY + chartHeight
  );

  line(
    chartX,
    chartY,
    chartX,
    chartY + chartHeight
  );

  for (let i = 0; i <= 5; i++) {

    let y = map(
      i,
      0,
      5,
      chartY + chartHeight,
      chartY
    );

    stroke(235);

    line(
      chartX,
      y,
      chartX + chartWidth,
      y
    );

    noStroke();

    fill(110);

    textSize(16);

    text(
      i * 20,
      chartX - 38,
      y + 5
    );
  }

  let barWidth = 110;

  for (let i = 0; i < conjuntos.length; i++) {

    let conjunto = conjuntos[i];

    let x = 700 + i * 170;

    let h = map(
      conjunto.desempenho,
      0,
      100,
      0,
      320
    );

    let y = chartY + chartHeight - h;

    let hovering =
      mouseX > x &&
      mouseX < x + barWidth &&
      mouseY > y &&
      mouseY < chartY + chartHeight;

    if (hovering) {

      hoveredBar = i;

      fill(29, 78, 216);

    } else {

      fill(
        96 - i * 10,
        165 - i * 15,
        250
      );
    }

    noStroke();

    rect(
      x,
      y,
      barWidth,
      h,
      12
    );

    fill(20);

    textAlign(CENTER);

    textSize(24);

    text(
      conjunto.desempenho + "%",
      x + barWidth / 2,
      y - 15
    );

    fill(40);

    textSize(18);

    text(
      conjunto.nome,
      x + barWidth / 2,
      600
    );
  }

  textAlign(LEFT);

  if (hoveredBar != -1) {

    drawTooltip(
      conjuntos[hoveredBar]
    );
  }
}

function drawTooltip(conjunto) {

  let x = mouseX + 20;
  let y = mouseY - 10;

  if (x + 340 > width) {
    x = mouseX - 360;
  }

  if (y + 240 > height) {
    y = height - 260;
  }

  fill(255);

  stroke(210);

  rect(
    x,
    y,
    340,
    240,
    14
  );

  noStroke();

  fill(37, 99, 235);

  textSize(22);

  text(
    conjunto.nome,
    x + 20,
    y + 35
  );

  fill(45);

  textSize(16);

  let left = x + 20;
  let right = x + 250;

  text("Interchange", left, y + 75);
  text(conjunto.interchange, right, y + 75);

  text("Taxa de utilização", left, y + 105);
  text(conjunto.utilizacao, right, y + 105);

  text("Loss Given Default", left, y + 135);
  text(conjunto.lgd, right, y + 135);

  text("Inadimplência física", left, y + 165);
  text(conjunto.inadFisica, right, y + 165);

  text("Inadimplência financeira", left, y + 195);
  text(conjunto.inadFinanceira, right, y + 195);
}

function drawBottomCard() {

  fill(255);

  stroke(225);

  rect(490, 740, 920, 140, 18);

  noStroke();

  fill(37, 99, 235);

  ellipse(550, 810, 58, 58);

  fill(255);

  rect(539, 815, 7, 15);

  rect(551, 802, 7, 28);

  rect(563, 788, 7, 42);

  fill(37, 99, 235);

  textSize(24);

  text(
    "Interpretação",
    620,
    790
  );

  fill(50);

  textSize(18);

  text(
    "O Conjunto 3 apresentou o melhor desempenho geral da base de clientes, demonstrando maior rentabilidade esperada considerando os parâmetros definidos.",
    620,
    825,
    700
  );
}
