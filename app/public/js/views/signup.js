
$(document).ready(function(){
	
	var av = new AccountValidator();
	var sc = new SignupController();
	
	$('#account-form').ajaxForm({
		beforeSubmit : function(formData, jqForm, options){
			return av.validateForm();
		},
		success	: function(responseText, status, xhr, $form){
			if (status == 'success') {
                //$('.modal-alert').modal('show');
                $('#modal-cuenta').modal('show');
            }
		},
		error : function(e){
			if (e.responseText == 'email-taken'){
			    av.showInvalidEmail();
			}	else if (e.responseText == 'username-taken'){
			    av.showInvalidUserName();
			}
		}
	});
	$('#name-tf').focus();
	
// customize the account signup form //
	
	$('#account-form h1').text('Registro');
	$('#account-form #sub2').text('Elija su usuario y su contraseña');
	$('#account-form-btn1').html('Cancelar');
	$('#account-form-btn2').html('Guardar');
	$('#account-form-btn2').addClass('btn-primary');
	
// setup the alert that displays when an account is successfully created //

    /*
	$('.modal-alert').modal({ show : false, keyboard : false, backdrop : 'static' });
	$('.modal-alert .modal-header h3').text('Success!');
	$('.modal-alert .modal-body p').html('Your account has been created.</br>Click OK to return to the login page.');
	*/

    $('#modal-cuenta-titulo').text('Enhorabuena');
    var ul = $('#mensaje');
    ul.empty();
    ul.append('Su cuenta ha sido creada correctamente.');
    $('#modal-generic').modal({show: false});

})