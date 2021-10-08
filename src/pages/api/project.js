const fs = require('fs');
var path = require("path");
const ObjectId = require('mongodb').ObjectId;

import { getStaticKeys } from '../../common-methods/constants';
import { updateFileData, readFileData} from '../../common-methods/file-operations';
import { connectToDatabase } from '../../common-methods/database';

const filePath = 'D:/plotnetwork/microsite-nextjs/partner-pages/partner-pages-main/config/project.json';
const relativeFilePath = 'config/project.json';

async function handler(req, res) {

    if (req.method === 'PUT') {
        
        const findProjectQuery = {};

        // const findProjectQuery = {
        //     isDeleted : false
        // }
        
        const requestObj = JSON.parse(JSON.stringify(req.body))
        if(requestObj.projectId !== undefined) findProjectQuery._id = new ObjectId(requestObj.projectId);
        else {
            res.status(401).json({
                message: "Missing project id field in reuest object"
            });
        }

        let { db } = await connectToDatabase();

        // fetch the projects
        let projects = await db
            .collection('project')
            .find(findProjectQuery).toArray();

        var absolutePath = path.resolve(relativeFilePath);
        console.log(projects.length)
        if(projects.length > 0){
            if(requestObj.projectId){
                readFileData(absolutePath).then(response => {
                    if(response.err !== undefined) return res.status(response.status).json(response);
                    
                    let isNewProject = true;
                    const oldProjects = JSON.parse(response.data);
                    const newProjects = oldProjects.map((project) => {
                        if(project._id == projects[0]._id) {
                            isNewProject = false;
                            return projects[0];
                        }
                        return project;
                    });
                    
                    if(isNewProject) newProjects.push(projects[0]);
                    updateFileData(absolutePath, newProjects).then(response => {
                        res.status(response.status).json(response);
                    });
                })
            } else {
                updateFileData(absolutePath, projects).then(response => {
                    res.status(response.status).json(response);
                });
            }
        } else {
            res.status(401).json({
                message: "No projects found to update"
            });
        }
    }
};

export default handler;

