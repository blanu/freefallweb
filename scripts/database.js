var db=freefall.Database('', dbid);

function gotDocs(docs)
{
  log('got docs');
  log(docs);
  $('#docs').empty();
  if(docs!=null)
  {
    for(var x=0; x<docs.length; x++)
    {
      $('#docs').append('<li><a class="doclink" href="/dashboard/'+dbid+'/'+docs[x]+'">'+docs[x]+'</a><button docid="'+docs[x]+'" class="deleteButton">Delete</button></li>');
    }
  }
}

function deleteDoc()
{
  var docid=$(this).attr('docid');
  var doc=db.get(docid);
  doc.delete();
}

function addDbDialog()
{
  $("#addDbDialog").dialog({
    buttons: {
      "Add": function() {
        var dbname=$("#addDbNameField").val();
        log('addDoc call: '+dbname);
        log(db);
        log(db.addDoc);
        db.addDoc(dbname);
        $(this).dialog("close");
      },
      "Cancel": function() {
        $(this).dialog("close");
      }
    }
  });

  return false;
}

function initDatabase()
{
  log('listening '+dbid);
  Web2Peer.listen(dbid, gotDocs);

  $("#addDbButton").click(addDbDialog);
  $("#deleteButton").click(deleteDoc);

  db.setDocsCallback(gotDocs);
  db.getDocs();
}

$(document).ready(initDatabase);
