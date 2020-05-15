# seed.py
#
# A python3 seed program for loading fake data to be used for performance testing.
# All collections will be dropped in the connected database before creating new fake data. 
#
# The program accepts 2 arguments which drive the size of the database (# of properties and inspections)
# Other parmeters can be tweaked in the generator files. 
#
# After running it will print one record from each database for verification.
#
# python3 seed.py [# of properties] [max # of inspections]
#

import sys
from pymongo import MongoClient
from faker import Faker
from pydash import py_
from datacreators import create_properties, print_results

client = MongoClient('mongodb://localhost:27017')
db = client.propertycheck
fake = Faker()

def setup_collections():
    db.properties.delete_many({});
    db.rooms.delete_many({});
    db.inspections.delete_many({});
    db.ratings.delete_many({});
    db.responses.delete_many({});
    
if __name__ == '__main__':
    fake = Faker()
    setup_collections()
    create_properties(db, fake, int(sys.argv[1]), int(sys.argv[2]))
    print_results(db)
    


