
var _fs = require('fs'),
    _path = require('path'),
    _minimatch = require('minimatch'),
    _wrench = require('wrench'),
    _showdown = require('github-flavored-markdown');


var DEFAULT_ENCODING = 'utf-8';


exports.batchProcess = function(opts){

    opts.encoding = opts.encoding || DEFAULT_ENCODING;


    var files = opts.input;
    if (opts.exclude) {
        files = filterFiles(files, opts.exclude);
    }

    files.forEach(function(filePath){
        var content = exports.toHTML(_fs.readFileSync(filePath, opts.encoding), opts);
        if (opts.output) {
            outputToFile(filePath, content, opts);
        } else {
            console.log(content);
        }
    });
};


function filterFiles(files, exclude) {
    var excludes = exclude.split(',');
    return files.filter(function(filePath){
        return ! excludes.some(function(glob){
            return _minimatch(filePath, glob);
        });
    });
}


function outputToFile(filePath, content, opts){
  var inputDir = _path.dirname(filePath),
        rPathReplace = new RegExp('^'+ inputDir +'(.+)'),
        distPath = filePath.replace(rPathReplace, function(str, p1){
            return _path.join(opts.output, p1).replace(/\.[^\.]+$/, '.html');
        }),
        distFolder = _path.dirname(distPath);

    if (distFolder) {
        _wrench.mkdirSyncRecursive(distFolder);
    }

    _fs.writeFileSync(distPath, content, opts.encoding);
}


exports.toHTML = function(content, opts){
    var header, footer;

    if (opts) {
        header = opts.header? _fs.readFileSync(opts.header, opts.encoding) : '';
        footer = opts.footer? _fs.readFileSync(opts.footer, opts.encoding) : '';
    }

    content = normalizeLineBreaks(content);
    content = convertCodeBlocks(content);
    return concat([header,  _showdown.parse(content), footer]);
};

function concat(arr){
    return arr.filter(function(val){
        return !!val;
    }).join('\n');
}


//borrowed from amd-utils (http://millermedeiros.github.com/amd-utils)
//author: Miller Medeiros
function normalizeLineBreaks(str, lineEnd) {
    lineEnd = lineEnd || '\n';
    return str
            .replace(/\r\n/g, lineEnd) // DOS
            .replace(/\r/g, lineEnd) // Mac
            .replace(/\n/g, lineEnd); // Unix
}

// showdown have issues with the gh-style code blocks
var _rCodeBlocks = /^```\s*(\w+)\s*$([\s\S]*?)^```$/gm;

function convertCodeBlocks(mdown){
    return mdown.replace(_rCodeBlocks, '<pre><code>$2</code></pre>');
}
