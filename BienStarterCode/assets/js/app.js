// @TODO: YOUR CODE HERE!

// Set SVG Dimensions
var svgWidth = 1000;
var svgHeight = 750;

// Define the chart's margins
var chartMargin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20
}

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
atttr("transfrom", `translate(${chartMargin.left}, ${chartMargin.top}})`);