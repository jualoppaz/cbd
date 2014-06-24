
var CT            = require('./modules/country-list');
var DBM           = require('./modules/data-base-manager');
var EM            = require('./modules/email-dispatcher');
var mongoose      = require('mongoose'),
    Schema        = mongoose.Schema;
var ObjectId = require('mongodb').ObjectID;

var AccountSchema = new Schema({
    name:        String,
    username:    String,
    password:    String,
    email:       String
});

var Account    = mongoose.model('Account', AccountSchema);

var CommentSchema = new Schema({
    text: String,
    //user: { type: ObjectId, ref: 'Account' }
    user: [AccountSchema]
});

/*
var TripSchema = new Schema({
    title: String,
    place:  String,
    price: String,
    //comments: [Comment],
    comments: [{ type: ObjectId, ref: 'Comment'}]
});

var Trip  = mongoose.model('Trip', TripSchema);*/

/*
CommentSchema.plugin(relationships, {
    belongsTo : "Account"
    , through   : "user"
});

TripSchema.plugin(relationships, {
    hasMany   : "Account"
    , through   : "users"
});

AccountSchema.plugin(relationships, {
    hasMany   : "Trip"
    , through   : "trips"
});*/

//AccountSchema.habtm('Trip');
//TripSchema.habtm('User');





module.exports = function(app) {

// main login page //

	app.get('/', function(req, res){
	// check if the user's credentials are saved in a cookie //
		if (req.cookies.user == undefined || req.cookies.pass == undefined){
			res.render('login', { title: 'Hello - Please Login To Your Account' });
		}	else{
	// attempt automatic login //
			DBM.autoLogin(req.cookies.user, req.cookies.pass, function(o){
				if (o != null){
				    req.session.user = o;
					//res.redirect('/home');
                    res.redirect('/index')
				}	else{
					res.render('login', { title: 'Hello - Please Login To Your Account' });
				}
			});
		}
	});

	app.post('/', function(req, res){
		DBM.manualLogin(req.param('user'), req.param('pass'), function(e, o){
			if (!o){
				res.send(e, 400);
			}	else{
			    req.session.user = o;
				if (req.param('remember-me') == 'true'){
					res.cookie('user', o.user, { maxAge: 900000 });
					res.cookie('pass', o.pass, { maxAge: 900000 });
				}
				res.send(o, 200);
			}
		});
	});

// logged-in user homepage //

	app.get('/home', function(req, res) {
	    if (req.session.user == null){
	// if user is not logged-in redirect back to login page //
	        res.redirect('/');
	    }   else{
			res.render('home', {
				title : 'Control Panel',
				countries : CT,
				udata : req.session.user
			});
	    }
	});

	app.post('/home', function(req, res){
		if (req.param('user') != undefined) {
			DBM.updateAccount({
				user 		: req.param('user'),
				name 		: req.param('name'),
				email 		: req.param('email'),
				country 	: req.param('country'),
				pass		: req.param('pass')
			}, function(e, o){
				if (e){
					res.send('error-updating-account', 400);
				}	else{
					req.session.user = o;
			// update the user's login cookies if they exists //
					if (req.cookies.user != undefined && req.cookies.pass != undefined){
						res.cookie('user', o.user, { maxAge: 900000 });
						res.cookie('pass', o.pass, { maxAge: 900000 });
					}
					res.send('ok', 200);
				}
			});
		}	else if (req.param('logout') == 'true'){
			res.clearCookie('user');
			res.clearCookie('pass');
			req.session.destroy(function(e){ res.send('ok', 200); });
		}
	});


    app.get('/index', function(req, res) {
        if (req.session.user == null){
            // if user is not logged-in redirect back to login page //
            res.redirect('/');
        }   else{
            res.render('index', {
                title : 'CBD',
                countries : CT,
                udata : req.session.user
            });
        }
    });

    app.post('/index', function(req, res){
        if (req.param('user') != undefined) {
            DBM.updateAccount({
                user 		: req.param('user'),
                name 		: req.param('name'),
                email 		: req.param('email'),
                country 	: req.param('country'),
                pass		: req.param('pass')
            }, function(e, o){
                if (e){
                    res.send('error-updating-account', 400);
                }	else{
                    req.session.user = o;
                    // update the user's login cookies if they exists //
                    if (req.cookies.user != undefined && req.cookies.pass != undefined){
                        res.cookie('user', o.user, { maxAge: 900000 });
                        res.cookie('pass', o.pass, { maxAge: 900000 });
                    }
                    res.send('ok', 200);
                }
            });
        }	else if (req.param('logout') == 'true'){
            console.log("Logout: servidor");
            res.clearCookie('user');
            res.clearCookie('pass');
            req.session.destroy(function(e){ res.send('ok', 200); });
        }
    });

    app.post('/trip', function(req, res){
        if (req.param('user') != undefined) {
            DBM.updateAccount({
                user 		: req.param('user'),
                name 		: req.param('name'),
                email 		: req.param('email'),
                country 	: req.param('country'),
                pass		: req.param('pass')
            }, function(e, o){
                if (e){
                    res.send('error-updating-account', 400);
                }	else{
                    req.session.user = o;
                    // update the user's login cookies if they exists //
                    if (req.cookies.user != undefined && req.cookies.pass != undefined){
                        res.cookie('user', o.user, { maxAge: 900000 });
                        res.cookie('pass', o.pass, { maxAge: 900000 });
                    }
                    res.send('ok', 200);
                }
            });
        }	else if (req.param('logout') == 'true'){
            console.log("Logout: servidor");
            res.clearCookie('user');
            res.clearCookie('pass');
            req.session.destroy(function(e){ res.send('ok', 200); });
        }
    });

    app.get('/trips/:id', function(req, res) {
        if (req.session.user == null){
            // if user is not logged-in redirect back to login page //
            res.redirect('/');
        }   else{
            res.render('trip', {
                title : 'CBD',
                countries : CT,
                udata : req.session.user
            });
        }
    });

// creating new accounts //

	app.get('/signup', function(req, res) {
		res.render('signup', {  title: 'Signup', countries : CT });
	});

	app.post('/signup', function(req, res){
		DBM.addNewAccount({
			name 	: req.param('name'),
			email 	: req.param('email'),
			user 	: req.param('user'),
			pass	: req.param('pass'),
			country : req.param('country')
		}, function(e){
			if (e){
				res.send(e, 400);
			}	else{
				res.send('ok', 200);
			}
		});
	});

// password reset //

	app.post('/lost-password', function(req, res){
	// look up the user's account via their email //
		DBM.getAccountByEmail(req.param('email'), function(o){
			if (o){
				res.send('ok', 200);
				EM.dispatchResetPasswordLink(o, function(e, m){
				// this callback takes a moment to return //
				// should add an ajax loader to give user feedback //
					if (!e) {
					//	res.send('ok', 200);
					}	else{
						res.send('email-server-error', 400);
						for (k in e) console.log('error : ', k, e[k]);
					}
				});
			}	else{
				res.send('email-not-found', 400);
			}
		});
	});

	app.get('/reset-password', function(req, res) {
		var email = req.query["e"];
		var passH = req.query["p"];
		DBM.validateResetLink(email, passH, function(e){
			if (e != 'ok'){
				res.redirect('/');
			} else{
	// save the user's email in a session instead of sending to the client //
				req.session.reset = { email:email, passHash:passH };
				res.render('reset', { title : 'Reset Password' });
			}
		})
	});

	app.post('/reset-password', function(req, res) {
		var nPass = req.param('pass');
	// retrieve the user's email from the session to lookup their account and reset password //
		var email = req.session.reset.email;
	// destory the session immediately after retrieving the stored email //
		req.session.destroy();
		DBM.updatePassword(email, nPass, function(e, o){
			if (o){
				res.send('ok', 200);
			}	else{
				res.send('unable to update password', 400);
			}
		})
	});

// view & delete accounts //

	app.get('/print', function(req, res) {
		DBM.getAllRecords( function(e, accounts){
			res.render('print', { title : 'Account List', accts : accounts });
		})
	});

	app.post('/delete', function(req, res){
		DBM.deleteAccount(req.body.id, function(e, obj){
			if (!e){
				res.clearCookie('user');
				res.clearCookie('pass');
	            req.session.destroy(function(e){ res.send('ok', 200); });
			}	else{
				res.send('record not found', 400);
			}
	    });
	});

	app.get('/reset', function(req, res) {
		DBM.delAllRecords(function(){
			res.redirect('/print');
		});
	});


    // queries

    app.get('/api/trips', function(req, res) {
        DBM.findAllTrips(function(err, excursiones){
            if(err) {
                res.send(err);
            }else{
                res.json(excursiones);
            }
        });
    });

    app.get('/api/trips/:id', function(req, res) {
        DBM.findTripById(req.params.id, function(err, excursion){
            if(err){
                res.send(err);
            }else{
                res.json(excursion);
            }
       });
    });

    /*
    app.post('/api/trips/:id', function(req, res) {
        DBM.findTripById(req.params.id, function(err, excursion){
            if(err){
                res.send(err);
            }
            res.json(excursion);
            console.log("JSON: ");
            console.log(excursion);
        });
    });
    */

    app.get('/api/user', function(req, res) {
       res.send(req.session.user.user);
    });

    app.get('/api/users/:id', function(req, res) {
        DBM.findUserById(req.params.id, function(err, user){
            if(err){
                res.send(err);
            }else{
                res.send(user);
            }
        });
    })

    app.get('/diagrams', function(req, res) {
        if (req.session.user == null){
            // if user is not logged-in redirect back to login page //
            res.redirect('/');
        }   else{
            res.render('diagrams');
        }
    });

    /*
    app.post('/api/trips/:id/users', function(req, res) {

    });*/

    /*
    app.get('/api/trips/:id/users', function(req, res) {
        DBM.findTripById(req.params.id, function(err, trip){
            console.log("Paso x aki");
            if(err){
                console.log("Error");
                res.send(err);
            }else{
                var users = {"users": []};
                console.log("Usuarios");
                console.log(trip.users);
                console.log("Usuario 1");
                console.log(trip.users[1].user);
                for(i=0; i<trip.users.length; i++){
                    console.log("i: " + i);
                    console.log("Id del usuario: " + trip.users[i].user);
                    DBM.findUserById(String(trip.users[i].user), function(err2, user){
                        if(err2){
                            console.log("Error");
                            res.send(err2);
                        }else{
                            console.log("Numero de usuarios: " + trip.users.length);
                            console.log("i: " + i);
                            var usuario = {"user": user.name};
                            users.users.push(usuario);

                            console.log("Anadimos el usuario: " + user.name);
                            console.log("JSON: ");
                            console.log(users);
                        }
                    });
                    res.send(trip);
                }
            }
        });
    });
    */

    app.get('/api/trips/:id/users', function(req, res) {
        DBM.findUsersByTripId(req.params.id, function(err, users){
            if(err){
                res.send(err);
            }else{
                res.send(users[0].users);
                //Enviamos la primera posicion para enviar el documento suelto, y no dentro de una coleccion
            }
        });
    });

    app.get('/api/trips/:id/comments', function(req, res) {
        DBM.findCommentsByTripId(req.params.id, function(err, users){
            if(err){
                res.send(err);
            }else{
                res.send(users[0].comments);
                //Enviamos la primera posicion para enviar el documento suelto, y no dentro de una coleccion
            }
        });
    });

    /*  OPCION 2: Si los usuarios no se actualizan justo despues de hacer el insert, podemos hacer la
        peticion anidada con Angular*/

    /*
    app.post('/api/trips/:id/users', function(req, res) {
        console.log("Datos del usuario logueado");
        console.log("nombre: " + req.session.user.name);
        console.log("user: " + req.session.user.user);
        DBM.addNewUserToTrip(req.params.id, req.session.user, function(err, users){
            if(err){
                console.log("Error");
                res.send(err);
            }else{
                res.send("Actualizado");
            }
        });
    });
    */

    app.post('/api/trips/:id/users', function(req, res) {
        console.log("Datos del usuario logueado");
        console.log("nombre: " + req.session.user.name);
        console.log("user: " + req.session.user.user);
        DBM.addNewUserToTrip(req.params.id, req.session.user, function(err, users){
            if(err){
                console.log("Error");
                res.send(err);
            }else{
                DBM.findUsersByTripId(req.params.id, function(err2, users2) {
                   if(err2) {
                       res.send(err2);
                   }else{
                       console.log("Usuarios actualizados");
                       console.log(users2[0].users);
                       res.send(users2[0].users);
                   }
                });
            }
        });
    });

    app.post('/api/trips/:id/comments', function(req, res) {
        console.log("Datos del usuario logueado");
        console.log("nombre: " + req.session.user.name);
        console.log("user: " + req.session.user.user);
        DBM.addNewCommentToTrip(req.params.id, req.session.user, req.body.comment, function(err, comments){
            if(err){
                console.log("Error");
                res.send(err);
            }else{
                DBM.findCommentsByTripId(req.params.id, function(err2, comments2) {
                    if(err2) {
                        res.send(err2);
                    }else{
                        console.log("Comentarios actualizados");
                        console.log(comments2[0].comments);
                        res.send(comments2[0].comments);
                    }
                });
            }
        });
    });

	app.get('*', function(req, res) { res.render('404', { title: 'Page Not Found'}); });

};