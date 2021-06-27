

function msgGeneralAlertaOn(msj){
	divMsgGeneral.style.display =  'block'; 
	divMsgGeneral.className = "alerta";
	divMsgGeneral.innerHTML=' <img src=images/info.png width=15px height=15px   style="vertical-align: bottom;"> ' + msj;                        

}


function msgGeneralErrorOn(msj){
	divMsgGeneral.style.display =  'block'; 
	divMsgGeneral.className = "error";
	divMsgGeneral.innerHTML=' <img src=images/error.png width=15px height=15px   style="vertical-align: bottom;"> ' + msj;                        

}


function msgGeneralOkOn(msj){
	divMsgGeneral.style.display =  'block'; 
	divMsgGeneral.className = "ok";
	divMsgGeneral.innerHTML=' <img src=images/ok.png width=15px height=15px   style="vertical-align: bottom;"> ' + msj;                        

}

function msgGeneralAlertaOff(){
	divMsgGeneral.style.display =  'none'; 	
}

