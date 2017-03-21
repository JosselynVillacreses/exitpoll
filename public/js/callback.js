//INICIO DE SESIÓN

var u;
$(document).ready(function(){
	
	GuardarAnteriores();

});
function inicio_sesion(){
	var url = '/login';
	var usuario = $('#log input[name=usuario]').val();
	var clave = $('#log input[name=clave]').val();
	var datos = {
		data:{"usuario" :usuario,"clave":clave},
		type:'POST',
		datatype:'json'
	};
	$.ajax(url,datos)
	.done(function(data, status, xhr){
		data = JSON.parse(data);
		if(data.found){
			alert("Bienvenido " +data.user.nombre);
			u = data.user.tipo;
			window.location.assign('/' + u);
			

			
		}else{
			alert('Usuario y/o clave no validos');
		}
	})	
	.fail(function(xhr, status, error){
		alert('Error en la verificacion del usuario' )
	})
};

/*---------------   CRUD DE PRESIDENTES -------------------------*/


//FUNCIONES PARA MOSTRAR Y OCULTAR LA TABLA DE CREAR NUEVO PRESIDENTE
function mostrarCreate(){
    $('.contenedorCrud').fadeOut(function(){
        $('.container').fadeIn();
    });
    
}

function ocultarCreate(){
    $('.container').fadeOut(function(){
        $('.contenedorCrud').fadeIn();
    });
    
}



//Función Ajax
function guardarPresidente(){
    //Guardar los datos del formulario en variables para reenviar por Ajax al servidor :)
    var newPresi = {
        fotoP: $("input[name=imgP]").val(),
        cedulaP: $("input[name=cedulaP]").val(),
        nombreP: $("input[name=nombreP]").val(),
        apellidoP: $("input[name=apellidoP]").val(),
        edadP: $("input[name=edadP]").val(),
        campaniaP: $("textarea[name=campaniaP]").val(),
            cedulaV: $("input[name=cedulaV]").val(),
            fotoV: $("input[name=imgP]").val(),
            nombreV: $("input[name=nombreV]").val(),
            apellidoV: $("input[name=apellidoV]").val(),
            edadV: $("input[name=edadV]").val()
    };
    
    console.log(newPresi);
    
    var url = '/admin/presidente';
    var datos = {
        data: newPresi,
        type: 'POST',
        datatype: 'json'
    };
    
    $.ajax(url, datos)
    .done(function(data, status, xhr){
		data = JSON.parse(data);//data-> lo que devuelve el servidor (string)
        alert(data.mensaje)
        if (!data.found){
            window.location.assign('/admin/presidentes');
        }
		
	})
	.fail(function(xhr, status, error){
		alert('Error al actualizar');
	})
}



var objDatos = {};
var objDefecto = {};

//LLEVA A LA PANTALLA DE ACTUALIZAR
function act_pres(idPresidente){	
	window.location.assign('/admin/presidente/'+idPresidente); //es el que existe en el servidor
}



//ELIMINAR PRESIDENTE
function eliminarPresi(idPresidente){
    if (confirm('¿Estás seguro?')){
        var url = '/admin/presidente/' + idPresidente;
        var datos={
            data: null,
            type: 'DELETE',
            datatype: 'json'
        };

        $.ajax(url, datos)
        .done(function(data, status, xhr){
            data = JSON.parse(data);
            
            if(data.deleted){
                alert('¡Presidente Borrado con éxito!')
            }else alert('¡Presidente no fue Borrado!')
            window.location.assign('/admin/presidentes')
            
        })
        .fail(function(xhr, status, error){
            alert('Error al intentar conectar con el server');
        })
    }
    
    
}



//ACTUALIZAR PRESIDENTE
function ActualizarPresidente(idPresidente){
	objDatos.cedula = $("input[name=cedula]").val();
	objDatos.nombre = $("input[name=nombre]").val();
	objDatos.apellido = $("input[name=apellido]").val();
	objDatos.edad = $("input[name=edad]").val();
	objDatos.campaña = $("textarea[name=campaña]").val();

	objV.cedulaV = $("input[name=cedulaV]").val();
	objV.nombreV = $("input[name=nombreV]").val();
	objV.apellidoV = $("input[name=apellidoV]").val();
	objV.edadV = $("input[name=edadV]").val();

	objDatos.vicepresidente = objV;

	var url = '/admin/presidente/' + idPresidente; //es el que existe en el servidor
	var datos = {
		data:objDatos,
		type:'PUT',
		datatype:'json'
	};
	$.ajax(url,datos)
	.done(function(data, status, xhr){
		data = JSON.parse(data);
		alert(data.mensaje)
        window.location.assign('/admin/presidentes');
		
	})
	.fail(function(xhr, status, error){
		alert('Error al actualizar');
	})
}










/*----------------------    CRUD ASAMBLEISTAS   -----------------*/





function act_asam(idAsambleista){	
	window.location.assign('/admin/asambleista/'+idAsambleista); //es el que existe en el servidor
}

//CREAR ASAMBLEISTA

function guardarAsambleista(){
    //Guardar los datos del formulario en variables para reenviar por Ajax al servidor :)
    var newPresi = {
        cedula_asam: $("input[name=cedula_asam]").val(),
        nombre_asam: $("input[name=nombre_asam").val(),
        apellido_asam: $("input[name=apellido_asam]").val(),
        edad_asam: $("input[name=edad_asam]").val()
    };
    
    console.log(newPresi);
    
    var url = '/admin/asambleista';
    var datos = {
        data: newPresi,
        type: 'POST',
        datatype: 'json'
    };
    
    $.ajax(url, datos)
    .done(function(data, status, xhr){
//		data = JSON.parse(data);//data-> lo que devuelve el servidor (string)
        alert(data.mensaje)
        if (!data.found){
            window.location.assign('/admin/asambleistas');
        }
		
	})
	.fail(function(xhr, status, error){
		alert('Error al actualizar');
	})
}


//ELIMINAR ASAMBLEISTA

function eliminarAsam(idAsam){
    if (confirm('¿Estás seguro?')){
        var url = '/admin/asambleista/' + idAsam;
        var datos={
            data: null,
            type: 'DELETE',
            datatype: 'json'
        };

        $.ajax(url, datos)
        .done(function(data, status, xhr){
            data = JSON.parse(data);
            
            if(data.deleted){
                alert('¡Asambleista Borrado con éxito!')
            }else alert('¡Asambleista no fue Borrado!')
            window.location.assign('/admin/asambleistas')
            
        })
        .fail(function(xhr, status, error){
            alert('Error al intentar conectar con el server');
        })
    }
    
    
}








/*-----------------------   CRUD PARTIDOS   ---------------------*/
function act_prt(idPartido){	
	window.location.assign('/admin/partido/'+idPartido); //es el que existe en el servidor
}



//ACTUALIZAR PARTIDO
var objP = {};
function actualizarPartido(idPartido){
	objP.lista = $("input[name=lista]").val();
	objP.nombre = $("input[name=nombre]").val();
	
	var url = '/admin/partido/' + idPartido; //es el que existe en el servidor
	var datos = {
		data:objP,
		type:'PUT',
		datatype:'json'
	};
	$.ajax(url,datos)
	.done(function(data, status, xhr){
		data = JSON.parse(data);
		alert(data.mensaje)
		window.location.assign('/admin/partidos')
	})
	.fail(function(xhr, status, error){
		alert('Error al actualizar');
	})
}

//EIMINAR PARTIDO
function eliminarPartido(idPartido){
    if (confirm('¿Estás seguro?')){
        var url = '/admin/partido/' + idPartido;
        var datos={
            data: null,
            type: 'DELETE',
            datatype: 'json'
        };

        $.ajax(url, datos)
        .done(function(data, status, xhr){
            data = JSON.parse(data);
            
            if(data.deleted){
                alert('¡Partido Borrado con éxito!')
            }else alert('¡Partido no fue Borrado!')
            window.location.assign('/admin/partidos')
            
        })
        .fail(function(xhr, status, error){
            alert('Error al intentar conectar con el server');
        })
    }
    
    
}




//Función Ajax
function guardarPartido(){
    //Guardar los datos del formulario en variables para reenviar por Ajax al servidor :)
    
    
    var newPrt = {
        lista: $("input[name=lista_prt]").val(),
        nombre: $("input[name=nombre_prt]").val()
    };
    
    console.log(newPrt);
    
    var url = '/admin/partido';
    var datos = {
        data: newPrt,
        type: 'POST',
        datatype: 'json'
    };
    
    $.ajax(url, datos)
    .done(function(data, status, xhr){
		
        alert(data.mensaje);
        if (!data.found){
            window.location.assign('/admin/partidos');
        }
		
	})
	.fail(function(xhr, status, error){
		alert('Error al actualizar');
	})
}
















function GuardarAnteriores(){
	//Almacenar en variables los valores por defecto
	objDefecto.cedula = $("input[name=cedula]").val();
	objDefecto.nombre = $("input[name=nombre]").val();
	objDefecto.apellido = $("input[name=apellido]").val();
	objDefecto.edad = $("input[name=edad]").val();
	objDefecto.campaña = $("input[name=campaña]").val();

	objDefecto.cedulaV = $("input[name=cedulaV]").val();
	objDefecto.nombreV = $("input[name=nombreV]").val();
	objDefecto.apellidoV = $("input[name=apellidoV]").val();
	objDefecto.edadV = $("input[name=edadV]").val();
	
}

var objV = {};




var objA = {};
function ActualizarAsambleista(idAsambleista){
	objA.cedula = $("input[name=cedula]").val();
	objA.nombre = $("input[name=nombre]").val();
	objA.apellido = $("input[name=apellido]").val();
	objA.edad = $("input[name=edad]").val();
	
	var url = '/perfil/admin/asambleista/update/' + idAsambleista; //es el que existe en el servidor
	var datos = {
		data:objA,
		type:'PUT',
		datatype:'json'
	};
	$.ajax(url,datos)
	.done(function(data, status, xhr){
		data = JSON.parse(data);
		alert(data.mensaje)
		
	})
	.fail(function(xhr, status, error){
		alert('Error al actualizar');
	})
}




/*---------------------     ENCUESTADOR --------------------------------------*/


//VALIDAR LA CÉDULA
function validarCedula(){
    
	var url = '/encuestador/cedula';
	var cedula = $('input[name=cedula]').val();
    console.log(cedula)
	var datos = {
		data:{"cedula" :cedula},
		type:'POST',
		datatype:'json'
	};
	$.ajax(url,datos)
	.done(function(data, status, xhr){
		data = JSON.parse(data);
        console.log(data)
		alert(data.mensaje);
        if(!data.found){
			window.location.assign("/encuestador/votaciones/"+cedula);
        }
	})	
	.fail(function(xhr, status, error){
		alert('Error en la verificacion del usuario' )
	})
};




//VOTAR POR PRESIDENTE
function votarPresidente(idPresi, cedula){
    voto = {};
    voto.cedula = cedula;
    

	var url = '/encuestador/votaciones/presidente/' + idPresi; //es el que existe en el servidor
	var datos = {
		data:null,
		type:'PUT',
		datatype:'json'
	};
	$.ajax(url,datos)
	.done(function(data, status, xhr){
		data = JSON.parse(data);
		alert(data.mensaje)
		
	})
	.fail(function(xhr, status, error){
		alert('Error al votar');
	})
}





//OCULTAR TABLAS DE PRESIDENTES Y ASAMBLEISTAS
function mostrarAsam(){
    $('.tablePresidentes').fadeOut(function(){
        $('.tableAsambleistas').fadeIn();
    });
    
}

function ocultarAsam(){
    $('.tableAsambleistas').fadeOut(function(){
        $('.tablePresidentes').fadeIn();
    });
    
}




//VOTAR ASAMBLEISTAS
function votarAsambleistas(idAsam,cedula){

	var url = '/encuestador/votaciones/asambleistas/' + idAsam; //es el que existe en el servidor
	var datos = {
		data:null,
		type:'PUT',
		datatype:'json'
	};
	$.ajax(url,datos)
	.done(function(data, status, xhr){
		data = JSON.parse(data);
		alert(data.mensaje)
        window.location.assign('/encuestador/votaciones/resumen/'+ cedula);
		
	})
	.fail(function(xhr, status, error){
		alert('Error al votar');
	})
}




//VOTAR OTRA VEZ
function votarOtraVez(cedula){
    console.log(cedula);
window.location.assign("/encuestador/votaciones/"+cedula);
   
};




//GUARDAR VOTANTE
function guardarVoto(cedula, presidente, asambleista){
    //Guardar los datos del formulario en variables para reenviar por Ajax al servidor :)
    var newVotante = {
        cedula: cedula,
        presidente: presidente,
        asambleista: asambleista
    };
    
    console.log(newVotante);
    
    var url = '/encuestador/votante';
    var datos = {
        data: newVotante,
        type: 'POST',
        datatype: 'json'
    };
    
    $.ajax(url, datos)
    .done(function(data, status, xhr){
		data = JSON.parse(data);//data-> lo que devuelve el servidor (string)
      alert(data.mensaje)
        if (!data.found){
            window.location.assign('/encuestador');
        }
		
	})
	.fail(function(xhr, status, error){
		alert('Error alhhjhjlizar');
	})
}


//GUARDAR VOTOS
function guardar(){
	
	var url = '/encuestador/votante'; //es el que existe en el servidor
	var datos = {
		data:null,
		type:'PUT',
		datatype:'json'
	};
	$.ajax(url,datos)
	.done(function(data, status, xhr){
		data = JSON.parse(data);
		alert(data.mensaje)
		
	})
	.fail(function(xhr, status, error){
		alert('Error al actualizar');
	})
}



