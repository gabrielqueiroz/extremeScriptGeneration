// Global variables
var vlanCount = 0;		
var portCount = 0;
var switchPort = 1;
var output = "";

// Function for default switch ports or custom port
function addPort(portNumber){
	if(portNumber == 0){
		var div = document.createElement('div');
		div.setAttribute("id", "customPort");

	    div.innerHTML = '<div class="form-group">\
							<div class="col-sm-2 col-md-2">\
								<input class="form-control" id="customport'+portCount+'" placeholder="Port">\
							</div>\
							<div class="col-sm-5 col-md-5">\
								<input class="form-control" id="customdispstring'+portCount+'" placeholder="Display String">\
							</div>\
							<div class="col-sm-5 col-md-5">\
								<input class="form-control" id="customdescstring'+portCount+'" placeholder="Description String">\
							</div>\
						</div>';

		document.getElementById('divPort').appendChild(div);

		portCount ++;
	} else {
		switchPort = portNumber;

		while(document.getElementById('switchPort') !== null)
			document.getElementById('switchPort').remove();

		for(var i=1; i<=portNumber; i++){
		var div = document.createElement('div');
		div.setAttribute("id", "switchPort");

	    div.innerHTML = '<div class="form-group">\
							<label class="control-label col-sm-2 col-md-2" id="port'+i+'">Port'+i+'</label>\
							<div class="col-sm-5 col-md-5">\
								<input class="form-control" id="dispstring'+i+'" placeholder="Display String">\
							</div>\
							<div class="col-sm-5 col-md-5">\
								<input class="form-control" id="descstring'+i+'" placeholder="Description String">\
							</div>\
						</div>';

		document.getElementById('divPort').appendChild(div);
		}
	}		

	var portMore = document.createElement('div');
	if(document.getElementById('portMore') !== null)
		document.getElementById('portMore').remove();	
	
	portMore.innerHTML += '<div class="form-group">\
								<div class="col-sm-12 col-md-12">\
									<a href="javascript:remPort();" class="btn btn-danger pull-right">\
										<span class="glyphicon glyphicon-trash" aria-hidden="true"></span> Ports</a>\
								</div>\
							</div>';
	portMore.setAttribute("id", "portMore");
	document.getElementById('divPort').appendChild(portMore);	
}

// Function for remove the last VLAN
function remPort(){
	while(document.getElementById('customPort') !== null)
		document.getElementById('customPort').remove();

	while(document.getElementById('switchPort') !== null)
		document.getElementById('switchPort').remove();		

	document.getElementById('portMore').remove();

	portCount = 0;
	switchPort = 1;	
}

// Function for add new VLAN configuration
function configVLAN(param){			
	var vlanMore = document.createElement('div');
	var language = document.getElementsByTagName("html")[0].getAttribute("lang");

	if(document.getElementById('vlanMore') == null){
		if(language == "pt-br")
			vlanMore.innerHTML += '<p><input id="vlanDefault" type="checkbox" value="" checked> Deletar VLAN Default para todas as portas</input></p>\
			<p><input id="stpd" type="checkbox" value="" checked> Configurar Spanning Tree para as VLANS criadas</input></p>\
			<div class="form-group">\
				<label class="control-label col-sm-4 col-md-2" for="gateway">Gateway:</label>\
				<div class="col-sm-8 col-md-10">\
					<input class="form-control" id="gateway" placeholder="Default Gateway">\
				</div>\
			</div>';	
		else
			vlanMore.innerHTML += '<p><input id="vlanDefault" type="checkbox" value="" checked> Delete VLAN Default for all ports</input></p>\
			<p><input id="stpd" type="checkbox" value="" checked> Configure Spanning Tree for all created VLANS</input></p>\
			<div class="form-group">\
				<label class="control-label col-sm-4 col-md-2" for="gateway">Gateway:</label>\
				<div class="col-sm-8 col-md-10">\
					<input class="form-control" id="gateway" placeholder="Default Gateway">\
				</div>\
			</div>';
		
		vlanMore.setAttribute("id", "vlanMore");
		document.getElementById('divVLAN').appendChild(vlanMore);
	}
		
	var div = document.createElement('div');
	div.setAttribute("id", "divVLAN"+vlanCount);	

	if(param == "add")
	    div.innerHTML += '<hr>\
						<div class="form-group">\
							<label class="control-label col-sm-1 col-md-1">VLAN:</label>\
							<div class="col-sm-5 col-md-5">\
								<input class="form-control" id="vlan'+vlanCount+'" placeholder="Create VLAN">\
							</div>\
							<label class="control-label col-sm-1 col-md-1">Tag:</label>\
							<div class="col-sm-5 col-md-5">\
								<input class="form-control" id="tag'+vlanCount+'" placeholder="Tags">\
							</div>\
						</div>\
						<div class="form-group">\
							<label class="control-label col-sm-1 col-md-1">Ports:</label>\
							<div class="col-sm-5 col-md-5">\
								<input class="form-control" id="tagged'+vlanCount+'" placeholder="Port(s) Tagged">\
							</div>\
							<label class="control-label col-sm-1 col-md-1">Ports:</label>\
							<div class="col-sm-5 col-md-5">\
								<input class="form-control" id="untagged'+vlanCount+'" placeholder="Port(s) Untagged">\
							</div>\
						</div>\
						<div class="form-group">\
							<label class="control-label col-sm-1 col-md-1">IP:</label>\
							<div class="col-sm-5 col-md-5">\
								<input class="form-control" id="vlanip'+vlanCount+'" placeholder="IP Address">\
							</div>\
							<label class="control-label col-sm-1 col-md-1">Mask:</label>\
							<div class="col-sm-5 col-md-5">\
								<input class="form-control" id="vlanmask'+vlanCount+'" placeholder="Mask Address" value="255.255.255.0">\
							</div>\
						</div>\
						<div class="form-group">\
							<div class="col-sm-6 col-md-6">\
								<input id="vlanIpFowading'+vlanCount+'" type="checkbox"> Enable IP Fowarding</input>\
							</div>\
							<div class="col-sm-6 col-md-6">\
								<input id="vlanLoopBack'+vlanCount+'" type="checkbox"> Enable Loop-Back Mode</input>\
							</div>\
						</div>\
						<div class="form-group">\
							<div class="col-sm-12 col-md-12">\
								<a href="javascript:remVLAN('+vlanCount+');" class="btn btn-danger pull-right">\
									<span class="glyphicon glyphicon-trash" aria-hidden="true"></span> VLAN</a>\
							</div>\
						</div>';

						
	else
		div.innerHTML += '<hr>\
						<div class="form-group">\
								<label class="control-label col-sm-1 col-md-1">VLAN:</label>\
								<div class="col-sm-5 col-md-5">\
									<input class="form-control" id="delvlan'+vlanCount+'" placeholder="Delete VLAN">\
								</div>\
								<label class="control-label col-sm-1 col-md-1">Ports:</label>\
								<div class="col-sm-5 col-md-5">\
									<input class="form-control" id="delports'+vlanCount+'" placeholder="Port(s)">\
								</div>\
							</div>\
						<div class="form-group">\
							<div class="col-sm-12 col-md-12">\
								<a href="javascript:remVLAN('+vlanCount+');" class="btn btn-danger pull-right">\
									<span class="glyphicon glyphicon-trash" aria-hidden="true"></span> VLAN</a>\
							</div>\
						</div>';

	document.getElementById('divVLAN').appendChild(div);		
	vlanCount++;
}

// Function for remove the last VLAN
function remVLAN(vlan){
	if(document.getElementById('divVLAN'+vlan) !== null)
		document.getElementById('divVLAN'+vlan).remove();
	
	existsvlan = false;

	for(i=0; i<vlanCount; i++)
		if(document.getElementById('divVLAN'+i) !== null)
			existsvlan = true;

	if(!existsvlan)
		document.getElementById('vlanMore').remove();	
}

// Generate the script based on what you filled or not.
function generateScript(){		
	output = "";

	// SNMP Configuration
	if(document.getElementById('panelSystem').style.display !== "none"){
		// System Name
		var sysName = document.getElementById("sysName").value;
		if (sysName.length>1)				
			output += "configure snmp sysName \""+sysName+"\"\n";					

		// System Location
		var sysLocation = document.getElementById("sysLocation").value;
		if(sysLocation.length>1)				
			output += "configure snmp sysLocation \""+sysLocation+"\"\n";

		// System Contact
		var sysContact = document.getElementById("sysContact").value;
		if(sysContact.length>1)
			output += "configure snmp sysContact \""+sysContact+"\"\n";
	}

	// SNMP Configuration
	if(document.getElementById('panelSNMP').style.display !== "none"){
		var snmpUser = document.getElementById("snmpUser").value;
		var snmpAuth = document.getElementById("snmpAuth").value;
		var snmpDes = document.getElementById("snmpDes").value;
		var snmpGroup = document.getElementById("snmpGroup").value;
		
		if(snmpUser.length>1 && snmpAuth.length>1 && snmpDes.length>1 && snmpGroup.length>1){
			output += "configure snmpv3 add user "+snmpUser+" authentication md5 "+snmpAuth+" privacy des "+snmpDes+"\n";
			output += "configure snmpv3 add group "+snmpGroup+" user "+snmpUser+" sec-model usm\n";
			output += "configure snmpv3 add access "+snmpGroup+" sec-model usm sec-level priv read-view defaultAdminView write-view defaultAdminView notify-view defaultAdminView\n";
			output += "disable snmp access snmp-v1v2c\n";
			output += "disable snmpv3 default-user\n";
			output += "disable snmpv3 default-group\n";
		}		
	}


	// SNTP Configuration
	// System SNTP			
	var sysSNTP = document.getElementById("sysSNTP").value;
	if(sysSNTP.length>1 && document.getElementById('panelSNTP').style.display !== "none"){
		output += "configure sntp-client primary "+sysSNTP+" vr \"VR-Default\"\n";				
		output += "enable sntp-client\n";
		output += "configure timezone name BRT -180 autodst name BRST 60 begins every third sunday october at 0:00 ends every third sunday february at 0:00\n"
	}		
	
	// Ports Configuration
	// Custom Port Configuration					
	for (var i=0; i<=portCount; i++){				

		if (document.getElementById("customport"+i) !== null){					
			var port = document.getElementById("customport"+i);

			if (port.value.length > 0){
				var dispstring = document.getElementById("customdispstring"+i);

				if(dispstring.value.length > 1)
					output += "configure ports "+port.value+" display-string "+dispstring.value+"\n";				

				var descstring = document.getElementById("customdescstring"+i);				

				if(descstring.value.length > 1)
					output += "configure ports "+port.value+" description-string "+descstring.value+"\n";
			}
		}
	}

	// Default Switch Ports Configuration	
	for (var i=1;i<=switchPort;i++){			

		if(document.getElementById("dispstring"+i) !== null){
			var dispstring = document.getElementById("dispstring"+i);

			if(dispstring.value.length>1)
				output += "configure ports "+i+" display-string "+dispstring.value+"\n";
		}
			

		if(document.getElementById("descstring"+i) !== null){
			var descstring = document.getElementById("descstring"+i);

			if(descstring.value.length>1)
				output += "configure ports "+i+" description-string "+descstring.value+"\n";
		}									
	}
	
	// VLAN Configuration				
	if(document.getElementById("vlanDefault") !== null && document.getElementById("vlanDefault").checked)
		output += "configure vlan Default delete all\n";		

	for (var i=0;i<=vlanCount;i++){

		if(document.getElementById("vlan"+i) !== null){
			vlan = document.getElementById("vlan"+i);

			if (vlan.value.length > 0){
				output += "create vlan \""+vlan.value+"\"\n";
				
				tag = document.getElementById("tag"+i);
				if (tag.value.length > 0)	
					output += "configure vlan "+vlan.value+" tag "+tag.value+"\n";					

				tagged = document.getElementById("tagged"+i);	
				if (tagged.value.length > 0)	
					output += "configure vlan "+vlan.value+" add ports "+tagged.value+" tagged\n";
													
				untagged = document.getElementById("untagged"+i);
				if (untagged.value.length > 0)
					output += "configure vlan "+vlan.value+" add ports "+untagged.value+" untagged\n";
											
				vlanip = document.getElementById("vlanip"+i);
				vlanmask = document.getElementById("vlanmask"+i);																	
				if (vlanip.value.length > 0 && vlanmask.value.length > 0)
					output += "configure vlan "+vlan.value+" ipaddress "+vlanip.value+" "+vlanmask.value+"\n";
					
				if (document.getElementById("vlanIpFowading"+i).checked)
					output += "enable ipforwarding vlan "+vlan.value+"\n";

				if (document.getElementById("vlanLoopBack"+i).checked)
					output += "enable loopback-mode vlan "+vlan.value+"\n";
			}
		}

		if(document.getElementById("delvlan"+i) !== null){
			delvlan = document.getElementById("delvlan"+i);
			delports = document.getElementById("delports"+i);

			if(delvlan.value.length > 0 && delports.value.length > 0)
				output += "configure vlan "+delvlan.value+" delete ports"+delports.value+"\n";
		}														
	}
	// Configure Spanning Tree
	if(document.getElementById("stpd") !== null && document.getElementById("stpd").checked){
		output += "configure stpd s0 delete vlan Default ports all\n";
		output += "disable stpd s0 auto-bind vlan Default\n";
		output += "configure stod s0 auto-bind Default\n";
		output += "create stpd s1\n";
		output += "configure stpd s1 mode mstp msti 1\n";

		output += "enable stpd s1 auto-bind vlan Default\n";

		for (var i=0;i<=vlanCount;i++)
			if(document.getElementById("vlan"+i) !== null){
				vlan = document.getElementById("vlan"+i);

				if(vlan.value.length > 0)
					output += "enable stpd s1 auto-bind vlan "+vlan.value+"\n";					
			}
		
		output += "enable stpd s0\n";
		output += "enable stpd s1\n";
	}
		

	// Additional Configuration
	// ssh2 options
	if(document.getElementById('panelAdditional').style.display !== "none"){
		var confssh2  = document.getElementById("confssh2");
		if (confssh2.checked)
			output += "configure ssh2 key\n";

		var enablessh2 = document.getElementById("enablessh2");
		if (enablessh2.checked)
			output += "enable ssh2\n";

		var disablehttp  = document.getElementById("disablehttp");
		if (disablehttp.checked)
			output += "disable web http\n";			
	
	// Banner Options	
		if (document.getElementById("bannerCheck").checked){
			var bannerAfter = document.getElementById("bannerAfter").value;
			var bannerBefore = document.getElementById("bannerBefore").value;

			if(bannerBefore.length>0)
				output += "configure banner banner-login\n"+bannerBefore+"\n\n\n";

			if(bannerAfter.length>0)
				output += "configure banner after-login\n"+bannerAfter+"\n\n\n";				
		}
	}
		
	

	document.getElementById("output").value = output;
}	

// Function for download in TXT file
function downloadTXT(){
	var script = document.getElementById('output').value;	
	script = script.replace(/\n/g, "\r\n");
	var filename = document.getElementById('filename').value;
	var link = document.createElement('a');
	mimeType = 'text/plain';

	if(filename.length>1)
		link.setAttribute('download', filename+".txt");
	else
		link.setAttribute('download', "output.txt");

	link.setAttribute('href', 'data:' + mimeType  +  ';charset=utf-8,' + encodeURIComponent(script));
	link.click();
}

// Function for download in XML file
function downloadXML(){
	var script = document.getElementById('output').value;
	script = script.replace(/\n/g, "\r\n");
	var filename = document.getElementById('filename').value;
	var link = document.createElement('a');
	mimeType = 'text/plain';

	if(filename.length>1)
		link.setAttribute('download', filename+".xml");
	else
		link.setAttribute('download', "output.xml");

	link.setAttribute('href', 'data:' + mimeType  +  ';charset=utf-8,' + encodeURIComponent(script));
	link.click();
}

function exportEmail(){
	var script = document.getElementById('output').value;
	script = script.replace(/\n/g, "\r\n");
	var subject = document.getElementById('filename').value;
			
    var body = "Script gerado pelo Gerador de Scripts da TDec Network Group (www.tdec.com.br):\r\n\r\n";
    body += script;
    var uri = "mailto:?subject=";
    if(filename.length>1)
    	uri += encodeURIComponent(subject);
    else
    	uri += encodeURIComponent("TDec Network Group - Gerador de Scripts");
    uri += "&body=";
    uri += encodeURIComponent(body);
    window.open(uri);
}

function toggler(divId) {
    $("#"+divId).toggle();
}

function refresh() {
	location.reload();
}

/**$(function() {
	$(".lined").linedtextarea(
		{selectedLine: 1}
	);

	$("#output").linedtextarea();
});*/