var express = require('express');
var parser = require('body-parser');
var urlParser = parser.urlencoded({extended:false});
var fs = require('fs');

var app = express();

app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));


app.set('view engine', 'ejs');

/*----------------------------      LOGIN       -------------------------------------------------*/

app.post('/login', urlParser, function(req, res){
	fs.readFile( __dirname + "/" + "data/base.json", 'utf8', function (err, data) {
		var data = JSON.parse(data);
		var usuario = req.body.usuario;
	    var clave = req.body.clave;
	    var mensaje = {found:false};

        
        var db = data;

        for (var i = db.usuarios.length - 1; i >= 0; i--) {
            if (db.usuarios[i].usuario === usuario 
                && db.usuarios[i].clave === clave)
            {
                mensaje.found = true;
                mensaje.user = db.usuarios[i];
            }
        }
        
	    res.send(JSON.stringify(mensaje));
    });

});

//MOSTRAR SEGÚN EL TIPO DE USUARIO LOGEADO
app.get('/admin', function (req,res){
	res.render('menu');
});
        
app.get('/encuestador', function (req,res){
	res.render('encuestador-screen');
});
        
    
//    var objUser = {};
//	var nick = req.params.usuario;
//    
//	fs.readFile( __dirname + "/" + "data/base.json", 'utf8', function (err, data) {
//		data = JSON.parse(data);
//		var db = data;
//        //usuarios.push(data);
//        
//        for (var i = db.usuarios.length - 1; i >= 0; i--) {
//			if (db.usuarios[i].usuario == nick)
//			{
//				objUser = db.usuarios[i];
//                
//				res.render('menu'); 
//			}
//		}
//
//		for (var i = db.encuestador.length - 1; i >= 0; i--) {
//			if (db.encuestador[i].usuario == nick)
//			{
//				objUser = db.encuestador[i];
//				res.render('encuestador-screen',{'profile':objUser}); 
//			}
//		}
//		
//    });

	
//});



/*-----------------------   CRUD PRESIDENTE     -------------------------*/

//MOSTRAR PANTALLA DE PRESIDENTES CON TABLAS Y BOTONES PARA EL CRUD
app.get('/admin/presidentes', urlParser, function(req,res){
	fs.readFile( __dirname + "/" + "data/base.json", 'utf8', function (err, data) {
		data = JSON.parse(data);
		var db = data;
		res.render('presidente-screen',{'db':db});
	})		 
});



//CREAR PRESIDENTE
app.post('/admin/presidente', urlParser, function(req, res){
//	console.log(req.body)
    var objUser = {
        'id_presidente':'',
		'cedula': req.body.cedulaP,
		'foto': req.body.fotoP,
		'nombre': req.body.nombreP,
        'id_partido': 0,
		'apellido': req.body.apellidoP,
		'edad': req.body.edadP,
		'campaña': req.body.campaniaP,
		'nro_votos': 0,
		'vicepresidente':{
			'cedula': req.body.cedulaV,
			'foto': req.body.fotoV,
			'nombre': req.body.nombreV,
			'apellido': req.body.apellidoV,
			'edad': req.body.edadV
		}
	}
	
    var respuesta = {found:false, mensaje:''};
    
	fs.readFile( __dirname + "/" + "/data/base.json", 'utf8', function (err, data) {
		data = JSON.parse(data);
        //usuarios.push(data);
        
        var db = data;
		for (var i = db.candidato.presidente.length - 1; i >= 0; i--) {
			if (db.candidato.presidente[i].cedula == objUser.cedula)
			{
				respuesta.found = true;
			}
		}

		if(!respuesta.found){
            objUser.id_presidente = db.candidato.presidente[db.candidato.presidente.length - 1].id_presidente + 1;
			db.candidato.presidente.push(objUser);
			fs.writeFile("data/base.json", JSON.stringify(db, null, 3));
			respuesta.mensaje="Nuevo presidente creado";

		}else{
			respuesta.mensaje="El presidente ya estaba guardado en la base";
		}
		
		res.send(JSON.stringify(respuesta));
	});

});




/*Solo cargan los formularios*/
app.get('/admin/presidente/:id', function (req,res){
	var objUser = {};
	var nick = req.params.id;

	fs.readFile( __dirname + "/" + "/data/base.json", 'utf8', function (err, data) {
		var users = JSON.parse(data);
        //usuarios.push(data);
        var db = users.candidato;
        var datos = users.partido;
        for (var i = db.presidente.length - 1; i >= 0; i--) {
			if (db.presidente[i].id_presidente == nick)
			{
				objUser = db.presidente[i];
			}
		}
		res.render('modificar-pres',{'perfil':objUser, 'datos':datos}); //aqui vienen los datos y se pasan con un json
    });

	
});



//ELIMINAR PRESIDENTE
app.delete('/admin/presidente/:id', function (req,res){
    var id = req.params.id;
    var respuesta = {deleted:false};
    
    
    fs.readFile( __dirname + "/" + "/data/base.json", 'utf8', function (err, data) {
        var db = JSON.parse(data);
        
        db.candidato.presidente.splice(id, 1);
        
        fs.writeFile("data/base.json", JSON.stringify(db, null, 3), function(err, data){
            if (err){
                console.log(err);
                respuesta.deleted = false;
            }else respuesta.deleted = true;
            res.send(JSON.stringify(respuesta))
        });
    })
    
})




//ACTUALIZAR PRESIDENTE
app.put('/admin/presidente/:id', urlParser, function(req,res){
	var id = req.params.id
	fs.readFile( __dirname + "/" + "/data/base.json", 'utf8', function (err, data) {
		found = false;
		data = JSON.parse(data);
		var db = data;
        //usuarios.push(data);
        
        for (var i = db.candidato.presidente.length - 1; i >= 0; i--) {
			if (db.candidato.presidente[i].id_presidente == id)
			{
				found = true;
				if(req.body.cedula)
					db.candidato.presidente[i].cedula = req.body.cedula;
				
				if(req.body.nombre)
					db.candidato.presidente[i].nombre = req.body.nombre;
				
				if(req.body.apellido)
					db.candidato.presidente[i].apellido = req.body.apellido;
				
				if(req.body.edad)
					db.candidato.presidente[i].edad = req.body.edad;
				
				if(req.body.campaña)
					db.candidato.presidente[i].campaña = req.body.campaña;

				if(req.body.cedulaV)
					db.candidato.presidente[i].vicepresidente.cedula = req.body.cedulaV;

				if(req.body.nombreV)
					db.candidato.presidente[i].vicepresidente.nombre = req.body.nombreV;

				if(req.body.apellidoV)
					db.candidato.presidente[i].vicepresidente.apellido = req.body.apellidoV;

				if(req.body.edadV)
					db.candidato.presidente[i].vicepresidente.edad = req.body.edadV;
				console.log(db[i]);
				break;
				}
				
			}

		var respuesta = {found: found};
		if(found)
			respuesta.mensaje = "El presidente ha sido actualizado";
		else
			respuesta.mensaje = "No hemos encontrado la informacion";
		
		fs.writeFile("data/base.json", JSON.stringify(db));
		res.send(JSON.stringify(respuesta));
		res.end();	
	})	
});



/*-------------------------------------------------------------------------------------------------*/
/*-----------------------------     CRUD ASAMBLEISTAS       ---------------------------------------*/


//MOSTRAR PANTALLA CON LISTA DE ASAMBLEISTAS Y EL CRUD
app.get('/admin/asambleistas', urlParser, function(req,res){
	fs.readFile( __dirname + "/" + "data/base.json", 'utf8', function (err, data) {
		data = JSON.parse(data);
		var db = data.candidato;
		res.render('asambleista-screen',{'asambleista':db});
	})		 
});



//CREAR ASAMBLEISTA
app.post('/admin/asambleista', urlParser, function(req, res){
	var objUser = {
		'cedula': req.body.cedula_asam,
		'nombre': req.body.nombre_asam,
		'apellido': req.body.apellido_asam,
		'edad': req.body.edad_asam
	}
	var found = false;
	fs.readFile( __dirname + "/" + "/data/base.json", 'utf8', function (err, data) {
		data = JSON.parse(data);
        //usuarios.push(data);
        
        var db = data;
		for (var i = db.candidato.asambleista.length - 1; i >= 0; i--) {
			if (db.candidato.asambleista[i].cedula == objUser.cedula)
			{
				found = true;
			}
		}
		var mensaje = '';
		if(!found){
             objUser.id_asambleista = db.candidato.asambleista[db.candidato.asambleista.length - 1].id_asambleista + 1;
			db.candidato.asambleista.push(objUser);
			fs.writeFile("data/base.json", JSON.stringify(db, null, 3));
			mensaje="Nuevo asambleista creado";

		}else{
			mensaje="El asambleista ya estaba guardado en la base";
		}
		
		res.send({mensaje:mensaje,found:found});
		res.end();
	});

});


//ELIMINAR ASAMBLEISTA
app.delete('/admin/asambleista/:id', function (req,res){
    var id = req.params.id;
    var respuesta = {deleted:false};
    
    
    fs.readFile( __dirname + "/" + "/data/base.json", 'utf8', function (err, data) {
        var db = JSON.parse(data);
        
        db.candidato.asambleista.splice(id, 1);
        
        fs.writeFile("data/base.json", JSON.stringify(db, null, 3), function(err, data){
            if (err){
                console.log(err);
                respuesta.deleted = false;
            }else respuesta.deleted = true;
            res.send(JSON.stringify(respuesta))
        });
    })
    
})







/*-----------------------------------------------------------------------------------------------------*/
/*------------------------------------  CRUD PARTIDOS   -----------------------------------------------*/

//MOSTRAR PANTALLA E PARTIDOS CON EL CRUD
app.get('/admin/partidos', urlParser, function(req,res){
	fs.readFile( __dirname + "/" + "data/base.json", 'utf8', function (err, data) {
		data = JSON.parse(data);
		var db = data.partido;
		res.render('partido-screen',{'partido':db});
	})		 
});


app.post('/admin/partido', urlParser, function(req, res){
	var objUser = {
		'lista': req.body.lista_prt,
		'nombre': req.body.nombre_prt
	}
	var found = false;
	fs.readFile( __dirname + "/" + "/data/base.json", 'utf8', function (err, data) {
		data = JSON.parse(data);
        //usuarios.push(data);
        
        var db = data;
		for (var i = db.partido.length - 1; i >= 0; i--) {
			if (db.partido[i].nombre == objUser.nombre)
			{
				found = true;
			}
		}
		var mensaje = '';
		if(!found){
			db.partido.push(objUser);
			fs.writeFile("data/base.json", JSON.stringify(db, null, 3));
			mensaje="Nuevo.partido creado";

		}else{
			mensaje="El partido ya estaba guardado en la base";
		}
		console.log(db.partido);
		
		res.send(mensaje + "<a href='http://localhost:3000/perfil/admin/partido'><br>Volver</a>");
		res.end();
	});

});






//ELIMINAR PARTIDO
app.delete('/admin/partido/:id', function (req,res){
	console.log(req.params.id);

     var id = req.params.id;
    var respuesta = {deleted:false};
    
    
    fs.readFile( __dirname + "/" + "/data/base.json", 'utf8', function (err, data) {
        var db = JSON.parse(data);
        
        db.partido.splice(id, 1);
        
        fs.writeFile("data/base.json", JSON.stringify(db, null, 3), function(err, data){
            if (err){
                console.log(err);
                respuesta.deleted = false;
            }else respuesta.deleted = true;
            res.send(JSON.stringify(respuesta))
        });
    })
    
    
});




//CREAR PARTIDO 
app.post('/admin/partido', urlParser, function(req, res){
//	console.log(req.body)
    var objPrt = {
    
        'lista':req.body.lista,
		'nombre': req.body.nombre
		
	};
	
    console.log("------------------"+objPrt);
    var respuesta = {found:false, mensaje:''};
    
	fs.readFile( __dirname + "/" + "/data/base.json", 'utf8', function (err, data) {
		data = JSON.parse(data);
        //usuarios.push(data);
        
        var db = data;
		
		respuesta.found = false;
        
            objPrt.id_partido = db.partido[db.partido.length - 1].id_partido + 1;
			db.partido.push(objPrt);
			fs.writeFile("data/base.json", JSON.stringify(db, null, 3));
			respuesta.mensaje="Nuevo partido creado";

		
		
		res.send(JSON.stringify(respuesta));
	});

});



//CARGAR PANTALLA PARA MODIFICAR PARTIDO
app.get('/admin/partido/:id', function (req,res){
	var objUser = {};
	var nick = req.params.id;

	fs.readFile( __dirname + "/" + "/data/base.json", 'utf8', function (err, data) {
		var users = JSON.parse(data);
        //usuarios.push(data);
        var db = users;
        for (var i = db.partido.length - 1; i >= 0; i--) {
			if (db.partido[i].id_partido == nick)
			{
				objUser = db.partido[i];
			}
		}
		res.render('modificar-prt',{'perfil':objUser}); //aqui vienen los datos y se pasan con un json
    });

	
});



//MODIFICAR PARTIDO
app.put('/admin/partido/:id', urlParser, function(req,res){
	var id = req.params.id
	fs.readFile( __dirname + "/" + "/data/base.json", 'utf8', function (err, data) {
		found = false;
		data = JSON.parse(data);
		var db = data;
        //usuarios.push(data);
        
        for (var i = db.partido.length - 1; i >= 0; i--) {
			if (db.partido[i].id_partido == id)
			{
				found = true;
				if(req.body.lista)
					db.partido[i].lista = req.body.lista;
				
				if(req.body.nombre)
					db.partido[i].nombre = req.body.nombre;
				
				break;
				}
				
			}

		var respuesta = {found: found};
		if(found)
			respuesta.mensaje = "El partido ha sido actualizado";
		else
			respuesta.mensaje = "No hemos encontrado informacion del partido";
		
		fs.writeFile("data/base.json", JSON.stringify(db, null, 3));
		res.send(JSON.stringify(respuesta));
		res.end();	
	})	
});

















app.get('/admin/asambleista/:id', function (req,res){
	var objUser = {};
	var nick = req.params.id;

	fs.readFile( __dirname + "/" + "/data/base.json", 'utf8', function (err, data) {
		var users = JSON.parse(data);
        //usuarios.push(data);
        var db = users.candidato;
        for (var i = db.asambleista.length - 1; i >= 0; i--) {
			if (db.asambleista[i].id_asambleista == nick)
			{
				objUser = db.asambleista[i];
			}
		}
		res.render('modificar-asam',{'perfil':objUser}); //aqui vienen los datos y se pasan con un json
    });

	
});






app.put('/perfil/admin/asambleista/update/:id', urlParser, function(req,res){
	var id = req.params.id
	fs.readFile( __dirname + "/" + "/data/base.json", 'utf8', function (err, data) {
		found = false;
		data = JSON.parse(data);
		var db = data;
        //usuarios.push(data);
        
        for (var i = db.candidato.asambleista.length - 1; i >= 0; i--) {
			if (db.candidato.asambleista[i].id_asambleista == id)
			{
				found = true;
				if(req.body.cedula)
					db.candidato.asambleista[i].cedula = req.body.cedula;
				
				if(req.body.nombre)
					db.candidato.asambleista[i].nombre = req.body.nombre;
				
				if(req.body.apellido)
					db.candidato.asambleista[i].apellido = req.body.apellido;
				
				if(req.body.edad)
					db.candidato.asambleista[i].edad = req.body.edad;
				break;
				}
				
			}

		var respuesta = {found: found};
		if(found)
			respuesta.mensaje = "El asambleista ha sido actualizado";
		else
			respuesta.mensaje = "No hemos encontrado la informacion";
		
		fs.writeFile("data/base.json", JSON.stringify(db));
		res.send(JSON.stringify(respuesta));
		res.end();	
	})	
});










/*app.get('/perfil/admin/presidente/crear', function(req,res){

	fs.readFile( __dirname + "/" + "data/base.json", 'utf8', function (err, data) {
		data = JSON.parse(data);
		var db = data;
		var obj = db.candidato;
       
		res.render('create_presidente',{'candidato':obj}); 
		
    });

})

app.get('/perfil/admin/asambleista/crear', function(req,res){

	fs.readFile( __dirname + "/" + "data/base.json", 'utf8', function (err, data) {
		data = JSON.parse(data);
		var db = data;
		var obj = db.candidato;
       
		res.render('create_asambleista',{'candidato':obj}); 
		
    });

})

*/
app.get('/admin/partido', function(req,res){

	fs.readFile( __dirname + "/" + "data/base.json", 'utf8', function (err, data) {
		data = JSON.parse(data);
		var db = data;
		var obj = db.partido;
       
		res.render('create_partido',{'partido':obj}); 
		
    });

})





/*------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------    ENCUESTADOR     --------------------------------------*/
 var objVotante = {'cedula':"",
		'id_presidente':0,
		'id_asa_partido':0
	}
var objCed = {};
//VALIDAR CÉDULA
app.post('/encuestador/cedula', function(req, res){
    
   // "votante":[{"cedula":" ","id_presidente":"","id_asa_partido":""}]
    console.log('ACA SI LLEGO')
    var respuesta = {found:false, mensaje:''};
    
	 objVotante.cedula = req.body.cedula;
	
	fs.readFile( __dirname + "/" + "data/base.json", 'utf8', function (err, data) {
		data = JSON.parse(data);
        
        var votante = data.votante;
		for (var i = votante.length - 1; i >= 0; i--) {
			if (votante[i].cedula == objVotante.cedula)
			{
				respuesta.found = true;
			}
		}
		
		if(!respuesta.found){
			votante.push(objVotante);
            fs.writeFile("data/votantestmp.json", JSON.stringify(objVotante, null, 3));
			respuesta.mensaje = 'Nueva votacion creada!';
		}else{
            //Hacer tipo Ajax
            respuesta.mensaje = "Ya votó";
		}
		
		res.end(JSON.stringify(respuesta));
	});

});


//MOSTRAR PANTALLA VOTAR
app.get('/encuestador/votaciones/:cedula', function (req,res){
	
    fs.readFile( __dirname + "/" + "data/base.json", 'utf8', function (err, data) {
		data = JSON.parse(data);
        res.render('votar', {'presidentes':data.candidato.presidente, 'asamblea':data.candidato.asamblea,'cedula':req.params.cedula,'partidos':data.partido});
    });
    
    
});
      

//VOTAR PRESIDENTE
app.put('/encuestador/votaciones/presidente/:id', function (req,res){

    var id = req.params.id
	fs.readFile( __dirname + "/" + "/data/base.json", 'utf8', function (err, data) {
		found = false;
		data = JSON.parse(data);
		var db = data;
        //usuarios.push(data);
        
        for (var i = db.candidato.presidente.length - 1; i >= 0; i--) {
			if (db.candidato.presidente[i].id_presidente == id)
			{
				found = true;
		        objVotante.id_presidente = db.candidato.presidente[i].id_presidente;
                objVotante.p_foto = db.candidato.presidente[i].foto;
                objCed.cedula = objVotante.cedula;
                objCed.presidente = objVotante.id_presidente;
				break;
				}
				
			}

		var respuesta = {found: found};
		if(found)
			respuesta.mensaje = "Presidente votado";
		else
			respuesta.mensaje = "No hemos encontrado la informacion";
		
		fs.writeFile("data/base.json", JSON.stringify(db, null, 3));
        fs.writeFile("data/votantestmp.json", JSON.stringify(objVotante, null, 3));
		res.send(JSON.stringify(respuesta));
		res.end();	
	})	
    
});


//VOTAR ASAMBLEISTA
app.put('/encuestador/votaciones/asambleistas/:id', function (req,res){

    var id = req.params.id
	fs.readFile( __dirname + "/" + "/data/base.json", 'utf8', function (err, data) {
		found = false;
		data = JSON.parse(data);
		var db = data;
        //usuarios.push(data);
        
        for (var i = db.candidato.asamblea.length - 1; i >= 0; i--) {
			if (db.candidato.asamblea[i].partido == id)
			{
				found = true;
                objVotante.id_asa_partido = db.candidato.asamblea[i].partido;
                objVotante.logo = db.candidato.asamblea[i].logo;
                 objCed.asambleista = objVotante.id_asa_partido;
                objCed.foto = objVotante.p_foto;
                objCed.logo = objVotante.logo;
				break;
				}
				
			}

		var respuesta = {found: found};
		if(found)
			respuesta.mensaje = "Gracias por usar nuestro sistema";
		else
			respuesta.mensaje = "No hemos encontrado la informacion";
		
		fs.writeFile("data/base.json", JSON.stringify(db, null, 3));
        fs.writeFile("data/votantestmp.json", JSON.stringify(objVotante, null, 3));
		res.send(JSON.stringify(respuesta));
		res.end();	
	})	
    
});

//MOSTRAR RESUMEN DESPUÉS DE VOTAR
app.get('/encuestador/votaciones/resumen/:id', function (req,res){
    
    console.log(objCed.logo);
    
		res.render('resumen', {cedula:objCed.cedula, presidente:objCed.presidente, asambleista:objCed.asambleista, foto: objCed.foto, logo:objCed.logo}); //aqui vienen los datos y se pasan con un json
    });




//GUARDAR VOTO
app.post('/encuestador/votante', function (req,res){
    
 var newVotante = {} ;

fs.readFile( __dirname + "/" + "/data/votantestmp.json", 'utf8', function (err, data) {
		data = JSON.parse(data);
          
        var db = data;

            newVotante.cedula = db.cedula;
            newVotante.presidente = db.id_presidente;
            newVotante.asambleista = db.id_asa_partido;
        
        console.log(newVotante);
    
   }) 

fs.readFile( __dirname + "/" + "/data/base.json", 'utf8', function (err, data) {
		data = JSON.parse(data);
        var respuesta = {};
                
        var db = data;
        db.votante.push(newVotante);
    
        
        fs.writeFile("data/base.json", JSON.stringify(db, null, 3));
        respuesta.mensaje="Voto guardado. Gracias por preferirnos.";
		res.send(JSON.stringify(respuesta));
	})
  
});







app.put('/encuestador/votante', function (req,res){
    
   var v1 = {} ;
fs.readFile( __dirname + "/" + "/data/votantestmp.json", 'utf8', function (err, data) {
		data = JSON.parse(data);
        
        var db = data;

            v1.cedula = db.cedula;
            v1.presidente = db.id_presidente;
            v1.asambleista = db.id_asa_partido;
        
        console.log("---------"+v1.cedula);
});
    
     
	fs.readFile( __dirname + "/" + "/data/base.json", 'utf8', function (err, data) {
		data = JSON.parse(data);
        var respuesta = {};
                
        var db = data;
        
        for (var i = db.candidato.presidente.length - 1; i >= 0; i--) {
			if (db.candidato.presidente[i].id_presidente == v1.presidente)
			{
			
				db.candidato.presidente[i].nro_votos += 1;
				break;
				}
				
			}
       
        for (var i = db.candidato.asamblea.length - 1; i >= 0; i--) {
			if (db.candidato.asamblea[i].partido == v1.presidente)
			{
		
				db.candidato.asamblea[i].nro_votos += 1;
         
				break;
				}
				
			}

        
        fs.writeFile("data/base.json", JSON.stringify(db, null, 3));
        respuesta.mensaje="Voto guardado. Gracias por preferirnos.";
		res.send(JSON.stringify(respuesta));
	})
  
});





app.use(express.static('public'));
app.listen(3000);	

console.log('Server listening at http://localhost:3000!');

