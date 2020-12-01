console.log("Part 2");

// Create SVG
var svgWidth = 1000;
var svgHeight = 750;

// Establish magin variables
var margin = {
    top: 40,
    right: 40,
    bottom: 75,
    left: 75
};

// Calculate chart height and width
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// Select body and append the SVG area to it and set the dimensions
var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

// append a group to the SVG area and translate it to the right and down based on margins
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Set initial x-axis value
var chosenXAxis = "smokes";

// Function for updating x-scale variable when clicked
function xScale(healthData, chosenXAxis) {
    // create scales
    var xLinearScale = d3.scaleLinear()
        .domain([d3.min(healthData, data => data[chosenXAxis]), //* 0.8
        d3.max(healthData, data => data[chosenXAxis])      //* 1.2
        ])
        .range([0, chartWidth]);

    return xLinearScale;
}

// Function for updating xAxis variable when clicked
function renderAxes(newXScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXScale);

    xAxis.transition()
        .duration(1000)
        .call(bottomAxis);

    return xAxis;
}

// Function used to update markers when nex x-axis option is selected
function renderCircles(circlesGroup, newXScale, chosenXaxis) {

    circlesGroup.transition()
        .duration(1000)
        .attr("cx", data => newXScale(data[chosenXAxis]));

    return circlesGroup;
}

// Function used to change the tooltip
function updateToolTip(chosenXAxis, circlesGroup) {

    if (chosenXAxis === "smokes") {
        var label = "Smokes Percentage (%):";
    }
    else {
        var label = "Obesity Percentage (%)";
    }

    var toolTip = d3.tip()
        .attr("class", "d3-tip")
        //.offset(80, -60)
        .html(function (data) {
            return (`State: ${data.abbr}<hr>${label} ${data[chosenXAxis]}%`);
        });

    circlesGroup.call(toolTip);

    circlesGroup.on("mouseover", function (data) {
        toolTip.show(data, this);
    })
        // Onmouseout change
        .on("mouseout", function (data, index) {
            toolTip.hide(data, this);
        });

    return circlesGroup;
}


// Retrieve data from the CSV file and execute everything below
d3.csv("data.csv").then(function (healthData) {

    // parse data
    healthData.forEach(function (data) {
        data.smokes = +data.smokes
        //console.log(data.smokes)
        data.income = +data.income
        //console.log(data.income)
        data.obesity = +data.obesity
        //console.log(data.obesity)
        data.age = +data.age;
    });

    // Configure x linear scale
    var xLinearScale = xScale(healthData, chosenXAxis);

    // Configure y linear scale
    var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(healthData, data => data.income)])
        .range([chartHeight, 0]);

    // Create bottomAxis and leftAxis variables used to create scales
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // append x axis
    var xAxis = chartGroup.append("g")
        .classed("x-axis", true)
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(bottomAxis);

    // append y axis
    chartGroup.append("g")
        .call(leftAxis);

    // append initial circles
    var circlesGroup = chartGroup.selectAll("circle")
        .data(healthData)
        .enter()
        .append("circle")
        .attr("cx", data => xLinearScale(data[chosenXAxis]))
        .attr("cy", data => yLinearScale(data.income))
        .attr("r", 30)
        .attr("fill", "#69b3a2")
        .attr("opacity", ".5");

    // Create group for  2 x- axis labels
    var labelsGroup = chartGroup.append("g")
        .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + 20})`);

    var smokesLabel = labelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 20)
        .attr("value", "smokes") // value to grab for event listener
        .classed("active", true)
        .text("Smoker Percentage (%)");

    var obesityLabel = labelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 40)
        .attr("value", "obesity") // value to grab for event listener
        .classed("inactive", true)
        .text("Percentage Obesity (%)");

    // append y axis
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (chartHeight / 2))
        .attr("dy", "1em")
        .classed("axis-text", true)
        .text("Income");

    // updateToolTip function above csv import
    var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

    // x axis labels event listener
    labelsGroup.selectAll("text")
        .on("click", function () {
            // get value of selection
            var value = d3.select(this).attr("value");
            if (value !== chosenXAxis) {

                // replaces chosenXAxis with value
                chosenXAxis = value;

                console.log(chosenXAxis)

                // functions here found above csv import
                // updates x scale for new data
                xLinearScale = xScale(healthData, chosenXAxis);

                // updates x axis with transition
                xAxis = renderAxes(xLinearScale, xAxis);

                // updates circles with new x values
                circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);

                // updates tooltips with new info
                circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

                // changes classes to change bold text
                if (chosenXAxis === "obesity") {
                    obesityLabel
                        .classed("active", true)
                        .classed("inactive", false);
                    smokesLabel
                        .classed("active", false)
                        .classed("inactive", true);
                }
                else {
                    obesityLabel
                        .classed("active", false)
                        .classed("inactive", true);
                    smokesLabel
                        .classed("active", true)
                        .classed("inactive", false);
                }
            }
        });
}).catch(function (error) {
    console.log(error);
});
