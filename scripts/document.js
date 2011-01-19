var db=null;
var doc=null;
var editor=null;

function gotDoc(doc, data)
{
  log('got doc');
  log(data);

  var value=JSON.stringify(data);

  if(jsonlint.parse(value))
  {
    value=JSON.parse(value);
  }
  else
  {
    log('Invalid json: '+value);
  }

  $('#doc').val(JSON.stringify(value, null, '  '));

  fullDoc=data;

//  renderEditor();

  editor=new CodeMirror.fromTextArea('doc', {
    parserfile: ['tokenizejavascript.js', 'parsejavascript.js'],
    path: 'http://beta.freefalldb.com/lib/codemirror/',
    stylesheet: 'http://beta.freefalldb.com/styles/codemirror/jscolors.css'
  });
}

function saveDoc()
{
  log('saving parsed doc')
  editor.save();
  var value=$('#doc').val();
//  var value=null;
//  $('#doc').each(function() {
//		value=this.bespin.editor.value;
//	});
  log(value);

  if(jsonlint.parse(value))
  {
    value=JSON.parse(value);
    doc.save(value);
    $('#doc').val(JSON.stringify(value, null, '  '));
  }
  else
  {
    log('Invalid json: '+value);
  }
}

function initBespin()
{
  log("initBespin");
  doc.setDocCallback(gotDoc);
  doc.get();
}

function initDocument()
{
  log('initDocument: '+dbid+' '+docid);
  $("#tabs").tabs();

  db=freefall.Database('http://freefall.blanu.net/', dbid);
  doc=db.get(docid);

  $('#saveDoc').click(saveDoc);

  doc.setDocCallback(gotDoc);
  doc.get();

//  $('input[name="type"]').change(changeType);
}

$(document).ready(initDocument);
