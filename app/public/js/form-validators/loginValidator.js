
function LoginValidator(){

// bind a simple alert window to this controller to display any errors //

	this.loginErrors = $('.modal-alert');
	this.loginErrors.modal({ show : false, keyboard : true, backdrop : true });

	this.showLoginError = function(t, m)
	{
        /*
		$('.modal-alert .modal-header h3').text(t);
		$('.modal-alert .modal-body p').text(m);
		this.loginErrors.modal('show');*/
        $('#modal-titulo').text(t);
        var ul = $('#errores');
        ul.empty();
        ul.append('<li>'+m+'</li>');
        $('#modal-generic').modal('show');
	}

}

LoginValidator.prototype.validateForm = function()
{
	if ($('#user-tf').val() == ''){
		this.showLoginError('Se ha producido un fallo', 'Introduzca un usuario válido');
		return false;
	}	else if ($('#pass-tf').val() == ''){
		this.showLoginError('Se ha producido un fallo', 'PIntroduzca una contraseña válida');
		return false;
	}	else{
		return true;
	}
}