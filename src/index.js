const { BlobServiceClient } = require("@azure/storage-blob");

module.exports = async function (context, myTimer) {
    const storageAccountName = process.env.STORAGE_ACCOUNT_NAME || "charan1";
    const containerName = "zen-charan-blob-test";

    if (myTimer.isPastDue) {
        context.log("Timer function is running late!");
    }

    try {
        const connectionString = process.env.AzureWebJobsStorage;
        if (!connectionString) {
            throw new Error("AzureWebJobsStorage is not defined");
        }

        const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
        const containerClient = blobServiceClient.getContainerClient(containerName);
        let blobs = containerClient.listBlobsFlat();

        for await (const blob of blobs) {
            context.log(`Blob found: ${blob.name}`);
        }

        context.log("Timer function executed successfully.");
    } catch (err) {
        context.log.error("Error accessing Blob Storage:", err.message);
    }
};
