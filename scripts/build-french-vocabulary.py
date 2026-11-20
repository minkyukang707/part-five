"""Build 2,000 directly Korean-glossed French lemmas; no English/synset pivot.

Usage: python scripts/build-french-vocabulary.py DICTIONARY_JSON LEXIQUE383_TSV
DICTIONARY_JSON is the French subset of the Korean Wiktionary Kaikki JSONL.
See site/notices/french-vocabulary.txt for attribution and editorial limits.
"""
import collections, csv, hashlib, json, re, sys, unicodedata
from pathlib import Path
from urllib.parse import quote

ROOT=Path(__file__).resolve().parent.parent
rows=json.loads(Path(sys.argv[1]).read_text(encoding='utf-8'))
lex=collections.defaultdict(list)
with Path(sys.argv[2]).open(encoding='utf-8-sig',newline='') as f:
    for r in csv.DictReader(f,delimiter='\t'):
        lex[r['ortho']].append(r)

# Short, common senses corrected against the cited headword. These are editorial
# learner glosses, not machine translations or exhaustive dictionary definitions.
OVERRIDES={
 'bonjour':['안녕하세요'], 'bonsoir':['안녕하세요','좋은 저녁입니다'],
 'salut':['안녕'], 'merci':['감사합니다','고마워요'], 'pardon':['실례합니다','용서'],
 'oui':['네','예'], 'non':['아니요'], 'au revoir':['안녕히 가세요','안녕히 계세요'],
 'être':['이다','있다','존재하다'], 'avoir':['가지다','소유하다'],
 'aller':['가다'], 'venir':['오다'], 'faire':['하다','만들다'],
 'pouvoir':['할 수 있다','권력'], 'devoir':['해야 하다','의무','숙제'],
 'savoir':['알다'], 'connaître':['알다','알고 지내다'], 'vouloir':['원하다'],
 'dire':['말하다'], 'parler':['말하다','이야기하다'], 'prendre':['잡다','타다','먹다'],
 'donner':['주다'], 'mettre':['놓다','입다'], 'voir':['보다'], 'regarder':['보다','바라보다'],
 'entendre':['듣다','들리다'], 'écouter':['듣다','귀를 기울이다'],
 'manger':['먹다','식사하다'], 'boire':['마시다'], 'lire':['읽다'], 'écrire':['쓰다'],
 'aimer':['좋아하다','사랑하다'], 'habiter':['살다','거주하다'], 'vivre':['살다'],
 'je':['나','저'], 'tu':['너'], 'il':['그'], 'elle':['그녀'], 'nous':['우리'],
 'vous':['당신','여러분'], 'ils':['그들'], 'elles':['그녀들'], 'on':['사람들','우리'],
 'moi':['나','저'], 'toi':['너'], 'lui':['그','그에게','그녀에게'], 'eux':['그들'],
 'ce':['이것','이'], 'cela':['그것'], 'ça':['그것','이것'], 'qui':['누구'],
 'quoi':['무엇'], 'que':['무엇'], 'où':['어디'], 'quand':['언제'],
 'comment':['어떻게'], 'pourquoi':['왜'], 'combien':['얼마나','몇'],
 'et':['그리고','와'], 'ou':['또는','혹은'], 'mais':['하지만','그러나'],
 'si':['만약','만일'], 'car':['왜냐하면'], 'donc':['그러므로','따라서'],
 'parce que':['왜냐하면'], 'avec':['함께','와 함께'], 'sans':['없이'],
 'dans':['안에','속에'], 'sur':['위에'], 'sous':['아래에'], 'entre':['사이에'],
 'devant':['앞에'], 'derrière':['뒤에'], 'chez':['집에','댁에'],
 'avant':['전에'], 'après':['후에','뒤에'], 'pour':['위하여','위해'],
 'à':['에','에게'], 'de':['의','에서'], 'par':['통하여','의해서'], 'vers':['쪽으로','무렵'],
 'un':['하나','한'], 'deux':['둘','두'], 'trois':['셋','세'], 'quatre':['넷','네'],
 'cinq':['다섯'], 'six':['여섯'], 'sept':['일곱'], 'huit':['여덟'], 'neuf':['아홉','새로운'],
 'dix':['열'], 'zéro':['영'], 'premier':['첫 번째의'], 'dernier':['마지막의'],
 'homme':['남자','사람'], 'femme':['여자','아내'], 'fille':['소녀','딸'],
 'garçon':['소년','남자아이'], 'enfant':['아이','어린이'],
 'ami':['친구'], 'amie':['여자 친구','친구'], 'famille':['가족'],
 'père':['아버지'], 'mère':['어머니'], 'frère':['형제','형','남동생'],
 'sœur':['자매','언니','여동생'], 'parent':['부모','친척'],
 'chat':['고양이'], 'chien':['개'], 'oiseau':['새'], 'poisson':['물고기','생선'],
 'maison':['집','주택'], 'école':['학교'], 'travail':['일','노동'], 'livre':['책'],
 'eau':['물'], 'pain':['빵'], 'riz':['쌀','밥'], 'lait':['우유'],
 'fromage':['치즈'], 'fruit':['과일'], 'légume':['채소'], 'pomme':['사과'],
 'petit':['작은'], 'grand':['큰','키가 큰'], 'bon':['좋은','맛있는'],
 'mauvais':['나쁜'], 'beau':['아름다운','예쁜'], 'nouveau':['새로운'],
 'vieux':['늙은','오래된'], 'jeune':['젊은','어린'], 'chaud':['뜨거운','더운'],
 'froid':['차가운','추운'], 'long':['긴'], 'court':['짧은'],
 'cher':['비싼','소중한'], 'facile':['쉬운'], 'difficile':['어려운'],
 'heureux':['행복한'], 'triste':['슬픈'], 'malade':['아픈','환자'],
 'aujourd’hui':['오늘'], "aujourd'hui":['오늘'], 'demain':['내일'], 'hier':['어제'],
 'maintenant':['지금'], 'toujours':['항상','언제나'], 'souvent':['자주'],
 'parfois':['가끔'], 'jamais':['결코','한 번도'], 'déjà':['이미','벌써'],
 'encore':['아직','다시'], 'ici':['여기'], 'là':['거기'], 'bien':['잘','좋게'],
 'mal':['잘못','나쁘게','악'], 'très':['매우','아주'], 'beaucoup':['많이'],
 'peu':['조금','적게'], 'plus':['더','더 많이'], 'moins':['덜','더 적게'],
 'aussi':['또한','역시'], 'ensemble':['함께'], 'vite':['빨리'],
 'souris':['생쥐','마우스'], 'temps':['시간','날씨'], 'jour':['날','하루'],
 'matin':['아침'], 'soir':['저녁'], 'nuit':['밤'], 'heure':['시간','시각'],
 'minute':['분'], 'semaine':['주','일주일'], 'mois':['달','개월'], 'année':['해','년'],
 'an':['년','해'], 'été':['여름'], 'hiver':['겨울'], 'printemps':['봄'], 'automne':['가을'],
 'argent':['돈','은'], 'monde':['세계','세상'], 'personne':['사람'],
 'chose':['것','사물'], 'fois':['번','회'], 'place':['자리','장소','광장'],
 'tour':['차례','한 바퀴','탑'], 'cours':['수업','강의'], 'mode':['방식','유행'],
 'coup':['타격','한 번의 동작'], 'point':['점','지점'], 'fin':['끝','종료'],
 'part':['몫','부분'], 'sens':['뜻','의미','방향'], 'cas':['경우','사례'],
 'fait':['사실'], 'gens':['사람들'], 'besoin':['필요'], 'raison':['이유','이성'],
 'peur':['두려움','공포'], 'envie':['욕구','부러움'], 'droit':['권리','법','곧은'],
 'dehors':['밖에','밖으로'], 'dedans':['안에','안으로'], 'près':['가까이'],
 'loin':['멀리'], 'tôt':['일찍'], 'tard':['늦게'], 'mieux':['더 잘'],
 'quelque chose':['무언가','어떤 것'], "s'il vous plaît":['부탁합니다','제발'],
 's’il vous plaît':['부탁합니다','제발'], 'tout':['모든','전부'], 'même':['같은','심지어'],
 'autre':['다른'], 'chaque':['각각의','모든'], 'plusieurs':['여러'],
 'quelques':['몇몇의'], 'certain':['확실한','어떤'], 'aucun':['아무런'],
 'tel':['그러한','같은'], 'notre':['우리의'], 'votre':['당신의','여러분의'],
 'leur':['그들의','그들에게'], 'mon':['나의','저의'], 'ton':['너의','어조'],
 'son':['그의','그녀의','소리'], 'ses':['그의','그녀의'], 'mes':['나의','저의'],
 'tes':['너의'], 'nos':['우리의'], 'vos':['당신의','여러분의'],
}
OVERRIDES.update({
 'la':['그','그녀를'], 'le':['그','그를'], 'les':['그','그들을'], 'se':['자신을','서로'],
 'suivre':['따라가다','뒤따르다'], 'alors':['그때','그러면'], 'falloir':['필요하다','해야 하다'],
 'croire':['믿다','생각하다'], 'passer':['지나가다','보내다'], 'laisser':['남기다','내버려 두다'],
 'rester':['남다','머무르다'], 'trop':['너무','지나치게'], 'dieu':['신'], 'main':['손'],
 'essayer':['시도하다','해 보다'], 'jouer':['놀다','연주하다','경기하다'],
 'depuis':['이후로','부터'], 'rentrer':['돌아오다','귀가하다'], 'porter':['들다','입다','지니다'],
 'affaire':['일','업무','사건'], 'marcher':['걷다','작동하다'], 'pendant':['동안'],
 'corps':['몸','신체'], 'monter':['올라가다','타다'], 'seulement':['오직','단지'],
 'truc':['것','요령'], 'type':['유형','종류'], 'gros':['큰','뚱뚱한'],
 'souvenir':['기억','추억'], 'madame':['부인','여사'], 'fou':['미친'],
 'prêt':['준비된','대출'], 'plein':['가득한'], 'bras':['팔'], 'façon':['방법','방식'],
 'fermer':['닫다','폐쇄하다'], 'là-bas':['저쪽에','저기에'], 'juste':['정확히','공정한'],
 'bout':['끝','조각'], 'désolé':['미안한','유감스러운'], 'partie':['부분','경기'],
 'joli':['예쁜','아름다운'], 'apporter':['가져오다','갖다 주다'], 'docteur':['의사','박사'],
 'ailleurs':['다른 곳에','다른 곳으로'], 'reprendre':['다시 시작하다','되찾다'],
 'coucher':['눕히다','재우다'], 'bientôt':['곧','머지않아'], 'marier':['결혼시키다'],
 'dur':['단단한','힘든'], 'propre':['깨끗한','자신의'], 'inquiéter':['걱정시키다','불안하게 하다'],
 'café':['커피','카페'], 'amener':['데려오다','가져오다'], 'conduire':['운전하다','이끌다'],
 'réveiller':['깨우다'], 'adorer':['매우 좋아하다','숭배하다'], 'taire':['말하지 않다','숨기다'],
 'bruit':['소음','소리'], 'mentir':['거짓말하다'], 'retour':['귀환','돌아옴'],
 'ignorer':['모르다','무시하다'], 'patron':['고용주','상사','사장'], 'sac':['가방','자루'],
 'embrasser':['입 맞추다','포옹하다'], 'journal':['신문','일기'], 'amuser':['즐겁게 하다'],
 'intéresser':['관심을 끌다','흥미를 끌다'], 'exactement':['정확히'],
 'seigneur':['영주'], 'sauter':['뛰다','뛰어넘다'], 'milieu':['가운데','환경'],
 'dame':['부인','여성'], 'chacun':['각자','각각'], 'forme':['모양','형태','건강 상태'],
 'travers':['너비','결점'], 'souffrir':['고통받다','괴로워하다'], 'maintenir':['유지하다','지키다'],
 'assurer':['보장하다','확신시키다','보험에 들다'], 'garde':['경비','보호','경비원'],
 'vue':['시력','전망','경치'], 'robe':['원피스','드레스'], 'équipe':['팀','선수단'],
 'bonheur':['행복'], 'laquelle':['어느 것'], 'lequel':['어느 것'], 'boîte':['상자','통'],
 'lancer':['던지다','시작하다','출시하다'], 'loi':['법','법률'], 'attraper':['잡다','붙잡다'],
 'cour':['뜰','마당','법정'], 'sécurité':['안전','보안'], 'reposer':['내려놓다','기대다'],
 'haut':['높은','위'], 'apercevoir':['언뜻 보다','알아차리다'], 'gauche':['왼쪽','서투른'],
 'professeur':['교사','선생님','교수'], 'présent':['현재','출석한','선물'],
 'emporter':['가져가다','가지고 떠나다'], 'appartenir':['속하다'],
 'tendre':['내밀다','팽팽하게 하다','부드러운'], 'mouvement':['움직임','운동'],
 'compagnie':['동행','회사','단체'], 'puisque':['이므로','때문에'], 'sonner':['울리다','종을 울리다'],
 'prouver':['증명하다','입증하다'], 'engager':['고용하다','착수하다'],
 'français':['프랑스어','프랑스의','프랑스인'], 'chanson':['노래'],
 'surprendre':['놀라게 하다'], 'coûter':['비용이 들다','값이 나가다'],
 'vol':['비행','도둑질'], 'vacance':['빈자리','공석'], 'étonner':['놀라게 하다'],
 'ferme':['농장','확고한'], 'soin':['돌봄','주의'], 'dossier':['서류','자료철','등받이'],
 'prêter':['빌려주다'], 'objet':['물건','대상'], 'éloigner':['멀리 보내다','떼어 놓다'],
 'entraîner':['훈련시키다','초래하다'], 'aussitôt':['즉시','곧바로'],
 'relever':['일으키다','다시 올리다','기록하다'], 'vaisseau':['선박','혈관'],
 'second':['두 번째의'], 'compris':['포함된'], 'magasin':['가게','상점'],
 'toit':['지붕'], 'habiller':['옷을 입히다'], 'foi':['믿음','신앙'],
 'grandir':['성장하다','커지다'], 'membre':['회원','구성원','팔다리'],
 'bonne':['가정부'], 'débarrasser':['치우다','제거하다'], 'toilette':['몸단장','세면'],
 'personnel':['직원','개인의'], 'côte':['해안','갈비뼈','비탈'],
 'directeur':['책임자','이사','교장'], 'ridicule':['우스꽝스러운','터무니없는'],
 'nourrir':['먹이다','기르다'], 'endormir':['잠들게 하다','재우다'],
 'promener':['산책시키다','데리고 다니다'], 'ramasser':['줍다','모으다'],
 'intelligent':['똑똑한','지적인'], 'poids':['무게','중량'],
 'titre':['제목','칭호','증서'], 'appareil':['기기','장치'], 'manteau':['외투','코트'],
 'enquête':['조사','수사'], 'politique':['정치','정치의'], 'gorge':['목구멍','목'],
 'lunette':['망원경'], 'figure':['얼굴','모양','인물'],
 'faillir':['할 뻔하다','의무를 다하지 못하다'], 'toile':['천','캔버스','거미줄'],
 'heureusement':['다행히'], 'don':['선물','기부','재능'], 'louer':['빌리다','임대하다','칭찬하다'],
 'fabriquer':['만들다','제조하다'], 'nul':['전혀 없는','무효의','형편없는'],
 'murmurer':['중얼거리다','속삭이다'], 'résoudre':['해결하다','풀다'],
 'assister':['참석하다','돕다'], 'débrouiller':['풀다','해결하다'],
 'trait':['선','특징'], 'quart':['사분의 일'], 'aise':['편안함','기쁨'],
 'inquiet':['걱정하는','불안한'], 'absence':['부재','결석'],
 'siège':['좌석','본부','포위'], 'série':['연속','시리즈'], 'perte':['손실','상실'],
 'hauteur':['높이'], 'frontière':['국경','경계'], 'charge':['짐','부담','담당 업무'],
 'secrétaire':['비서'], 'abri':['피난처','보호소'], 'loup':['늑대'],
 'maîtresse':['여주인','여교사'], 'disputer':['다투다','경쟁하다'],
 'déchirer':['찢다'], 'boutique':['가게','상점'], 'sourd':['청각 장애가 있는','소리가 잘 안 들리는'],
 'trottoir':['인도','보도'], 'race':['품종','종족'], 'assiette':['접시'],
 'quai':['부두','플랫폼'], 'marié':['결혼한','신랑'], 'baigner':['목욕시키다','물에 담그다'],
 'période':['기간','시기'], 'facilement':['쉽게'], 'distinguer':['구별하다','식별하다'],
 'étroit':['좁은'], 'chou':['양배추'], 'plume':['깃털','펜'],
 'accès':['접근','출입'], 'commande':['주문','조작'], 'paysage':['풍경','경치'],
 'épuiser':['지치게 하다','고갈시키다'], 'hélas':['아아','슬프게도'],
 'futur':['미래','미래의'], 'lecture':['독서','읽기'], 'allée':['통로','산책로'],
 'épargner':['저축하다','아끼다'], 'curé':['가톨릭 사제','본당 신부'],
 'net':['깨끗한','분명한','순수익의'], 'canard':['오리'], 'insulter':['모욕하다'],
 'pré':['풀밭','초지'], 'exercice':['연습','운동','문제'],
 'déshabiller':['옷을 벗기다'], 'culotte':['팬티','반바지'],
 'soumettre':['제출하다','복종시키다'], 'muet':['말이 없는','무성의'],
 'jadis':['옛날에'], 'fichu':['망가진'], 'procureur':['검사'],
 'sacrer':['성별하다','왕위에 올리다'], 'populaire':['인기 있는','대중의'],
 'talon':['발뒤꿈치','구두 굽'], 'boucle':['고리','곱슬머리','버클'],
 'auparavant':['이전에','미리'], 'cadre':['틀','액자','간부'],
 'agence':['대행사','지점'], 'pouce':['엄지손가락','인치'],
 'tissu':['천','직물','조직'], 'lesquels':['어느 것들'], 'lesquelles':['어느 것들'],
 'flot':['물결','흐름'], 'feu':['불','화재'], 'habitant':['주민','거주자'],
 'armoire':['옷장','장롱'], 'dé':['주사위','골무'], 'tienne':['너의 것'],
 'doré':['금빛의','금박을 입힌'], 'rive':['강기슭','물가'],
 'bavarder':['수다를 떨다','잡담하다'], 'ingénieur':['엔지니어','기술자'],
 'terreur':['공포','두려움'], 'trahison':['배신','반역'], 'caillou':['조약돌','돌멩이'],
 'carreau':['타일','유리판'], 'introduire':['들여오다','도입하다','소개하다'],
 'pénible':['힘든','괴로운'], 'reconnaissant':['감사하는'],
 'amer':['쓴','씁쓸한'], 'objectif':['목표','객관적인'], 'patient':['환자','참을성 있는'],
 'modeste':['겸손한','수수한'], 'crayon':['연필'], 'stylo':['펜','볼펜'],
 'particulier':['특별한','개인의'], 'soutien':['지원','지지'],
 'ennemi':['적','원수'], 'réseau':['망','네트워크'], 'hanche':['엉덩이','고관절 부위'],
 'quelconque':['아무','어떤 것이든','평범한'], 'combinaison':['조합','결합','작업복'],
 'pratiquement':['사실상','거의'], 'stade':['경기장','단계'], 'ouvrage':['작품','저작','작업'],
 'douzaine':['열두 개','다스'], 'investir':['투자하다'], 'faucher':['베다'],
 'grandeur':['크기','위대함'], 'autoroute':['고속도로'], 'tronc':['줄기','몸통'],
 'diplôme':['졸업장','학위','자격증'], 'pneu':['타이어'],
 'sport':['스포츠','운동'], 'football':['축구'], 'tennis':['테니스'], 'natation':['수영'],
 'basket':['농구','운동화'], 'course':['달리기','경주','장보기'],
 'acheter':['사다','구매하다'], 'vendre':['팔다','판매하다'], 'mer':['바다'],
 'restaurant':['식당','레스토랑'], 'lit':['침대'], 'mot':['단어','말'],
 'chaussure':['신발'], 'rouge':['빨간색','빨간'], 'bleu':['파란색','파란'],
 'jaune':['노란색','노란'], 'noir':['검은색','검은'], 'blanc':['흰색','하얀'],
 'œil':['눈'], 'cœur':['심장','마음'], 'vacances':['휴가','방학'],
 'nœud':['매듭','고리'], 'manière':['방법','방식'], 'ressentir':['느끼다','감지하다'],
 'éclairer':['밝히다','해명하다'], 'confondre':['혼동하다','착각하다'], 'hâte':['서두름'],
 'défaut':['결함','부족'], 'section':['부문','구역','절'], 'tailler':['자르다','재단하다'],
 'panique':['공황','극심한 공포'], 'possession':['소유'], 'aspirer':['들이마시다','열망하다'],
 'interrompre':['중단하다','가로막다'], 'prime':['상여금','보험료'],
})
CORE='bonjour bonsoir salut merci pardon oui non être avoir aller venir faire pouvoir devoir savoir connaître vouloir dire parler prendre donner mettre voir regarder entendre écouter manger boire lire écrire aimer habiter vivre je tu il elle nous vous ils elles moi toi lui qui quoi où quand comment pourquoi combien et ou mais avec sans dans sur sous entre devant derrière avant après un deux trois quatre cinq six sept huit neuf dix homme femme fille garçon enfant ami famille père mère frère sœur chat chien oiseau poisson maison école travail livre eau pain riz lait fromage fruit légume pomme petit grand bon mauvais beau nouveau vieux jeune chaud froid long court cher facile difficile heureux triste malade demain hier maintenant toujours souvent parfois déjà encore ici là bien mal très beaucoup peu plus moins aussi ensemble vite temps jour matin soir nuit heure minute semaine mois année été hiver printemps automne argent monde personne chose besoin raison peur'.split()
CORE+='acheter vendre payer prix magasin marché restaurant cuisine café thé jus sucre sel beurre viande poulet œuf gâteau chocolat orange banane tomate pomme de terre oignon repas déjeuner dîner petit-déjeuner faim soif bouteille verre tasse assiette fourchette couteau cuillère lit chambre table chaise porte fenêtre clé sac vêtement chemise pantalon robe jupe manteau chaussure chaussette chapeau famille bébé fils cousin tante oncle grand-père grand-mère voisin fête anniversaire ami amie téléphone ordinateur télévision journal photo musique cinéma film chanson guitare piano danse musée bibliothèque dessin stylo crayon cahier mot phrase langue français professeur étudiant élève classe leçon cours examen question réponse université bureau entreprise collègue médecin hôpital pharmacie médicament santé corps tête main pied bras jambe œil oreille nez bouche dent cœur cheveux ville pays rue route gare train avion aéroport métro bus taxi voiture vélo hôtel voyage billet passeport valise bagage plage mer montagne soleil pluie neige vent arbre fleur jardin parc ciel étoile lune animal cheval vache lapin souris sport football tennis natation basket course piscine équipe jeu jouer gagner perdre courir marcher nager dormir réveiller commencer finir ouvrir fermer entrer sortir arriver partir retourner trouver demander répondre comprendre apprendre enseigner attendre aider chercher choisir fermer vacances zéro onze douze treize quatorze quinze seize vingt trente quarante cinquante cent mille lundi mardi mercredi jeudi vendredi samedi dimanche janvier février mars avril mai juin juillet août septembre octobre novembre décembre rouge bleu vert jaune noir blanc gris rose'.split()
POS={'noun':'명사','verb':'동사','adj':'형용사','adv':'부사','pron':'대명사','prep':'전치사','conj':'접속사','intj':'감탄사','num':'수사','article':'관사','phrase':'표현'}
POS_FIX={**dict.fromkeys('tu il elle moi toi lui eux quoi cela ça ce on quelqu\'un se laquelle lequel lesquels lesquelles tienne'.split(),'pron'),
 **dict.fromkeys('livre poisson maison main cœur œil feu compagnon compagnie stade titre corps tête cheveu sourire souvenir objectif patient dossier sport football tennis natation basket course restaurant lit mot chaussure vacances'.split(),'noun'),
 **dict.fromkeys('bonjour bonsoir salut merci pardon'.split(),'intj'),
 **dict.fromkeys('bon beau nouveau grand petit joli juste désolé propre malade inquiet'.split(),'adj'),
 **dict.fromkeys('bien mal ensemble alors bientôt heureusement facilement effectivement'.split(),'adv'),
 'pendant':'prep','au revoir':'phrase'}
GENDER_FIX={'maison':'f','main':'f','voiture':'f','sœur':'f','livre':'m','poisson':'m','œil':'m','cœur':'m','feu':'m','compagnie':'f','stade':'m','titre':'m','course':'f','vacances':'f'}
LEXPOS={'noun':{'NOM'},'verb':{'VER','AUX'},'adj':{'ADJ'},'adv':{'ADV'},'pron':{'PRO:dem','PRO:ind','PRO:int','PRO:per','PRO:pos','PRO:rel'},'prep':{'PRE'},'conj':{'CON'},'intj':{'ONO'},'num':{'ADJ:num'},'article':{'ART:def','ART:ind'},'phrase':set()}
EXCLUDE_WORDS={'con','merde','putain','salope','connard','bite','cul','foutre','baiser','sexe','pédé','nègre','négresse','salaud','chier','bordel','pute','pisser','emmerder','clef','lesquels','lesquelles','tienne','vacance','sexuel'}
EXCLUDE_WORDS.update({'le','la','les','noeud'})
CHECKED_SOURCES={
 'compagnie':'https://www.dictionnaire-academie.fr/article/A9C3188',
 'coûter':'https://www.dictionnaire-academie.fr/article/A9C4693',
 'prêter':'https://www.dictionnaire-academie.fr/article/A9P4232',
 'toit':'https://www.dictionnaire-academie.fr/article/A8T0713',
}
IPA_FIX={'être':'ɛtʁ','vraiment':'vʁɛ.mɑ̃'}
EXCLUDE_GLOSS=re.compile(r'활용형|과거형|복수형|현재형|여성형|남성형|단수형|분사형|어미|어근|접두사|접미사|변화표|축약형|의 변화|형용사형|낱말|비속|욕설|속어|구강성교|정액|성교|남근|음경|음문|항문|창녀|매춘|자위|강간|씹|좆|자지|보지|사창|계집|사투리|고어|옛말|줄임말')
BAD_TAGS={'form-of','archaic','obsolete','vulgar','offensive','derogatory','slang'}

def clean_gloss(text):
    if EXCLUDE_GLOSS.search(text): return []
    text=re.sub(r'\([^)]*\)|\[[^]]*\]','',text)
    text=re.sub(r'^\s*[0-9]+[.)]\s*','',text)
    text=re.sub(r'^\s*(?:동물|식물|음식|음악|언어|신체|의학|지리|문법|화학)[}:]\s*','',text)
    text=text.split('. ')[0]
    result=[]
    for t in re.split(r'[,;·/]|(?<=[가-힣])\.',text):
        t=t.strip(' .!?;:~〈〉«»')
        if not re.fullmatch(r'[가-힣][가-힣 ]{0,17}',t):continue
        if any(s in t for s in ['라는 뜻','라는 말','가리키는 말','쓰이는','의 일종','의 하나','에 해당','수식하는','동의어','불특정한','어떤 사물','를 뜻','를 말','와 관련','을 나타내','보조 동사']):continue
        if t not in result:result.append(t)
    return result

groups=collections.defaultdict(list)
for row in rows:
    w=unicodedata.normalize('NFC',row['word']).replace('’',"'")
    if w!=w.lower() or not 1<=len(w)<=28 or not re.fullmatch(r"[a-zàâäæçéèêëîïôöœùûüÿ' -]+",w):continue
    if w.startswith('-') or w.endswith('-') or w in EXCLUDE_WORDS:continue
    if w in POS_FIX:row={**row,'pos':POS_FIX[w]}
    if row.get('pos') not in POS or set(row.get('tags',[]))&BAD_TAGS:continue
    groups[w].append(row)
for w,ms in OVERRIDES.items():
    if w not in groups and w not in EXCLUDE_WORDS and '’' not in w:
        pos=POS_FIX.get(w)
        if not pos:continue
        groups[w].append({'word':w,'pos':pos,'senses':[{'glosses':[', '.join(ms)]}],'editorial':True})

def topic(w,ms):
    patterns=[('sport',r'운동|축구|야구|농구|테니스|수영|경기|선수|스키|경주|체조|달리|등산'),('school',r'학교|학생|교사|교수|교실|수업|강의|숙제|시험|도서관|교과|학습|대학|연구|공부'),('travel',r'여행|기차|기차역|역|공항|비행기|항공|항구|여권|관광|호텔|버스|택시|지하철|차표|도착|출발|국경|도로|거리|광장'),('food',r'음식|식사|빵|우유|치즈|고기|과일|채소|야채|감자|양파|음료|먹다|마시다|쇼핑|구매|요리|식당|커피|차|술|소금|설탕|후추|버터'),('health',r'건강|병원|의사|환자|질병|치료|감기|통증|신체|눈|귀|심장|뇌|혈액|자연|산|바다|나무|꽃|식물|동물|환경'),('work',r'직장|회사|업무|회의|직원|관리|경제|정치|정부|기업|무역|시장|생산|산업|법률|계약|사회|행정|은행|사무|직업|일하다'),('culture',r'음악|영화|노래|예술|문화|그림|사진|공연|극장|박물관|춤|작품|책|소설|취미|악기'),('daily',r'가족|아버지|어머니|친구|집|방|잠|아침|저녁|옷|일상|식구|형제|자매|침대|의자|생활')]
    # Short Korean nouns must match a whole gloss, not an unrelated substring
    # such as 차 in 차용하다 or 역 in 역할.
    for name,rx in patterns:
        tokens=rx.split('|')
        if any(re.search(t,m) if len(t)>1 else m==t for t in tokens for m in ms):return name
    return 'general'

candidates=[]
for w,entries in groups.items():
    senses=[sense for r in entries for sense in r.get('senses',[]) if not set(sense.get('tags',[]))&BAD_TAGS and not sense.get('form_of')]
    ms=list(OVERRIDES.get(w,[]))
    if not ms:
        for sense in senses:
            for g in sense.get('glosses',[]):
                for m in clean_gloss(g):
                    if m not in ms:ms.append(m)
    if not ms:continue
    pos=list(dict.fromkeys(r['pos'] for r in entries))
    lexrows=lex.get(w,[]) or lex.get(w.replace('œ','oe'),[])
    relevant=[r for r in lexrows if any(r['cgram'] in LEXPOS.get(p,set()) for p in pos)]
    # Require a lexical lemma (not a duplicate conjugation/plural card), unless
    # the item is an explicitly authored core pronoun/function word/expression.
    lemma=[r for r in relevant if r['islem']=='1' and r['lemme'].replace('œ','oe')==w.replace('œ','oe')]
    if not lemma and w not in OVERRIDES:continue
    frequency=max([float(r['freqlemfilms2'] or 0)+.4*float(r['freqlemlivres'] or 0) for r in lemma] or [0])
    nounrows=[r for r in lemma if r['cgram']=='NOM']
    genders={r['genre'] for r in nounrows if r['genre'] in ('m','f')}
    gender=next(iter(genders)) if len(genders)==1 else ''
    if not gender:
        tags=set(t for r in entries for t in r.get('tags',[]))
        if ('masculine' in tags)^('feminine' in tags):gender='m' if 'masculine' in tags else 'f'
    gender=GENDER_FIX.get(w,gender)
    # A gender shared by a noun homograph is never presented as a property of a
    # pronoun or adjective; homographs with competing genders remain unlabelled.
    if entries[0]['pos']!='noun':gender=''
    ipa=next((s['ipa'] for r in entries for s in r.get('sounds',[]) if s.get('ipa') and len(s['ipa'])<45),'').strip('/[] ')
    ipa=re.sub(r'\s+(?=[\u0300-\u036f])','',ipa)
    ipa=IPA_FIX.get(w,ipa)
    key='fr-dict-'+hashlib.sha256(w.encode()).hexdigest()[:12]
    candidates.append({'key':key,'word':w,'reading':('/'+ipa.strip('/')+'/') if ipa else '',
      'meanings':ms[:5],'pos':POS[entries[0]['pos']],'gender':gender,
      'article':'les' if w=='vacances' else {'m':'un','f':'une'}.get(gender,''),'source':'기초 뜻 자체 작성·편집' if entries[0].get('editorial') else '한국어 위키낱말사전 직접 대조 · 기본 뜻 편집' if w in OVERRIDES else '한국어 위키낱말사전 직접 대조',
      'sourceUrl':CHECKED_SOURCES.get(w,'https://ko.wiktionary.org/wiki/'+quote(w,safe='')), 'reviewed':True,
      'meaningRevision':hashlib.sha256(json.dumps(ms[:5],ensure_ascii=False).encode()).hexdigest()[:12],
      'meaningChanged':False,'genre':topic(w,ms),'frequency':round(frequency,3)})
    if w in CHECKED_SOURCES:candidates[-1]['source']='한국어 학습용 뜻 편집 · 아카데미 프랑세즈 대조'
    if w in IPA_FIX:candidates[-1]['readingSource']='https://fr.wiktionary.org/wiki/'+quote(w,safe='')

core={w:i for i,w in enumerate(CORE)}
candidates.sort(key=lambda x:(0,core[x['word']]) if x['word'] in core else (1,-x['frequency'],len(x['word']),x['word']))
selected=candidates[:2000]
assert len(selected)==2000,len(selected)
for i,w in enumerate(selected):w['set']=i//30;w['stage']=min(5,1+i//400)
assert len({w['word'].casefold() for w in selected})==2000
assert len({w['word'].casefold().replace('œ','oe').replace('æ','ae') for w in selected})==2000
assert all(w['meanings'] and all(re.search('[가-힣]',m) for m in w['meanings']) for w in selected)
byword={w['word']:w for w in selected}
for word,first in {'coûter':'비용이 들다','toit':'지붕','compagnie':'동행','prêter':'빌려주다','emprunter':'빌리다','stade':'경기장','feu':'불','nœud':'매듭','professeur':'교사','secrétaire':'비서'}.items():
    assert byword[word]['meanings'][0]==first,word
for word,gender in {'maison':'f','main':'f','sœur':'f','école':'f','livre':'m','cœur':'m','œil':'m'}.items():
    assert byword[word]['gender']==gender,word
for word in ['tu','il','elle','moi','toi','je','vous','nous','ils','elles']:
    assert byword[word]['pos']=='대명사' and not byword[word]['article'],word
assert all(not w['article'] or w['pos']=='명사' for w in selected)
assert all('[' not in w['reading'] and ']' not in w['reading'] for w in selected)
for level in range(1,6):
    batch=[w for w in selected if w['stage']==level]
    assert len(batch)==400
    short=[w for w in batch if len(w['word'])<=7 and w['word'].isalpha()]
    assert len(short)>=20,(level,len(short))
text="'use strict';\n// CC BY-SA 4.0: Korean Wiktionary contributors and Lexique authors; see notices/french-vocabulary.txt.\nconst FRENCH_WORDS="+json.dumps(selected,ensure_ascii=False,separators=(',',':'))+';\nif(typeof module!=="undefined")module.exports=FRENCH_WORDS;\n'
(ROOT/'site/french-vocabulary.js').write_text(text,encoding='utf-8')
print('French vocabulary:',len(selected),'unique lemmas /',max(w['set'] for w in selected)+1,'sets')
print('Gender:',collections.Counter(w['gender'] for w in selected),'topics:',collections.Counter(w['genre'] for w in selected))
print('Frequency range by level:',[(n,selected[(n-1)*400]['word'],selected[n*400-1]['word']) for n in range(1,6)])
