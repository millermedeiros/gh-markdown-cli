# Github Flavored Markdown Node.js CLI

Batch convert Markdown files into HTML.



## Installation

Install [node.js](http://nodejs.org/) 0.6.0+ and run:

```sh
sudo npm install gh-markdown-cli -g
```

This will create an alias to the executable on your `/usr/local/bin` folder,
if you install it without the `-g` flag you won't be able use it as global
command-line utility.



## Usage example


### Basic

```sh
find . -name '*.md' -exec mdown --output doc {} \;
```

This will convert any `.md` files it can find underneath the current directory
and it's child folders and output them into the `--output` folder.

If you want to convert only files inside the directory itself but ignore child
folders change shell glob to `"*.md"`:

```sh
mdown -o doc src/*.md
```

And to convert just a single file and output it into the current folder:

```sh
mdown -o . foo.md
```


### Header / Footer


You can specify HTML files to be used as header and footer of all the pages:

```sh
mdown -o dist --header "assets/header.html" --footer "assets/header.html" *.md
```


### stdin / stdout

It also works with `stdin` and `stdout`, so you can pipe other command-line
tools like `echo`, `cat`, `curl`, etc...

```sh
cat foo.md | mdown > foo.html
echo "# foo" | mdown
curl https://raw.github.com/millermedeiros/gh-markdown-cli/master/README.md | mdown
```

If you don't specify the `--output` it will echo the result to `stdout` by default.

### More

For a list of all available options run `mdown -h`:

```
$ mdown -h

  Usage: mdown [options] file ...

  Options:

    -h, --help             output usage information
    -V, --version          output the version number
    -o, --output <name>    Output directory or output file name if using stdin for input.
    --exclude <globs>      Comma separated list of globs used for exclusion. Defaults to "node_modules/**"
    --header <path>        Path to HTML file used as header on all documents.
    --footer <path>        Path to HTML file used as footer on all documents.
    --encoding <encoding>  File encoding. Defaults to "utf-8".
```


## Important

The real work was done by the creators of the open source libraries used by
this project ([node-glob](https://github.com/isaacs/node-glob),
[minimatch](https://github.com/isaacs/minimatch),
[wrench-js](https://github.com/ryanmcgrath/wrench-js),
[github-flavored-markdown](https://github.com/isaacs/github-flavored-markdown),
[commander.js](https://github.com/visionmedia/commander.js/)), I only assembled
things together to make it easier to use, the credit should go to them.



## License

WTFPL
