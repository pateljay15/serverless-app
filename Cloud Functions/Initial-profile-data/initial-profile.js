const functions = require('@google-cloud/functions-framework');
const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();

/*
  This Cloud Function uploads initial profile data to a Firestore collection.
  It is triggered by an HTTP request containing the profile data in JSON format.

  - Parses the HTTP request to extract the profile data from the request body.
  - Constructs the necessary parameters for the Firestore write operation, including the collection name and document ID.
  - Utilizes the Firestore SDK's `set` method to store the profile data in the specified Firestore collection.
  - If the document ID is not provided, Firestore generates a new document ID.
  - Returns a success response with the message 'User initial profile added/updated successfully' or an error message if the upload fails.

  Example HTTP Request (JSON):
  {
    "userId": "user123",
    "profileData": {
      "name": "John Doe",
      "email": "john.doe@example.com",
    }
  }

  - `collectionName`: The name of the Firestore collection where the profile data should be stored.
  - `documentId`: (Optional) The document ID for the new profile data. If not provided, a new document ID is generated.
  - `profileData`: The profile data to be stored, formatted as a JSON object.
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
    const { userId, profileData } = req.body;

    try {
      await db.collection('profile').doc(userId).set(profileData, { merge: true });
      res.status(200).send('User initial profile added/updated successfully');
    } catch (error) {
      res.status(500).send('Error adding/updating initial user profile: ' + error.message);
    }
  }
});
