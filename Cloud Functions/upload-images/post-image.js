const functions = require('@google-cloud/functions-framework');
const admin = require('firebase-admin');
const { Storage } = require('@google-cloud/storage');
const path = require('path');
const os = require('os');
const fs = require('fs');

admin.initializeApp()

// Initialize Google Cloud Storage
const storage = new Storage({
  projectId: 'lab-activity-2-serverless', // Replace with your project ID
});

const bucketName = 'profile-images15'; // Replace with your bucket name
const bucket = storage.bucket(bucketName);


/*
  This Cloud Function uploads an image file to a Google Cloud Storage bucket.
  It is triggered by an HTTP request containing the image data encoded in base64 format and the desired file name.

  - Parses the HTTP request to extract the base64-encoded image data and the file name.
  - Decodes the base64 image data to binary data.
  - Constructs the necessary parameters for the Cloud Storage upload operation, including the bucket name, file name, and image data.
  - Utilizes the Google Cloud Storage SDK's `upload` method to store the image in the specified bucket.
  - Returns a success response with the URL of the uploaded image or an error message if the upload fails.

  Example HTTP Request (JSON):
  {
    "base64Image": "9j/4AAQSkZJRgABAQAAAQ...",
    "fileName": "example.jpg"
  }

  - `base64Image`: The image data encoded in base64 format.
  - `fileName`: The desired file name for the uploaded image, including the file extension.
*/
functions.http('uploadImage', async (req, res) => {
  // Set CORS headers for preflight and actual requests
  res.set('Access-Control-Allow-Origin', '*'); // Specify domains instead of '*' for better security in production
  res.set('Access-Control-Allow-Methods', 'GET, POST');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    // Send response for preflight request
    res.status(204).send('');
  } else {
    const { base64Image, fileName } = req.body;

    if (!base64Image || !fileName) {
      res.status(400).send('Missing base64 image or file name.');
      return;
    }

    const tempFilePath = path.join(os.tmpdir(), fileName);

    try {
      // Decode the base64 image
      const buffer = Buffer.from(base64Image, 'base64');

      // Write the file to a temporary location
      fs.writeFileSync(tempFilePath, buffer);

      // Upload the file to Cloud Storage
      await bucket.upload(tempFilePath, {
        destination: fileName,
        resumable: false
        // metadata: {
        //   contentType: 'image/png', // Adjust the content type as necessary
        // },
      });

      const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;

      // Remove the temporary file
      fs.unlinkSync(tempFilePath);

      res.status(200).send({ url: publicUrl });
    } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).send('Error uploading file.');
    }
  }

  
});