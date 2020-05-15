# datagenerators.py
#
# Generates fake data from the faker library for various collection types. 
#

from datetime import datetime
from pydash import py_

# Used for the max sentence length for question. You can change this. 
MAX_SENTENCE_LENGTH = 8

def fakeProperty(fake):
    return {
        'address': fake.street_address(),
        'city': fake.city(),
        'state': fake.state_abbr(),
        'zip': fake.zipcode(),
        'dateAdded': datetime.utcnow()
    }

def fakeRoom(fake, typ, propid):
    roomTypes = ["bed1", "bed2", "bed3", "bed4", "bed5", "bed6", "bed7", "bed8",
                 "bath1", "bath2", "bath3", "bath4", "bath5", "bath6", "bath7", "bath8",
                 "kitchen", "living", "dining", "family", "laundry", "hallway", "stairs",
                 "garage", "carport", "frontYard", "frontPorch", "backYard", "backPorch"];

    return {
        'desc': roomTypes[typ],
        'images': [ fake.image_url(), fake.image_url(), fake.image_url(), fake.image_url() ],
        'property': str(propid)
    }

def fakeResponse(fake, ratingid):
    response = {
        'question': fakeQuestion(fake),
        'response': fake.pybool(),
        'rating': str(ratingid)
    }
    return response

def fakeRating(fake, inspid, room):
    conditions = ["Good", "Fair", "Poor"];
    rating = {
        'room': str(room),
        'cond': py_.sample(conditions),
        'images': [ fake.image_url(), fake.image_url(), fake.image_url(), fake.image_url() ],
        'inspection': str(inspid)
    }
    return rating
        
def fakeInspection(fake, propid, rooms):
    inspecTypes = ["move-in", "move-out", "periodic", "annual"];
    byTypes = ["owner", "tenant", "property-manager"];
    statuses = ["Complete", "Incomplete", "Not Started"];
    
    return {
        'dateCompleted': fake.date(pattern="%Y-%m-%d", end_datetime=None),
        'dateAdded': fake.date(pattern="%Y-%m-%d", end_datetime=None),
        'type': py_.sample(inspecTypes),
        'by': py_.sample(byTypes),
        'status': py_.sample(statuses),
        'property': str(propid),
    }

def fakeQuestion(fake):
    return fake.sentence(nb_words=MAX_SENTENCE_LENGTH, variable_nb_words=True, ext_word_list=None)[:-1] + "?";
