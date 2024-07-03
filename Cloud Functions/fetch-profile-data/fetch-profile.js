const functions = require('@google-cloud/functions-framework');
const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();


/*
  This Cloud Function fetches a single profile document from a Firestore collection based on the provided document ID.
  It is triggered by an HTTP request containing the collection name and document ID as query parameters.

  - Parses the HTTP request to extract the collection name and document ID from the query parameters.
  - Constructs the necessary parameters for the Firestore read operation, including the collection name and document ID.
  - Utilizes the Firestore SDK's `get` method to retrieve the document from the specified Firestore collection.
  - Checks if the document exists and returns the document data as a JSON response.
  - If the document does not exist, returns a 404 error with a "Error fetching User Profile." message.
  - Handles errors gracefully, logging the error and returning an appropriate response to the client.

  Example HTTP Request:
  GET /fetch-profile?collectionName=profile&documentId=123

  - `collectionName`: The name of the Firestore collection where the profile document is stored.
  - `documentId`: The document ID of the profile to be retrieved.
*/
functions.http('helloHttp', async (req, res) => {
  // Set CORS headers for preflight and actual requests
  res.set('Access-Control-Allow-Origin', '*'); // Specify domains instead of '*' for better security in production
  res.set('Access-Control-Allow-Methods', 'GET, POST');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    // Send response for preflight request
    res.status(204).send('');
  } else {
    const { collectionName, documentId } = req.query;

    if (!collectionName || !documentId) {
      res.status(400).send('Missing required parameters.');
      return;
    }

    try {
      const docRef = db.collection(collectionName).doc(documentId);
      const doc = await docRef.get();

      if (!doc.exists) {
        res.status(404).send('User Profile not found.');
        return;
      }

      res.status(200).json(doc.data());
    } catch (error) {
      console.error('Error fetching User Profile:', error);
      res.status(500).send('Error fetching User Profile.');
    }

  }

});