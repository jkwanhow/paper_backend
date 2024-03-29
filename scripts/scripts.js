
const pre_parse = function(s){
    // Preserve newlines, etc. - use valid JSON
    s = s.replace(/\\n/g, "\\n")
                .replace(/\\'/g, "\\'")
                .replace(/\\"/g, '\\"')
                .replace(/\\&/g, "\\&")
                .replace(/\\r/g, "\\r")
                .replace(/\\t/g, "\\t")
                .replace(/\\b/g, "\\b")
                .replace(/\\f/g, "\\f");
    // Remove non-printable and other non-valid JSON characters
    s = s.replace(/[\u0000-\u0019]+/g,"");
    return s;
}

module.exports = {
    pre_parse,
}