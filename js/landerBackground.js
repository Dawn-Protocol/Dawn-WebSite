const range = n =>
  Array(n)
    .fill(0)
    .map((_, index) => index);
const toRad = deg => (deg / 180) * Math.PI;
const { sin, cos, random } = Math;
const svg = d3.select("svg");
const adjustSize = () => {
  const { innerWidth, innerHeight } = window;
  svg.attr("width", innerWidth).attr("height", innerHeight);
};
window.addEventListener("resize", adjustSize);

adjustSize();

const gMain = svg
  .append("g")
  .attr("transform", `translate(${960 / 2},${80})`)
  .attr("filter", "url(#strangify)");

const generateTile = (tx, ty, char) => {
  const gTr = gMain
    .append("g")
    .attr("transform", `translate(${(tx - ty) * 30}, ${(tx + ty) * 15})`);
  const gSc = gTr.append("g").attr("transform", "scale(1.43,0.71)");
  const gRT = gSc.append("g").attr("transform", "rotate(-45)");
  gTr
    .append("path")
    .attr("class", "tile")
    .attr("d", "M-20 0L0 -10L20 0L0 10L-20 0L-20 5L0 15L20 5L20 0M0 10L0 15")
    .attr("stroke", "#ed2b12")
    .attr("fill", "none")
    .attr("stroke-dasharray", (random() - 0.5) * 300)
    .attr("stroke-dashoffset", (random() - 0.5) * 300);

  gRT
    .append("text")
    .attr("x", 0)
    .attr("y", 0)
    .attr("font-size", 16)
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "central")
    .attr("fill", "none")
    .attr("stroke", "#ed2b12")
    .attr("class", "tile-char")
    .attr("opacity", random())
    .text(char.toUpperCase());
};
// word combination https://www.teepublic.com/hoodie/695872-scrabble-things
const tileData = {"0_9":"d","1_3":"e","1_4":"i","1_5":"g","1_6":"h","1_7":"t","1_8":"i","1_9":"e","1_10":"s","2_9":"m","3_0":"e","3_3":"c","3_9":"o","4_0":"l","4_1":"u","4_2":"c","4_3":"a","4_4":"s","4_6":"r","4_9":"g","5_0":"e","5_3":"s","5_6":"u","5_9":"o","6_0":"v","6_2":"s","6_3":"t","6_4":"r","6_5":"a","6_6":"n","6_7":"g","6_8":"e","6_9":"r","7_0":"e","7_3":"l","7_9":"g","7_11":"u","8_0":"n","8_3":"e","8_9":"o","8_11":"p","9_3":"b","9_6":"t","9_7":"h","9_8":"i","9_9":"n","9_10":"g","9_11":"s","10_3":"y","10_11":"i","11_3":"e","11_11":"d","11_12":"o","11_13":"w","11_14":"n","12_3":"r","12_8":"m","12_9":"i","12_10":"k","12_11":"e","12_13":"i","13_1":"d","13_2":"u","13_3":"s","13_4":"t","13_5":"i","13_6":"n","13_13":"l","14_13":"l"}
range(15).forEach(r => {
  range(15).forEach(c => {
    if (tileData[`${r}_${14 - c}`]) {
      generateTile(r, c, tileData[`${r}_${14 - c}`]);
    }
  });
});

const tl = gsap.timeline({});
tl.to(".tile", {
  strokeDashoffset: 0,
  strokeDasharray: 150,
  duration: 5,
  ease: "circ.out"
});
tl.to(".tile-char", { opacity: 1, duration: 5 }, ">-4");
let count = 0;

const update = () => {
  count += 1;
  d3.select("#turbulence").attr(
    "baseFrequency",
    `${0.01 + sin(toRad(count * 2)) / 500} ${0.01 +
      cos(toRad(count * 2)) / 500}`
  );
  requestAnimationFrame(update);
};

update();
