// write your javascript code here.
// feel free to change the preset attributes as you see fit

let margin = {
    top: 60,
    left: 50,
    right: 30,
    bottom: 35
  },
  width = 800 - margin.left - margin.right,
  height = 800 - margin.top - margin.bottom;

// first visualization
let svg3 = d3.select('#vis1')
.append('svg')
.attr('preserveAspectRatio', 'xMidYMid meet') 
.attr('width', '50%') 
.attr("height", height)
.attr("width", width)
.style('background-color', 'white') 
.style('border', 'solid')
.attr('viewBox',[50, 50, width + margin.left + margin.right, height + margin.top + margin.bottom].join(' '));

d3.csv("data/DataSet2.csv").then( function(data) {

  // Add X axis
  var x = d3.scaleLinear()
  .domain([0, 100])
  .range([ 0, width ]);
  svg3.append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(d3.axisBottom(x));

  // Add Y axis
  var y = d3.scaleLinear()
  .domain([0, 100])
  .range([ height, 0]);
  svg3.append("g")
  .call(d3.axisLeft(y));

  // Add dots
  svg3.append('g')
  .selectAll("dot")
  .data(data)
  .join("circle")
      .attr("cx", function (d) { return x(d.Fish); } )
      .attr("cy", function (d) { return y(d.Plants); } )
      .attr("r", 5)
      .style("fill", "#69b3a2")

})

// second visualization
let svg2 = d3
  .select("#vis2")
  .append("svg")
  .attr("preserveAspectRatio", "xMidYMid meet") // this will scale your visualization according to the size of its parent element and the page.
  .attr("width", "100%") // this is now required by Chrome to ensure the SVG shows up at all
  .style("background-color", "#ccc") // change the background color to light gray
  .attr(
    "viewBox",
    [
      0,
      0,
      width + margin.left + margin.right,
      height + margin.top + margin.bottom,
    ].join(" ")
  );

// code for second visualization
d3.csv("data/Boston Food Review - Sheet1.csv").then(function (data) {
  // create the subgroups using the 4th and 5th columns of the data (rating and distance)
  var subgroups = data.columns.slice(4);

  // create the list of groups
  var groups = data.map((d) => d.Name);

  // add the created groups to the visualization
  console.log(groups);

  // add x axis
  var x = d3.scaleBand().domain(groups).range([0, width]).padding([0.2]);
  svg2
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x).tickSize(0));

  // add y axis
  var y = d3.scaleLinear().domain([0, 12]).range([height, 0]);
  svg2.append("g").call(d3.axisLeft(y));

  // scale subgroups
  var xSubgroup = d3
    .scaleBand()
    .domain(subgroups)
    .range([0, x.bandwidth()])
    .padding([0.05]);

  // create colors and give a color to each subgroup
  var color = d3.scaleOrdinal().domain(subgroups).range(["#e41a1c", "#377eb8"]);

  // show the bars
  svg2
    .append("g")
    .selectAll("g")
    // Enter in data
    .data(data)
    .join("g")
    .attr("transform", (d) => `translate(${x(d.Name)}, 0)`)
    .selectAll("rect")
    .data(function (d) {
      return subgroups.map(function (key) {
        return { key: key, value: d[key] };
      });
    })
    .join("rect")
    .attr("x", (d) => xSubgroup(d.key))
    .attr("y", (d) => y(d.value))
    .attr("width", xSubgroup.bandwidth())
    .attr("height", (d) => height - y(d.value))
    .attr("fill", (d) => color(d.key))
    .append("title")
    .text(function (d) {
      return "" + d.key + ": " + d.value; //details on demand mouseover displays the data values
    });
});
