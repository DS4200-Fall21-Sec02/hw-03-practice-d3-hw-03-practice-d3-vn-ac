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
let svg1 = d3.select('#vis1')
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
  svg1.append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(d3.axisBottom(x));

  // Add Y axis
  var y = d3.scaleLinear()
  .domain([0, 100])
  .range([ height, 0]);
  svg1.append("g")
  .call(d3.axisLeft(y));

  // Add dots
  svg1.append('g')
  .selectAll("dot")
  .data(data)
  .join("circle")
      .attr("cx", function (d) { return x(d.Fish); } )
      .attr("cy", function (d) { return y(d.Plants); } )
      .attr("r", 5)
      .style("fill", "#69b3a2")

})
