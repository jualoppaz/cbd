
function ResetValidator(){
    
// modal window to allow users to reset their password //
    this.setPassword = $('#set-password');
    this.setPassword.modal({ show : false, keyboard : false, backdrop : 'static' });
    this.setPasswordAlert = $('#content .alert');

    $('#get-credentials').modal('show');
}

ResetValidator.prototype.validatePassword = function(s)
{
	if (s.length >= 6){
		return true;
	}	else{
		this.showAlert('La contraseña debe tener, al menos, 6 caracteres.');
		return false;
	}
}

ResetValidator.prototype.showAlert = function(m)
{
	this.setPasswordAlert.attr('class', 'alert alert-danger');
	this.setPasswordAlert.html(m);
	this.setPasswordAlert.show();
}

ResetValidator.prototype.hideAlert = function()
{
    this.setPasswordAlert.hide();
}

ResetValidator.prototype.showSuccess = function(m)
{
	this.setPasswordAlert.attr('class', 'alert alert-success');
	this.setPasswordAlert.html(m);
	this.setPasswordAlert.fadeIn(500);
}