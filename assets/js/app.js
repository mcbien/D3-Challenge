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
    var lefAxis = d3.axisLeft(yLinearScale);








});









