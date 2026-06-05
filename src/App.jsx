import { useState, useCallback, useMemo, useRef, useEffect } from "react";

const FRATE=0.47,FREB=0.47,GU1=2.0802,GU2=1.8868,XCAP=9010,CCAP=15900,MCAP=2650;
const RCAP=Math.round(30000/GU2*100)/100;
const navy="#0f1e2e",green="#22c55e",gdim="#16a34a",gbg="rgba(34,197,94,0.12)",gbor="rgba(34,197,94,0.4)";
const INP={width:"100%",boxSizing:"border-box",background:"#fff",border:"1.5px solid #e2e8f0",borderRadius:8,padding:"10px 12px",fontSize:13,color:"#1e293b",outline:"none"};
const LBL={fontSize:12,color:"#64748b",marginBottom:5,display:"block",fontWeight:500};
const CARD={background:"#fff",border:"1.5px solid #e2e8f0",borderRadius:12,padding:"1.5rem",marginBottom:"1rem"};

const L1R={NSW:["Aberdeen","Balranald","Barham-Koondrook","Barraba","Batemans Bay","Batlow","Bega","Bermagui","Berridale","Berrigan","Bingara","Boggabri","Bombala","Boorowa","Bourke","Brewarrina","Broken Hill","Broulee","Brunswick Heads","Burrill Lake","Byron Bay","Canowindra","Cobar","Condobolin","Cooma","Coonabarabran","Coonamble","Cootamundra","Corowa-Wahgunyah","Cowra","Crescent Head","Crookwell","Culcairn","Dalmeny","Deniliquin","Denman","Dorrigo","Eden","Evans Head","Ewingsdale","Finley","Forbes","Gilgandra","Glen Innes","Gloucester","Grenfell","Griffith","Gulgong","Gundagai","Gunnedah","Harden","Hay","Hillston","Holbrook","Iluka","Inverell","Ivanhoe","Jerilderie","Jindabyne","Junee","Kandos","Kempsey","Kootingal","Kyogle","Lake Cargelligo","Leeton","Lennox Head","Lightning Ridge","Lithgow","Lord Howe Island","Macksville","Maclean","Malua Bay","Manildra","Manilla","Menindee","Merimbula","Milton","Moama-Echuca","Moree","Moruya","Mossy Point","Mudgee","Mullumbimby","Mulwala-Yarrawonga","Murrumburrah","Muswellbrook","Nambucca Heads","Narooma","Narrabri","Narrandera","Narromine","Nyngan","Oberon","Parkes","Peak Hill","Perisher Village","Portland","Quirindi","Satur","Scone","South West Rocks","South Golden Beach","Suffolk Park","Sussex Inlet","Tathra","Temora","Tenterfield","Thredbo Village","Tocumwal","Tumbarumba","Tumut","Tura Beach","Tuross Heads","Ulladulla","Walcha","Walgett","Wallerawang","Warialda","Warren","Wee Waa","Wellington","Werris Creek","West Wyalong","Wilcannia","Yamba","Yenda","Young"],QLD:["Airlie Beach","Allingham","Atherton","Ayr","Babinda","Barcaldine","Biloela","Blackall","Blackwater","Bowen","Bulwer","Cannonvale","Cardwell","Charleville","Charters Towers","Cherbourg","Childers","Chinchilla","Clermont","Cloncurry","Collinsville","Cooktown","Cooroy","Cowan Cowan","Craiglie","Crows Nest","Cunnamulla","Dalby","Dent Island","Dysart","Emerald","Emu Park","Fitzroy Island","Fraser Island","Gayndah","Glenden","Goondiwindi","Great Keppel Island","Green Island","Gympie","Gympie South","Hamilton Island","Home Hill","Hughenden","Ingham","Innisfail","Karumba","Kingaroy","Longreach","Mareeba","Middlemount","Miles","Millmerran","Mission Beach","Mitchell","Monto","Moranbah","Mossman","Mount Isa","Moura","Mundubbera","Murgon","Nanango","Normanton","Palm Island","Point Arkwright","Port Douglas","Proserpine","Roma","Smithfield Heights","St George","Stanthorpe","Thursday Island","Tieri","Tin Can Bay","Tully","Warwick","Weipa","Whitsunday Group of Islands","Winton","Wondai","Wongaling Beach","Woorabinda","Yandina","Yaroomba","Yarrabah","Yeppoon"],VIC:["Alexandra","Ararat","Avoca","Bairnsdale","Beaufort","Benalla","Bright","Camperdown","Casterton","Charlton","Cobden","Cobram","Cohuna","Colac","Coleraine","Corryong","Cowes","Dimboola","Donald","Echuca-Moama","Euroa","Foster","Hamilton","Heathcote","Heyfield","Heywood","Horsham","Inverloch","Kerang","Koondrook-Barham","Korumburra","Lakes Entrance","Leongatha","Lorne","Maffra","Mansfield","Maryborough","Mirboo North","Mortlake","Mount Beauty","Myrtleford","Nagambie","Nathalia","Newhaven","Nhill","Orbost","Ouyen","Paynesville","Portland","Robinvale","Rochester","Rutherglen","St Arnaud","Sale","Seymour","Stawell","Stratford","Swan Hill","Terang","Tongala","Wahgunyah-Corowa","Warracknabeal","Wonthaggi","Yarram","Yarrawonga-Mulwala"],TAS:["Beaconsfield","Beauty Point","Bridport","Bruny Island","Deloraine","Dodges Ferry","George Town","Queenstown","Rosebery","St Helens","Savage River","Scottsdale","Smithton","Tullah","Zeehan"],WA:["Augusta","Boddington","Boulder","Bridgetown","Broome","Busselton","Carnarvon","Collie","Coolgardie","Dampier","Denham","Denmark","Derby","Dirk Hartog Island","Dongara","Dunsborough","Esperance","Exmouth","Fitzroy Crossing","Halls Creek","Kalbarri","Kalgoorlie","Kambalda","Karratha","Katanning","Kellerberrin","Kojonup","Kununurra","Leinster","Leonora","Manjimup","Margaret River","Meekatharra","Merredin","Moora","Mount Barker","Narrogin","Newman","Norseman","Pannawonica","Paraburdoo","Port Denison","Port Hedland","Roebourne","Southern Cross","Tom Price","Wagin","Waroona","Wickham","Wyndham"],SA:["Ardrossan","Barmera","Berri","Bordertown","Burra","Ceduna","Clare","Coober Pedy","Jamestown","Kadina","Kangaroo Island","Keith","Kingscote","Kingston South East","Leigh Creek","Loxton","Maitland","Millicent","Moonta","Naracoorte","Penola","Peterborough","Port Lincoln","Quorn","Renmark","Roxby Downs","Streaky Bay","Tumby Bay","Waikerie","Wallaroo","Woomera"],NT:["Alice Springs","Alyangula","Bathurst Island","Bees Creek","Galiwinku","Gove","Humpty Doo","Jabiru","Katherine","Maningrida","Port Keats","Tennant Creek","Virginia","Yulara"],ACT:[]};
const L2R={NSW:["Aberdeen","Albury-Wodonga","Armidale","Arrawarra","Ballina","Balranald","Bangalow","Barham-Koondrook","Barraba","Basin View","Batemans Bay","Bathurst","Batlow","Bega","Bellingen","Bermagui","Berridale","Berrigan","Blackheath","Blayney","Bingara","Boggabri","Bombala","Bonny Hill","Boorowa","Bourke","Bowral","Brewarrina","Broken Hill","Broulee","Bundanoon","Bungendore","Buronga","Burrill Lake","Byron Bay","Callala Bay","Camden Haven","Canowindra","Casino","Cobar","Coffs Harbour","Colo Vale","Coolamon","Condobolin","Cooma","Coonabarabran","Coonamble","Cootamundra","Coraki","Corowa-Wahgunyah","Cowra","Crescent Head","Crookwell","Culburra","Culcairn","Dalmeny","Dareton","Deniliquin","Denman","Dorrigo","Dubbo","Eden","Emerald Beach","Estella","Evans Head","Ewingsdale","Finley","Forbes","Forest Hill","Forster","Gilgandra","Glen Innes","Gloucester","Grafton","Greenwell Point","Grenfell","Griffith","Gulgong","Gundagai","Gunnedah","Guyra","Harden","Harrington","Hay","Hillston","Holbrook","Howlong","Huskisson","Iluka","Inverell","Ivanhoe","Jerilderie","Jindabyne","Junction Hill","Junee","Kandos","Katoomba","Kempsey","Kootingal","Korora Bay","Kyogle","Lake Cargelligo","Lake Cathie","Leeton","Lennox Head","Lightning Ridge","Lismore","Lithgow","Macksville","Maclean","Malua Bay","Manildra","Manilla","Menindee","Merimbula","Milton","Mittagong","Moama-Echuca","Molong","Moree","Moruya","Mossy Point","Mudgee","Mulwala-Yarrawonga","Murrumburrah","Muswellbrook","Nambucca Heads","Narooma","Narrabri","Narrandera","Narromine","Nyngan","Oberon","Old Bar","Orange","Orient Point","Parkes","Peak Hill","Perisher Village","Portland","Port Macquarie","Quirindi","Sanctuary Point","Sandy Beach","Satur","Sawtell","Scone","South-West Rocks","South Golden Beach","St George Basin","Suffolk Park","Sussex Inlet","Tamworth","Taree","Tathra","Temora","Tenterfield","Thredbo Village","Tocumwal","Tumbarumba","Tumut","Tuncurry","Tura Beach","Tuross Heads","Ulladulla","Uralla","Urunga","Wagga Wagga","Walcha","Walgett","Wallerawang","Warialda","Warren","Wauchope","Wee Waa","Wellington","Wentworth","Werris Creek","West Wyalong","Wilcannia","Windermere Park","Wingham","Wollongbar","Woolgoolga","Yamba","Yenda","Young"],QLD:["Airlie Beach","Alice River","Allingham","Atherton","Ayr","Babinda","Barcaldine","Bargara","Biloela","Blackall","Blackwater","Bli Bli","Bowen","Boyne Island","Bucasia","Buddina Beach","Bulwer","Bundaberg","Burnett Heads","Cairns","Calliope","Cannonvale","Caravonica","Cardwell","Charleville","Charters Towers","Cherbourg","Childers","Chinchilla","Clermont","Clifton Beach","Cloncurry","Collinsville","Cooktown","Coolum Beach","Cooroy","Cordelia Estate","Cowan Cowan","Craiglie","Crows Nest","Cunnamulla","Dalby","Deeragun","Dundowran","Dysart","Edmonton","Eimeo","Emerald","Emu Park","Fitzroy Island","Fraser Island","Gayndah","Gladstone","Glenden","Glenella","Goondiwindi","Gordonvale","Gracemere","Great Keppel Island","Green Island","Gympie","Gympie South","Hambledon","Hamilton Island","Hervey Bay","Highfields","Holloways Beach","Home Hill","Hughenden","Ingham","Innisfail","Karumba","Kawana Waters","Kingaroy","Kingsthorpe","Longreach","Mackay","Magnetic Island","Marcoola","Mareeba","Maryborough","Middlemount","Miles","Millmerran","Mission Beach","Mitchell","Monto","Mooloolaba","Moranbah","Mossman","Mount Isa","Mount Low","Mount Morgan","Moura","Mudjimba","Mundubbera","Murgon","Nambour","Nanango","Nelly Bay","Noosa","Normanton","Oakey","Palm Island","Peregian Beach","Pittsworth","Point Arkwright","Port Douglas","Proserpine","Rockhampton","Roma","Sandstone Point","Sarina","Smithfield Heights","Southend","St George","Stanthorpe","Tannum Sands","Tewantin","Thursday Island","Tieri","Tin Can Bay","Toowoomba","Townsville","Tully","Walkerston","Walloon","Warana Beach","Warwick","Weipa","White Rock","Winton","Wondai","Wongaling Beach","Woorabinda","Yandina","Yaroomba","Yarrabah","Yeppoon","Yorkeys Knob"],VIC:["Alexandra","Anglesea","Ararat","Avoca","Bairnsdale","Ballarat","Beaufort","Beechworth","Benalla","Bendigo","Bright","Buninyong","Camperdown","Casterton","Castlemaine","Charlton","Chiltern","Churchill","Cobden","Cobram","Cohuna","Colac","Coleraine","Corryong","Cowes","Creswick","Daylesford","Dimboola","Donald","Echuca-Moama","Euroa","Foster","Hamilton","Heathcote","Heyfield","Heywood","Horsham","Inverloch","Irymple","Kerang","Koondrook-Barham","Korumburra","Kyabram","Lakes Entrance","Leongatha","Lorne","Maffra","Maldon","Mansfield","Maryborough","Merbein","Mildura","Mirboo North","Moe","Mooroopna","Mortlake","Morwell","Mount Beauty","Mount Helen","Myrtleford","Nagambie","Nathalia","Newhaven","Nhill","Numurkah","Orbost","Ouyen","Paynesville","Portarlington","Port Fairy","Portland","Queenscliff","Red Cliffs","Robinvale","Rochester","Rosedale","Rutherglen","St Arnaud","St Leonards","Sale","Seymour","Shepparton","Stawell","Stratford","Strathfieldsaye","Swan Hill","Tatura","Terang","Tongala","Trafalgar","Traralgon","Wangaratta","Warracknabeal","Warragul","Warrnambool","Wahgunyah-Corowa","Winchelsea","Wodonga-Albury","Wonthaggi","Yallourn North","Yallourn","Yarram","Yarrawonga-Mulwala"],TAS:["ALL_REMOTE"],WA:["Albany","Augusta","Australind","Boddington","Boulder","Bridgetown","Broome","Bunbury","Busselton","Capel","Carnarvon","Collie","Coolgardie","Dampier","Denham","Denmark","Derby","Dongara","Donnybrook","Dunsborough","Eaton","Esperance","Exmouth","Fitzroy Crossing","Gelorup","Geraldton","Halls Creek","Harvey","Kalbarri","Kalgoorlie","Kambalda","Karratha","Katanning","Kellerberrin","Kojonup","Kununurra","Leinster","Leonora","Leschenault","Little Grove","Manjimup","Margaret River","Meekatharra","Merredin","Moora","Mount Barker","Narrogin","Newman","Norseman","Pannawonica","Paraburdoo","Port Denison","Port Headland","Roebourne","Southern Cross","Tom Price","Wagin","Waroona","Wickham","Wyndham"],SA:["Ardrossan","Barmera","Berri","Bordertown","Burra","Ceduna","Clare","Coober Pedy","Crystal Brook","Jamestown","Kadina","Kangaroo Island","Keith","Kingscote","Kingston South East","Leigh Creek","Loxton","Maitland","Millicent","Moonta","Mount Gambier","Naracoorte","Penola","Peterborough","Port Augusta","Port Elliot","Port Lincoln","Port Pirie","Quorn","Renmark","Roxby Downs","Streaky Bay","Tailem Bend","Tumby Bay","Waikerie","Wallaroo","Whyalla","Woomera"],NT:["ALL_REMOTE"],ACT:[]};

const RIDS=["remote_housing","remote_rent","remote_util","remote_travel"];
const SUBS=[];const _sv=new Set();
for(const st of["NSW","QLD","VIC","TAS","WA","SA","NT","ACT"]){
  for(const t of new Set([...(L1R[st]||[]),...(L2R[st]||[])])){
    if(t==="ALL_REMOTE")continue;
    const k=t+"_"+st;
    if(!_sv.has(k)){_sv.add(k);SUBS.push({town:t,state:st});}
  }
}
SUBS.sort((a,b)=>a.town.localeCompare(b.town));
function nm(s){return s.toLowerCase().replace(/[^a-z0-9 ]/g,"").trim();}
function chkR(town,state,list){if(!town||!state)return null;const d=list[state]||[];if(d[0]==="ALL_REMOTE")return{remote:true,note:"All towns here are remote."};return d.find(x=>nm(x)===nm(town))?{remote:true}:{remote:false};}

const LFOOD={single:{1:289,2:412,3:482},couple:{1:434,2:619,3:723},family1:{1:530,2:756,3:883},family2:{1:626,2:892,3:1043},family3:{1:722,2:1029,3:1204}};
const STIERS=[{id:1,label:"Tier 1 up to $124,180"},{id:2,label:"Tier 2 $124,181 to $186,267"},{id:3,label:"Tier 3 over $186,267"}];
const FTYPES=[{id:"single",label:"Single"},{id:"couple",label:"Couple"},{id:"family1",label:"Family 1 child"},{id:"family2",label:"Family 2 children"},{id:"family3",label:"Family 3 or more children"}];
function calcLafha(l){
  if(!l.maintainsHome)return{accom:0,food:0,total:0,note:"Must maintain home in Australia (s.31)."};
  const wks=parseFloat(l.weeksAway)||0;
  const accom=(parseFloat(l.actualAccomWeekly)||0)*wks;
  const rf=(LFOOD[l.familyType]||{})[l.salaryTier]||0;
  let fw=rf;if(l.useActualFood){const af=parseFloat(l.actualFoodWeekly)||0;fw=Math.min(af,rf);}
  return{accom,food:Math.max(0,fw-42)*wks,total:accom+Math.max(0,fw-42)*wks,weeks:wks,reasonableFood:rf};
}

const BCATS=[{id:"living",label:"Living Expenses"},{id:"remote",label:"Remote Area Benefits"},{id:"relocation",label:"Relocation and LAFHA"},{id:"entertainment",label:"Meal and Entertainment"},{id:"work",label:"Work-Related Items"},{id:"other",label:"Other Benefits"}];
const BTS=[
  {id:"mortgage",    label:"Mortgage or Home Loan",                        gst:false,cap:"general",cat:"living",     ref:"s.20 FBTAA",                  af:["exempt","charity","rebatable"]},
  {id:"rent",        label:"Rent Payments",                                gst:false,cap:"general",cat:"living",     ref:"s.20 FBTAA",                  af:["exempt","charity","rebatable"]},
  {id:"credit",      label:"Credit Card or Personal Loan",                 gst:false,cap:"general",cat:"living",     ref:"s.20 FBTAA",                  af:["exempt","charity","rebatable"]},
  {id:"rates",       label:"Council Rates and Body Corporate",             gst:false,cap:"general",cat:"living",     ref:"s.20 FBTAA",                  af:["exempt","charity","rebatable"]},
  {id:"school",      label:"School or Childcare Fees",                     gst:false,cap:"general",cat:"living",     ref:"s.20 FBTAA",                  af:["exempt","charity","rebatable"]},
  {id:"remote_housing",label:"Remote Area Housing (s.58ZC)",               gst:false,cap:"none",   cat:"remote",     ref:"s.58ZC fully pre-tax",        af:["exempt","charity","rebatable","full"],rt:"full"},
  {id:"remote_rent", label:"Remote Area Rent Subsidy (s.60)",              gst:false,cap:"none",   cat:"remote",     ref:"s.60 50pct pre-tax 50pct post-tax",af:["exempt","charity","rebatable","full"],rt:"half"},
  {id:"remote_util", label:"Remote Area Utilities (s.58ZD)",               gst:false,cap:"none",   cat:"remote",     ref:"s.58ZD fully pre-tax",        af:["exempt","charity","rebatable","full"],rt:"full"},
  {id:"remote_travel",label:"Remote Area Holiday Travel (s.60AA)",         gst:false,cap:"none",   cat:"remote",     ref:"s.60AA fully pre-tax",        af:["exempt","charity","rebatable","full"],rt:"full"},
  {id:"lafha",       label:"LAFHA Living Away From Home Allowance",        gst:false,cap:"none",   cat:"relocation", ref:"s.30 FBTAA",                  af:["exempt","charity","rebatable","full"],isLafha:true},
  {id:"relocation",  label:"Relocation Transport and Removals (s.58B)",    gst:true, cap:"none",   cat:"relocation", ref:"s.58B FBT exempt",            af:["exempt","charity","rebatable","full"]},
  {id:"reloc_temp",  label:"Temporary Accommodation Relocation (s.61D)",  gst:false,cap:"none",   cat:"relocation", ref:"s.61D up to 4 weeks",         af:["exempt","charity","rebatable","full"]},
  {id:"meal",        label:"Meal Entertainment (s.37AD)",                  gst:true, cap:"meal",   cat:"entertainment",ref:"s.37AD FBTAA",              af:["exempt","charity","rebatable"]},
  {id:"venue",       label:"Venue Hire or Holiday Accommodation (s.65J)",  gst:true, cap:"meal",   cat:"entertainment",ref:"s.65J FBTAA",               af:["exempt","charity","rebatable"]},
  {id:"ped",         label:"Portable Electronic Device (s.58X)",           gst:true, cap:"general",cat:"work",       ref:"s.58X FBTAA",                 af:["exempt","charity","rebatable","full"]},
  {id:"mobile",      label:"Mobile Phone (s.58X)",                         gst:true, cap:"general",cat:"work",       ref:"s.58X FBTAA 1 device per FBT year",af:["exempt","charity","rebatable","full"]},
  {id:"tools",       label:"Tools of Trade (s.58X)",                       gst:true, cap:"general",cat:"work",       ref:"s.58X FBTAA",                 af:["exempt","charity","rebatable","full"]},
  {id:"briefcase",   label:"Briefcase or Bag (s.58X)",                     gst:true, cap:"general",cat:"work",       ref:"s.58X FBTAA",                 af:["exempt","charity","rebatable","full"]},
  {id:"protective",  label:"Protective Clothing (s.58X)",                  gst:true, cap:"general",cat:"work",       ref:"s.58X FBTAA",                 af:["exempt","charity","rebatable","full"]},
  {id:"carpark",     label:"Car Parking (s.39A)",                          gst:true, cap:"general",cat:"work",       ref:"s.39A FBTAA",                 af:["exempt","charity","rebatable","full"]},
  {id:"mgmt",        label:"Management and Administration Fee",            gst:true, cap:"general",cat:"other",      ref:"Packaging admin",             af:["exempt","charity","rebatable","full"]},
  {id:"super_extra", label:"Additional Superannuation",                    gst:false,cap:"none",   cat:"other",      ref:"s.23L ITAA 1936",             af:["exempt","charity","rebatable","full"]},
  {id:"income_prot", label:"Income Protection Insurance",                  gst:false,cap:"general",cat:"other",      ref:"s.8-1 ITAA",                  af:["exempt","charity","rebatable","full"]},
  {id:"selfed",      label:"Self-Education Expenses (s.58T)",              gst:true, cap:"general",cat:"other",      ref:"s.58T FBTAA",                 af:["exempt","charity","rebatable","full"]},
];
const ETYPES=[{id:"exempt",label:"FBT Exempt (Public Hospital or Charity)"},{id:"charity",label:"FBT Exempt Charitable Institution (s.57A)"},{id:"rebatable",label:"FBT Rebatable (NFP, Union, Scientific Body or Private School)"},{id:"full",label:"Full FBT Payable"}];
const PCYC=[{id:"weekly",label:"Weekly",periods:52,singular:"week"},{id:"fortnightly",label:"Fortnightly",periods:26,singular:"fortnight"},{id:"monthly",label:"Monthly",periods:12,singular:"month"}];

const TB=[[0,18200,0,0,0],[18201,45000,.16,18200,0],[45001,135000,.30,45000,4288],[135001,190000,.37,135000,31288],[190001,1e9,.45,190000,51638]];
function cTax(i){if(i<=0)return 0;for(const[lo,hi,r,b,f]of TB)if(i>=lo&&i<=hi)return Math.max(0,f+(i-b)*r);return 0;}
function cLITO(i){if(i<=37500)return 700;if(i<=45000)return 700-(i-37500)*.05;if(i<=66667)return 325-(i-45000)*.015;return 0;}
function cMed(i){return i<26000?0:i*.02;}
function cHELP(i){if(i<=67000)return 0;if(i<=125000)return(i-67000)*.15;if(i<=179285)return 8700+(i-125000)*.17;return i*.10;}
function fmt(n){return(n||0).toLocaleString("en-AU",{minimumFractionDigits:2,maximumFractionDigits:2});}
function getCapLim(bt,et){if(!bt||bt.cap==="none")return null;if(bt.cap==="meal")return MCAP;if(et==="exempt")return XCAP;if(et==="charity")return CCAP;if(et==="rebatable")return RCAP;return null;}

function fbtBlock(capped,btRt,btGst,empType,isNoCap){
  const isReb=empType==="rebatable",isFull=empType==="full";
  const pct=(btRt==="half")?0.5:1;
  const pre=capped*pct,post=capped*(1-pct);
  const gu=btGst?GU1:GU2;
  const gross=(isFull||isReb)&&!isNoCap?pre*gu*FRATE:0;
  const rebAmt=isReb&&!isNoCap?gross*FREB:0;
  const net=gross-rebAmt;
  const emp=isReb&&!isNoCap?net:0;
  return{pre,post,gross,rebAmt,net,emp};
}

const SUBST={
  mortgage:{label:"Mortgage or Home Loan",docs:["Mortgage statement showing account name, BSB and account number","Copy of loan contract or bank letter confirming the loan","Evidence the property is the employee primary residence such as a rates notice or utility bill"]},
  rent:{label:"Rent Payments",docs:["Current signed lease or rental agreement showing property address, tenant name and weekly or monthly rent","Proof of bank account for rent payments including BSB and account number","Landlord name and contact details"]},
  credit:{label:"Credit Card or Personal Loan",docs:["Most recent credit card or loan statement showing account name and number","Written confirmation from the financial institution of account details","Evidence the loan is in the employee name"]},
  rates:{label:"Council Rates",docs:["Current council rates notice showing property address and account reference","Proof the property is the employee primary residence"]},
  school:{label:"School or Childcare Fees",docs:["Invoice or fee schedule from the school or childcare centre","Enrolment confirmation showing the child name and employee as parent or guardian","School bank account details including BSB and account number"]},
  remote_housing:{label:"Remote Area Housing",docs:["Copy of lease or mortgage documents for the remote area property","Evidence the property is in a remote area as defined under FBTAA 1986 using ATO List 1 or List 2","Employer declaration confirming housing benefit is provided as part of employment conditions"]},
  remote_rent:{label:"Remote Area Rent",docs:["Signed rental agreement for the remote area property showing rent amount and property address","Evidence that the rental property is in a qualifying remote area","Landlord bank account details for direct payment"]},
  remote_util:{label:"Remote Area Utilities",docs:["Utility account statements for electricity, gas and water in the employee name","Evidence that utilities relate to the remote area residence","Proof that remote area housing or rent benefit is also being packaged"]},
  remote_travel:{label:"Remote Area Holiday Travel",docs:["Copies of travel bookings including flights and accommodation for employee and eligible family members","Evidence the journey originated from or returned to the remote area residence","Proof that remote area housing or rent benefit is also being packaged","Receipts for all travel expenses claimed"]},
  lafha:{label:"LAFHA",docs:["Written employer declaration confirming the employee is required to live away from home for work purposes","Statutory declaration from the employee confirming they maintain a home in Australia they intend to return to","Evidence of the employee usual place of residence such as a mortgage statement, rates notice or lease agreement","Evidence of the temporary accommodation costs such as a lease or hotel receipts","Food and meal expense receipts if claiming actual costs above ATO reasonable amounts"]},
  relocation:{label:"Relocation Transport and Removals",docs:["Invoices from removalist or transport company","Evidence of new work location and that relocation is employer-required","Employer letter confirming relocation is a condition of employment or new role"]},
  reloc_temp:{label:"Temporary Accommodation Relocation",docs:["Lease agreement or hotel receipts for temporary accommodation","Evidence that accommodation is within 4 weeks of relocation","Employer letter confirming relocation circumstances"]},
  meal:{label:"Meal Entertainment",docs:["Itemised receipts for all meals and entertainment expenses","Record of the business purpose for each expense","Record of the names of all persons present","Meal entertainment is subject to the $2,650 cap for FBT-exempt employers"]},
  venue:{label:"Venue Hire or Holiday Accommodation",docs:["Invoices or receipts from venue or accommodation provider","Business purpose documentation for each expense","Record of attendees where applicable"]},
  ped:{label:"Portable Electronic Device",docs:["Tax invoice for the device from the retailer","Declaration that the device is used primarily for work purposes being more than 50 percent","Evidence the device is used for employment duties such as an employment contract or employer declaration","Limited to 1 device per FBT year per type of device"]},
  mobile:{label:"Mobile Phone",docs:["Tax invoice for the mobile phone from the retailer","Declaration that the phone is used primarily for work purposes being more than 50 percent","Evidence of employment duties requiring mobile phone use","Limited to 1 device per FBT year per type"]},
  tools:{label:"Tools of Trade",docs:["Tax invoice for the tools from the supplier","Declaration that the tools are used primarily for work purposes being more than 50 percent","Employer confirmation of the tools required for the role"]},
  briefcase:{label:"Briefcase or Bag",docs:["Tax invoice for the item","Declaration of work use purpose","Employer confirmation it is required for employment duties"]},
  protective:{label:"Protective Clothing",docs:["Tax invoice or receipt for the clothing","Evidence that it is required for the employee work via employer declaration or relevant industry standard"]},
  carpark:{label:"Car Parking",docs:["Parking operator invoice or contract showing address and daily or monthly rate","Evidence that parking is used in connection with employment duties","Subject to FBT and employer must determine if commercial car parking threshold applies"]},
  mgmt:{label:"Management and Administration Fee",docs:["Invoice from the salary packaging provider","Confirmation of the fee amount in the packaging agreement"]},
  super_extra:{label:"Additional Superannuation",docs:["Completed superannuation contribution form","Confirmation of employee nominated super fund including fund name, ABN and member number","Employer payroll instructions for additional contributions"]},
  income_prot:{label:"Income Protection Insurance",docs:["Insurance policy document showing premium, policy holder and insurer details","Evidence that the policy is held in the employee name","Insurer bank account or payment reference details"]},
  selfed:{label:"Self-Education Expenses",docs:["Invoice or receipt from the educational institution","Evidence that the course is directly related to the employee current employment","Enrolment confirmation letter from the institution"]},
};
const UDOCS=[
  {label:"Identity and Employment",items:["Two most recent payslips OR a copy of the current signed employment contract"]},
  {label:"Banking Details",items:["Bank statement or bank letter showing account name, BSB and account number for the salary packaging disbursement account","For joint accounts confirmation that the employee is a named account holder"]},
  {label:"Salary Packaging Agreement",items:["Signed salary packaging application or variation form"]},
];

const newItem=()=>({
  id:Date.now()+Math.random(),typeId:"mortgage",monthlyAmount:"",accountName:"",bsb:"",accountNumber:"",description:"",
  accelerate:false,accelerateCycles:"",
  limitCycles:false,limitCyclesNum:"1",
  remote:{employerType:"general",residence:null,employment:null},
  lafha:{maintainsHome:true,weeksAway:52,familyType:"single",salaryTier:1,actualAccomWeekly:"",actualFoodWeekly:"",useActualFood:false}
});

function SubAC({label,value,onChange,placeholder}){
  const[q,setQ]=useState(value&&value.town?value.town+", "+value.state:"");
  const[open,setOpen]=useState(false);
  const ref=useRef(null);
  const suggs=useMemo(()=>{if(q.length<2)return[];const n=nm(q);return SUBS.filter(s=>nm(s.town).includes(n)||s.state.toLowerCase().includes(n)).slice(0,10);},[q]);
  useEffect(()=>{const h=e=>{if(ref.current&&!ref.current.contains(e.target))setOpen(false);};document.addEventListener("mousedown",h);return()=>document.removeEventListener("mousedown",h);},[]);
  return(
    <div ref={ref} style={{position:"relative"}}>
      <label style={LBL}>{label}</label>
      <input style={INP} value={q} placeholder={placeholder||"Type suburb..."} onChange={e=>{setQ(e.target.value);setOpen(true);onChange(null);}} onFocus={()=>setOpen(true)}/>
      {open&&suggs.length>0&&(<div style={{position:"absolute",top:"100%",left:0,right:0,background:"#fff",border:"1.5px solid #e2e8f0",borderRadius:8,zIndex:200,maxHeight:200,overflowY:"auto",boxShadow:"0 4px 16px rgba(0,0,0,.1)"}}>
        {suggs.map((s,i)=>(<div key={i} onClick={()=>{setQ(s.town+", "+s.state);onChange(s);setOpen(false);}} style={{padding:"8px 14px",fontSize:13,cursor:"pointer",borderBottom:"1px solid #f1f5f9"}} onMouseEnter={e=>e.currentTarget.style.background="#f0fdf4"} onMouseLeave={e=>e.currentTarget.style.background="#fff"}>
          <span style={{fontWeight:500}}>{s.town}</span><span style={{color:"#94a3b8",marginLeft:8,fontSize:11}}>{s.state}</span>
        </div>))}
      </div>)}
      {open&&q.length>=2&&!suggs.length&&<div style={{position:"absolute",top:"100%",left:0,right:0,background:"#fff",border:"1.5px solid #e2e8f0",borderRadius:8,zIndex:200,padding:"10px 14px",fontSize:12,color:"#94a3b8"}}>No matches. Area may still qualify under ATO distance rules.</div>}
    </div>
  );
}

function Bdg({ok,label}){return <span style={{display:"inline-flex",alignItems:"center",gap:5,background:ok?gbg:"rgba(239,68,68,.08)",color:ok?gdim:"#dc2626",border:"1px solid "+(ok?gbor:"rgba(239,68,68,.3)"),borderRadius:20,padding:"2px 10px",fontSize:11,fontWeight:600}}><span style={{width:6,height:6,borderRadius:"50%",background:ok?green:"#ef4444",display:"inline-block"}}></span>{label}</span>;}

function RemotePanel({item,updR}){
  const r=item.remote;const isReg=r.employerType==="regional";
  const rL=r.residence?chkR(r.residence.town,r.residence.state,isReg?L2R:L1R):null;
  const eL=r.employment?chkR(r.employment.town,r.employment.state,isReg?L2R:L1R):null;
  const both=rL&&rL.remote&&eL&&eL.remote;
  return(
    <div style={{marginTop:10,background:"#f8fafc",border:"1.5px solid "+(both?green:"#e2e8f0"),borderRadius:10,padding:"1rem"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <span style={{fontSize:13,fontWeight:600,color:"#1e293b"}}>Remote area eligibility checker</span>
        {r.residence&&r.employment&&<Bdg ok={both} label={both?"Eligible":"Not eligible"}/>}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
        {[{id:"general",label:"General employer",sub:"ATO List 1"},{id:"regional",label:"Certain regional employer",sub:"Hospital or charity uses List 2 for housing"}].map(et=>(
          <div key={et.id} onClick={()=>updR("employerType",et.id)} style={{cursor:"pointer",border:"1.5px solid "+(r.employerType===et.id?green:"#e2e8f0"),borderRadius:8,padding:"8px 12px",background:r.employerType===et.id?gbg:"#fff"}}>
            <div style={{fontSize:12,fontWeight:500,color:"#1e293b"}}>{et.label}</div>
            <div style={{fontSize:11,color:"#94a3b8",marginTop:2}}>{et.sub}</div>
          </div>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
        <div><SubAC label="Employee residence" value={r.residence} onChange={v=>updR("residence",v)} placeholder="e.g. Broken Hill"/>
          {r.residence&&<div style={{marginTop:5}}><Bdg ok={rL&&rL.remote} label={rL&&rL.remote?"Remote":"Not remote"}/>{rL&&rL.note&&<span style={{fontSize:11,color:gdim,marginLeft:6}}>{rL.note}</span>}</div>}
        </div>
        <div><SubAC label="Place of employment" value={r.employment} onChange={v=>updR("employment",v)} placeholder="e.g. Karratha"/>
          {r.employment&&<div style={{marginTop:5}}><Bdg ok={eL&&eL.remote} label={eL&&eL.remote?"Remote":"Not remote"}/>{eL&&eL.note&&<span style={{fontSize:11,color:gdim,marginLeft:6}}>{eL.note}</span>}</div>}
        </div>
      </div>
      {r.residence&&r.employment&&(
        <div style={{background:both?gbg:"rgba(239,68,68,.06)",border:"1.5px solid "+(both?gbor:"rgba(239,68,68,.25)"),borderRadius:8,padding:"10px 14px",fontSize:12}}>
          {both?<><span style={{color:gdim,fontWeight:600}}>Both locations confirmed remote</span><span style={{color:"#64748b",marginLeft:8}}>FBT concessions apply under ss.58ZC, 59, 60, 60AA FBTAA 1986</span></>
               :<><span style={{color:"#dc2626",fontWeight:600}}>Not confirmed</span><span style={{color:"#64748b",marginLeft:8}}>Both residence and employment must be in a remote area.</span></>}
        </div>
      )}
      <div style={{marginTop:8,fontSize:11,color:"#94a3b8"}}>ATO List 1 and 2 updated 25 Sep 2018. Unlisted areas may qualify under ATO distance rules.</div>
    </div>
  );
}

function LafhaPanel({item,updL}){
  const l=item.lafha;const c=calcLafha(l);
  return(
    <div style={{marginTop:10,background:"#f0fdf4",border:"1.5px solid "+gbor,borderRadius:10,padding:"1rem"}}>
      <div style={{fontSize:13,fontWeight:600,color:gdim,marginBottom:10}}>LAFHA exempt calculator s.30 FBTAA</div>
      <div style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:8,padding:"9px 12px",fontSize:12,color:"#475569",marginBottom:10}}>
        <b style={{color:"#1e293b"}}>Eligibility (s.31):</b> Must live away from usual residence for work, maintain home in Australia, written employer declaration required.
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
        <div style={{gridColumn:"1/-1",display:"flex",alignItems:"center",gap:8,padding:"9px 12px",background:"#fff",borderRadius:8,border:"1px solid #e2e8f0"}}>
          <input type="checkbox" checked={l.maintainsHome} onChange={e=>updL("maintainsHome",e.target.checked)} style={{width:15,height:15,accentColor:green}}/>
          <label style={{fontSize:12,color:"#1e293b",cursor:"pointer"}}>Employee maintains a home in Australia</label>
        </div>
        <div><label style={LBL}>Weeks away</label><input style={INP} type="number" value={l.weeksAway} onChange={e=>updL("weeksAway",e.target.value)} min={1} max={52}/></div>
        <div><label style={LBL}>Family situation</label><select style={INP} value={l.familyType} onChange={e=>updL("familyType",e.target.value)}>{FTYPES.map(f=><option key={f.id} value={f.id}>{f.label}</option>)}</select></div>
        <div><label style={LBL}>Salary tier</label><select style={INP} value={l.salaryTier} onChange={e=>updL("salaryTier",parseInt(e.target.value))}>{STIERS.map(t=><option key={t.id} value={t.id}>{t.label}</option>)}</select></div>
        <div><label style={LBL}>Weekly accommodation ($)</label><input style={INP} type="number" value={l.actualAccomWeekly} onChange={e=>updL("actualAccomWeekly",e.target.value)} placeholder="0.00"/></div>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10,padding:"9px 12px",background:"#fff",borderRadius:8,border:"1px solid #e2e8f0"}}>
        <input type="checkbox" checked={l.useActualFood} onChange={e=>updL("useActualFood",e.target.checked)} style={{width:15,height:15,accentColor:green}}/>
        <label style={{fontSize:12,color:"#1e293b",cursor:"pointer"}}>Use actual food costs (ATO reasonable amount: ${c.reasonableFood}/wk)</label>
      </div>
      {l.useActualFood&&<div style={{marginBottom:10}}><label style={LBL}>Actual weekly food ($)</label><input style={{...INP,maxWidth:220}} type="number" value={l.actualFoodWeekly} onChange={e=>updL("actualFoodWeekly",e.target.value)} placeholder="0.00"/></div>}
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,borderTop:"1px solid "+gbor,paddingTop:10}}>
        {[["Accommodation exempt",c.accom],["Food exempt",c.food],["Total LAFHA exempt",c.total]].map(([ll,val],i)=>(
          <div key={ll} style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:8,padding:"8px 10px"}}>
            <div style={{fontSize:10,color:"#64748b",marginBottom:2}}>{ll} (annual)</div>
            <div style={{fontSize:15,fontWeight:i===2?700:500,color:i===2?gdim:"#1e293b"}}>${fmt(val)}</div>
          </div>
        ))}
      </div>
      {c.note&&<div style={{marginTop:8,fontSize:12,color:"#dc2626"}}>{c.note}</div>}
    </div>
  );
}

export default function App(){
  const[tab,setTab]=useState("inputs");
  const[empName,setEmpName]=useState("");
  const[empOrg,setEmpOrg]=useState("");
  const[empType,setEmpType]=useState("exempt");
  const[empWarn,setEmpWarn]=useState(false);
  const[payCyc,setPayCyc]=useState("monthly");
  const[cName,setCName]=useState("");
  const[cPhone,setCPhone]=useState("1300 946 527");
  const[cEmail,setCEmail]=useState("psp@positivesp.com.au");
  const[salary,setSalary]=useState("90000");
  const[helpDebt,setHelpDebt]=useState(false);
  const[pkgFee,setPkgFee]=useState("257.40");
  const[items,setItems]=useState([newItem()]);

  const addItem=()=>items.length<8&&setItems(p=>[...p,newItem()]);
  const remItem=id=>setItems(p=>p.filter(i=>i.id!==id));
  const upd=(id,f,v)=>setItems(p=>p.map(i=>i.id===id?{...i,[f]:v}:i));
  const updR=(id,f,v)=>setItems(p=>p.map(i=>i.id===id?{...i,remote:{...i.remote,[f]:v}}:i));
  const updL=(id,f,v)=>setItems(p=>p.map(i=>i.id===id?{...i,lafha:{...i.lafha,[f]:v}}:i));
  const hasRemHousing=items.some(i=>i.typeId==="remote_housing"||i.typeId==="remote_rent");

  const chgEmpType=nt=>{
    const bad=items.some(it=>{const b=BTS.find(x=>x.id===it.typeId);return b&&!b.af.includes(nt);});
    if(bad)setEmpWarn(nt);else{setEmpType(nt);setEmpWarn(false);}
  };
  const confirmChg=()=>{
    const nt=empWarn;
    setItems(p=>p.map(it=>{const b=BTS.find(x=>x.id===it.typeId);if(b&&!b.af.includes(nt)){return{...newItem(),id:it.id,typeId:BTS.find(x=>x.af.includes(nt)).id};}return it;}));
    setEmpType(nt);setEmpWarn(false);
  };

  const gross=parseFloat(salary)||0;
  const cyc=PCYC.find(c=>c.id===payCyc)||PCYC[2];

  const R=useCallback(()=>{
    const cap=empType==="exempt"?XCAP:empType==="charity"?CCAP:empType==="rebatable"?RCAP:0;
    const remH=items.some(i=>i.typeId==="remote_housing"||i.typeId==="remote_rent");
    const monthlyFee=parseFloat(pkgFee)||0;
    let gU=0,mU=0,tMon=0,tGST=0,tAdd=0,tGross=0,tReb=0,tNet=0,tEmp=0;
    const LI=[];
    for(const item of items){
      const bt=BTS.find(b=>b.id===item.typeId);
      if(!bt)continue;
      if((item.typeId==="remote_util"||item.typeId==="remote_travel")&&!remH)continue;
      let mon=0,ld=null;
      if(bt.isLafha){const x=calcLafha(item.lafha);ld=x;mon=x.total/12;}
      else{mon=(parseFloat(item.monthlyAmount)||0)/12;}
      if(mon<=0)continue;
      // item.monthlyAmount is now stored as annual — mon = annual/12
      const limitN=item.limitCycles&&parseInt(item.limitCyclesNum)>0?Math.min(parseInt(item.limitCyclesNum),cyc.periods):null;
      // If limited cycles: annual impact = per-cycle amount × cycles used
      const iAnn=limitN?(mon*(12/cyc.periods)*limitN):mon*12;
      const isMeal=bt.cap==="meal";
      const isNone=bt.cap==="none";
      const isNoCap=isNone;
      let cAnn;
      if(isNone){cAnn=iAnn;}
      else if(isMeal){cAnn=Math.min(iAnn,Math.max(0,MCAP-mU));}
      else{const gr=Math.max(0,cap-gU);cAnn=empType==="full"?iAnn:Math.min(iAnn,gr);}
      const c=cAnn/12;
      if(isMeal)mU+=cAnn;else if(!isNone)gU+=cAnn;
      const gst=bt.gst?(c/11):0;
      const fb=fbtBlock(c,bt.rt||"full",bt.gst,empType,isNoCap);
      // For full FBT: employer pays FBT directly — it is NOT a pre-tax employee deduction
      // Only add the benefit (c) to tMon for full FBT — the FBT is employer cost
      // For rebatable: add both benefit (c) and net FBT employee contribution (fb.emp)
      tMon+=c+fb.emp;
      tGST+=gst;
      tGross+=fb.gross;
      tReb+=fb.rebAmt;
      tNet+=fb.net;
      tEmp+=fb.emp;
      if(!bt.isLafha)tAdd+=c;
      LI.push({...item,bt,mon:c,pre:fb.pre,post:fb.post,rt:bt.rt||null,ann:cAnn,gst,xGross:fb.gross,xReb:fb.rebAmt,xNet:fb.net,xEmp:fb.emp,ld,reqMon:mon,atCap:!isNone&&cAnn<iAnn});
    }
    if(LI.length>0&&monthlyFee>0){
      const aFeeInc=monthlyFee;
      const aFeeEx=aFeeInc/1.1;
      const aGSTFee=aFeeInc-aFeeEx;
      const feeBt=BTS.find(b=>b.id==="mgmt")||{label:"Packaging Fee",ref:"Admin fee incl. GST",gst:true,cap:"general",af:[]};
      tMon+=aFeeEx/12;
      LI.push({id:"__fee__",bt:feeBt,description:"Annual packaging fee (incl. GST)",mon:aFeeEx/12,pre:aFeeEx/12,post:0,rt:null,ann:aFeeEx,gst:0,annualFeeIncGST:aFeeInc,perCycleFeeIncGST:aFeeInc/cyc.periods,perCycleFeeExGST:aFeeEx/cyc.periods,perCycleGST:aGSTFee/cyc.periods,xGross:0,xReb:0,xNet:0,xEmp:0,ld:null,isFee:true});
    }
    const aDed=tMon*12,aGST=tGST*12,aBen=tAdd*12;
    const tInc=Math.max(0,gross-aDed);
    const txN=cTax(gross)-cLITO(gross)+cMed(gross);
    const txP=cTax(tInc)-cLITO(tInc)+cMed(tInc);
    const hN=helpDebt?cHELP(gross):0,hP=helpDebt?cHELP(tInc):0;
    const nN=(gross-txN-hN)/12,nP=(tInc-txP-hP)/12;
    const feeLI=LI.find(l=>l.isFee);
    const feeAnnExGST=feeLI?feeLI.ann:0;
    // tNet = net after tax + benefit addbacks - packaging fee
    // addback = benefits received back (value to employee)
    // for full FBT: FBT is employer cost, not deducted from employee
    // for rebatable: net FBT (tEmp) already deducted via tMon so taxable income is correct
    const tN=nP+tAdd-(feeAnnExGST/12);
    const saving=(tN-nN)*12;
    return{LI,aDed,aGST,saving,
      noP:{sal:gross/12,tax:txN/12,hlp:hN/12,net:nN},
      newP:{sal:gross/12,ben:aBen/12,gst:aGST/12,tInc:tInc/12,tax:txP/12,hlp:hP/12,xGross:tGross,xReb:tReb,xNet:tNet,xEmp:tEmp,net:nP,add:tAdd,tNet:tN}};
  },[gross,empType,helpDebt,items,pkgFee,cyc])();

  const SH=({icon,title,step})=>(
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1.25rem"}}>
      <div style={{display:"flex",alignItems:"center",gap:10}}><span style={{fontSize:18}}>{icon}</span><span style={{fontSize:15,fontWeight:600,color:"#1e293b"}}>{title}</span></div>
      <span style={{background:gbg,color:green,border:"1px solid "+gbor,borderRadius:20,padding:"2px 12px",fontSize:12,fontWeight:600}}>Step {step}</span>
    </div>
  );

  const mkRows=(r,p,isReb)=>{
    const s=v=>v!=null&&v!==0?v*(12/p):null;
    const feeLi=R.LI.find(l=>l.isFee);
    const rows=[
      ["Salary",s(r.noP.sal),s(r.newP.sal)],
      ["TEC",s(r.noP.sal),s(r.newP.sal)],
      ["Benefits pre-tax",null,s(r.newP.ben),false,true],
      ["GST paid by employer",null,s(r.newP.gst)],
    ];
    if(isReb)rows.push(["Employee FBT contribution (pre-tax)",null,s(r.newP.xEmp),false,true]);
    rows.push(["Taxable income",s(r.noP.sal),s(r.newP.tInc),true]);
    rows.push(["Income tax and Medicare",s(r.noP.tax),s(r.newP.tax)]);
    if(isReb){
      rows.push(["FBT payable gross",null,s(r.newP.xGross)]);
      rows.push(["Net FBT cost to employee",null,s(r.newP.xNet)]);
    } else {
      rows.push(["FBT payable",null,s(r.newP.xGross)]);
    }
    rows.push(["HELP debt",helpDebt?s(r.noP.hlp):null,helpDebt?s(r.newP.hlp):null]);
    rows.push(["Net income",s(r.noP.net),s(r.newP.net),true]);
    rows.push(["Add back benefits",null,s(r.newP.add),false,true]);
    if(feeLi)rows.push(["Less packaging fee (pre-tax cost)",null,-(feeLi.ann/p)]);    rows.push(["Total net income",s(r.noP.net),s(r.newP.tNet),true,false,true]);
    return rows;
  };

  return(
    <div style={{fontFamily:"system-ui,sans-serif",background:"#f1f5f9",minHeight:"100vh"}}>
      <div style={{background:navy,padding:"0 1.5rem"}}>
        <div style={{maxWidth:900,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 0"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:36,height:36,borderRadius:8,background:green,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700,color:"#fff"}}>SP</div>
            <div><div style={{color:"#fff",fontWeight:600,fontSize:14}}>Salary Packaging</div><div style={{color:"#94a3b8",fontSize:11}}>Benefits Calculator</div></div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <span style={{color:"#94a3b8",fontSize:13}}>{cPhone}</span>
            <button onClick={()=>setTab("quote")} style={{background:green,color:"#fff",border:"none",borderRadius:8,padding:"8px 18px",fontSize:13,fontWeight:600,cursor:"pointer"}}>Export PDF</button>
          </div>
        </div>
        <div style={{maxWidth:900,margin:"0 auto",textAlign:"center",padding:"1.75rem 0 1.25rem"}}>
          <div style={{display:"inline-block",background:"rgba(34,197,94,.15)",border:"1px solid "+gbor,borderRadius:20,padding:"4px 16px",fontSize:11,fontWeight:700,color:green,letterSpacing:1,marginBottom:10}}>SALARY PACKAGING CALCULATOR</div>
          <h1 style={{color:"#fff",fontSize:26,fontWeight:700,margin:"0 0 6px"}}>Salary <span style={{color:green}}>Benefits</span> Calculator</h1>
          <p style={{color:"#94a3b8",fontSize:13,margin:0}}>FBTAA 1986 - LAFHA, remote area, relocation and all packaged benefits - 2025-26 tax rates</p>
        </div>
        <div style={{maxWidth:900,margin:"0 auto",display:"flex",borderTop:"1px solid rgba(255,255,255,.08)"}}>
          {["inputs","results","quote","docs"].map(t=>(
            <button key={t} onClick={()=>setTab(t)} style={{background:"none",border:"none",color:tab===t?"#fff":"#94a3b8",borderBottom:tab===t?"2px solid "+green:"2px solid transparent",padding:"12px 20px",fontSize:13,fontWeight:tab===t?600:400,cursor:"pointer",marginBottom:-1,textTransform:"capitalize"}}>{t==="docs"?"Documents":t}</button>
          ))}
        </div>
      </div>

      <div style={{maxWidth:900,margin:"0 auto",padding:"1.5rem"}}>

        {tab==="inputs"&&(<>
          <div style={CARD}>
            <SH icon="⚙️" title="Consultant details" step={1}/>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              <div><label style={LBL}>Consultant name</label><input style={INP} value={cName} onChange={e=>setCName(e.target.value)} placeholder="Your name"/></div>
              <div><label style={LBL}>Phone</label><input style={INP} value={cPhone} onChange={e=>setCPhone(e.target.value)}/></div>
              <div style={{gridColumn:"1/-1"}}><label style={LBL}>Email</label><input style={INP} value={cEmail} onChange={e=>setCEmail(e.target.value)}/></div>
            </div>
          </div>

          <div style={CARD}>
            <SH icon="👤" title="Employee and employer details" step={2}/>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              <div><label style={LBL}>Employee name</label><input style={INP} value={empName} onChange={e=>setEmpName(e.target.value)} placeholder="Full name"/></div>
              <div><label style={LBL}>Employer name</label><input style={INP} value={empOrg} onChange={e=>setEmpOrg(e.target.value)} placeholder="Organisation"/></div>
              <div>
                <label style={LBL}>Employer FBT type</label>
                <select style={INP} value={empType} onChange={e=>chgEmpType(e.target.value)}>
                  {ETYPES.map(t=><option key={t.id} value={t.id}>{t.label}</option>)}
                </select>
              </div>
              <div><label style={LBL}>Pay cycle</label><select style={INP} value={payCyc} onChange={e=>setPayCyc(e.target.value)}>{PCYC.map(c=><option key={c.id} value={c.id}>{c.label}</option>)}</select></div>
              <div><label style={LBL}>Gross annual salary ($)</label><input style={INP} type="number" value={salary} onChange={e=>setSalary(e.target.value)}/></div>
              <div><label style={LBL}>Annual packaging fee incl. GST ($)</label><input style={INP} type="number" value={pkgFee} onChange={e=>setPkgFee(e.target.value)}/></div>
              <div style={{display:"flex",alignItems:"center",gap:8,paddingTop:22}}>
                <input type="checkbox" checked={helpDebt} onChange={e=>setHelpDebt(e.target.checked)} style={{width:15,height:15,accentColor:green}}/>
                <label style={{fontSize:13,color:"#475569",cursor:"pointer"}}>Employee has HELP or HECS debt</label>
              </div>
              {empWarn&&(
                <div style={{gridColumn:"1/-1",background:"rgba(234,179,8,.1)",border:"1.5px solid rgba(234,179,8,.5)",borderRadius:8,padding:"12px 14px"}}>
                  <div style={{fontSize:13,fontWeight:600,color:"#92400e",marginBottom:6}}>Some benefit items are not available for this employer type</div>
                  <div style={{fontSize:12,color:"#78350f",marginBottom:10}}>Changing employer type will reset incompatible benefit items.</div>
                  <div style={{display:"flex",gap:8}}>
                    <button onClick={confirmChg} style={{background:"#d97706",color:"#fff",border:"none",borderRadius:6,padding:"7px 16px",fontSize:12,fontWeight:600,cursor:"pointer"}}>Change and reset incompatible items</button>
                    <button onClick={()=>setEmpWarn(false)} style={{background:"#fff",border:"1px solid #d97706",color:"#92400e",borderRadius:6,padding:"7px 16px",fontSize:12,fontWeight:600,cursor:"pointer"}}>Cancel</button>
                  </div>
                </div>
              )}
            </div>
            <div style={{marginTop:12,background:"#f8fafc",border:"1px solid #e2e8f0",borderRadius:8,padding:"9px 14px",fontSize:12,color:"#64748b"}}>
              {empType==="exempt"&&<span>FBT exempt s.57A - general cap <b style={{color:"#1e293b"}}>$9,010</b> - meal cap <b style={{color:"#1e293b"}}>$2,650</b></span>}
              {empType==="charity"&&<span>FBT exempt charitable institution - general cap <b style={{color:"#1e293b"}}>$15,900</b> - meal cap <b style={{color:"#1e293b"}}>$2,650</b></span>}
              {empType==="rebatable"&&<span>FBT rebatable - grossed-up cap <b style={{color:"#1e293b"}}>$30,000</b> (actual benefit value <b style={{color:"#1e293b"}}>${Math.round(RCAP).toLocaleString()}</b>) - net FBT passed to employee pre-tax</span>}
              {empType==="full"&&<span>Full FBT payable at <b style={{color:"#1e293b"}}>47%</b> - no concessional cap</span>}
            </div>
          </div>

          <div style={CARD}>
            <SH icon="📦" title="Packaged benefit items" step={3}/>
            {items.map((item,idx)=>{
              const bt=BTS.find(b=>b.id===item.typeId);
              const isRem=RIDS.includes(item.typeId);
              const capLim=getCapLim(bt,empType);
              const iMon=parseFloat(item.monthlyAmount)||0; // stored as annual
              const iAnn=iMon; // already annual
              const accelN=item.accelerate&&parseInt(item.accelerateCycles)>0?Math.min(parseInt(item.accelerateCycles),cyc.periods):null;
              const effCap=capLim?Math.min(iAnn,capLim):iAnn;
              const perCyc=accelN?effCap/accelN:effCap/cyc.periods;
              return(
                <div key={item.id} style={{border:"1.5px solid #e2e8f0",borderRadius:10,padding:"1rem",marginBottom:10,background:"#fafafa"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                    <span style={{fontSize:13,fontWeight:600,color:"#1e293b"}}>Benefit item {idx+1}</span>
                    {items.length>1&&<button onClick={()=>remItem(item.id)} style={{fontSize:12,color:"#ef4444",background:"none",border:"none",cursor:"pointer"}}>Remove</button>}
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                    <div><label style={LBL}>Benefit type</label>
                      <select style={INP} value={item.typeId} onChange={e=>upd(item.id,"typeId",e.target.value)}>
                        {BCATS.map(cat=>{
                          const av=BTS.filter(b=>b.cat===cat.id&&b.af.includes(empType));
                          if(!av.length)return null;
                          return(<optgroup key={cat.id} label={cat.label}>
                            {av.map(b=>{
                              const needsH=b.id==="remote_util"||b.id==="remote_travel";
                              const dis=needsH&&!hasRemHousing;
                              return <option key={b.id} value={b.id} disabled={dis}>{b.label}{dis?" (requires remote housing or rent)":""}</option>;
                            })}
                          </optgroup>);
                        })}
                      </select>
                    </div>
                    <div><label style={LBL}>Description</label><input style={INP} value={item.description} onChange={e=>upd(item.id,"description",e.target.value)} placeholder="e.g. Home loan"/></div>
                    {!bt.isLafha&&<div><label style={LBL}>Annual amount ($)</label><input style={INP} type="number" value={item.monthlyAmount} onChange={e=>upd(item.id,"monthlyAmount",e.target.value)} placeholder="e.g. 9010"/></div>}
                    {!bt.isLafha&&!isRem&&<div><label style={LBL}>Account name</label><input style={INP} value={item.accountName} onChange={e=>upd(item.id,"accountName",e.target.value)}/></div>}
                    {!bt.isLafha&&!isRem&&<div><label style={LBL}>BSB</label><input style={INP} value={item.bsb} onChange={e=>upd(item.id,"bsb",e.target.value)} placeholder="000-000"/></div>}
                    {!bt.isLafha&&!isRem&&<div><label style={LBL}>Account number</label><input style={INP} value={item.accountNumber} onChange={e=>upd(item.id,"accountNumber",e.target.value)}/></div>}
                  </div>
                  <div style={{marginTop:8,fontSize:11,color:"#64748b",background:"#f8fafc",borderRadius:6,padding:"6px 10px",display:"flex",gap:12,flexWrap:"wrap"}}>
                    <span>{bt.gst?"GST applies":"No GST"}</span>
                    <span>{"Cap: "+(bt.cap==="meal"?"Meal ent $"+MCAP.toLocaleString():bt.cap==="none"?"No cap exempt":empType==="exempt"?"General $"+XCAP.toLocaleString():empType==="charity"?"Charitable $"+CCAP.toLocaleString():empType==="rebatable"?"Rebatable $"+Math.round(RCAP).toLocaleString():"-")}</span>
                    <span style={{color:green,fontWeight:500}}>{bt.ref}</span>
                  </div>
                  {(item.typeId==="remote_util"||item.typeId==="remote_travel")&&!hasRemHousing&&(
                    <div style={{marginTop:6,background:"rgba(239,68,68,.08)",border:"1px solid rgba(239,68,68,.3)",borderRadius:6,padding:"7px 10px",fontSize:11,color:"#dc2626"}}>
                      This benefit requires a remote area housing (s.58ZC) or rent (s.60) benefit to also be packaged.
                    </div>
                  )}
                  {capLim&&iAnn>capLim&&(
                    <div style={{marginTop:6,background:"rgba(234,179,8,.1)",border:"1px solid rgba(234,179,8,.4)",borderRadius:6,padding:"7px 10px",fontSize:11,color:"#92400e"}}>
                      Annual amount ${iAnn.toLocaleString()} exceeds cap of ${capLim.toLocaleString()} - only ${capLim.toLocaleString()}/yr will be packaged.
                    </div>
                  )}
                  {capLim&&!bt.isLafha&&(
                    <div style={{marginTop:8,background:item.accelerate?gbg:"#f8fafc",border:"1px solid "+(item.accelerate?gbor:"#e2e8f0"),borderRadius:8,padding:"10px 12px"}}>
                      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:item.accelerate?10:0}}>
                        <input type="checkbox" checked={item.accelerate||false} onChange={e=>upd(item.id,"accelerate",e.target.checked)} style={{width:14,height:14,accentColor:green}}/>
                        <label style={{fontSize:12,fontWeight:500,color:"#1e293b",cursor:"pointer"}}>Accelerate - package full cap over fewer pay cycles</label>
                      </div>
                      {item.accelerate&&(
                        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                          <div><label style={LBL}>Number of {cyc.singular}s to spread cap over</label>
                            <input style={INP} type="number" min={1} max={cyc.periods} value={item.accelerateCycles} onChange={e=>upd(item.id,"accelerateCycles",e.target.value)} placeholder={"1 to "+cyc.periods}/>
                          </div>
                          {accelN&&<div style={{paddingTop:18}}>
                            <div style={{background:"#fff",border:"1px solid "+gbor,borderRadius:8,padding:"8px 12px"}}>
                              <div style={{fontSize:11,color:"#64748b"}}>Deduction per {cyc.singular}</div>
                              <div style={{fontSize:17,fontWeight:700,color:gdim}}>${fmt(perCyc)}</div>
                              <div style={{fontSize:10,color:"#94a3b8",marginTop:2}}>for {accelN} {cyc.singular}s then stops - ${fmt(effCap)} total</div>
                            </div>
                          </div>}
                          <div style={{gridColumn:"1/-1",fontSize:11,color:"#64748b",background:"#fff",borderRadius:6,padding:"6px 10px",border:"1px solid #e2e8f0"}}>
                            Full cap of ${effCap.toLocaleString()} packaged over {accelN||"?"} {cyc.singular}s. Instruct payroll to cease deductions once cap is reached.
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  {/* Limited cycles option */}
                  {!bt.isLafha&&(
                    <div style={{marginTop:8,background:item.limitCycles?gbg:"#f8fafc",border:"1px solid "+(item.limitCycles?gbor:"#e2e8f0"),borderRadius:8,padding:"10px 12px"}}>
                      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:item.limitCycles?10:0}}>
                        <input type="checkbox" checked={item.limitCycles||false} onChange={e=>{upd(item.id,"limitCycles",e.target.checked);if(item.accelerate)upd(item.id,"accelerate",false);}} style={{width:14,height:14,accentColor:green}}/>
                        <label style={{fontSize:12,fontWeight:500,color:"#1e293b",cursor:"pointer"}}>One-off or limited cycles - deduct for a set number of pay cycles only</label>
                      </div>
                      {item.limitCycles&&(()=>{
                        const lN=parseInt(item.limitCyclesNum)||1;
                        const annualAmt=parseFloat(item.monthlyAmount)||0;
                        const perCycAmt=annualAmt/cyc.periods;
                        const totalAmt=perCycAmt*lN;
                        return(
                          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                            <div>
                              <label style={LBL}>Number of {cyc.singular}s to deduct</label>
                              <input style={INP} type="number" min={1} max={cyc.periods} value={item.limitCyclesNum} onChange={e=>upd(item.id,"limitCyclesNum",e.target.value)} placeholder={"1 to "+cyc.periods}/>
                            </div>
                            <div style={{paddingTop:18}}>
                              <div style={{background:"#fff",border:"1px solid "+gbor,borderRadius:8,padding:"8px 12px"}}>
                                <div style={{fontSize:11,color:"#64748b"}}>Total deduction</div>
                                <div style={{fontSize:17,fontWeight:700,color:gdim}}>${fmt(totalAmt)}</div>
                                <div style={{fontSize:10,color:"#94a3b8",marginTop:2}}>${fmt(perCycAmt)} x {lN} {cyc.singular}{lN>1?"s":""} then stops</div>
                              </div>
                            </div>
                            <div style={{gridColumn:"1/-1",fontSize:11,color:"#64748b",background:"#fff",borderRadius:6,padding:"6px 10px",border:"1px solid #e2e8f0"}}>
                              Deduction of ${fmt(perCycAmt*(12/cyc.periods))} will run for {lN} {cyc.singular}{lN>1?"s":""} totalling ${fmt(totalAmt)}. Instruct payroll to cease after {lN} {cyc.singular}{lN>1?"s":""}.
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  )}
                  {isRem&&<RemotePanel item={item} updR={(f,v)=>updR(item.id,f,v)}/>}
                  {bt.isLafha&&<LafhaPanel item={item} updL={(f,v)=>updL(item.id,f,v)}/>}
                </div>
              );
            })}
            {items.length<8&&<button onClick={addItem} style={{fontSize:13,color:green,background:gbg,border:"1px solid "+gbor,borderRadius:8,padding:"8px 18px",cursor:"pointer",fontWeight:500}}>+ Add benefit item</button>}
          </div>
          <div style={{display:"flex",justifyContent:"flex-end"}}>
            <button onClick={()=>setTab("results")} style={{background:green,color:"#fff",border:"none",borderRadius:8,padding:"10px 28px",fontSize:14,fontWeight:600,cursor:"pointer"}}>View results</button>
          </div>
        </>)}

        {tab==="results"&&(()=>{
          const p=cyc.periods,sg=cyc.singular;
          const nP=R.newP.tNet*(12/p),nU=R.noP.net*(12/p),diff=nP-nU;
          const isReb=empType==="rebatable";
          return(<>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:16}}>
              {[{label:"Annual tax saving",val:"$"+fmt(R.saving),hi:R.saving>0},{label:"Saving per "+sg,val:"$"+fmt(diff),hi:diff>0},{label:"Net per "+sg+" (packaged)",val:"$"+fmt(nP),hi:false},{label:"Net per "+sg+" (no packaging)",val:"$"+fmt(nU),hi:false}].map(({label,val,hi})=>(
                <div key={label} style={{background:hi?"#f0fdf4":navy,border:hi?"1.5px solid "+gbor:"1.5px solid rgba(255,255,255,.08)",borderRadius:12,padding:"1rem 1.25rem"}}>
                  <div style={{fontSize:11,color:hi?green:"#94a3b8",marginBottom:4,fontWeight:500}}>{label}</div>
                  <div style={{fontSize:20,fontWeight:700,color:hi?gdim:"#fff"}}>{val}</div>
                </div>
              ))}
            </div>
            <div style={CARD}>
              <h3 style={{margin:"0 0 1rem",fontSize:15,fontWeight:600,color:"#1e293b"}}>{cyc.label} modelled benefits</h3>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
                <thead><tr style={{borderBottom:"2px solid #e2e8f0"}}>
                  <th style={{textAlign:"left",padding:"8px 0",color:"#64748b",fontWeight:500,fontSize:12}}></th>
                  <th style={{textAlign:"right",padding:"8px 8px",color:"#64748b",fontWeight:500,fontSize:12}}>No packaging</th>
                  <th style={{textAlign:"right",padding:"8px 8px",color:"#64748b",fontWeight:500,fontSize:12,background:"#f0fdf4",borderRadius:"6px 6px 0 0"}}>Proposed package</th>
                </tr></thead>
                <tbody>
                  {mkRows(R,p,isReb).map(([label,a,b,border,hi,bold],i)=>{
                    const isRebRow=false;
                    const isFeeRow=label==="Less packaging fee (pre-tax cost)";
                    return(
                      <tr key={i} style={{borderTop:border?"2px solid #e2e8f0":"1px solid #f1f5f9",background:bold?"#f8fafc":hi?"rgba(34,197,94,.04)":undefined}}>
                        <td style={{padding:"8px 0",color:hi?"#475569":"#64748b",fontWeight:bold?600:400}}>{label}</td>
                        <td style={{textAlign:"right",padding:"8px 8px",color:bold?"#1e293b":"#475569",fontWeight:bold?600:400}}>{a!=null&&Math.abs(a)>0?"$"+fmt(Math.abs(a)):"-"}</td>
                        <td style={{textAlign:"right",padding:"8px 8px",background:"#f0fdf4",color:bold?gdim:isFeeRow?"#dc2626":hi?gdim:"#475569",fontWeight:bold?700:400}}>
                          {b!=null&&Math.abs(b)>0?(isFeeRow?"($"+fmt(Math.abs(b))+")":"$"+fmt(Math.abs(b))):"-"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div style={CARD}>
              <h3 style={{margin:"0 0 1rem",fontSize:15,fontWeight:600,color:"#1e293b"}}>Benefit items</h3>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
                <thead><tr style={{borderBottom:"2px solid #e2e8f0"}}>
                  {["Benefit","Description","Monthly","Pre-tax","Post-tax","Notes"].map(h=><th key={h} style={{textAlign:["Monthly","Pre-tax","Post-tax"].includes(h)?"right":"left",padding:"6px",color:"#64748b",fontWeight:500,fontSize:12}}>{h}</th>)}
                </tr></thead>
                <tbody>
                  {R.LI.filter(li=>!li.isFee).map((li,i)=>(
                    <tr key={i} style={{borderBottom:"1px solid #f1f5f9"}}>
                      <td style={{padding:"8px 6px",color:"#1e293b"}}>{li.bt.label}</td>
                      <td style={{padding:"8px 6px",color:"#64748b"}}>{li.description||"-"}</td>
                      <td style={{textAlign:"right",padding:"8px 6px"}}>${fmt(li.mon)}</td>
                      <td style={{textAlign:"right",padding:"8px 6px",color:gdim,fontWeight:500}}>${fmt(li.pre)}</td>
                      <td style={{textAlign:"right",padding:"8px 6px",color:li.post>0?"#475569":"#cbd5e1"}}>{li.post>0?"$"+fmt(li.post):"-"}</td>
                      <td style={{padding:"8px 6px",fontSize:11,color:"#94a3b8"}}>{li.ld?"Accom $"+fmt(li.ld.accom/12)+"/mth Food $"+fmt(li.ld.food/12)+"/mth":li.limitCycles?"One-off: "+li.limitCyclesNum+" "+cyc.singular+(parseInt(li.limitCyclesNum)>1?"s":"")+" only":li.rt==="half"?"50pct pre 50pct post-tax (s.60)":li.bt.ref}</td>
                    </tr>
                  ))}
                  <tr style={{borderTop:"2px solid #e2e8f0",fontWeight:600}}>
                    <td colSpan={2} style={{padding:"8px 6px"}}>Total</td>
                    <td style={{textAlign:"right",padding:"8px 6px"}}>${fmt(R.aDed/12)}</td>
                    <td colSpan={3}></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div style={{fontSize:11,color:"#94a3b8"}}>2025-26 ATO resident tax rates - FBTAA 1986 - ATO TR 2022/1 LAFHA - Remote area lists ATO 25 Sep 2018 - Not financial advice.</div>
          </>);
        })()}

        {tab==="quote"&&(
          <div style={{background:"#fff",border:"1.5px solid #e2e8f0",borderRadius:12,padding:"2rem",maxWidth:680,margin:"0 auto"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20,paddingBottom:16,borderBottom:"2px solid #e2e8f0"}}>
              <div><div style={{fontSize:20,fontWeight:700,color:"#1e293b"}}>Package Estimate</div><div style={{fontSize:12,color:"#64748b",marginTop:2}}>Salary Packaging Benefits Statement</div></div>
              <div style={{textAlign:"right"}}>
                <div style={{fontSize:22,fontWeight:900,color:"#1b4f8f",letterSpacing:1,fontFamily:"Arial Black, Arial, sans-serif"}}>POSITIVE</div>
                <div style={{fontSize:11,fontWeight:400,color:"#2a5c9a",letterSpacing:6,fontFamily:"Arial, sans-serif"}}>SALARY PACKAGING</div>
              </div>
            </div>
            <table style={{width:"100%",fontSize:12,marginBottom:16,borderCollapse:"collapse"}}>
              <tbody>
                {[["Employee",empName||"-","Date produced",new Date().toLocaleDateString("en-AU")],["Employer",empOrg||"-","Pay cycle",cyc.label],["Employer type",ETYPES.find(e=>e.id===empType).label,"Consultant",cName||"-"]].map((row,i)=>(
                  <tr key={i}><td style={{color:"#94a3b8",padding:"3px 0",width:"15%"}}>{row[0]}</td><td style={{color:"#1e293b",fontWeight:500,width:"35%"}}>{row[1]}</td><td style={{color:"#94a3b8",width:"15%"}}>{row[2]}</td><td style={{color:"#1e293b",fontWeight:500}}>{row[3]}</td></tr>
                ))}
              </tbody>
            </table>
            <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10,marginBottom:20}}>
              {[{label:"Annual tax saving",val:"$"+fmt(R.saving),hi:true},{label:"Saving per "+cyc.singular,val:"$"+fmt((R.newP.tNet-R.noP.net)*(12/cyc.periods)),hi:true},{label:"Net per "+cyc.singular+" (packaged)",val:"$"+fmt(R.newP.tNet*(12/cyc.periods)),hi:false},{label:"Net per "+cyc.singular+" (no packaging)",val:"$"+fmt(R.noP.net*(12/cyc.periods)),hi:false}].map(({label,val,hi})=>(
                <div key={label} style={{background:hi?"#f0fdf4":"#f8fafc",border:"1.5px solid "+(hi?gbor:"#e2e8f0"),borderRadius:10,padding:"10px 14px"}}>
                  <div style={{fontSize:11,color:hi?green:"#64748b",marginBottom:3,fontWeight:500}}>{label}</div>
                  <div style={{fontSize:18,fontWeight:700,color:hi?gdim:"#1e293b"}}>{val}</div>
                </div>
              ))}
            </div>
            <div style={{color:green,fontWeight:600,fontSize:13,borderBottom:"2px solid "+green,paddingBottom:4,marginBottom:10}}>Salary Packaged Benefit Items</div>
            {R.LI.filter(li=>!li.isFee).map((li,i)=>(
              <div key={i} style={{border:"1.5px solid #e2e8f0",borderRadius:10,overflow:"hidden",marginBottom:8}}>
                <div style={{background:navy,padding:"8px 14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <span style={{fontSize:12,fontWeight:600,color:"#fff"}}>{li.bt.label}</span>
                  <span style={{fontSize:12,color:green,fontWeight:600}}>Current</span>
                </div>
                <div style={{background:"#fff",padding:"10px 14px"}}>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,fontSize:12}}>
                    <div><div style={{color:"#94a3b8",marginBottom:2}}>Description</div><div style={{color:"#1e293b",fontWeight:500}}>{li.description||"-"}</div></div>
                    <div><div style={{color:"#94a3b8",marginBottom:2}}>Per {cyc.singular}</div><div style={{color:"#1e293b",fontWeight:500}}>${fmt(li.mon*(12/cyc.periods))}</div></div>
                    <div><div style={{color:"#94a3b8",marginBottom:2}}>Annual</div><div style={{color:"#1e293b",fontWeight:500}}>${fmt(li.ann)}</div></div>
                    {(li.accountName||li.bsb||li.accountNumber)&&<>
                      <div><div style={{color:"#94a3b8",marginBottom:2}}>Account name</div><div style={{color:"#1e293b"}}>{li.accountName||"-"}</div></div>
                      <div><div style={{color:"#94a3b8",marginBottom:2}}>BSB</div><div style={{color:"#1e293b"}}>{li.bsb||"-"}</div></div>
                      <div><div style={{color:"#94a3b8",marginBottom:2}}>Account number</div><div style={{color:"#1e293b"}}>{li.accountNumber||"-"}</div></div>
                    </>}
                  </div>
                </div>
              </div>
            ))}
            {R.LI.find(l=>l.isFee)&&(()=>{const fi=R.LI.find(l=>l.isFee);return(
              <div style={{border:"1.5px solid #e2e8f0",borderRadius:10,overflow:"hidden",marginBottom:16}}>
                <div style={{background:navy,padding:"8px 14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <span style={{fontSize:12,fontWeight:600,color:"#fff"}}>Packaging Administration Fee</span>
                  <span style={{fontSize:12,color:"#94a3b8"}}>Annual fee incl. GST</span>
                </div>
                <div style={{background:"#fff",padding:"10px 14px"}}>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,fontSize:12}}>
                    <div><div style={{color:"#94a3b8",marginBottom:2}}>Per {cyc.singular} (incl. GST)</div><div style={{color:"#1e293b",fontWeight:500}}>${fmt(fi.perCycleFeeIncGST)}</div></div>
                    <div><div style={{color:"#94a3b8",marginBottom:2}}>Annual (incl. GST)</div><div style={{color:"#1e293b",fontWeight:500}}>${fmt(fi.annualFeeIncGST)}</div></div>
                    <div><div style={{color:"#94a3b8",marginBottom:2}}>GST component</div><div style={{color:"#1e293b"}}>${fmt(fi.perCycleGST*cyc.periods)}/yr</div></div>
                  </div>
                </div>
              </div>
            );})()}
            <div style={{color:green,fontWeight:600,fontSize:13,borderBottom:"2px solid "+green,paddingBottom:4,marginBottom:10}}>{cyc.label} Modelled Benefits</div>
            <table style={{width:"100%",fontSize:12,marginBottom:20,borderCollapse:"collapse"}}>
              <thead><tr style={{borderBottom:"1px solid #e2e8f0"}}><th style={{textAlign:"left",padding:"4px 0",color:"#94a3b8",fontWeight:500}}></th><th style={{textAlign:"right",color:"#94a3b8",fontWeight:500}}>No packaging</th><th style={{textAlign:"right",color:"#94a3b8",fontWeight:500}}>Proposed</th></tr></thead>
              <tbody>
                {mkRows(R,cyc.periods,empType==="rebatable").map(([label,a,b,border,hi,bold],i)=>{
                  const isFeeRow=label==="Less packaging fee (pre-tax cost)";
                  return(
                    <tr key={i} style={{borderTop:border?"1px solid #e2e8f0":undefined}}>
                      <td style={{padding:"3px 0",color:bold?"#1e293b":"#64748b",fontWeight:bold?600:400}}>{label}</td>
                      <td style={{textAlign:"right",color:bold?"#1e293b":"#475569",fontWeight:bold?600:400}}>{a!=null&&Math.abs(a)>0?"$"+fmt(Math.abs(a)):"-"}</td>
                      <td style={{textAlign:"right",color:bold?gdim:isFeeRow?"#dc2626":"#475569",fontWeight:bold?700:400}}>
                        {b!=null&&Math.abs(b)>0?(isFeeRow?"($"+fmt(Math.abs(b))+")":"$"+fmt(Math.abs(b))):"-"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div style={{color:green,fontWeight:600,fontSize:13,borderBottom:"2px solid "+green,paddingBottom:4,marginBottom:16}}>Employee Authority to Proceed</div>
            <table style={{width:"100%",fontSize:12,marginBottom:20}}><tbody><tr>
              <td style={{paddingBottom:28,verticalAlign:"bottom"}}>Employee Name: <span style={{display:"inline-block",borderBottom:"1px solid #1e293b",width:140}}></span></td>
              <td style={{paddingBottom:28,verticalAlign:"bottom"}}>Signature: <span style={{display:"inline-block",borderBottom:"1px solid #1e293b",width:120}}></span></td>
              <td style={{paddingBottom:28,verticalAlign:"bottom"}}>Date: <span style={{display:"inline-block",borderBottom:"1px solid #1e293b",width:80}}></span></td>
            </tr></tbody></table>
            <p style={{fontSize:10,color:"#94a3b8",borderTop:"1px solid #e2e8f0",paddingTop:10}}>Based on 2025-26 ATO resident tax rates, FBTAA 1986 and ATO TR 2022/1. Medicare levy 2%. Not financial advice.</p>
            <div style={{marginTop:10,background:"rgba(234,179,8,.08)",border:"1px solid rgba(234,179,8,.4)",borderRadius:8,padding:"10px 14px",fontSize:11,color:"#78350f"}}>
              <b style={{display:"block",marginBottom:4}}>General Advice Warning</b>
              This document has been prepared by Positive Salary Packaging and contains general information only. Before acting on any information in this document, you should consider whether it is appropriate for your circumstances and seek independent financial, taxation and legal advice. Salary packaging outcomes will vary depending on individual circumstances including income, employer type, existing benefits and applicable legislation. Positive Salary Packaging is not a licensed financial adviser. Nothing in this document constitutes financial product advice as defined under the Corporations Act 2001 (Cth).
            </div>
            <div style={{marginTop:12,display:"flex",gap:8}}>
              <button onClick={()=>window.print()} style={{background:green,color:"#fff",border:"none",padding:"9px 22px",borderRadius:8,cursor:"pointer",fontWeight:600,fontSize:13}}>Print or Save PDF</button>
              <button onClick={()=>setTab("inputs")} style={{fontSize:13}}>Back to inputs</button>
            </div>
          </div>
        )}

        {tab==="docs"&&(()=>{
          const benefitSubst=R.LI.filter(l=>!l.isFee).map(li=>SUBST[li.bt.id]).filter(Boolean);
          const uniqueSubst=[...new Map(benefitSubst.map(s=>[s.label,s])).values()];
          return(<>
            <div style={{background:gbg,border:"1px solid "+gbor,borderRadius:12,padding:"1rem 1.25rem",marginBottom:16,display:"flex",alignItems:"flex-start",gap:12}}>
              <span style={{fontSize:20}}>📋</span>
              <div>
                <div style={{fontSize:14,fontWeight:600,color:gdim,marginBottom:3}}>Substantiation checklist for {empName||"employee"}</div>
                <div style={{fontSize:12,color:"#475569"}}>The following documents are required to establish and maintain this salary packaging arrangement. All documents must be provided before packaging commences and updated when circumstances change. Retain copies for a minimum of 5 years.</div>
              </div>
            </div>
            <div style={CARD}>
              <h3 style={{margin:"0 0 1rem",fontSize:15,fontWeight:600,color:"#1e293b"}}>Required for all participants</h3>
              {UDOCS.map((sec,si)=>(
                <div key={si} style={{marginBottom:16}}>
                  <div style={{fontSize:13,fontWeight:600,color:"#475569",marginBottom:8,display:"flex",alignItems:"center",gap:8}}>
                    <span style={{width:22,height:22,borderRadius:"50%",background:navy,color:"#fff",display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,flexShrink:0}}>{si+1}</span>
                    {sec.label}
                  </div>
                  {sec.items.map((doc,di)=>(
                    <div key={di} style={{display:"flex",alignItems:"flex-start",gap:10,padding:"8px 12px",background:"#f8fafc",borderRadius:8,marginBottom:6,border:"1px solid #e2e8f0"}}>
                      <span style={{width:18,height:18,borderRadius:4,border:"1.5px solid #cbd5e1",flexShrink:0,marginTop:1,display:"inline-block"}}></span>
                      <span style={{fontSize:13,color:"#1e293b"}}>{doc}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            {uniqueSubst.length>0?(
              <div style={CARD}>
                <h3 style={{margin:"0 0 1rem",fontSize:15,fontWeight:600,color:"#1e293b"}}>Benefit-specific documentation</h3>
                <div style={{fontSize:12,color:"#64748b",marginBottom:16}}>The following documents are required for each specific benefit being packaged.</div>
                {uniqueSubst.map((s,si)=>(
                  <div key={si} style={{marginBottom:16,border:"1.5px solid #e2e8f0",borderRadius:10,overflow:"hidden"}}>
                    <div style={{background:navy,padding:"10px 16px",display:"flex",alignItems:"center",gap:10}}>
                      <span style={{width:8,height:8,borderRadius:"50%",background:green,display:"inline-block",flexShrink:0}}></span>
                      <span style={{fontSize:13,fontWeight:600,color:"#fff"}}>{s.label}</span>
                    </div>
                    <div style={{padding:"10px 16px",background:"#fff"}}>
                      {s.docs.map((doc,di)=>(
                        <div key={di} style={{display:"flex",alignItems:"flex-start",gap:10,padding:"7px 0",borderBottom:di<s.docs.length-1?"1px solid #f1f5f9":"none"}}>
                          <span style={{width:18,height:18,borderRadius:4,border:"1.5px solid #cbd5e1",flexShrink:0,marginTop:1,display:"inline-block"}}></span>
                          <span style={{fontSize:13,color:"#1e293b"}}>{doc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ):(
              <div style={{...CARD,textAlign:"center",color:"#94a3b8",fontSize:13,padding:"2rem"}}>
                No benefit items added yet. Go to the Inputs tab to add packaged benefits and their documentation requirements will appear here.
              </div>
            )}
            <div style={{display:"flex",justifyContent:"flex-end",gap:8,marginTop:8}}>
              <button onClick={()=>window.print()} style={{background:green,color:"#fff",border:"none",padding:"9px 22px",borderRadius:8,cursor:"pointer",fontWeight:600,fontSize:13}}>Print checklist</button>
            </div>
            <div style={{fontSize:11,color:"#94a3b8",marginTop:12}}>This checklist is based on ATO substantiation requirements under FBTAA 1986 and ITAA 1997. Requirements may vary. Retain all original documents. This is a guide only and does not constitute legal or taxation advice.</div>
          </>);
        })()}

      </div>
    </div>
  );
}
