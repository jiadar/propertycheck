---
title: Graphql Demo Documentation

language_tabs: # must be one of https://git.io/vQNgJ
  - javascript

toc_footers:
  - Content by <a href='http://www.javin.io'>Javin Lacson</a>
  - Questions? <a href='mailto:work@javin.io'>email me</a>

search: true
---

# Introduction

This is a demo of Apollo GraphQL client, server, and cache based on a property inspection app. It consists of a test data generator, API server, and React client. The underlying data store is Mongodb and is accessed with the javascript mongoose ORM/library.

- [Client Source](https://bitbucket.org/jiadar/propertycheck/src/master/client/)
- [Server Source](https://bitbucket.org/jiadar/propertycheck/src/master/server/)
- [Generator Source](https://bitbucket.org/jiadar/propertycheck/src/master/pygen/)
- [Documentation Source](https://bitbucket.org/jiadar/propertycheck/src/master/doc/)

# Data Model

This is a simplified data model without users, but contains enough complexity to demonstate the GraphQL specific functions for one particular user. To understand the data model it is best to look at the graphql types on the server. All data types contain a unique ID which is a Mongo ObjectID, but could be any unique or uuid number or text.

## Properties
```javascript
  type Property @key(fields: "_id") {
    _id: ID!
    address: String
    city: String
    state: String
    zip: String
    dateAdded: String
    inspections: [Inspection]
    rooms: [Room]
  }
```
This is a graphql type definition, allowing relationships to be expressed between types. Properties contain basic fields around a property. A property has many inspections and many rooms. Inspections and Rooms are matched by cooresponding property fields on those tables. 

## Inspections
```javascript
  type Inspection @key(fields: "_id") {
    _id: ID!
    dateAdded: String
    dateCompleted: String
    type: String
    by: String
    status: String
    property: Property
    ratings: [Rating]
  }
```

Inspections have a single property associated with it, but can have many ratings.

## Ratings
```javascript
  type Rating @key(fields: "_id") {
    _id: ID!
    cond: String
    images: [String]
    responses: [Response]
    room: Room
  }
```
Ratings are for a particular room and could have a number of responses (Q&A), as well as an array of image links.

## Responses
```javascript
  type Response @key(fields: "_id") {
    _id: ID!,
    question: String,
    response: String
  }
```

Responses are a leaf object with questions and responses. It could be further normalized by separating questions into another collection, but the point of the demo is around graphql and not necessarily a fully normalized schema. 

## Rooms
```javascript
  type Room @key(fields: "_id") {
    _id: ID!
    desc: String
    images: [String]
    property: Property
  }
```
Rooms contain the description (for instance, 'bedroom') along with an array representing image links. A room belongs to a property. 

# Data Generator

```javascript
python3 ./seed.py [#properties] [#max_inspections]
```
The data generator is written in python. It uses fake to generate data matching the models. It can generate a small or large amount of data depending on how it is executed.

To run the data generator in it's source directory, execute the `seed.py` program giving arguments for the number of properties and the maximum (random) number of inspections attached to a property.

```javascript
{'_id': ObjectId('5dd41e0e84841d04806ee97a'),
'address': '4606 Garcia Curve',
'city': 'Brandonborough',
'dateAdded': datetime.datetime(2019, 11, 19, 16, 53, 34, 245000),
'state': 'SD',
'zip': '87572'}

{'_id': ObjectId('5dd41e0e84841d04806ee97b'),
'desc': 'bed1',
'images': ['https://placekitten.com/616/733',
'https://www.lorempixel.com/521/543',
'https://www.lorempixel.com/572/452',
'https://placekitten.com/601/982'],
'property': '5dd41e0e84841d04806ee97a'}

{'_id': ObjectId('5dd41e0e84841d04806ee98b'),
'by': 'owner',
'dateAdded': '1995-02-28',
'dateCompleted': '1974-05-29',
'property': '5dd41e0e84841d04806ee97a',
'status': 'Not Started',
'type': 'move-in'}

{'_id': ObjectId('5dd41e0e84841d04806ee98c'),
'cond': 'Fair',
'images': ['https://www.lorempixel.com/626/642',
'https://placekitten.com/219/711',
'https://dummyimage.com/743x703',
'https://placekitten.com/921/331'],
'inspection': '5dd41e0e84841d04806ee98b',
'room': '5dd41e0e84841d04806ee97b'}
```

The generator consists of a datacreator and a datagenerator. For the most part, the generator will generate objects while the creator will link and insert objects into the database. The `seed.py` utility links the two. The utility will output some objects so that the developer can see the relationships and fields without having to query mongodb.

The generator can generate large amounts of fake data which could be useful for load testing, though the generator itself is not particulary fast. 

# Server
```javascript
  formatError: error => {
    console.log(error);
    return error;
  },
  formatResponse: response => {
    console.log(response);
    return response;
  },
```

The server currently runs apollo server (express), and is backed by Mongodb. The server can be run in developer mode with ```npm start```. This uses nodemon to watch files for changes, and automatically restart. The server file is ```mongo.js```. It is configured for heavy console logging in order to trace queries through each layer of the system. 

## Models
```javascript
const PropertySchema = mongoose.Schema({
  _id: mongoose.Schema.ObjectId,
  address: String,
  city: String,
  state: String,
  zip: String,
  dateAdded: String
});

export default mongoose.model('Property', PropertySchema)
```

In the ```models/``` directory there are files for each collection representing the Mongoose ORM model for those objects. For instance, we create a property schema and export the mongoose model. Mongoose will automatically *pluralize* the object to get the collection name. In this instance the collection name would be *properties*. Note that we do not put relationships in the model in general, these relationships will exist in the graphql type. 

## Types

```javascript
  type Property @key(fields: "_id") {
    _id: ID!
    address: String
    city: String
    state: String
    zip: String
    dateAdded: String
    inspections: [Inspection]
    rooms: [Room]
  }

  extend type Query {
    property(id: String): Property
    properties: [Property] 
  }
```
In the ```types/``` directory there are files for each collection representing the graphql type. These will have the relationships referencing other graphql types. While queries could be represented in a different file, I keep the queries with the graphql type. The query here says that I can ask for a single property by ID, and it will return a Property type. I can also ask for all properties, which will return an array of properties. 

## Resolvers

```javascript
export default {
  Inspection: {
    __resolveReference(object) {
      return Inspection.findOne({ _id: object.id });
    },
    ratings(inspection) {
      return Rating.find( { inspection: inspection._id.toString() });
    }
  },
  Query: {
    inspection(_, args) {
      return Inspection.findOne({_id: args.id});
    },
    inspections(_, args) {
      return Inspection.find({});
    }
  }
};
```
Resolvers contain the logic for executing a query, and are fully customizable. Graphql resolves queries by recursively resolving subqueries. This leads to clean design, less code, and easy separation of concerns.

This is the inspection query. Passed into the function are `parent, args, context, info`. It uses the parent and arguments to resolve queries recursively.

In this case, it can resolve an inspection object by ID with the mongoose method `findOne()`. It can resolve joins like *find all the ratings for inspection id* in one line of code, querying the ratings object. This will nest the rating under the inspection object.

Finally, for each query in the type, we need to provide a resolver for that query. We can find one inspection, or find an array of all inspections using the appropriate mongoose model method. 

## Serverless

While not implemented here, it is now trival to implement [federation](https://www.apollographql.com/docs/apollo-server/federation/introduction/). Federation will seperate all logical units of the server into separate, self contained micro-services. A gateway micro-service will build up the query and send it to the appropriate places. This can be used with AWS lambda or other serverless / microservice providers. 

## Data Sources

```javascript
import * as admin from 'firebase-admin';

var serviceAccount = require("/Users/javin/work/rentcheck/server/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://jiadar-37e75.firebaseio.com"
});
```

Firebase is also supported by swapping out mongoose client with firebase. In `server/src/firebase-demo` there is a two table demo of using firebase for the server data. Due to firebase read/write limits, it is difficult/expense to test at scale, so Mongodb running locally was chosen.

```javascript
      const units = await admin
        .firestore()
        .collection('units')
        .get();
      return units.docs.map(unit => unit.data()) as Unit[];
```

If you were to use firebase, changing all mongo / mongoose logic to firebase API calls is necessary. Once you have the admin object set up in server, pass it on the context, and change the resolver logic to use firebase as in the demo. You would also have to change package.json to run the firebase backed server rather than mongo.js. 

One benefit of GraphQL is that swapping out backends only requires replacing a few lines of resolver code in the method matching the collection you are swapping out. Not only that, but resolvers could be written to contact different datasources depending on parameters in other objects. A developer could implement a data migration strategy with low risk by moving client data by collection in batches. 

## Analytics

```javascript
  engine: {
    apiKey: "service:name:key"
  },
```
One of the issues in scaling is tracking and identifying API requests that are inefficient. Apollo provides an [analytics engine](https://engine.apollographql.com/) to identify, troubleshoot, and monitor these poorly performing queries with ease. Just pass in the configuration to apollo server and your engine API key. It will also track your schema versioning if you turn on introspection. 

# Client

```javascript
query propertyInspections($id: String) {
  property(id: $id) {
    ...PropertyAttributes
    inspections {
      ...InspectionAttributes
    }
  }
```
A react application was created to demonstate apollo client and cache. With graphql we can provide the correct content and shape of JSON data with a single query to a single endpoint, without having to code much if any logic on the client. As we have seen previously, the server requires minimal code as well. This is due to the expressiveness of the GraphQL query.

## React App

```javascript
cd client
npm start
```
A react app was created with CRA and ejected. Webpack was configured to parse `graphql/gql` files and a babel loader was added for those files. To keep things simple, [tachyons](https://tachyons.io/) was used as a lightweight UI library along with custom css library [styled-components](https://www.styled-components.com/). Finally, [apollo-boost](https://www.apollographql.com/docs/react/get-started/) is used to provide the apollo client modules on the frontend.

Run the react app with `npm start`. The app entry point is `src/index.js` and routes are in `src/App.js`. 

The app displays a dashboard with a table of properties. Properties and inspections are fetched at this time. An inspection count is generated which is an expensive operation and could be async. If a property is selected, a list of inspections is shown. When an inspection is selected, JSON data is presented with the information to render an inspection detail screen. In order to create the demo as quickly as possible, a front end was not created for the inspection detail, but easily could with the data.

## Async Loading

```javascript
function Dashboard() {
  const { loading, error, data } = useQuery(propertiesQuery);
  if (loading) return <Loading />;
  if (error) return <p>Error</p>;
  return <Properties properties={data.properties} />
}
```

Apollo client provides async loading for free. Display your `<Loading />` component or spinner while data is fetching by inspecting the query return object. Take a look at the Dashboard page / react component at `src/pages/Dashboard/index.js`. The apollo client `useQuery` hook executes the query and returns an object which specifies the state. If `loading` is `true` then data is being fetched asyncronously and you can render a loading page and return. Once loaded, your component will re-render with the actual data requested. 

## GraphQL

```javascript
fragment PropertyAttributes on Property {
  _id
  address
  city
  state
  zip
}
```
In the `client/src` folder, there are several graphql specific folders including:

Folder | Function
-------------- | -------------- 
**fragments/** | Repeated fields common to many queries
**queries/** | Named queries to obtain data shape required for pages
**mutations/** | Named mutations for updating records or adding new records (not implemented in demo)
**subscriptions/** | Named subscriptions for push and async update functionality (not implemented in demo)

To the right is an example of a fragment from `src/fragments/Properties.gql`.

## Performance 

```javascript
const cache = new InMemoryCache();
```
Apollo client provides local storage caching by default. The cache is configurable and instantiated in `src/index.js`. It uses local storage to cache all query results from the current session. In the default configuration, local cache is queried first, providing objects from the cache if present. Write through on the cache is also supported. With write through cache the UI can be updated before the database query resolves over the network.

The cache can also be persisted in the user's local storage, for optimizing load times between user sessions. 

With the cache, it becomes simpler to implement Optimistic UI. Queries could be dispatched asyncronously when, for instance, the user hovers over a button or area of the page. The query could get a head start in populating the cache, leading to a better user experience. 

While not implemented in the demo, [pagination](https://www.apollographql.com/docs/react/data/pagination/) and is [achievable](https://blog.apollographql.com/understanding-pagination-rest-graphql-and-relay-b10f835549e7) in several ways. For larger accounts, pagination combined with search/sort provides substantial performance benefits and reduces the load on the back end. 


## Client State
Using the apollo cache could substantially cut down error prone management of local storage, and/or managing local state in tools like Redux. Local state management tools can then focus on UI and other client local state rather than managing all data the application needs. 

Most of state management is concerned with merging data from multiple REST endpoints into the correct shape for the UI. With GraphQL this is no longer necessary. Additionally, handing the async nature of getting all the data in the right order for a specific page is also handled cleanly by GraphQL. This almost eliminates the need for redux, thunk, saga, and other middleware. The actual UI state becomes so simple that you may consider just using context. 

# Developer 

Testing and debugging a full stack application - especially when architected with different data sources and microservices - can quickly become complex. With apollo server / client backed with a datastore like postgres or mongo, it is easy to test/inspect/debug each layer of the app. Some useful tools include:

Tool|Description
------|-----
**mongotail** | tail the mongodb query log in a sane way
**Logging** | Log all graphql requests and results from your server
**Playground** | Test & execute queries on your backend before committing to code
**Devtools** | Apollo provides devtools to test & execute queries on your client/browser
**Graph Manager** | Track schema and performance metrics, diagnose poorly performing queries

# Deployment

This section describes deployment to a Ubuntu 18.x server. Have your friendly devops person help if necessary. 
You could follow [this guide](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04) for nginx and [this](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-18-04) for the server/client. 

You will also need to install build deps, libz-dev, ruby, current npm and nodejs, and pm2 among other things. For python generator you will need to install faker, pydash, and pymongo. Then you will need to install mongodb, nginx, etc. PITA!

Also you need to install `serviceAccountKey.json` for the apollo engine and a `.env` file specific to your environment and compile the app with babel cli. 

