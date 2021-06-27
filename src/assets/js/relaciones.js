var sProtocolo	= "http://"
var sServidor 	= "192.168.31.13"
var sPuerto		= "";
var sUrl		= "";
var sParametros	= "";

/**
 * REcibe numero de relacion del beneficiario
 * Retorna el codigo que permite identificar el movimiento para la CD
 * @param numRelacion
 * @returns {String}
 */
function RelacionBeneficiario(numRelacion){
 
 var relacCD ="";
	
 /*
  * 0	CU	Asegurado
	1	PH	Padre
	2	MH	Madre
	3	HI	Hijo
	4	CN	Cónyuge
	5	HI	Hijo Reconocido
	6	MH	MHN o PHN
	7		Conviviente Civil
	8		Ex-Conyuge
	9		Otro

  */
 switch(numRelacion) {
	 case "0":
		 relacCD = "CU";
	     break;
	 case "1":
		 relacCD = "PH";
	     break;
	 case "2":
		 relacCD = "MH";
	     break;
	 case "3":
		 relacCD = "HI";
	     break;
	 case "4":
		 relacCD = "CN";
	     break;
	 case "5":
		 relacCD = "HI";
	     break;
	 case "6":
		 relacCD = "MH";
	     break;
	 default:
	      relacCD = "";
	}

 return relacCD;
}

/**
 * 
 * REcibe numero de relacion de la carga
 * Retorna el codigo que permite identificar el movimiento para la CD
 * @param numRelacion
 * @returns {String}
 */
function RelacionCargaFamiliar( numRelacion){
	 
	 var relacCD ="";
		
	 /*
	  * 0		Sin Inf.
		1	PH	Padre
		2	MH	Madre
		3	HI	Hijo
		4	CN	Cónyuge
		6	MHN	M.H.N
		10	HI	Hijo Adoptivo
		11	HI	Huérfano a cargo de Institución
		12	NB	Nieto
		13	NB	Bisnieto
		14		Ascendiente
		15		Otro
		16		Menor a Cargo de P.Natural


	  */
	 switch(numRelacion) {
		 case 0:
			 relacCD = "CU";
		     break;
		 case 1:
			 relacCD = "PH";
		     break;
		 case 2:
			 relacCD = "MH";
		     break;
		 case 3:
			 relacCD = "HI";
		     break;
		 case 4:
			 relacCD = "CN";
		     break;
		 case 5:
			 relacCD = "HI";
		     break;
		 case 6:
			 relacCD = "MHN";
		     break;
		 default:
		      relacCD = "";
		}

	 return relacCD;
	}


