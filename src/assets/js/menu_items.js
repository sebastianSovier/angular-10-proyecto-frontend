/*
  --- menu items --- 
  note that this structure has changed its format since previous version.
  additional third parameter is added for item scope settings.
  Now this structure is compatible with Tigra Menu GOLD.
  Format description can be found in product documentation.
*/

var MENU_ITEMS = [
	['Selecciona Pensionado','login.jsp', {'tw' : 'der'}],
	['  Modificaciones Generales',null, null,
		['Asignación familiar','inicioAsignacionFamiliar.do', {'tw' : 'der'}],
		['Solicitud Garantía estatal','garantiaEstatal.do?tipoAccion=S', {'tw' : 'der'}],
	    ['Actualizacion Garantía estatal','garantiaEstatal.do?tipoAccion=A', {'tw' : 'der'}],
		['Certificados civiles','certificadoCivil.do', {'tw' : 'der'}],
		['Certificados de estudio','certificadoEstudioListaPersonas.do', {'tw' : 'der'}],
		['Ingreso FUN','grupoPago.do', {'tw' : 'der'}],
		['Retención judicial','retencionJudicial.do', {'tw' : 'der'}],
		['Declar.Renta Exter.','declaracionRentaExterna.do', {'tw' : 'der'}],
		['Poderes','poderes.do', {'tw' : 'der'}],
		['Solic. zona extrema','gruposZonaExtrema.do', {'tw' : 'der'}],
		['Solic. Pens. elegida','pensionElegida.do', {'tw' : 'der'}],
		['Revalid.de pago','revalidacionPago.do', {'tw' : 'der'}],
		['Pago cuota mortuoria','validacionPCM.do', {'tw' : 'der'}],
		['Beneficiario no declarado','inicioBeneficiarioNoDeclarado.do', {'tw' : 'der'}],
		['Pago periodos garantizados','inicioPPG.do', {'tw' : 'der'}],
		['Modifica Forma Pago','modificaFormaPagoGruposPago.do', {'tw' : 'der'}],
		['Doc. sin tramite asociado','docSinTramite.do', {'tw' : 'der'}],
		['Eliminacion de Tramites','tramitesEliminados.do', {'tw' : 'der'}],
		['Dctos SAFP GE','docTramiteSafpGe.do', {'tw' : 'der'}],
		['Cierre de Negocio','docTramiteCierreNeg.do', {'tw' : 'der'}],
		['Actualización Anual GE','garantiaEstatal.do?tipoAccion=A', {'tw' : 'der'}],
	    
		
	],
	['  Certificados', null, null,
		['Cotizaci&oacute;n de salud','listaBeneficiariosCertificadosCotizacionSalud.do', {'tw' : 'der'}],
		['Certificado pensionado','listaBeneficiariosCertificadosCertificadoPensionado.do', {'tw' : 'der'}],
		['Duraci&oacute;n pensi&oacute;n','listaBeneficiariosCertificadosDuracionPension.do', {'tw' : 'der'}],
		['Resoluci&oacute;n asignaci&oacute;n familiar','listaBeneficiariosCertificadosResolucionAsignacionFamiliar.do', {'tw' : 'der'}],
		['Informe para credencial FONASA','listaBeneficiariosCertificadosCredencialFonasa.do', {'tw' : 'der'}],
		['Informe liquidacion pensión','liquidacionPensionSeleccionPeriodo.jsp', {'tw' : 'der'}],
		['Informe pensiones pagadas','listaBeneficiariosCertificadosPensionesPagadas.do', {'tw' : 'der'}],
	],
	['  Consultas', 'Consulta_inicio.jsp',{'tw' : 'der'}],
];