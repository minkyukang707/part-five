import {analyze} from './writing-engine.js';

self.onmessage=async ({data})=>{
  try{self.postMessage({report:await analyze(data.id,data.text)});}
  catch(error){self.postMessage({error:error.message});}
};
