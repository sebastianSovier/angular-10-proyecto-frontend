// esta funcion valida que una fecha sea valida
function validaFecha(fecha) {
    var sDate = fecha;
    if (sDate == "") return true;
    var iDay, iMonth, iYear;
    var arrValues;
    var today = new Date();
    arrValues = sDate.split("-");
    iDay = arrValues[0];
    iMonth = arrValues[1];
    iYear = arrValues[2];
    if ((iMonth == null) || (iYear == null)) return false;
    if ((iDay > 31) || (iMonth > 12) || 
        (iYear < 1900 )) 
      return false;
    var dummyDate = new Date(iYear, iMonth - 1, iDay);
    if ((dummyDate.getDate() != iDay) || 
      (dummyDate.getMonth() != iMonth - 1) || 
      (dummyDate.getFullYear() != iYear)) 
         return false;
    return true;
}