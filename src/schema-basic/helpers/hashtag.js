// hasgtag.js:

/* Extract hashtags text from string as an array */
export default async function getHashTags(inputText) {
    var regex = /(?:^|\s)(?:#)([a-zA-Z\d]+)/gm;
    var matches = [];
    var match;
    while ((match = regex.exec(inputText))) {
        matches.push(match[1]);
    }
    return matches;
}