// Load the SDK and UUID
var AWS = require('aws-sdk');

// Create an S3 client
var s3 = new AWS.S3();

// Create a bucket and upload something into it
//var bucketName = 'node-sdk-sample-' + uuid.v4();
var bucketName = 'javascript-node-sdk-example';
var keyName = 'hello_world.txt';

s3.createBucket({Bucket: bucketName}, function () {

    var params = {
        Bucket: bucketName,
        Key: keyName,
        Body: 'Hello World!'
    };

    s3.putObject(params, function (err, data) {
        if (err)
            console.log(err)
        else
            console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
    });

    s3.listObjects({Bucket: bucketName}, function(error, data){
        if(error) {
            console.log(error);
        } else {
            console.log(data);
        }
    });
});

