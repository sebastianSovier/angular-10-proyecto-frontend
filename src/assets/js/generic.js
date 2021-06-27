function cargarHttpRequest() {

	http_request = false;


	if (window.XMLHttpRequest) { // Mozilla, Safari,...

		http_request = new XMLHttpRequest();
		if (http_request.overrideMimeType) {
			http_request.overrideMimeType('text/xml; charset=iso-8859-1');
		}
	} else if (window.ActiveXObject) { // IE
		try {
			http_request = new ActiveXObject("Msxml2.XMLHTTP");		
		} catch (e) {
			try {
				http_request = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {}
		}
	}

	if (!http_request) {
		alert('Falla :( No es posible crear una instancia XMLHTTP');
		return false;
	}
	return http_request;
}

function encodeURL(url)   
{   
    if (url.indexOf("?")>0)   
    {   
        encodedParams = "?";   
        parts = url.split("?");   
        params = parts[1].split("&");   
        for(i = 0; i < params.length; i++)   
        {   
            if (i > 0)   
            {   
                encodedParams += "&";   
            }   
            if (params[i].indexOf("=")>0) //Avoid null values   
            {   
                p = params[i].split("=");   
                encodedParams += (p[0] + "=" + escape(encodeURI(p[1])));   
            }   
            else  
            {   
                encodedParams += params[i];   
            }   
        }   
        url = parts[0] + encodedParams;   
    }   
    return url;   
} 

/**
 * Detecta si el navegador es IE8
 * @returns {Boolean} True si es IE8, False si es otro navegador o versión
 */
function IsIE8Browser() {
    var rv = -1;
    var ua = navigator.userAgent;
    var re = new RegExp("Trident\/([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null) {
        rv = parseFloat(RegExp.$1);
    }
    return (rv == 4);
}
