const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const dir = path.join(__dirname,'../site/library');

function merge(previous, incoming) {
  const entries = new Map(previous.map(q=>[q.stem.toLowerCase(),q]));
  const ids = new Set(previous.map(q=>q.id));
  for (const q of incoming) {
    const key=q.stem.toLowerCase(), old=entries.get(key);
    if (old) {
      if (!old.meaning && q.meaning) entries.set(key,{...q,id:old.id});
    } else if (!ids.has(q.id)) {
      entries.set(key,q);ids.add(q.id);
    }
  }
  return [...entries.values()];
}
function write(questions) {
  const content=JSON.stringify(questions)+'\n';
  const revision=crypto.createHash('sha256').update(content).digest('hex');
  fs.writeFileSync(path.join(dir,'questions.json'),content);
  fs.writeFileSync(path.join(dir,'index.json'),JSON.stringify({revision,count:questions.length})+'\n');
}
module.exports={dir,merge,write};
