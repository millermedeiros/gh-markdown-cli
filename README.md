# Github Flavored Markdown Node.js CLI

Batch convert Markdown files into HTML.



## Installation

Install [node.js](http://nodejs.org/) 0.6.0+ and run:

```sh
sudo npm install gh-markdown-cli -g
```

This will create an alis to the executable on your `/usr/local/bin` folder,
if you install it without the `-g` flag you won't be able use it as global
command-line utility.



## Usage example

```sh
mdown --input src --output doc
```

This will convert any `.md` files it can find inside the `--input` directory
and it's child folders and output them into the `--output` folder.

If you want to convert only files inside the directory itself but ignore child
folders change the `--include` glob to `"*.md"`:

```sh
mdown -i src -o doc --include "*.md"
```

And if you want to use a different extension than `".md"` update the
`--include` glob to match it:

```sh
mdown -o doc --include "**/*.mdown"
```

You can specify HTML files to be used as header and footer of all the pages:

```sh
mdown -o dist --header "assets/header.html" --footer "assets/footer.html"
```

And if you want to convert just a single file change the `--include` glob to
match just a single file:

```sh
mdown -o . --include foo.md
```

The only required option is the `-o,--output`, just to avoid mistakes, set
it to `.` if you want to use the current folder as the base folder for the
output.

For a list of all available options run:

```sh
mdown -h
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
