# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#     * Rearrange models' order
#     * Make sure each model has one field with primary_key=True
# Feel free to rename the models, but don't rename db_table values or field names.
#
# Also note: You'll have to insert the output of 'django-admin.py sqlcustom [appname]'
# into your database.
from __future__ import unicode_literals
import pandas as pd

from django.db import models

class Artists(models.Model):
    name = models.TextField(blank=True)
    genre = models.TextField(blank=True)
    mbid = models.IntegerField(blank=True, primary_key=True)
    listener = models.IntegerField(null=True, blank=True)
    playcount = models.IntegerField(null=True, blank=True)
    bio = models.TextField(blank=True)
    class Meta:
        db_table = 'ARTISTS'

class ArtistsTag(models.Model):
    artist_name = models.TextField(blank=True, primary_key=True)
    tag = models.TextField(blank=True)
    class Meta:
        db_table = 'ARTISTS_TAG'

class Venues(models.Model):
    id = models.IntegerField(unique=True, primary_key=True) # This field type is a guess.
    name = models.TextField(blank=True)
    url = models.TextField(blank=True)
    website = models.TextField(blank=True)
    phone = models.TextField(blank=True)
    city = models.TextField(blank=True)
    country = models.TextField(blank=True)
    street = models.TextField(blank=True)
    postal = models.TextField(blank=True)
    lat = models.FloatField(blank=True) # This field type is a guess.
    long = models.FloatField(blank=True) # This field type is a guess.
    class Meta:
        db_table = 'VENUES'
        
    def __unicode__(self):
        return "%s - %s" % (self.name, self.city)
    
    @classmethod
    def get_city_venue_stats(cls):
        from django.db import connection, transaction
        cur = connection.cursor()
        cur.execute('select count(*), city, country from Venues group by city order by count(*)')
        data = pd.DataFrame(cur.fetchall())
        data.columns = ['count','city', 'country']
        
        data = data.sort_index(by='count', ascending=False)
        clean = lambda x:x.split(',')[0]
        data.city = data.city.apply(clean)
        ref = data[['city','country']]
        ref = ref.drop_duplicates(cols=['city','country'])
        data =  data.groupby('city')['count'].sum().reset_index().sort_index(by='count',ascending=False)
        data = data[data.city!='']
        data['rank'] = range(1,len(data)+1)
        
        data = pd.merge(data, ref, how='left', left_on='city', right_on='city')
        data = data.drop_duplicates(cols='city')
        data = data.set_index('rank')
        return data
    
    @classmethod
    def get_top_cities(cls):
        from django.db import connection, transaction
        cur = connection.cursor()
        cur.execute('select count(*), country from Venues group by country order by count(*) DESC')
        data = pd.DataFrame(cur.fetchall())
        return list(data[1])[:10]
    
    @classmethod
    def get_json_for_country(cls, country):
        from django.db import connection, transaction
        cur = connection.cursor()
        
        cur.execute('select count(*), city, country from Venues where country=%s group by city order by count(*) DESC', [country])
        data = pd.DataFrame(cur.fetchall())
        data.columns = ['count','city', 'country']
        data = data[data.city!='']
        clean = lambda x:x.split(',')[0]
        data.city = data.city.apply(clean)
        data = data.groupby('city')['count'].sum()
        data = pd.DataFrame(data)
        data = data.sort_index(by='count', ascending=False).reset_index()
        
        return data
     
        

class Events(models.Model):
    id = models.IntegerField(unique=True, primary_key=True) # This field type is a guess.
    title = models.TextField(blank=True)
    start_date = models.TextField(blank=True)
    headline_artist = models.TextField(blank=True)
    
    venue = models.ForeignKey(Venues, db_column="id")
    
    description = models.TextField(blank=True)
    image = models.TextField(blank=True)
    attendance = models.TextField(blank=True)
    reviews = models.TextField(blank=True)
    tag = models.TextField(blank=True)
    url = models.TextField(blank=True)
    website = models.TextField(blank=True)
    cancelled = models.TextField(blank=True)
    class Meta:
        db_table = 'EVENTS'
        
    def __unicode__(self):
        return self.title

class EventArtist(models.Model):
    event_id = models.IntegerField(null=True, blank=True)
    artist_name = models.TextField(blank=True)
    class Meta:
        db_table = 'EVENT_ARTIST'


