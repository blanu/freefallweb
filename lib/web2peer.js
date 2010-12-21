// TODO: dependencies
// json2.js
if(!this.JSON){this.JSON={};}
(function(){function f(n){return n<10?'0'+n:n;}
if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+
f(this.getUTCMonth()+1)+'-'+
f(this.getUTCDate())+'T'+
f(this.getUTCHours())+':'+
f(this.getUTCMinutes())+':'+
f(this.getUTCSeconds())+'Z':null;};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf();};}
var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}
function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}
if(typeof rep==='function'){value=rep.call(holder,key,value);}
switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}
gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}
v=partial.length===0?'[]':gap?'[\n'+gap+
partial.join(',\n'+gap)+'\n'+
mind+']':'['+partial.join(',')+']';gap=mind;return v;}
if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}
v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+
mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}
if(typeof JSON.stringify!=='function'){JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}
rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}
return str('',{'':value});};}
if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}
return reviver.call(holder,key,value);}
text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+
('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}
if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}
throw new SyntaxError('JSON.parse');};}}());

// Math.uuid.js
(function() {
  // Private array of chars to use
  var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(''); 
  // A more performant, but slightly bulkier, RFC4122v4 solution.  We boost performance
  // by minimizing calls to random()
  Math.uuidFast = function() {
    var chars = CHARS, uuid = new Array(36), rnd=0, r;
    for (var i = 0; i < 36; i++) {
      if (i==8 || i==13 ||  i==18 || i==23) {
        uuid[i] = '-';
      } else if (i==14) {
        uuid[i] = '4';
      } else {
        if (rnd <= 0x02) rnd = 0x2000000 + (Math.random()*0x1000000)|0;
        r = rnd & 0xf;
        rnd = rnd >> 4;
        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
      }
    }
    return uuid.join('');
  };
})();

// I made this up. Surely there is a cross domain POSTing library?
var AjaxPost = function () {
    function eventPush(obj, event, handler) {
        if (obj.addEventListener) {
            obj.addEventListener(event, handler, false);
        } else if (obj.attachEvent) {
            obj.attachEvent('on'+event, handler);
        }
    }

    function removeProxyFrame() {
        var proxy_frame = document.querySelector("#proxy_frame");
        if (proxy_frame) {
            document.body.removeChild(proxy_frame);
            proxy_frame = null;
        }
    }

    function catchPost(event) {
        document.body.removeChild(event.target || event.srcElement);
        removeProxyFrame();
    }

    return {
        postMethod : function(url, data, callback) {
            removeProxyFrame();

            var proxy_token = "proxy_token_" + Math.random();
            var pxcatch_frame = document.createElement("IFRAME");
            pxcatch_frame.id = proxy_token;
            pxcatch_frame.name = proxy_token;
            pxcatch_frame.style.display = "none";
            document.body.appendChild(pxcatch_frame);

            eventPush(pxcatch_frame, "load", function(event){
                catchPost(event);
                callback();
            });

            var proxy_frame = document.createElement("IFRAME");
            proxy_frame.id = "proxy_frame";
            proxy_frame.style.display = "none";
            document.body.appendChild(proxy_frame);

            var post_process = proxy_frame.contentWindow.document;
            post_process.open();
            post_process.write('<form method="POST" action="' + url + '" target="' + proxy_token + '">');
            post_process.write('<input type="hidden" name="data" id="data">');
            post_process.write('</form>');
            post_process.close();
            post_process.getElementById("data").value = JSON.stringify(data);
            post_process.forms[0].submit();
        }
    };
}();

var Web2Peer = function() {
    var apikey = null;
    var slot = 'new'
    var instance = Math.uuidFast();
    var baseURL = null;
    var listeners = {};
    var bufferedAmount = 0;
    var sendQueue = [];
    var maxDelay = 3600;
    var initialDelay = 1.0;
    var retryDelay = initialDelay;
    // Note: These highly sensitive factors have been precisely measured by
    // the National Institute of Science and Technology.  Take extreme care
    // in altering them, or you may damage your Internet!
    // (Seriously: <http://physics.nist.gov/cuu/Constants/index.html>)
    var delayFactor = 2.7182818284590451; // (Math.E)
    // Phi = 1.6180339887498948 // (Phi is acceptable for use as a
    // factor if e is too large for your application.)
    var delayJitter = 0.11962656472; // molar Planck constant times c, joule meter/mole
    
    function AddressInUseException(message) { this.message = message; }
    AddressInUseException.prototype.toString = function () {
        return 'AddressInUseException: ' + this.message;
    }
    function keys(o) {
        var r = [];
        for (var propertyName in o) {
            r.push(propertyName);
        }
        return r;
    }
    function removeScriptTag(id) {
        eval("var old = document.getElementById('" + id + "')");
        if (old != null) {
            // XXX: clear the src so that IE9 (Beta 1) doesn't try to re-fetch the script
            // https://connect.microsoft.com/IE/feedback/details/598805/dynamically-created-script-tags-load-js-early-and-again-when-removed
            old.src = "";
            old.parentNode.removeChild(old);
            delete old;
        }
    }
    function setScriptTag(id, src, restart) {
        removeScriptTag(id);
        var head = document.getElementsByTagName("head")[0];
        var script = document.createElement("script");
        script.id = id;
        script.type = "text/javascript";

        var ranOnce = false;
        function oneResult() {
            if (ranOnce) return;
            ranOnce = true;
            restart();
        }        

        script.onerror = oneResult;
        script.onload = oneResult;
        script.onreadystatechange = function(){
            if (script.readyState == "loaded" || script.readyState == "complete") {
                oneResult();
            }
        };

        // XXX: set the src after append, so IE9 (Beta 1) doesn't fetch the script twice
        // https://connect.microsoft.com/IE/feedback/details/598805/dynamically-created-script-tags-load-js-early-and-again-when-removed
        head.appendChild(script);
        script.src = src;
    }
    function makeURL(method) {
        if (method == "listen") {
            sn = slot;
        } else {
            sn = method;
        }
        url = "http://" + sn + ".w2p.dtdns.net:9323/" + method + "?apikey=" + apikey + "&instance=" + instance;
        // maybe overkill
        url += "&cacheBuster=" + Math.random();
        return url;
    }
    function setupRetry() {
        if (keys(listeners).length == 0) {
            return;
        }
        setTimeout(bindListener, retryDelay);
        retryDelay = Math.max(retryDelay, initialDelay);
        retryDelay = Math.min(retryDelay * delayFactor, maxDelay);
        j = retryDelay * delayJitter;
        retryDelay += (Math.random() * j * 2) - j;
    }
    function bindListener() {
        url = makeURL("listen");
        channels = keys(listeners);
        url += "&channels=" + encodeURIComponent(JSON.stringify(channels));
        setScriptTag("w2p_listener", url, setupRetry);
    }
    function unbindListener() {
        removeScriptTag("w2p_listener");
    }
    function resetSubscriptions() {
        url = makeURL("reset");
        // some kind of request..
        (new Image(1,1)).src = url;
    }
    function flushSendQueue() {
        // we only keep one POST outstanding at a time, to ensure write ordering
        m = sendQueue[0];
        url = makeURL("send") + "&channel=" + m.channel;
        AjaxPost.postMethod(url, m.data, sendComplete);
    }
    function sendComplete() {
        m = sendQueue.shift();
        bufferedAmount -= m.data.length;
        if (sendQueue.length > 0) {
            flushSendQueue();
        }
    }
    return {
        init : function(newapikey) {
            apikey = newapikey;
        },
        listen : function(channel, ondata) {
            if (listeners[channel] != null) {
                throw new AddressInUseException("Already listening for data on this channel (" + channel + ")");
            }
            listeners[channel] = ondata;
            if (keys(listeners).length == 1) {
                bindListener();
            } else {
                resetSubscriptions();
            }
        },
        stopListening : function(channel) {
            if (listeners[channel] == null) {
                throw new AddressInUseException("Not listening for data on this channel (" + channel + ")");
            }
            delete listeners[channel];
            resetSubscriptions();
        },
        send : function(channel, data) {
            bufferedAmount += data.length;
            sendQueue.push({channel: channel, data: data});
            if (sendQueue.length == 1) {
                flushSendQueue();
            }
        },
        // not for public use:
        ondata : function(channel, data) {
            if (channel != '__reset__') {
              listeners[channel](JSON.parse(data));
            }
        },
        connectionSuccessful : function() {
            retryDelay = initialDelay;
        },
        setSlot : function(newslot) {
            slot = newslot;
            retryDelay = 0;
        }
    };
}();
