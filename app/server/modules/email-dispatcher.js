
var ES = require('./email-settings');
var EM = {};
module.exports = EM;

EM.server = require("emailjs/email").server.connect({

	host 	    : ES.host,
	user 	    : ES.user,
	password    : ES.password,
	ssl		    : true

});

EM.dispatchResetPasswordLink = function(account, callback)
{
	EM.server.send({
		from         : ES.sender,
		to           : account.email,
		subject      : 'Reinicio de contraseña',
		text         : 'Algo salió mal',
		attachment   : EM.composeEmail(account)
	}, callback );
}

EM.composeEmail = function(o)
{
	//var link = 'http://cbd.herokuapp.com/reset-password?e='+o.email+'&p='+o.pass;

    var link = 'http://localhost:3000/reset-password?e='+o.email+'&p='+o.pass;

    /*

    To try this in localhost you must put something like:

        var link = 'localhost:3000/reset-password?e='+o.email+'&p='+o.pass;

    You can also put your own deployed application

    */

	var html = "<html><body>";
		html += "Hola "+o.name+",<br><br>";
		html += "Su usuario es :  + <b>"+o.user+"</b><br><br>";
		html += "<a href='"+link+"'>Por favor, haga click aqu&iacute; para reestablecer tu contraseña</a><br><br>";
		html += "Un saludo,<br>";
		html += "<a href='http://twitter.com/LopezPazos14'>Juanma</a><br><br>";
		html += "</body></html>";
	return  [{data:html, alternative:true}];
}