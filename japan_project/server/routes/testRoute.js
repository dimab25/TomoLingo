import express from "express"

const testRouter = express.Router();

testRouter.get("/test", (request, response)=>{
    console.log("im am a test route".bgCyan);
    response.json("this is a test route")
} );
export default testRouter;