import { S3Client,  PutObjectCommand} from "@aws-sdk/client-s3";

const s3Client = new S3Client({ region: 'us-east-1' });

/*
  This Lambda function uploads an image file to an Amazon S3 bucket.
  It is triggered by an HTTP request containing the image as binary data.
  - Parses the HTTP request to extract the binary image data.
  - Constructs the necessary parameters for the S3 upload operation, including the bucket name, key (file name), and body (image data).
  - Utilizes the AWS S3 SDK's `putObject` method to store the image in the specified S3 bucket.
  - Returns a success response with the URL of the uploaded image or an error message if the upload fails.
*/
export const handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json",
  };
  
  try {
    console.log(event)
    let base64Encoded = event.body;
    const buffer = Buffer.from(base64Encoded, 'base64');
    await s3Client.send( new PutObjectCommand(
        { 
          Bucket: "post-images15", 
          Key: event.pathParameters.key, 
          Body: buffer 
        }
      ))

    body = `Put post 201`;
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers,
  };
};