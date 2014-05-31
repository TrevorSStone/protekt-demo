$(document).ready(function(){
	console.log("page loaded");
	$("#demo-password-field").on('input', function(){
		var typedpass = $(this).val();

		$(".panel").each(function(){

			var newPassword = "";
			if (typedpass.length > 0)
			{
				var domain = $(this).data("domain");
				newPassword = generatePassword(typedpass, domain);
			}

			$(this).find(".panel-body").text(newPassword);
		});
	});
});


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
