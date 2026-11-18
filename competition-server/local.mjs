import http from 'node:http';
import {mkdirSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import worker from './worker.js';
import {LocalD1} from './local-db.mjs';
const store=new URL('./.local/',import.meta.url);mkdirSync(store,{recursive:true});
const db=new LocalD1(fileURLToPath(new URL('arena.sqlite',store))),port=Number(process.env.PORT)||8790;
const allowed=process.env.ALLOWED_ORIGINS||'https://minkyukang707.github.io,http://127.0.0.1:8765,http://localhost:8765,http://127.0.0.1:8080';
const server=http.createServer(async(req,res)=>{
  try{
    const chunks=[];let size=0;for await(const part of req){size+=part.length;if(size>8192){res.writeHead(413).end();return;}chunks.push(part);}
    const headers=new Headers();for(const [key,value]of Object.entries(req.headers))if(value)headers.set(key,Array.isArray(value)?value.join(','):value);
    const request=new Request('http://127.0.0.1:'+port+req.url,{method:req.method,headers,...(chunks.length?{body:Buffer.concat(chunks)}:{})});
    const response=await worker.fetch(request,{DB:db,ALLOWED_ORIGINS:allowed,CLIENT_IP:req.socket.remoteAddress});
    res.writeHead(response.status,Object.fromEntries(response.headers));res.end(Buffer.from(await response.arrayBuffer()));
  }catch(error){console.error(error);res.writeHead(500).end('{"error":"Local server error"}');}
});
server.listen(port,'127.0.0.1',()=>console.log('Part Five Arena API http://127.0.0.1:'+port+'/api/health'));
process.on('SIGINT',()=>server.close(()=>{db.close();process.exit(0);}));
