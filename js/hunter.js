console.log("log from extension: protekt");



//how can i better organize hunter

/*
** what are the classes? what will they do? 
I need to identify the fields; need to identify their state
once state is tweaked, 
*/
function lockButtonForPasswords() {

	$.each($("input[type='password']"), function() {
		$(this).wrap("<span style='position:relative'></span>");
		$(this).after("<a href='#' data-forField='"+$(this).attr("id")+"' id='hashster' class='hashster'><span class='fa-stack fa-lg'><i class='fa fa-circle fa-stack-2x'></i><i class='fa fa-lock fa-stack-1x fa-inverse'></i></span></a>");
		//wrap all
		$(this).css("display", "inline-block");
	});
}

$( document ).ajaxComplete(function() {
  lockButtonForPasswords();
});

document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('hashster');
    // onClick's logic below:
    link.addEventListener('click', hashster_onClick);
});

$(".hashster").click(hashster_onClick);

function hashster_onClick(){
	console.log("click event");
	passwordField = $("#"+$(this).data("forfield"));
	var passtext = passwordField.val();
	var domain = getDomain(location.href);

	if(typeof passtext === "string" && passtext.length > 0)
	{
		var hashedPass = generatePassword(passtext, domain);
		passwordField.val(hashedPass.toString());
	}
    
}

function getHostName(url) {
    var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
    if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
    return match[2];
    }
    else {
        return null;
    }
}

function getDomain(url) {
    var hostName = getHostName(url);
    var domain = hostName;
    
    if (hostName != null) {
        var parts = hostName.split('.').reverse();
        
    if (parts != null && parts.length > 1) {
        domain = parts[1] + '.' + parts[0];
            
        if (hostName.toLowerCase().indexOf('.co.uk') != -1 && parts.length > 2) {
          domain = parts[2] + '.' + domain;
        }
    }
    }
    
    return domain;
}


function generatePassword(pass, domain)
{
	console.log("Password for: "+pass+domain);
	var hashblock = [
		'a', 'b', 'c', 'd','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','0','1','2','3','4','5','6','7','8','9','0','@','!',
		'A', 'B', 'C', 'D', 'E', 'F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'

	];
	var specialChar = [ '@', '%', '+', '\\', '/', '\'', '!', '#', '$', '^', '?', ':', '.', '(', ')', ']', '[', '~', '-'];
	
	var hash = CryptoJS.SHA3(pass+domain, { outputLength: 256 }).toString(CryptoJS.enc.Hex);
	var count = 0; var newPass = "";
	for (var i = 0; i < hash.length; i++)
	{
		count += parseInt(hash[i], 16);
		if((i+1)%4 == 0)
		{
			newPass += hashblock[count];
			count = 0;
		}
		
	}

	newPass += specialChar[parseInt(hash, 16) % specialChar.length];

	console.log(newPass);
	return newPass;
}

lockButtonForPasswords();