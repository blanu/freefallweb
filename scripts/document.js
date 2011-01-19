var db=null;
var doc=null;
var editor=null;

function gotDoc(doc, data)
{
  log('got doc');
  log(data);

  $('#doc').val(JSON.stringify(data));
//  $('#doc').each(function() {
//		this.bespin.editor.value=JSON.stringify(data);
//	});

  fullDoc=data;

//  renderEditor();

  editor=new CodeMirror.fromTextArea('doc', {
    parserfile: ['tokenizejavascript.js', 'parsejavascript.js'],
    path: 'lib/codemirror',
    stylesheet: 'styles/codemirror/jscolors.css'
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
