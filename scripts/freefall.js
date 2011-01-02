ajax=function(method, url, data, callback)
{
  var req=new XMLHttpRequest();
  req.open(method, url, true);

  if(callback!=null)
  {
    req.onreadystatechange=function() {
      if(req.readyState==4)
      {
        var data=JSON.parse(req.responseText);
        callback(data);
      }
    };
  }

  req.send(data);
}

freefall={};

freefall.Document=function(db, did)
{
  log('new Document '+db.dbid+' '+did);
  this.db=db;
  this.docid=did;
  this.fullDoc=null;

  this.docCallback=null;

  doc=this;

  this.internalDocCallback=function(data) {
		log('doc changed '+doc.docid);
		log(data);
		if(doc.docCallback)
		{
			doc.docCallback(doc, data);
		}
  }

  Web2Peer.listen(this.db.dbid+'-'+this.docid, this.internalDocCallback);

  this.setDocCallback=function(f)
  {
    this.docCallback=f;
  }

  this.get=function()
  {
    log('get doc');
    var url=this.base+'/db/'+this.db.dbid+'/'+this.docid;
    ajax('GET', url, null, this.internalDocCallback);
  }

  this.setName=function(name)
  {
		this.docid=name;
	}

  this.save=function(doc)
  {
		log('saving...');
    log(doc);

    this.fullDoc=doc;

    if(this.docid===null || this.docid===undefined)
    {
      var url=this.base+"/db/"+this.db.dbid;
      ajax('POST', url, JSON.stringify(doc), this.setName);
		}
		else
		{
      var url=this.base+"/db/"+this.db.dbid+'/'+this.docid;
      ajax('POST', url, JSON.stringify(doc), null);
		}
  }

  return this;
}

freefall.Database=function(base, id)
{
  log('new Database '+base+' '+id);
  this.base=base;
  this.dbid=id;

  this.docsCallback=null;

  this.setDocsCallback=function(f)
  {
    this.docsCallback=f;
  }

  this.getDocs=function()
  {
    log('get docs');
    var url=this.base+'/db/'+this.dbid;
    ajax('GET', url, null, this.docsCallback);
  }

  this.addDoc=function(docname)
  {
    log('dbname: '+docname);
    var url=this.base+"/db/"+this.dbid+'/'+docname;
    ajax('POST', url, JSON.stringify(null), null);
  }

  this.get=function(docname)
  {
    return freefall.Document(this, docname);
  }

  return this;
}
