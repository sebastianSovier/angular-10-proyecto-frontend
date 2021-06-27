var sProtocolo	= "http://"
var sServidor 	= "192.168.31.13"
var sPuerto		= "";
var sUrl		= "";
var sParametros	= "";

/*
RecepcionDocumentos()

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

function RecepcionDocumentos( lneg, lpro, prod, proc, acti, clte, idop, idor, mvto, gfam, plan, cuno, cdos, ctre, ncon, trem, sdes, ddes, sori, dori, user, host){
	sUrl		= "/ControlFlujoDocumentosWeb/proyects/documentos/InicioRecepDoc.jsp"

	sMovimientos = "";
	for(i=0; i<mvto.length;i++){
		sMovimientos += mvto[i] + ",";
	}
	
	sParametros	= "?servicio=recepcion&accion=pagina&tipo=0" + "&lneg=" + lneg + "&lpro=" + lpro + "&cpla=" + plan + "&cpro=" + prod + "&cproc=" + proc + "&cact=" + acti + "&iope=" + idop + "&clte=" + clte + "&idor=" + idor + "&cuno=" + cuno + "&cdos=" + cdos + "&ctre=" + ctre + "&ncon=" + ncon + "&trem=" + trem + "&sdes=" + sdes + "&ddes=" + ddes + "&mvto=" + sMovimientos + "&sori=" + sori + "&dori=" + dori + "&luse=" + user + "&host=" + host

	var gpar = "";
	for(i=0; i<gfam.length;i++){
		gpar+= "&ccar=" + gfam[i][0];
		gpar+= "&crut=" + gfam[i][1];
		gpar+= "&cpar=" + gfam[i][2];
		gpar+= "&cnom=" + gfam[i][3];
	}
	sParametros += gpar;
	window.prompt("", sProtocolo + sServidor + sPuerto + sUrl + sParametros );
	alert(''+sProtocolo + sServidor + sPuerto + sUrl + sParametros );
	//var sRespuesta = window.showModalDialog(sProtocolo + sServidor + sPuerto + sUrl + sParametros, "", "edge:sunken;status:no;unadorned:yes;dialogWidth:715px;dialogHeight:470px");
	//return sRespuesta;
}


/*
function SolicitudDocumentos
*	lneg	Linea de Negocio
*	lpro	Linea de Producto
*	plan	Plan
*	prod	Producto
*	proc	Proceso
*	acti	Actividad
*	clte	RUT Cliente
*	idop	id Operacion
	gfam	Grupo Familiar



Retorna
	numero.
*/

function SolicitudDocumentos( lneg, lpro, plan, prod, proc, acti, clte, idop, gfam ){
	sUrl		= "/ControlFlujoDocumentosWeb/proyects/documentos/InicioSolicitudDocumentos.jsp"
	sParametros	= "?servicio=solicitud&accion=pagina&tipo=0&lneg=" + lneg + "&lpro=" + lpro + "&cpla=" + plan + "&cpro=" + prod + "&cproc=" + proc + "&cact=" + acti + "&iope=" + idop + "&rut=" + clte
	var gpar = "";
	for(i=0; i<gfam.length;i++){
		gpar+= "&ccar=" + gfam[i][0];
		gpar+= "&crut=" + gfam[i][1];
		gpar+= "&cpar=" + gfam[i][2];
		gpar+= "&cnom=" + gfam[i][3];
	}
	sParametros += gpar;
	var sRespuesta = window.showModalDialog(sProtocolo + sServidor + sPuerto + sUrl + sParametros, "", "edge:sunken;status:no;unadorned:yes;dialogWidth:715px;dialogHeight:470px");
	return sRespuesta;
}

/*
function VisacionDocumentos
	lneg	Linea de Negocio
	lpro	Linea de Producto
	plan	Plan
	prod	Producto
	proc	Proceso
	acti	Actividad
	clte	RUT Cliente
	idop	id Operacion

Retorna
	numero.
*/
function VisacionDocumentos( lneg, lpro, plan, prod, proc, acti, clte, idop ){
	sUrl		= "/ControlFlujoDocumentosWeb/ControladorAcciones"
	sParametros	= "?servicio=visacion&accion=recepcion&tipo=0&lneg=" + lneg + "&lpro=" + lpro + "&cpla=" + plan + "&cpro=" + prod + "&cact=" + proc + acti + "&iope=" + idop + "&rut=" + clte;
	var sRespuesta = window.showModalDialog(sProtocolo + sServidor + sPuerto + sUrl + sParametros, "", "edge:sunken;status:no;unadorned:yes;dialogWidth:715px;dialogHeight:470px");
	return sRespuesta;
}


/*
function ConsultaDocumentos
	clte	RUT Cliente

*/
function ConsultaDocumentos( clte ){
	sUrl		= "/ControlFlujoDocumentosWeb/ControladorAcciones"
	sParametros	= "?servicio=consulta&accion=filtro1&tipo=0&rut=" + clte;
	window.open(sProtocolo + sServidor + sPuerto + sUrl + sParametros, "", "channelmode=no,directories=no,fullscreen=no,height=450px,location=no,menubar=no,resizable=no,scrollbars=no,status=no,toolbar=no,width=715px");
}
