
var _fs = require('fs'),
    _path = require('path'),
    _glob = require('glob'),
    _minimatch = require('minimatch'),
    _wrench = require('wrench'),
    _showdown = require('github-flavored-markdown');


exports.run = function(opts){

    var encoding = opts.encoding || 'utf-8',
        include = _path.join(opts.input, opts.include),
        exclude = _path.join(opts.input, opts.exclude),
        header = opts.header? _fs.readFileSync(opts.header) : '',
        footer = opts.footer? _fs.readFileSync(opts.footer) : '',
        rPathReplace = (opts.input === '.')? /^(.+)/ : new RegExp('^'+ opts.input +'(.+)');

    _glob(include, null, function(er, files){

        files
            .filter(function(filePath){
                return ! _minimatch(filePath, exclude);
            })
            .forEach(function(filePath){
                var distPath = filePath.replace(rPathReplace, function(str, p1){
                        return _path.join(opts.output, p1).replace(/\.[^\.]+$/, '.html');
                    }),
                    distFolder = _path.dirname(distPath);

                if (distFolder) {
                    _wrench.mkdirSyncRecursive(distFolder);
                }

                _fs.writeFileSync(distPath, header + toMdown(filePath, encoding) + footer, encoding);
            });

    });

};

function toMdown(filePath, encoding){
    var content = _fs.readFileSync(filePath, encoding);
    content = normalizeLineBreaks(content, '\n');
    content = convertCodeBlocks(content);
    return _showdown.parse(content);
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
