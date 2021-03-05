var level1 = "asdfjkl;";
var level2 = "asdfrewq";
var level3 = "jkl;uiop";
var level4 = "qwerzxcv";
var level5 = "uiopnm,."
var level6 = "asdfuioopqwertzxcvnm,.";
var level7 = "ASFyuoer:><,IOHKf56";
var level8 = "ghtybvnqpz.[]vx12093874";

var arraysize = 50;

const exercises = {
    "1" : generateRamdonString(arraysize, level1),
    "2" : generateRamdonString(arraysize, level2),
    "3" : generateRamdonString(arraysize, level3),
    "4" : generateRamdonString(arraysize, level4),
    "5" : generateRamdonString(arraysize, level5),
    "6" : generateRamdonString(arraysize, level6),
    "7" : generateRamdonString(arraysize, level7),
    "8" : generateRamdonString(arraysize, level8),
};

function generateRamdonString(size, chars) {
    var result = [];

    while(size--) result.push(chars[Math.random() * chars.length | 0]);
    return result;
}
export default exercises;
