import express from 'express';
import uniqid from 'uniqid';
import actorModel from './actorModel';
import asyncHandler from 'express-async-handler';
import { getActor } from '../tmdb-api';

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    let { page = 1, limit = 10 } = req.query; // destructure page and limit and set default values
    [page, limit] = [+page, +limit]; //trick to convert to numeric (req.query will contain string values)

    const totalDocumentsPromise = actorModel.estimatedDocumentCount(); //Kick off async calls
    const actorsPromise = actorModel.find().limit(limit).skip((page - 1) * limit);

    const totalDocuments = await totalDocumentsPromise; //wait for the above promises to be fulfilled
    const actors = await actorsPromise;

    const returnObject = { page: page, total_pages: Math.ceil(totalDocuments / limit), total_results: totalDocuments, results: actors };//construct return Object and insert into response object

    res.status(200).json(returnObject);
}));

router.get('/tmdb/:id', asyncHandler( async(req, res) => {
    const id = parseInt(req.params.id);
    const actor = await getActor(id);
    res.status(200).json(actor);
    }));

export default router;