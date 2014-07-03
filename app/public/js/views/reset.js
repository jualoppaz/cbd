
$(document).ready(function(){
	
	var rv = new ResetValidator();
	
	$('#set-password-form').ajaxForm({
		beforeSubmit : function(formData, jqForm, options){;
			rv.hideAlert();
			if (rv.validatePassword($('#pass-tf').val()) == false){
				return false;
			} 	else{
				return true;
			}
		},
		success	: function(responseText, status, xhr, $form){
			rv.showSuccess("Su contraseña ha sido restaurada correctamente.");
			setTimeout(function(){ window.location.href = '/'; }, 10000);
		},
		error : function(){
			rv.showAlert("Algo salió mal. Inténtelo de nuevo.");
		}
	});

	$('#set-password').modal('show');
	//$('#set-password').on('shown', function(){ $('#pass-tf').focus(); })

});