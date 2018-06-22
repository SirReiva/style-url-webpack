/**
 * Convert object { styleUrl: ''} to { styleUrl: require(path)}
 * @param {*} source 
 */
module.exports = function (source) {


    // template pattern
    const pattern = new RegExp(/\w+:(|[\s]+?)("|')?([\w+-?[\w\s+.\\*]+.(scss|sass|css))("|')/);
    const groups = source.match(pattern);

    if (groups !== null) {
        // relative path declared in js file
        const pathModule = groups[3]
        const newSource = source.replace(pattern, `styleUrl: require('${pathModule}')`);
        return newSource;
    }

    return source;
}