# Create your views here.
from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.template import RequestContext
from django.shortcuts import render_to_response
from django.http.response import HttpResponse
from datetime import datetime

def home(request):
    
    template = 'index.html'
    
    """get the menu"""
    
    """Insight Home controller"""
    #return render(request, 'home.html')
    name = 'William'
    date = datetime.now().strftime('%A')
    
    #return HttpResponse(name)
    return render_to_response(template,
                              {'date': date,},
                              context_instance=RequestContext(request))