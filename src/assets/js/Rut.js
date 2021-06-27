/*Valida Rut */
function checkRutField(texto)
{
	var tmpstr = "";
	var tmpstr2 = "";
	for(i=0;i<texto.length;i++ )
		if(texto.charAt(i)!= ' ' && texto.charAt(i)!= '.' && texto.charAt(i)!= '-' )
			tmpstr = tmpstr + texto.charAt(i);
	texto = tmpstr;
	largo = texto.length;

	if ( largo < 2 ){
	  return false;
	}

	for(i=0;i<largo;i++){ 
	  if(texto.charAt(i)!="0" && texto.charAt(i)!="1" && texto.charAt(i)!="2" && texto.charAt(i)!="3" && texto.charAt(i)!="4" && texto.charAt(i)!="5" && texto.charAt(i)!="6" && texto.charAt(i)!="7" && texto.charAt(i)!="8" && texto.charAt(i)!="9" && texto.charAt(i)!="k" && texto.charAt(i)!="K"){
	    return false;
	  }
	}

  var invertido = "";
  for(i=(largo-1),j=0;i>=0;i--,j++)
    invertido = invertido + texto.charAt(i);

  var dtexto = "";
  dtexto = dtexto + invertido.charAt(0);
  dtexto = dtexto + '-';
  cnt = 0;

  for(i=1,j=2;i<largo;i++,j++){
    if ( cnt == 3 ) {
      dtexto = dtexto + '.';
      j++;
      dtexto = dtexto + invertido.charAt(i);
      cnt = 1
    }else { 
      dtexto = dtexto + invertido.charAt(i);
      cnt++;
    }
  }

  invertido = "";
  for (i=(dtexto.length-1),j=0;i>=0;i--,j++)
    invertido = invertido + dtexto.charAt(i);

  if (checkDV(texto))
  	return true;
  else{
	return false;
  }
}

function checkMsgRutField(texto)
{
	var tmpstr = "";
	var tmpstr2 = "";
	for(i=0;i<texto.length;i++ )
		if(texto.charAt(i)!= ' ' && texto.charAt(i)!= '.' && texto.charAt(i)!= '-' )
			tmpstr = tmpstr + texto.charAt(i);
	texto = tmpstr;
	largo = texto.length;

	if ( largo < 2 ){
	  alert("El rut ingresado no es válido");
	  return false;
	}

	for(i=0;i<largo;i++){ 
	  if(texto.charAt(i)!="0" && texto.charAt(i)!="1" && texto.charAt(i)!="2" && texto.charAt(i)!="3" && texto.charAt(i)!="4" && texto.charAt(i)!="5" && texto.charAt(i)!="6" && texto.charAt(i)!="7" && texto.charAt(i)!="8" && texto.charAt(i)!="9" && texto.charAt(i)!="k" && texto.charAt(i)!="K"){
    	alert("El rut ingresado no es válido");
	    return false;
	  }
	}

  var invertido = "";
  for(i=(largo-1),j=0;i>=0;i--,j++)
    invertido = invertido + texto.charAt(i);

  var dtexto = "";
  dtexto = dtexto + invertido.charAt(0);
  dtexto = dtexto + '-';
  cnt = 0;

  for(i=1,j=2;i<largo;i++,j++){
    if ( cnt == 3 ) {
      dtexto = dtexto + '.';
      j++;
      dtexto = dtexto + invertido.charAt(i);
      cnt = 1
    }else { 
      dtexto = dtexto + invertido.charAt(i);
      cnt++;
    }
  }

  invertido = "";
  for (i=(dtexto.length-1),j=0;i>=0;i--,j++)
    invertido = invertido + dtexto.charAt(i);

  if (checkDV(texto))
  	return true;
  else{
    alert("El rut ingresado no es válido");
	return false;
  }
}

function checkFields(rut)
{

  var tmpstr = "";
  var SoloRut="";
  var RutNum;

  for ( i=0; i < rut.length ; i++ )
    if ( rut.charAt(i) != ' ' && rut.charAt(i) != '.' && rut.charAt(i) != '-' )
      tmpstr = tmpstr + rut.charAt(i);
  rut = tmpstr;

  if(!checkRutField(rut)){
  	return false;
  }
 
  if(!checkDV(rut)){
  	return false;
  }

  SoloRut=rut.substring(0,rut.length-1);

  RutNum=SoloRut;

  if (RutNum < 50000000) {
        return true;
  } else {
	if (RutNum > 99999999){
		return false;
	}
  }
  return true;
}

function checkCDV( dvr )

{
  dv = dvr + "";
  if ( dv != '0' && dv != '1' && dv != '2' && dv != '3' && dv != '4' && dv != '5' && dv != '6' && dv != '7' && dv != '8' && dv != '9' && dv != 'k'  && dv != 'K')
  {
    return false
  }
  return true;
}

function checkDV( crut )
{
  largo = crut.length;
  if (largo < 2){
    return false;
  }

  if (largo > 2)
    rut = crut.substring(0, largo - 1);
  else
    rut = crut.charAt(0);
    
  dv = crut.charAt(largo-1);

  if(!checkCDV(dv)){
  	return false;
  }

  if ( rut == null || dv == null ){
  	return 0;
  }

  var dvr = '0';

  suma = 0;
  mul  = 2;

  for (i= rut.length -1 ; i >= 0; i--)
  {
    suma = suma + rut.charAt(i) * mul;
    if (mul == 7){
    	mul = 2;
    }else{
    	mul++;
    }
  }

  res = suma % 11;
  
  if (res==1){
  	dvr = 'k';
  }else if (res==0){
  	dvr = '0';
  }else{
    dvi = 11-res;
    dvr = dvi + "";
  }

  if(dvr != dv.toLowerCase())
    return false;
  else
	return true;
}

function calculaDV(rut) {
	var dvr="0";
	var dvi;
	var suma=0;
	var mul=2;
	var res;
		
	if(rut==null)
		return "";
	if(rut=="")
		return "";

	for(i=rut.length-1;i>=0;i--)
	{
		suma=suma+(rut.charAt(i)*mul);
		if(mul==7)		
			mul=2;
		else
			mul++;
	}
	res = suma % 11;
	if(res==1)
		dvr = "K";
	else if(res==0)
		dvr = "0";
	else{
   		dvi = 11-res;
   		dvr = dvi + "";
	}
	return dvr;
}

