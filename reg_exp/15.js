

var addresses = require('./addresses'),
    result = [];
    regStart = /[^A-Za-z,]{3,},/i,
    regComa = /,/i,
    regStreetIfError2 = /[^A-Za-z,]{3,}/i,
    regSlashNumber = /\d+[/]\d+/i,
        reg = /(ул|пер|пл|пр-т)/i,
    arrStreet = [];

//вибірка назв вулиць
function streetMatch(str){
    if (reg.test(str)) {
        streetName = str.replace(reg, "");
        str = str.replace(reg, "");
        if(regStart.test(str)){
            streetName = regStart.exec(str)[0];
        } else {
            streetName = str;
        }

    }else if (regStart.test(str)){
        streetName = regStart.exec(str)[0];
    }
    else streetName = str;
    if (regComa.test(streetName)){
        streetName = streetName.replace(regComa, "");
    }
    if (regSlashNumber.test(streetName)){
        streetName = streetName.replace(regSlashNumber, "");
    }
    if(/[.]\s/.test(streetName)) {
        streetName = streetName.replace(/[.]\s/,"");
    }

   return streetName;
}


//добавимо імена вулиць в таргет-масив
arrStreet = addresses.map(function (item) {
  return streetMatch(item);
});


//вибірка номеру будинку

function houseNumber (str) {
    var reg1 = /[^A-Za-z,]+(,|\s)/i,
        reg2 = /дом/i,
        funcNum = str;
    if(reg1.test(str)){
      funcNum = str.replace(reg1, "");
      if (reg2.test(funcNum)){
          funcNum = funcNum.replace(reg2, "");
      } if(funcNum.indexOf(",")!== -1){
          funcNum = funcNum.substr(0,funcNum.indexOf(","));
          return funcNum;
      }else if(funcNum.indexOf("-") == -1){
          funcNum = parseInt(funcNum);
      } else if (reg2.test(funcNum)){
          funcNum = funcNum.replace(reg2, "");}
    return funcNum;
}}

//добавимо номера будинків в масив
var arrHouse = addresses.map(function (item) {
    return houseNumber(item);
})

//вибірка номерів квартир
var arrCut = [];
for( var i = 0; i<addresses.length; i++){
    var start = addresses[i].lastIndexOf(arrStreet[i]);
    var add = arrStreet[i].length;
    var startCut = start + add;
    var strToArr = addresses[i].substr(startCut);
    arrCut.push(strToArr);
}


function flatNumber(str){
    var flat2 = /[^A-Za-z]{1,2}[.]\s[0-9]+/,
        flatSlash = /[\/][0-9]+/;
    if(flatSlash.test(str)){
        flat = flatSlash.exec(str)[0];
        flat = flat.substr(1);
    } else if (flat2.test(str)) {
        flat = flat2.exec(str)[0];
        flat = flat.substr(4);
    }else flat = undefined;
    return flat;
}

var arrFlat = arrCut.map(function (item) {
    return flatNumber(item);
})

//напевно доцільно буде відформатувати масиви


function format(arr){
    for (var i = 0; i < arr.length; i++){
        if(typeof(arr[i])=="string"){
        if(/[\S\w]+(\s)*[\S\w]+/i.test(arr[i])){
            temp = /[\S\w]+(\s)*[\S\w]+/i.exec(arr[i]);
            arr[i] = temp[0];
        }
    }
}}

format(arrStreet);
format(arrHouse);

// create array for export
for(var k = 0; k < arrStreet.length; k++){
    result[k]={
        street: arrStreet[k],
        house: arrHouse[k],
        flat: arrFlat[k]
    }
}

module.exports = result;