var modificado =0;


function validaSeleccionBeneficiarios(){
//debe validar que seleccione un beneficiario

  	for (var i = 0; i < totalRegistros; i++) {
  	  if(!(document.forms[0].elements["filas["+i+"].checkBox"] == undefined)){
  	  	if (document.forms[0].elements["filas["+i+"].checkBox"].checked){	  
          	 return true;
          }     
      }
    }
    alert("Debe Seleccionar un beneficiario");
    /*divMsgFinal.
    divMsgFinal.classList.remove('ok','alerta','error');
	divMsgFinal.classList.add('alerta');
	divMsgFinal.style.display =  'block';   
	divMsgFinal.innerHTML='  <img src=images/advertencia.jpg width=25px height=25px align=absmiddle>  Debe Seleccionar un Beneficiario para ingresar la solicitud';                         
*/
    return false;
    
  }
  
 function validaSeleccionComuna(){
	if(document.forms[0].elements["codComuna"][document.forms[0].elements["codComuna"].selectedIndex].value != 0){
		return true;
	}else{
		alert("Debe Seleccionar una comuna");
		return false;
	}
  }

function verSolicitud(form)
{
	abre_ventana('ventanaSolicitudGarantiaEstatal','680','400')
	form.target="ventanaSolicitudGarantiaEstatal";
	form.action="GEVerSolicitudBeneficiarios.do";
	//divMsgFinal.style.display =  'none'; 
	form.submit();
}
  
function marcaModificado(){
 modificado = modificado +1;
}

function validaModificacionRepresentante(){
//debe validar si hay modificaciones en el representante
   
   if (modificado >0){
	    if (confirm("Los datos del beneficiario han sido modificados, �desea almacenar los cambios?")){	    	
			seteaAccion(1);
			return true;
	    }
   }else{
        if (confirm("No se han Realizado Cambios al Representante, �Desea continuar?")){          
			seteaAccion(2);
			return true;
        }
   }
    return false;
}  

function valida(){
//debe validar que seleccione un beneficiario
  if ( validaSeleccionBeneficiarios()) { 
  //	if ( validaModificacionRepresentante()) { 
  //		if (validaSeleccionComuna()){
      		return true;
     // 	}
   //  }
  }       
  return false;
}

function validaTramite(){
	respuesta = valida();
    if(respuesta){
		verSolicitud(document.forms[0]);
		//document.forms[0].submit();
	}
}

function alertaPrueba(){
 alert("leee el JS");
}

function seteaAccion(accion){
 var acc;
  switch (accion)   { 
   case 1 : acc= "Actualizar";
      break;
   case 2 : acc= "Continuar";
      break;
  }
  document.forms[0].accion.value = acc; 
}


var nav4 = window.Event ? true : false;

function acceptNum(evt){	

// NOTE: Backspace = 8, Enter = 13, '0' = 48, '9' = 57	
var key = nav4 ? evt.which : evt.keyCode;	
return (key <= 13 || (key >= 48 && key <= 57));
} 
