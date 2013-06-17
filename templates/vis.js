var data2 = {%autoescape off%}{{data}}{%endautoescape%}
var top_cities = {%autoescape off%}{{top_cities}}{%endautoescape%}
    
$(document).ready(function() {
	/*
	 * Append list text
	 */
	/*
	d3.select('body').append('ul').selectAll('li').data(data2.slice(0,21))
                 .enter().append('li')
			     .text(function(d){
			     	return d['city'];
			     })
			     */
			
	var data = data2.slice(0,31);    

	///////////////
	// Highcharts
	///////////////
	
	d3.select('#hc_cities').append('div').attr('id','highchart')
					 .attr('style','min-width: 400px; height: 400px; margin: 0 auto');
	var cities = _.map(data, function(row){return row['city']});
	var values = _.map(data, function(row){return row['count']});
	
	$('#highchart').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: 'Concert Venues in World Cities'
            },
            subtitle: {
                text: 'test'
            },
            xAxis: {
                categories: cities,
                labels: {
                    rotation: -45,
                    align: 'right',
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'number of venues'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} venues</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                name: 'Venues',
                data: values
            }]
        });
	
		d3.selectAll('.highcharts-series').selectAll('rect')
		  .on('click',function(){
		  		d3.select(this).transition()
		         .duration(750)
		         .delay(0)
		         .attr('x',function(i){
		         	return d3.select(this).attr('x')-10
		         })
		         .attr("width", function(){
		             return '35px';
		         }).attr('style','stroke:black; fill:purple; stroke-width:3px')
		  	})

    /*
     * button sets
     */
    
    var city_buttons = d3.select('#hc_by_country').append('div').attr('class', 'btn-group');
    city_buttons.selectAll('button').data(top_cities).enter()
                .append('button').attr('class','btn').text(function(d){
                    return d;
                });
    
    d3.select('#hc_by_country').append('div').attr('id','highchart_country')
    
    /*
     * by country
     */
    
    var vis_for_country = function(country){
        $.get('/country_'+country, function(data){
                data = JSON.parse(data);
                data = data.slice(0,21);
                d3.select('#highchart_country')
                     .attr('style','min-width: 400px; height: 400px; margin: 0 auto');
                var cities = _.map(data, function(row){return row['city']});
                var values = _.map(data, function(row){return row['count']});
                
                $('#highchart_country').highcharts({
                        chart: {
                            type: 'column'
                        },
                        title: {
                            text: 'Concert Venues in Top '+ country +' cities'
                        },
                        subtitle: {
                            text: 'test'
                        },
                        xAxis: {
                            categories: cities,
                            labels: {
                                rotation: -45,
                                align: 'right',
                                style: {
                                    fontSize: '13px',
                                    fontFamily: 'Verdana, sans-serif'
                                }
                            }
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: 'number of venues'
                            }
                        },
                        tooltip: {
                            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                '<td style="padding:0"><b>{point.y:.1f} venues</b></td></tr>',
                            footerFormat: '</table>',
                            shared: true,
                            useHTML: true
                        },
                        plotOptions: {
                            column: {
                                pointPadding: 0.2,
                                borderWidth: 0
                            }
                        },
                        series: [{
                            name: 'Venues',
                            data: values
                        }]
                    });
                    
        })
    };
    
    
    city_buttons.selectAll('button').on('click',function(d){
        vis_for_country(d);
    });
    
    
    vis_for_country('United States');
    
    //////////////
    // hist, d3
    //////////////
    
    /*  
    var svg_height = 400;
    var svg_width = $(document).width()*0.8
    var svg = d3.select('#d3_cities')
                .append('svg')
                .attr('width', svg_width)
                .attr('height', svg_height)
                .attr('id','barplot');
    
    var yscale = d3.scale.linear();
    yscale.domain([0, d3.max(data, function(d) {return d['count'];})])
          .range([0,svg_height]);
    
    var xscale = d3.scale.linear();
    xscale.domain([0, data.length])
          .range([0,svg_width*0.9]);
    
    var bars = svg.selectAll('rect').data(data).enter().append('rect');
    bars.attr('x', function (d, i) {
      return (xscale(i)+svg_width*0.05)+'px'
    }).attr('y', function(d, i){
        return (svg_height-yscale(d['count']))+'px';
    }).attr('height', function(d, i){
        return yscale(d['count'])+'px';
    }).attr('width', function(d, i){
        return (svg_width/data.length*0.8)+'px'
    }).attr("opacity", "0.8");
    
    var text = svg.selectAll('text').data(data).enter().append('text');
    text.attr('class','label')
       .attr('x', function (d, i) {
      return (xscale(i)+svg_width*0.05)+'px'
    }).attr('y', function(d, i){
        return (svg_height-yscale(d['count'])+20)+'px';
    }).text(function(d){ return d['city']
    }
    );
    
    */
    
    
  /////////////////
  // Circles
  /////////////////
  
  /*
  
  var circles = [[100, 100, 30], [200, 200, 40], [300, 300, 50]];
  
  var svg = d3.select("body").append("svg")
          .attr("height", "500px").attr("width", "500px")
          .attr('id','svg_circles')
  svg.selectAll("circle").data(circles).enter().append("circle")
	 .attr("cx", function(d){
	     return d[0];
	 }).attr("cy", function(d){
	     return d[1];
	 }).attr("r",function(d){
	     return d[2];
	 }).attr("class", "myCircle");
	  //svg.selectAll
  
  function transform(){
      var circles = d3.select("body").select('#svg_circles').selectAll(".myCircle")
	  //d3.select("body").select("svg").selectAll(".myCircle")
	  //  .style("fill", "black");
	  
	  circles.transition()
	         .duration(750)
	         .delay(0)
	         .attr("cx", function(){
	             return (Math.round(Math.random()*450)+80);
	         }).attr("r", function(){
	                 return (Math.round(Math.random()*50)+20);
	             })
	      
	  }            
	   
	   
	  d3.select('body').append('button').on('click', function(){
	  	transform();
	  }).text(function(d){return 'transform!'});
	  
	  */
	  
	  
	});
	
	
   