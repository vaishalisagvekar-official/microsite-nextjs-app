const fs = require('fs');
var path = require("path");
const ObjectId = require('mongodb').ObjectId;

import { getStaticKeys } from '../../common-methods/constants';
import { updateFileData, readFileData } from '../../common-methods/file-operations';
import { connectToDatabase } from '../../common-methods/database';
const filePath = 'D:/plotnetwork/microsite-nextjs/partner-pages/partner-pages-main/config/data-broker.json';
const relativeFilePath = 'config/data-broker.json';


async function handler(req, res) {

    if (req.method === 'PUT') {
        
        let { db } = await connectToDatabase();

        console.log("re body ",req.body)
        console.log("type of body ",typeof req.body)
        const findBrokerQuery = {
            partnerName : getStaticKeys().partnerName
        }
        const requestObj = JSON.parse(JSON.stringify(req.body))
        if(requestObj.brokerId !== undefined) findBrokerQuery._id = new ObjectId(requestObj.brokerId);

        // fetch the brokers
        let brokers = await db
            .collection('broker')
            .find(findBrokerQuery).toArray();

        console.log("brokers ",brokers.length);
        var absolutePath = path.resolve(relativeFilePath);

        if(brokers.length > 0){
            if(requestObj.brokerId){
                readFileData(absolutePath).then(response => {
                    if(response.err !== undefined) return res.status(response.status).json(response);
                    let isNewBroker = true;
                    const oldBrokers = JSON.parse(response.data);
                    const newBrokers = oldBrokers.map((broker) => {
                        console.log("old broker sm id ",broker.salesManagerId)
                        console.log("new broker sm id ",brokers[0].salesManagerId)
                        if(broker._id == brokers[0]._id) {
                            isNewBroker = false;
                            return brokers[0];
                        }
                        return broker;
                    });
                    if(isNewBroker) newBrokers.push(brokers[0]);
                    updateFileData(absolutePath, newBrokers).then(response => {
                        res.status(response.status).json(response);
                    });
                })           
            } else {
                updateFileData(absolutePath, brokers).then(response => {
                    res.status(response.status).json(response);
                });
            }
        }
    }
    
};

export default handler;
