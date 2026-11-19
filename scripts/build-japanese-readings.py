"""Rebuild the bundled reading subset from a current official JMdict_e.gz.
Usage: python -X utf8 scripts/build-japanese-readings.py PATH/TO/JMdict_e.gz
Download: https://www.edrdg.org/pub/Nihongo/JMdict_e.gz
Only spelling-compatible readings are selected; never infer kanji readings.
"""
import gzip,json,re,subprocess,sys,xml.etree.ElementTree as ET
from pathlib import Path
root=Path(__file__).resolve().parent.parent
words=json.loads(subprocess.check_output(['node','-e',"process.stdout.write(JSON.stringify(require('./site/languages-data.js').ja.words))"],cwd=root,encoding='utf8'))
targets={w['word'] for w in words}
source=gzip.open(sys.argv[1],'rt',encoding='utf8').read()
# We only need spelling, reading, restrictions and priority, not POS entities.
source=re.sub(r'<!DOCTYPE JMdict\s*\[.*?\]>','',source,flags=re.S)
source=re.sub(r'&(?!amp;|lt;|gt;|apos;|quot;)[A-Za-z0-9_-]+;','',source)
lookup={}
for entry in ET.fromstring(source).findall('entry'):
 spellings={k.findtext('keb') for k in entry.findall('k_ele')}
 for reading in entry.findall('r_ele'):
  kana=reading.findtext('reb')
  restrict={r.text for r in reading.findall('re_restr')}
  compatible=restrict or spellings
  if reading.find('re_nokanji') is not None:compatible=set()
  priority=bool(reading.findall('re_pri'))
  for word in (compatible|{kana})&targets:
   lookup.setdefault(word,[]).append((not priority,kana))
overrides={'お支払い':'おしはらい','今日':'きょう','明日':'あした','昨日':'きのう','私':'わたし','日本':'にほん','一日':'いちにち','人気':'にんき','何':'なに','上手':'じょうず','下手':'へた','生物':'せいぶつ','市場':'しじょう','大人':'おとな'}
result={};missing=[]
for w in words:
 word=w['word']
 if word in overrides:kana=overrides[word]
 elif re.fullmatch('[ぁ-ゖァ-ヶー・]+',word):kana=word
 elif re.fullmatch('[ぁ-ゖァ-ヶー・]+',w.get('reading','')):kana=w['reading']
 elif word in lookup:kana=sorted(lookup[word])[0][1]
 else:missing.append(word);continue
 result[word]=kana
(root/'site/japanese-readings.js').write_text("'use strict';\n// JMdict/EDRDG reading subset, CC BY-SA 4.0. See notices/japanese-readings.txt.\nconst JAPANESE_READINGS="+json.dumps(result,ensure_ascii=False,separators=(',',':'))+';\n',encoding='utf8')
print('readings',len(result),'missing',json.dumps(missing,ensure_ascii=False))

