const functions = require('@google-cloud/functions-framework');
const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();


/*
  This Cloud Function updates profile data in a Firestore collection based on the provided document ID.
  It is triggered by an HTTP request containing the updated profile data in JSON format, including the status and bio fields, along with the collection name and document ID.

  - Parses the HTTP request to extract the updated profile data, collection name, and document ID from the request body.
  - Constructs the necessary parameters for the Firestore update operation, including the collection name, document ID, and updated profile data.
  - Utilizes the Firestore SDK's `update` method to update the document in the specified Firestore collection.
  - If the document ID is provided, it updates the corresponding document with the new data.
  - Returns a success response indicating that the 'User Profile updated successfully.' or an error message if the update fails.

  Example HTTP Request (JSON):
  {
    "collectionName": "profile",
    "documentId": "123",
    "newKeyValue": {
      "name": "Jane Doe",
      "email": "jane.doe@example.com",
      "status": "active",
      "bio": "Software developer from San Francisco.",
    }
  }

  - `collectionName`: The name of the Firestore collection where the profile document is stored.
  - `documentId`: The document ID of the profile to be updated.
  - `newKeyValue`: The updated profile data to be stored, formatted as a JSON object, including fields such as name, email, status, and bio.
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
    const { collectionName, documentId, newKeyValue } = req.body;

    if (!collectionName || !documentId || !newKeyValue || typeof newKeyValue !== 'object') {
      res.status(400).send('Missing required parameters or invalid newKeyValue.');
      return;
    }

    try {
      const docRef = db.collection(collectionName).doc(documentId);

      // Update the document with the new key-value pair
      await docRef.update(newKeyValue);

      res.status(200).send('User Profile updated successfully.');
    } catch (error) {
      console.error('Error updating User Profile:', error);
      res.status(500).send('Error updating User Profile.');
    }

  }
  
});