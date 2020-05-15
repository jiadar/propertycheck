# datacreators.py
#
# This calls record fake methods and adds the fake records to the underlying database/connection
# making cross references for joins where necessary.
#

from pprint import pprint
import random
from datagenerators import fakeProperty, fakeRoom, fakeInspection, fakeRating, fakeResponse

# MAX_RESPONSES sets the number of maximum questions for each room. You can change this. 
MAX_RESPONSES = 4

# MAX_ROOMS sets the maximum number of rooms in the fakeRoom function. It's used to add rooms
# randomly. Don't want to change this unless you also change the rooms array in the fakeRoom function. 
NUM_ROOMS = 28

def create_rooms(db, fake, propid):
    rooms = []
    for j in range(NUM_ROOMS):         # number of room types in datagenerators array
        if (fake.pybool()):
            roomid = db.rooms.insert_one(fakeRoom(fake, j, propid)).inserted_id
            rooms.append(roomid)
    return rooms

def create_ratings(db, fake, inspid, rooms):
    for room in rooms:
        responses = []
        rating = db.ratings.insert_one(fakeRating(fake, inspid, room)).inserted_id
        for _ in range(random.SystemRandom().randint(1, MAX_RESPONSES)):
            response = db.responses.insert_one(fakeResponse(fake, rating)).inserted_id

def create_inspections(db, fake, max_gen_i, propid, rooms):
    for i in range(random.SystemRandom().randint(1,max_gen_i)):
        print(".", end ="", flush=True)
        inspid = db.inspections.insert_one(fakeInspection(fake, propid, rooms)).inserted_id
        ratingid = create_ratings(db, fake, inspid, rooms)
        
def create_properties(db, fake, max_gen_p, max_gen_i):
    for i in range(max_gen_p):
        propid = db.properties.insert_one(fakeProperty(fake)).inserted_id
        rooms = create_rooms(db, fake, propid)
        create_inspections(db, fake, max_gen_i, propid, rooms)

def print_results(db):
    print()
    pprint(db.properties.find_one())
    pprint(db.rooms.find_one())
    pprint(db.inspections.find_one())
    pprint(db.ratings.find_one())
