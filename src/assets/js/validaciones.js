// Para validar solo numeros en un campo de texto
function validaNumero(element)
{
	if (!(element.value.match(/^\d+$/)))
	{	
		return false;
	}
}
function esMesValido(valor)
{
	if ( parseInt(valor) > 0 && parseInt(valor) < 13 ) 
		return true;
	else
		return false;
}
function isNumber(element)
{
	if ( isNaN(element.value) || element.value=='' )
	{
		return false;
	}
	else
	{
		return true;
	}
}

function esFechaBMenorA(fechaA,fechaB)
{// Funcion que realiza la comparacion entre 2 fechas
    arregloFechaA = fechaA.split("-");
    numeroFechaA=''+arregloFechaA[2]+arregloFechaA[1]+arregloFechaA[0];
    
    arregloFechaB = fechaB.split("-");
    numeroFechaB=''+arregloFechaB[2]+arregloFechaB[1]+arregloFechaB[0];
    
    if (numeroFechaB<numeroFechaA)
	    {return true;}
    else
    	{return false;}    
}
