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
//  log('new Document '+db.dbid+' '+did);
  this.db=db;
  this.docid=did;
  this.fullDoc=null;
  this.update=db.update;

  this.docCallback=null;

  doc=this;

  this.internalDocCallback=function(data) {
//		log('doc changed '+doc.docid);
//		log(data);
		if(doc.docCallback)
		{
			doc.docCallback(doc, data);
		}
  }

  if(this.update)
  {
    Web2Peer.listen(this.db.dbid+'-'+this.docid, this.internalDocCallback);
  }

  this.setDocCallback=function(f)
  {
    this.docCallback=f;
  }

  this.get=function()
  {
//    log('get doc');
    var url=this.base+'/db/'+this.db.dbid+'/'+this.docid;
    ajax('GET', url, null, this.internalDocCallback);
  }

  this.setName=function(name)
  {
		this.docid=name;
	}

  this.save=function(doc)
  {
//		log('saving...');
//    log(doc);

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

  this.delete=function()
  {
		log('deleting...');

    var url=this.base+"/db/"+this.db.dbid+'/'+this.docid+'/delete';
    ajax('POST', url, null, null);
  }

  return this;
}

freefall.View=function(db, vid, key)
{
  this.db=db;
  this.viewid=vid;
  this.key=JSON.stringify(key);
  this.update=db.update;

  this.viewCallback=null;

  view=this;

  this.internalDocCallback=function(data) {
		if(view.viewCallback)
		{
			view.viewCallback(view, data);
		}
  }

  if(this.update)
  {
    Web2Peer.listen(this.db.dbid+'-'+this.viewid, this.internalDocCallback);
  }

  this.setViewCallback=function(f)
  {
    this.viewCallback=f;
  }

  this.get=function()
  {
    var url=this.base+'/db/'+this.db.dbid+'/views/'+this.viewid;
    if(this.key!=null)
    {
      url=url+'?key='+this.key;
    }
    ajax('GET', url, null, this.internalDocCallback);
  }

  this.setName=function(name)
  {
		this.viewid=name;
	}

  return this;
}

freefall.Database=function(base, id, update)
{
//  log('new Database '+base+' '+id);
  self=this;

  this.base=base;
  this.dbid=id;
  this.update=update;
  if(this.update==null)
  {
    this.update=false;
  }
  this.sessionid=null;

  this.docsCallback=null;

  this.setDocsCallback=function(f)
  {
    this.docsCallback=f;
  }

  this.authSuccessCallback=null;
  this.authFailureUrl=null;

  this.setAuthenticateCallbacks=function(scb, furl)
  {
    log('setAuthenticateCallbacks');
    log(scb);
    log(furl);

    this.authSuccessCallback=scb;
    this.authFailureUrl=furl;
  }

  this.internalAuthCallback=function(e)
  {
    log('internalAuthCallback');
    log(e);
    log(self.authSuccessCallback);
    log(self.authFailureCallback);

    var data=e.data;
    var success=data['success']

    if(success)
    {
      if(self.authSuccessCallback)
      {
        self.sessionid=data['sessionid'];
        self.authSuccessCallback();
      }
    }
    else
    {
      if(self.authFailureUrl)
      {
        log('failure');
        log(data['url']);
//        window.location=data['url'];
      }
    }

    $('#freefall-authcheck').remove();
  }

  this.authenticate=function()
  {
    log('authenticate:');
    log(this.internalAuthCallback);
    window.addEventListener('message', this.internalAuthCallback);
    $('body').append('<iframe id="freefall-authcheck" style="display: none" src="'+this.base+'/session/check"/>');
  }

  this.getDocs=function()
  {
//    log('get docs');
    var url=this.base+'/db/'+this.dbid;
    ajax('GET', url, null, this.docsCallback);
  }

  this.addDoc=function(docname, contents)
  {
//    log('dbname: '+docname);

    if(contents===undefined)
    {
      contents=null;
    }

    var url=this.base+"/db/"+this.dbid+'/'+docname;
    ajax('POST', url, JSON.stringify(contents), null);
  }

  this.get=function(docname)
  {
    return freefall.Document(this, docname);
  }

  this.getAll=function(allCallback)
  {
    var url=this.base+'/db/'+this.dbid+'/all';
    ajax('GET', url, null, allCallback);
  }

  this.getView=function(viewname, key)
  {
    return freefall.View(this, viewname, key);
  }

  return this;
}
