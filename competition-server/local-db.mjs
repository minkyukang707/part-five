import {DatabaseSync} from 'node:sqlite';
import {readFileSync} from 'node:fs';
export class LocalD1{
  constructor(file=':memory:'){this.sqlite=new DatabaseSync(file);this.sqlite.exec(readFileSync(new URL('./schema.sql',import.meta.url),'utf8'));}
  prepare(sql){
    const db=this;
    class Statement{
      constructor(values=[]){this.values=values;}
      bind(...values){return new Statement(values);}
      execute(){const prepared=db.sqlite.prepare(sql),results=prepared.all(...this.values);return{success:true,results,meta:{changes:db.sqlite.prepare('SELECT changes() AS n').get().n}};}
      async all(){return this.execute();}
      async first(){return this.execute().results[0]??null;}
      async run(){return this.execute();}
    }
    return new Statement();
  }
  async batch(statements){this.sqlite.exec('BEGIN IMMEDIATE');try{const output=statements.map(s=>s.execute());this.sqlite.exec('COMMIT');return output;}catch(error){this.sqlite.exec('ROLLBACK');throw error;}}
  close(){this.sqlite.close();}
}
