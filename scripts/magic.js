freefall.submitForm=function()
{
	log('submitForm');
	log(this);

  var host=$(this).attr('host');
  var base='http://'+host;
	var dbname=$(this).attr('db');
	var db=freefall.Database(base, dbname);
	var docname=$(this).attr('doc');
	var doc=db.get(docname);

	var data={};
	$(this).find("input").each(function(index) {
		try
		{
  	  var key=$(this).attr('name');
	    var value=$(this).val();

  	  data[key]=value;
		}
		catch(e)
		{
			log('Exception:');
			log(e);
		}
  });
	$(this).find("textarea").each(function(index) {
		try
		{
  	  var key=$(this).attr('name');
	    var value=$(this).val();

  	  data[key]=value;
		}
		catch(e)
		{
			log('Exception:');
			log(e);
		}
  });

	doc.save(data);

	return false;
}

function initFreefall()
{
  Web2Peer.init("freefall");

  log('Installing magic forms...');
  log($('.freefall-form'));
  $('.freefall-form').submit(freefall.submitForm);
}

$(document).ready(initFreefall);
