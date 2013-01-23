document.write('<p class="formtitle">Get Price And Support</p>');
document.write('<p class="formtext">Simply complete the form below, click submit, you will get the price list and a SBM representative will contact you within one business day. Please also feel free to contact us by email or phone. <span class="bluefont">( <span style="color:#f00">*</span> Denotes a required field).</span></p>');
document.write('<form action="http://www.sbmchina.com/v3.0/inc/ppc-submit.php" method="post" name="form" id="form" onSubmit="return(CheckInput(form))">');
document.write('<div><label>Name : </label><input name="cm_name" type="text" class="inquiry_input" id="cm_name"/></div>');
document.write('<div><label>E-mail : </label><input name="cm_email" type="text" class="inquiry_input" id="cm_email"/><span style="color:#f00">*</span></div>');
document.write('<div><label>Contact Tel : </label><input name="cm_tel" type="text" class="inquiry_input" id="cm_tel"/></div>');
document.write('<div><label>Country : </label><input name="cm_country" type="text" class="inquiry_input" id="cm_country"/></div>');
document.write('<div><label>Company:</label><input name="cm_company" type="text" class="inquiry_input" id="cm_company"/></div>');
document.write('<div><label>Question:</label><textarea name="cm_content" rows="5" class="inquiry_textarea" id="cm_content"></textarea><span style="color:#f00">*</span>');
document.write('<input name="cm_url" type="hidden" id="cm_url" />');
document.write('</div>');
document.write('<div><label></label>');
document.write('<input type="submit" name="submit" value="Submit" onclick="_gaq.push([\'_trackEvent\', \'submit\', \'clicked\', \'inquire\'])" id="inquiry_submit"/>');
document.write('</div>');
document.write('</form>');

var style = document.createElement("style");
style.innerHTML = '.formtitle{font-weight:bold;}.formtext{color:#666;}label{width:150px;display:block;float:left;}.inquiry_input{width:300px;}.inquiry_textarea{width:300px;}#inquiry_submit{margin-left:150px;}';
document.head.appendChild(style);

function is_number(str)
{
exp=/[^0-9()-]/g;
if(str.search(exp) != -1)
{
return false;
}
return true;
}
function is_email(str)
{ if((str.indexOf("@")==-1)||(str.indexOf(".")==-1))
{

return false;
}
return true;
}

function CheckInput(form){


if(!is_email(form.cm_email.value))
{ 
alert("Please specify a valid email address.");
form.cm_email.focus();
return false;
}	
if(form.cm_content.value==''){
alert("Please enter your message.");
form.cm_content.focus();
return false;
}
if(form.cm_content.value.length>5000){
alert("The message cannot surpass 5000 characters !");
form.cm_content.focus();
return false;
}
return true;
}
document.getElementById("cm_url").value=window.location;
