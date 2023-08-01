const fs = require('fs-extra');

// Function to analyze log data
async function analyzeLog(filePath) {
  try {
    // Read the log file asynchronously
    const startTime = Date.now();
    const logData = await fs.readFile(filePath, 'utf-8');


    // Step 1: Parse the log data and create a data structure for analysis
    const logLines = logData.split('\n').filter((line) => line.trim() !== '');
    const logRecords = logLines.map((line) => {
      const [timestamp, messageType, ...messageArray] = line.split(' ');
      const wordCount = messageArray.length;
      const message = messageArray.join(' ');
      const processingSpeed = (Date.now() - startTime) * 1000 * 60;
      return { timestamp, messageType, processingSpeed, wordCount, message };
    });

    // Step 2: Calculate statistics
    const records = logRecords.length;

    // Create an object to store the count of each message type
    const types = {};
    logRecords.forEach((record) => {
      const { messageType } = record;
      if (types[messageType]) {
        types[messageType]++;
      } else {
        types[messageType] = 1;
      }
    });

    // Calculate the average processing speed per minute
    const totalProcessingSpeed = logRecords.reduce((sum, record) => sum + record.processingSpeed, 0);
    const avgProcessingSpeed = totalProcessingSpeed / records;

    // Find the record with the most words
    const maxWords = logRecords.reduce((prevRecord, currentRecord) => {
      var max = currentRecord.wordCount > prevRecord.wordCount ? currentRecord : prevRecord;
      return {
        message: max.message,
        wordCount: max.wordCount
      }
    });

    // Step 3: Prepare the final result object
    const result = {
      records,
      types,
      avgProcessingSpeed,
      maxWords,
    };

    return result;
  } catch (error) {
    console.error('Error reading or analyzing log file:', error);
    return null;
  }
}

export default analyzeLog;
