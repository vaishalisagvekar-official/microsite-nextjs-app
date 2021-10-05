const fs = require('fs');
var path = require("path");
const ObjectId = require('mongodb').ObjectId;

import { updateFileData, readFileData} from '../../common-methods/file-operations';
import { connectToDatabase } from '../../common-methods/database';
const filePath = 'D:/plotnetwork/microsite-nextjs/partner-pages/partner-pages-main/config/data-project.json';
const relativeFilePath = 'config/data-project.json';

async function handler(req, res) {

    if (req.method === 'PUT') {
        
        let { db } = await connectToDatabase();

        const findProjectQuery = {
            partnerName : "kohinoor",
            isDeleted : false
        }
        const requestObj = JSON.parse(req.body)
        if(requestObj.projectId !== undefined) findProjectQuery._id = new ObjectId(requestObj.projectId);
        
        // fetch the projects
        let projects = await db
            .collection('project')
            .find(findProjectQuery).toArray();

        var absolutePath = path.resolve(relativeFilePath);

        if(requestObj.projectId){
            readFileData(absolutePath).then(response => {
                if(response.err !== undefined) return res.status(response.status).json(response);
                
                const oldProjects = JSON.parse(response.data);
                const newProjects = oldProjects.map((project) => {
                    if(project._id == projects[0]._id) return projects[0];
                    return project;
                });
                updateFileData(absolutePath, newProjects).then(response => {
                    res.status(response.status).json(response);
                });
            })
        } else {

            updateFileData(absolutePath, projects).then(response => {
                res.status(response.status).json(response);
            });
        }
        
    }
    
};

export default handler;

