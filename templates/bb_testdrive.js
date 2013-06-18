$(document).ready(function() {
	
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
	parse: function(response) {
        return response;
   },
	
	});
	
	m = new city_data();
	m.fetch({success:function(){
		console.log('fetch succeeded');
		console.log(m.attributes.cities);
		console.log(m.attributes.count);
		}});
	
});
