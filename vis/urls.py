from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    url(r'^$', 'vis.views.home', name='home'),
    url(r'^vis.html', 'lib_tests.views.home', name='lib_tests'),
    url(r'^get_json', 'lib_tests.views.get_json', name='lib_tests'),
    url(r'^country_(?P<country>[\w\s]+)', 'lib_tests.views.get_json_for_country', name='lib_tests'),
    
    #url(r'^vis/', include('vis.lib_tests.urls')),
    # url(r'^vis/', include('vis.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
)
