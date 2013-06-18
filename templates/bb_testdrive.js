
	
var city_data = Backbone.Model.extend({
// Default todo attribute values
defaults: {
    country: 'United States',
    count:null,
    cities:null,
},
url: function(){
	return '/country_'+this.attributes.country;
	},
	/*
	parse: function(response) {
        return response;
    },*/
	initialize: function(){
        this.on('change:country', function(){
            console.log('Model changed to ' + this.get('country'));
            this.fetch();
        });
    }
});

var vis_view = Backbone.View.extend({

  initialize: function(){
    this.model.bind('change',this.render, this)  
  },

  // Re-render the titles of the todo item.
  render: function() {

    var cities = this.model.get('cities').slice(0,21);
    var values = this.model.get('count').slice(0,21);
    
    $('#bb_vis').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: 'Concert Venues in Top '+ this.model.get('country') +' cities'
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
    
  },

});


/*
m = new city_data();
m.fetch({success:function(){
    console.log('fetch succeeded');
    console.log(m.attributes.cities);
    //console.log(m.attributes.count);
    }});
     */   
        
$(document).ready(function() { 
    
    d3.select('#bb_test').append('div').attr('id','bb_vis')
    d3.select('#bb_vis').attr('style','min-width: 400px; height: 400px; margin: 0 auto');
    
    // Init model
	var datasource = new city_data();
	// Init view
	var vis = new vis_view({
	    model:datasource,
	});
	datasource.fetch()
	
	
	var city_buttons_bb = d3.select('#bb_test').append('div').attr('class', 'btn-group');
    city_buttons_bb.selectAll('button').data(top_cities).enter()
                .append('button').attr('class','btn').text(function(d){
                    return d;
                });
                
    // Change 'country' of model when click            
    city_buttons_bb.selectAll('button').on('click',function(d){
        datasource.set({'country':d});
    });
	
});
