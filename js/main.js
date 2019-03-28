/* Stylesheet by Yifeng Ai, 2019 */
//initialize function called when the script loads

//call the initialize function when the window has loaded
window.onload = function() {
    // create a body element holding all the data using d3
    var container = d3.select("body")
        .append('svg')
        .attr('width',1000)
        .attr('height',560)
        .attr('class','container')
        .style('background-color', 'rgba(0,0,0,0.2)');
    
    // append a rectangle inside the body element
    var innerRect = container.append('rect')
        .datum(460)
        
        // set width of the inner rectangle using data in the datum
        .attr("width",function(d) {
            return d*2 //800
        })
        
        // set height
        .attr('height',function(d) {
            return d //400
        })
        .attr('class', 'innerRect')

        // x is the horizontal pixel distance from the upper left corner of the container
        .attr('x', 50)
        // y is the vertical pixel distance from the upper left corner of the container
        .attr('y', 60)
        // color to fill in the inner rectangle
        .style('fill','#ffffff');
    
    // create a list of arrays of dictionaries
    var cityPop = [
        {   
            city: 'Seattle',
            population: 724745
        },
        {
            city: 'San Francisco',
            population: 884363
        },
        {
            city: 'Portland',
            population: 647805
        },
        {
            city: 'Denver',
            population: 704621
        }
    ]

    // get minimum population from population
    var minPop = d3.min(cityPop, function(d) {
        return d.population
    })

    // get max
    var maxPop = d3.max(cityPop, function(d) {
        return d.population
    })

    // create color range that fits in the min and max population range
    var color = d3.scaleLinear()
        .range([
            "#ffaaaa",
            "#885555"
        ])
        .domain([minPop,maxPop]);
    
    // create the horizontal position range of the color scale
    var x = d3.scaleLinear()
        .range([130, 800])
        .domain([0, 3])

    // create the vertical position range of the color scale
    var y = d3.scaleLinear()
        .range([520,81])
        .domain([0, 1000000])
    
    // create circles using the color scale
    var circles = container.selectAll('.circles')
        .data(cityPop)
        .enter()
        .append('circle')
        .attr('class','circles')
        .attr('id', function(d) {
            return d.city
        })
        
        // set the radius of the circle
        .attr('r',function(d) {
            var area = d.population * 0.01
            return Math.sqrt(area/Math.PI)
        })
        .attr('cx', function(d,i) {
            return x(i)
        })
        .attr('cy', function(d) {
            return y(d.population)
        })
        // determine the color per the position of population in the whole range of max and min population
        .style('fill', function(d,i) {
            return color(d.population)
        })
        .style('stroke', "#000")
    
    // create a left axis
    var yAxis = d3.axisLeft(y)
    
    // format and add the axis
    var axis = container.append('g')
        .attr('class','axis')

        // this formats the position of this left axis
        .attr('transform', 'translate(50, 0)')

        // add the left axis to the container
        .call(yAxis)
    
    // add title to container
    var title = container.append('text')
        .attr('class', 'title')
        .attr('text-anchor', 'middle')
        .attr('x', 470)
        .attr('y', 40)
        .text('City Populations')
    
    // format label of each circle
    var labels = container.selectAll(".labels")
        .data(cityPop)
        .enter()
        .append("text")
        .attr("class", "labels")
        .attr("text-anchor", "middle")

        .attr("y", function(d){
            return y(d.population) + 5
        })

    var format = d3.format(',')
    
    // first line of the label
    var nameLine = labels.append("tspan")
        .attr("class", "nameLine")
        .attr("x", function(d,i) {
            return x(i)
            })
        // vertical position is 1.25 times the radius of the circle below the center of the circle
        .attr('dy', function(d, i) {
            return Math.sqrt(d.population * 0.01 / Math.PI) * 1.25
        })
        .text(function(d){
            return d.city;
        });

    //second line of label
    var popLine = labels.append("tspan")
        .attr("class", "popLine")
        .attr("x", function(d,i){
            return x(i);
            })
        // vertical position is 18 pixels under the first line of the label
        .attr('dy', 18)
        .text(function(d){
            return "Pop. " + format(d.population); //use format generator to format numbers
        })
}
