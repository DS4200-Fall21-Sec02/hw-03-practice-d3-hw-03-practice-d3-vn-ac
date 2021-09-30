// write your javascript code here.
// feel free to change the preset attributes as you see fit

let margin = {
    top: 60,
    left: 50,
    right: 30,
    bottom: 35
  },
  width = 500 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

// first visualization
let svg1 = d3.select('#vis1')
  .append('svg')
  .attr('preserveAspectRatio', 'xMidYMid meet') // this will scale your visualization according to the size of its parent element and the page.
  .attr('width', '100%') // this is now required by Chrome to ensure the SVG shows up at all
  .style('background-color', '#ccc') // change the background color to light gray
  .attr('viewBox', [0, 0, width + margin.left + margin.right, height + margin.top + margin.bottom].join(' '))

d3.csv(
  "https://raw.githubusercontent.com/DS4200-Fall21-Sec02/hw-03-practice-d3-hw-03-practice-d3-vn-ac/main/data/Boston%20Food%20Review%20-%20Sheet1.csv"
).then(function (data) {
  // create the subgroups using the 4th and 5th columns of the data (rating and distance)
  let subgroups = data.columns.slice(4);

  // create the list of groups
  let groups = data.map((d) => d.group);

  // add the created groups to the visualization
  console.log(groups);

  // add x axis
  const x = d3.scaleBand().domain(groups).range([0, width]).padding([0.2]);
  svg1
    .append("g")
    .attr("transform", "translate(0, ${height})")
    .call(d3.axisBottom(x).tickSize(0));

  // add y axis
  const y = d3.scaleLinear().domain([0, 12]).range([height, 0]);
  svg1.append("g").call(d3.axisLeft(y));

  // scale subgroups
  const xSubgroup = d3
    .scaleBand()
    .domain(subgroups)
    .range([0, x.bandwidth()])
    .padding([0.05]);

  // create colors and give a color to each subgroup
  const color = d3
    .scaleOrdinal()
    .domain(subgroups)
    .range(["#0000ff", "#800080"]);

  // show the bars
  svg1
    .append("g")
    .selectAll("g")
    // Enter in data
    .data(data)
    .join("g")
    .attr("transform", (d) => `translate(${x(d.group)}, 0)`)
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
    .attr("fill", (d) => color(d.key));
});

// second visualization
let svg2 = d3.select('#vis2')
  .append('svg')
  .attr('preserveAspectRatio', 'xMidYMid meet') // this will scale your visualization according to the size of its parent element and the page.
  .attr('width', '100%') // this is now required by Chrome to ensure the SVG shows up at all
  .style('background-color', '#ccc') // change the background color to light gray
  .attr('viewBox', [0, 0, width + margin.left + margin.right, height + margin.top + margin.bottom].join(' '))
