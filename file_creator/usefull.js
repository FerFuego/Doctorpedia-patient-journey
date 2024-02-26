//Usefull Functions

const capitalize = (text) => {
    let words = text.split(' ');
    let capitalieWords = [];
    words.forEach(word => {
        capitalieWords.push(word.charAt(0).toUpperCase() + word.slice(1));
    });
    return capitalieWords.join(' ');
}

const replacerSmall = (text, find, replace) => {
    //Only for one line strings (all find characters)
    return text.split(find).join(replace);
}

const replacerBig = (text, find, replace) => {
    //Multiple lines strings  
    try {
        const replacer = new RegExp(find, 'g');
        return text.replace(replacer, replace);
    } catch {}
}

const randHex = () => {
    const len = 8;
    let maxlen = 8,
        min = Math.pow(16, Math.min(len, maxlen) - 1)
    max = Math.pow(16, Math.min(len, maxlen)) - 1,
        n = Math.floor(Math.random() * (max - min + 1)) + min,
        r = n.toString(16);
    while (r.length < len) {
        r = r + randHex(len - maxlen);
    }
    return r;
};

const requireAcf = (acfPath) => { // force require
    try {
        return require(acfPath);
    } catch (e) {
        return false;
    }
}

module.exports = {
    capitalize,
    replacerSmall,
    replacerBig,
    randHex,
    requireAcf
}