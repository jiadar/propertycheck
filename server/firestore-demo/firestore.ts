//
// This is an example of how to implement using firestore. Generally you should use the 
// admin.firestore() instead of the model. Though the free firestore has read limits, so
// you can't really performance test with it. 
//
// This file is deprecated. Please see mongo.js for the working demo
//


import * as admin from 'firebase-admin';

var serviceAccount = require("/Users/javin/work/rentcheck/server/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://jiadar-37e75.firebaseio.com"
});

import { ApolloServer, ApolloError, ValidationError, gql } from 'apollo-server';

interface Company {
  id: string;
  name: string;
  field1: string;
  field2: string;
  field3: string;
  field4: string;
  field5: string;
  field6: string;
}

interface Unit {
  id: string;
  companyId: string;
  description: string;
  field1: string;
  field2: string;
  field3: string;
  field4: string;
  field5: string;
  field6: string;
}

const typeDefs = gql`
# A company that owns units
type Company {
id: ID!
name: String!
field1: String
field2: String
field3: String
field4: String
field5: String
field6: String
units: [Unit]!
}
# A Unit object
type Unit {
id: ID!
description: String!
field1: String
field2: String
field3: String
field4: String
field5: String
field6: String
companyId: String
company: Company! 
}
type Query {
units: [Unit]
company(id: String!): Company
companies: [Company]
}
`;

const resolvers = {
  Query: {
    async units() {
      const units = await admin
        .firestore()
        .collection('units')
        .get();
      return units.docs.map(unit => unit.data()) as Unit[];
    },
    async companies() {
      const companies = await admin
        .firestore()
        .collection('companies')
        .get();
      return companies.docs.map(company => company.data()) as Company[];
    },
    async company(_: null, args: { id: string }) {
      try {
        const companyDoc = await admin
          .firestore()
          .doc(`companies/${args.id}`)
          .get();
        const company = companyDoc.data() as Company | undefined;
        return company || new ValidationError('Company ID not found');
      } catch (error) {
        throw new ApolloError(error);
      }
    }
  },
  Company: {
    async units(company) {
      try {
        const companyUnits = await admin
          .firestore()
          .collection('units')
          .where('companyId', '==', company.id)
          .get();
        return companyUnits.docs.map(unit => unit.data()) as Unit[];
      } catch (error) {
        throw new ApolloError(error);
      }
    }
  },
  Unit: {
    async company(unit) {
      try {
        const unitOwner = await admin
          .firestore()
          .doc(`companies/${unit.companyId}`)
          .get();
        return unitOwner.data() as Company;
      } catch (error) {
        throw new ApolloError(error);
      }
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  engine: {
    apiKey: "service:jiadar:SK9f2BCSAz4SMcD1PcXMUQ"
  },
  introspection: true
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
