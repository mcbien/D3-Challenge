// @TODO: YOUR CODE HERE!

// Set SVG Dimensions
var svgWidth = 1000;
var svgHeight = 750;

// Define the chart's margins
var chartMargin = {
    top: 100,
    right: 100,
    bottom: 100,
    left: 100
};

// Define chart area dimensions
var chartWidth = svgWidth - chartMargin.left - chartMargin.right  // 1000 - 20 -20 = 960
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom // 750 - 20 - 20 = 710

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
d3.csv("data.csv").then(function (data) {

    // Prnt the data
    console.log(data);









})