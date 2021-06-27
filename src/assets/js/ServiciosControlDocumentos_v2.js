/*
RecepcionDocumentos()

*	serv	Nombre y Puerto del Servidor
*	lneg	Linea de Negocio
*	lpro	Linea de Producto
*	prod	Producto
*	proc	Proceso
*	acti	Actividad
*	clte	RUT Cliente
*	idop	id Operacion
*	idor	id Operacion Relacionada
*	mvto	Movimiento
*	gfam	Grupo Familiar
*	plan	Plan
*	cuno	Caracteristica uno
*	cdos	Caracteristica dos
*	ctre	Caracteristica tres
*	ncon	Numero Contrato
*	trem	Tipo de Remesa
*	sdes	Sucursal Destino
*	ddes	Departamento destino
*	sori	Sucursal Origen
*	dori	Departamento Origen
*	user	Usuario
*	host	Nombre del PC.

Retorna
	numero.
*/
var _path_cdd_ = "";
var _http_cdd_ = "http://";

function RecepcionDocumentos( serv, lneg, lpro, prod, proc, acti, clte, idop, idor, mvto, gfam, plan, cuno, cdos, ctre, ncon, trem, sdes, ddes, sori, dori, user, host){
	
	//var sUrl = "/ControlFlujoDocumentosWeb/proyects/documentos/InicioRecepDoc.jsp"
	var sUrl = "/Documentos/RecepcionDocumentos"

	sMovimientos = "";
	for(i=0; i<mvto.length;i++){
		sMovimientos += mvto[i] + ",";
	}
	
	var sParametros = "?servicio=recepcion&accion=pagina&tipo=0" + "&lneg=" + lneg + "&lpro=" + lpro + "&cpla=" + plan + "&cpro=" + prod + "&cproc=" + proc + "&cact=" + acti + "&iope=" + idop + "&clte=" + clte + "&idor=" + idor + "&cuno=" + cuno + "&cdos=" + cdos + "&ctre=" + ctre + "&ncon=" + ncon + "&trem=" + trem + "&sdes=" + sdes + "&ddes=" + ddes + "&mvto=" + sMovimientos + "&sori=" + sori + "&dori=" + dori + "&luse=" + user + "&host=" + host
	var gpar = "";
	for(i=0; i<gfam.length;i++){
		gpar+= "&ccar=" + gfam[i][0];
		gpar+= "&crut=" + gfam[i][1];
		gpar+= "&cpar=" + gfam[i][2];
		gpar+= "&cnom=" + gfam[i][3];
	}
	sParametros += gpar;
	window.clipboardData.clearData("Text");
	window.prompt("", _http_cdd_ + serv + _path_cdd_ + sUrl + sParametros );
	//window.showModalDialog( _http_cdd_ + serv + _path_cdd_ + sUrl + sParametros, "", "scroll:no;edge:sunken;status:yes;unadorned:yes;resizable:yes;dialogWidth:780px;dialogHeight:500px;dialogTop:10;dialogLeft:10");
	//return returnValueArray();
}


/*
function SolicitudDocumentos
*	serv	Nombre y Puerto del Servidor
*	lneg	Linea de Negocio
*	lpro	Linea de Producto
*	plan	Plan
*	prod	Producto
*	proc	Proceso
*	acti	Actividad
*	clte	RUT Cliente
*	idop	id Operacion
*	gfam	Grupo Familiar

Retorna
	numero.
*/

function SolicitudDocumentos( serv, lneg, lpro, plan, prod, proc, acti, clte, idop, gfam ){
	var sUrl = "/ControlFlujoDocumentosWeb/proyects/documentos/InicioSolicitudDocumentos.jsp";
	var sParametros = "?servicio=solicitud&accion=pagina&tipo=0&lneg=" + lneg + "&lpro=" + lpro + "&cpla=" + plan + "&cpro=" + prod + "&cproc=" + proc + "&cact=" + acti + "&iope=" + idop + "&rut=" + clte;
	var gpar = "";
	for(i=0; i<gfam.length;i++){
		gpar+= "&ccar=" + gfam[i][0];
		gpar+= "&crut=" + gfam[i][1];
		gpar+= "&cpar=" + gfam[i][2];
		gpar+= "&cnom=" + gfam[i][3];
	}
	sParametros += gpar;
	window.clipboardData.clearData("Text");
	window.showModalDialog(_http_cdd_ + serv + _path_cdd_ + sUrl + sParametros, "", "edge:sunken;status:no;unadorned:yes;resizable:yes;dialogWidth:950px;dialogHeight:470px");
	return returnValueArray();
}

/*
function VisacionDocumentos
*	serv	Nombre y Puerto del Servidor
*	lneg	Linea de Negocio
*	lpro	Linea de Producto
*	plan	Plan
*	prod	Producto
*	proc	Proceso
*	acti	Actividad
*	clte	RUT Cliente
*	idop	id Operacion

Retorna
	numero.
*/
function VisacionDocumentos( serv, lneg, lpro, plan, prod, proc, acti, clte, idop ){
	var sUrl = "/ControlFlujoDocumentosWeb/ControladorAccionesPublicas";
	var sParametros = "?servicio=visacion&accion=recepcion&tipo=0&lneg=" + lneg + "&lpro=" + lpro + "&cpla=" + plan + "&cpro=" + prod + "&cproc=" + proc + "&cact="+ acti + "&iope=" + idop + "&rut=" + clte;
	window.clipboardData.clearData("Text");
	window.showModalDialog(_http_cdd_ + serv + _path_cdd_ + sUrl + sParametros, "", "edge:sunken;status:no;unadorned:yes;resizable:yes;dialogWidth:715px;dialogHeight:500px");
	return returnValueArray();
}


/*
function ConsultaDocumentos
*	serv	Nombre y Puerto del Servidor
*	clte	RUT Cliente
*/
function ConsultaDocumentos( serv, clte ){
	var sUrl = "/ControlFlujoDocumentosWeb/ControladorAccionesPublicas";
	var sParametros = "?servicio=consulta&accion=filtro1&tipo=0&rut=" + clte;
	window.clipboardData.clearData("Text");
	window.open(_http_cdd_ + serv + _path_cdd_ + sUrl + sParametros, "", "channelmode=no,directories=no,fullscreen=no,height=450px,location=no,menubar=no,resizable=yes,scrollbars=no,status=yes,toolbar=no,width=815px");
}

/*
function ConsultaRecepcionDocumentos
	serv	Servidor
	lneg	L�nea de Negocio
	lpro	L�nea de Producto
	plan	Plan
	prod	Producto
	proc	Proceso
	acti	Actividad
	clte	RUT del Cliente
*/
function ConsultaRecepcionDocumentos( serv, lneg, lpro, plan, prod, proc, acti, mov ){
	var sUrl = "/ControlFlujoDocumentosWeb/ControladorAccionesPublicas";
	var sParametros = "?servicio=recepcion&accion=documentosnecesarios&tipo=0&lneg=" + lneg + "&lpro=" + lpro + "&cpla=" + plan + "&cpro=" + prod + "&cproc=" + proc + "&cact=" + acti + "&mvto=" + mov;
//window.prompt("5555555",_http_cdd_ + serv + _path_cdd_ + sUrl + sParametros);
	window.clipboardData.clearData("Text");
	window.open(_http_cdd_ + serv + _path_cdd_ + sUrl + sParametros, "", "channelmode=no,directories=no,fullscreen=no,height=450px,location=no,menubar=no,resizable=yes,scrollbars=no,status=no,toolbar=no,width=815px");
}

function returnValueArray(){
	var sRespuesta = new String(window.clipboardData.getData("Text"));
	window.clipboardData.clearData("Text");
	var arrayRespuesta = sRespuesta.split("@");
	if(arrayRespuesta.length!=2){
		arrayRespuesta = new Array("-1","Error");
	}
	return arrayRespuesta
}
