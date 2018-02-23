// taking input from Indicators.csv and generating part21.json
// read and write using stream
const fs = require('fs');
const readline = require('readline');
const stream = require('stream');

const instream = fs.createReadStream('./Indicators.csv');
const ostream1 = fs.createWriteStream('partone.json');
const ostream2 = fs.createWriteStream('parttwo.json');
const outstream = new stream();
const rl = readline.createInterface(instream, outstream);
let flag = 0;
let head;

// FILTER FOR ASIAN COUNTRIES
const list = ['Afghanistan', 'Armenia', 'Azerbaijan', 'Bahrain', 'Bangladesh', 'Bhutan', 'Brunei Darussalam', 'Cambodia', 'China', 'Cyprus',
  'Georgia', 'India', 'Indonesia', 'Iraq', 'Israel', 'Japan', 'Jordan', 'Kazakhstan', 'Kuwait', 'Lebanon',
  'Malaysia', 'Maldives', 'Mongolia', 'Myanmar', 'Nepal', 'Oman', 'Pakistan', 'Philippines', 'Qatar',
  'Saudi Arabia', 'Singapore', 'Sri Lanka', 'Syrian Arab Republic', 'Tajikistan', 'Thailand',
  'Timor-Leste', 'Turkey', 'Turkmenistan', 'United Arab Emirates', 'Uzbekistan', 'Vietnam',
];

// MAP 1 FOR MALE VALUES
// MAP 2 FOR FEMALE VALUES
// which will contain final data with countryname, MValue and FValue

const mp1 = {};
const mp2 = {};
const mp3 = {};

let i;
// LOOP FOR MAP ZERO WITH ASIAN COUNTRIES
for (i = 0; i < list.length; i += 1) {
  mp1[list[i]] = 0;
  mp2[list[i]] = 0;
  mp3[list[i]] = 0;
}

let Cname;
let Iname;
let Value;
// reading the file line by line
rl.on('line', (line) => {
  // converting line into string
  if (flag === 0) {
    head = line.split(/,(?=(?:[^"]*"[^"]*")*(?![^"]*"))/);
    for (i = 0; i < head.length; i += 1) {
      if (head[i] === 'CountryName') { Cname = i; }
      // if (head[i] === 'Year') { year = i; }
      if (head[i] === 'Value') { Value = i; }
      if (head[i] === 'IndicatorName') { Iname = i; }
    }
  } else {
    let flag1 = 0;
    const spl = line.split(/,(?=(?:[^"]*"[^"]*")*(?![^"]*"))/);
    for (i = 0; i < list.length; i += 1) {
      if (spl[Cname] === list[i]) {
        flag1 = 1;
        break;
      }
    }
    const pos = spl[Iname].search('Life expectancy at birth');
    if (pos !== -1 && flag1 === 1) {
      // checking if the 4th value which was made using "," (comma) seprating to be male or female
      if (spl[Iname].includes('female')) {
        mp2[spl[Cname]] += parseFloat(spl[Value]);
      } else if (spl[Iname].includes('male')) {
        mp1[spl[Cname]] += parseFloat(spl[Value]);
      } else if (spl[Iname].includes('total')) {
        mp3[spl[Cname]] += parseFloat(spl[Value]);
      }
    }
  }
  flag += 1;
});
// writing the files
rl.on('close', () => {
  const bar = [];
  const bar1 = [];


  for (i = 0; i < 5; i += 1) {
    const dic = {};
    let max = 0;
    let k = 0;
    let j;
    for (j = 0; j < list.length; j += 1) {
      if (mp3[list[j]] > max) {
        max = mp1[list[j]];
        k = j;
      }
    }
    dic.Country = list[k];
    mp3[list[k]] /= (2015 - 1960);
    dic.LEAB_TValue = mp3[list[k]];

    bar1.push(dic);
    mp3[list[k]] = 0;
  }


  for (i = 0; i < list.length; i += 1) {
    const dict = {};
    mp1[list[i]] /= (2015 - 1960);
    mp2[list[i]] /= (2015 - 1960);
    dict.Country = list[i];
    dict.LEAB_MValue = mp1[list[i]];
    dict.LEAB_FValue = mp2[list[i]];
    bar.push(dict);
  }


  const barjson1 = JSON.stringify(bar1);
  const barjson = JSON.stringify(bar);
  ostream1.write(barjson);
  ostream2.write(barjson1);
});
