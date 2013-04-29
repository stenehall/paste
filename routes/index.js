var fs = require('fs')
  , util = require('util')
  , crypto = require('crypto')
  , shortid = require('shortid')
  , modes = ["apl", "asterisk", "clike", "clojure", "coffeescript", "commonlisp", "css", "d", "diff", "ecl", "erlang", "gas", "gfm", "go", "groovy", "haskell", "haxe", "h tmlembedded", "htmlmixed", "http", "javascript", "jinja2", "less", "livescript", "lua", "markdown", "mirc", "ntriples", "ocaml", "pascal", "perl", "php", "pig", "properties", "python", "q", "r", "rpm", "rst", "ruby", "rust", "sass", "scheme", "shell", "sieve", "smalltalk", "smarty", "sparql", "sql", "stex", "tcl", "tiddlywiki", "tiki", "tur tle", "vb", "vbscript", "velocity", "verilog", "xml", "xquery", "yaml", "z80"];

exports.index = function(req, res){
  var paste = {hash: null, revision: null, content: []};
  res.render('index', {
    paste: paste,
    modes: modes
  });
}

exports.post = function(req, res){

  var hash = req.body.hash || shortid.generate();
  var revision = req.body.revision || 0;
  var paste = {hash: hash, revisions: revision, mode: '', content: []}

  var fileName = 'storage/'+hash;
  var exists = fs.existsSync(fileName);

  if (exists) // We have an existing paste, lets use it.
  {
    var data = fs.readFileSync(fileName);
    paste = JSON.parse(data.toString());
  }

  paste.mode = req.body.mode || paste.mode

  paste.content.push(req.body.paste);
  paste.revisions++;

  fs.writeFile(fileName, JSON.stringify(paste), function (err) {

    if (err) throw err;

    var url = '/'+hash+'/'+paste.revisions+'.html';
    console.log(url);
    res.redirect(url);
  });
};

exports.get = function(req, res){

  var fileName = 'storage/'+req.params.hash;
  var format = req.params.format || 'html'

  fs.exists(fileName, function (exists) {
    if (exists)
    {
      fs.readFile(fileName, function (err, data) {

        if (err) throw err;

        var paste = JSON.parse(data.toString());
        paste.currentRevision = --req.params.revision || paste.content.length - 1;

        if (format == 'raw')
        {
          res.set('Content-Type', 'text/plain');
          res.send(paste.content[paste.currentRevision]);
        }
        else if (format == 'json')
        {
          res.json({ paste:  paste});
        }
        else
        {
          res.render('index', {
            paste: paste,
            modes: modes
          });
        }
      });
    }
    else
    {
      res.redirect('/');
    }
  });
};