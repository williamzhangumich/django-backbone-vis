# Create your views here.
from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.template import RequestContext
from django.shortcuts import render_to_response
from django.http.response import HttpResponse
import simplejson as json
from lib_tests.models import *

def get_data():
    data = Venues.get_city_venue_stats().T

    output = []
    for k in data:
        row = data[k]
        output.append({'city': row['city'], 'country':row['country'], 'count':row['count']})
    output = json.dumps(output)
    return output


def home(request):
    
    template = 'vis.html'
    top_cities = json.dumps(Venues.get_top_cities())
    return render_to_response(template,
                              {'data':get_data(),
                               'top_cities':top_cities},
                              context_instance=RequestContext(request))
    
def get_json(request):
    return HttpResponse(get_data())

def by_country(request):
    1
    
def get_json_for_country(request, country):
    print country
    #import ipdb; ipdb.set_trace()
    data = Venues.get_json_for_country(country)
    output = []
    data = data.T
    for k in data:
        row = data[k]
        output.append({'city': row['city'], 'count':row['count']})
    output = json.dumps(output)
    return HttpResponse(output) 
    