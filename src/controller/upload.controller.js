const fs = require('fs');
const dotenv = require('dotenv');
const { parseToCsv } = require('../utils/csvParser');
const { insertIntoDB, calculateAgeDistribution } = require('../model/insert.model');
const { successFormat, failFormat } = require('../utils/responseFormat');
dotenv.config();



const uploadFile = async (req, res) => {
    try {
        const data = fs.readFileSync(process.env.CSV_FILE_PATH, 'utf-8');
        let user = parseToCsv(data)
        await Promise.allSettled([
            insertIntoDB(user),
            calculateAgeDistribution(user)
        ])
        return successFormat(200, [], 'File uploaded and processed successfully.', res);
    } catch (error) {
        return failFormat(500, error, 'Internal server error.', res);
    }
}

module.exports = { uploadFile };