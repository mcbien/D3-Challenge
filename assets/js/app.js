// @TODO: YOUR CODE HERE!

// Set SVG Dimensions
var svgWidth = 1500;
var svgHeight = 750;

// Define the chart's margins
var chartMargin = {
    top: 75,
    right: 200,
    bottom: 200,
    left: 350
};

// Define chart area dimensions
var chartWidth = svgWidth - chartMargin.left - chartMargin.right
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom

// Select body and append the SVG area to it and set the dimensions
var svg = d3
    .select("body")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

// append a group to the SVG area and translate it to the right and downbased on margins
var chartGroup = svg.append("g")
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Load health data in from csv
d3.csv("data.csv").then(function (healthData) {

    // Print health data
    console.log(healthData)

    // Cast data fields as integers
    healthData.forEach(function (data) {
        data.smokes = +data.smokes
        data.income = +data.income
        data.obesity = +data.obesity
        data.age = +data.age;
    });

    //Review data post-casting
    console.log(healthData[0])

    // Configure x linear scale
    var xLinearScale = d3.scaleLinear()
        .domain([0, d3.max(healthData, data => data.smokes)])
        .range([0, chartWidth]);

    // Configure y linear scale
    var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(healthData, data => data.income)])
        .range([chartHeight, 0]);

    // Create bottomAxis and leftAxis variables used to create scales
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Append an SVG chartGroup append circles for each datapoint
    chartGroup.append("g")
        .selectAll("dot")   // There are none
        .data(healthData)   // Bind data
        .enter()            // Change focus to new elements only
        .append("circle")
        .attr("cx", function (data) {
            //console.log(data.smokes)
            return xLinearScale(data.smokes);
        })
        .attr("cy", function (data) {
            //console.log(data.income)
            return yLinearScale(data.income);
        })
        .attr("r", 20)
        .style("fill", "#69b3a2")
        .classed("circles", true)

    // Append text
    charGroup.append("text")
        .text(function (data) {
            return data.abbr
        })











    // Append an SVG group and for bottom axis
    chartGroup.append("g")
        .classed("axis", true)
        .call(leftAxis)

    // Append an SVG group for bottpm axis and translate to bottom of page
    chartGroup.append("g")
        .classed("axis", true)
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(bottomAxis);












});









