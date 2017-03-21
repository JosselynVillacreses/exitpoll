
var adm;
var enc;
var arrPresidente = [];
var arrPartido = [];
var out = "";

var str= {
"administrador":
[{"cedula":"097382917410","nombre":"Carlos","apellido":"Perez","edad":28,"usuario":"admin","clave":"admin123"}],
          
"encuestador":
[{"cedula":"0989898760","nombre":"Daniela","apellido":"Velez","edad":"30","usuario":"enc1","clave":"enc1"},
{"cedula":"0987654321","nombre":"Beto","apellido":"Piguave","edad":"32","usuario":"enc2","clave":"enc2"}],

"partido":[
{"id_partido":"0", "logo":"image/21.jpg", "lista":"21 23","nombre":"CREO","id_presidente":0, "asambleista":0, "paralamento_andino":0},

{"id_partido":"1", "logo":"image/2.jpg", "lista":"2-12-18","nombre":"Acuerdo Nacional por el Cambio","id_presidente":1,"asambleista":0,"parlamento_andino":5},

{"id_partido":"2", "logo":"image/6.jpg", "lista":"6","nombre":"Partido Social Cristiano","id_presidente":2,"asambleista":0,"parlamento_andino":5},

{"id_partido":"3", "logo":"image/35.jpg", "lista":"35","nombre":"PAIS","id_presidente":3,"asambleista":0,"parlamento_andino":5},

{"id_partido":"4", "logo":"image/19.jpg", "lista":"19","nombre":"Movimiento Union ecuatoriana","id_presidente":4,"asambleista":0,"paralamento_andino":0},

{"id_partido":"5", "logo":"image/10.jpg", "lista":"10","nombre":"Partido Fuerza EC", "id_presidente":5,"asambleista":0,"paralamento_andino":0}
],

"dignidades":[{"id":0, "nombre":"Presidente"}, {"id":1, "nombre":"Vicepresidente"},{"id":2,"nombre":"Asambleista"},{"id":3, "nombre":"Otro"}],


"votante":
[{"cedula":" ","id_presidente": "","id_asa_partido":""}],


"candidato":{
"presidente":[
{"id_presidente":0, "cedula":"09089372832","foto":"image/guillermo-laso.jpg","nombre":"Guillermo","apellido":"Lasso","edad":61,"campaña":"Vamos por el Cambio","nro_votos":0,
"vicepresidente":{"cedula":"09089372832","foto":"image/andres-paez.jpg","nombre":"Andres","apellido":"Paez","edad":50}}, 

{"id_presidente":1, "cedula":"09089372032","foto":"image/paco-moncayo.jpg","nombre":"Paco","apellido":"Moncayo","edad":76,"campaña":"Paco Presidente",
"nro_votos":0,"vicepresidente":{"cedula":"09089310832","foto":"image/monserratt-bustamante.jpg","nombre":"Monserratt","apellido":"Bustamante","edad":40}},

{"id_presidente":2, "cedula":"09081272032","foto":"image/cynthia-viteri.jpg","nombre":"Cynthia","apellido":"Viteri","edad":51,"campaña":"Cambio Positivo","nro_votos":0,"vicepresidente":{"cedula":"09089310832","foto":"image/mauricio-pozo.jpg","nombre":"Mauricio","apellido":"Pozo","edad":57}},

{"id_presidente":3, "cedula":"09081102032","foto":"image/lenin-moreno.jpg","nombre":"Lenín","apellido":"Moreno","edad":63,"campaña":"Nuevos Sueños por Alcanzar","nro_votos":0,"vicepresidente":{"cedula":"09089311032","foto":"image/jorge-glass.jpg","nombre":"Jorge","apellido":"Glas","edad":47}},

{"id_presidente":4, "cedula":"09010272032","foto":"image/washington-pesantez.jpg","nombre":"Washington","apellido":"Pesántez","edad":60,"campaña":"Tercera Vía","nro_votos":0,"vicepresidente":{"cedula":"09089311032","foto":"image/alex-alcivar.jpg","nombre":"Alex","apellido":"Alcivar","edad":45}},

{"id_presidente":5, "cedula":"09010372032","foto":"image/abdala-bucaram.jpg","nombre":"Abdala","apellido":"Bucaram Pulley",
"campaña":"Dalo y Ramiro presidentes","nro_votos":0,
"vicepresidente":{"cedula":"09089310832","foto":"image/ramiro-aguilar.jpg","nombre":"Ramiro","apellido":"Aguilar","edad":48}}
],


"asambleista":[{"id_asambleista":0,"cedula":"0901842805","partido_id":"0","nombre":"Rodrigo","apellido":"Ansaldo","edad":63},{"id_asambleista":1,"cedula":"0987842805","partido_id":"1","nombre":"Ana",
"apellido":"Tobar","edad":42}]
    
}
,

"elecciones":[{"id":0,"fecha":"17 de febrero del 2016", "dignidades":[{"id":0}, {"id":1}, {"id":2}], 
"representantes":[{"id_partido":0, "id_asambleista":0}, 
{"id_partido":1, "id_asambleista":1},
{"id_partido":2, "id_asambleista":2},
{"id_partido":3, "id_asambleista":3}]}]
    
};



class Encuestador{
    constructor(obj,i){
        this.cedula = obj.encuestador[i].cedula;
        this.nombre = obj.encuestador[i].nombre;
        this.apellido = obj.encuestador[i].apellido;
        this.edad = obj.encuestador[i].edad;
        this.usuario = obj.encuestador[i].usuario;
        this.clave = obj.encuestador[i].clave;
    }
}


class Administrador{
    constructor(obj,i){
        this.cedula = obj.administrador[i].cedula;
        this.nombre = obj.administrador[i].nombre;
        this.apellido = obj.administrador[i].apellido;
        this.edad = obj.administrador[i].edad;
        this.usuario = obj.administrador[i].usuario;
        this.clave = obj.administrador[i].clave;
    }
}

class Partido{
    constructor(obj, i){
        this.id = obj.partido[i].id_partido;
        this.logo = obj.partido[i].logo;
        this.lista = obj.partido[i].lista;
        this.nombre = obj.partido[i].nombre;
        this.id_presidente = obj.partido[i].id_presidente;
        this.asambleista = obj.partido[i].asambleista;
    }
}


class Vicepresidente{
    constructor(obj, i){
        this.cedula = obj.candidato.presidente[i].vicepresidente.cedula;
        this.foto = obj.candidato.presidente[i].vicepresidente.foto
        this.nombre = obj.candidato.presidente[i].vicepresidente.nombre;
        this.apellido = obj.candidato.presidente[i].vicepresidente.apellido;
        this.edad = obj.candidato.presidente[i].vicepresidente.edad;
    }
}


class Presidente{
    constructor(obj, i){
        this.id_presidente = obj.candidato.presidente[i].id_presidente;
        this.cedula = obj.candidato.presidente[i].cedula;
        this.foto = obj.candidato.presidente[i].foto;
        this.nombre = obj.candidato.presidente[i].nombre;
        this.apellido = obj.candidato.presidente[i].apellido;
        this.edad = obj.candidato.presidente[i].edad;
        this.campaña = obj.candidato.presidente[i].campaña;
        this.nro_votos = obj.candidato.presidente[i].nro_votos;
        this.vicepresidente = new Vicepresidente(obj, i);
    }
}


class Asambleista{
    constructor(obj,i){
        this.id = obj.candidato.asambleista[i].id_asambleista
        this.cedula = obj.candidato.asambleista[i].cedula;
        this.partido_id = obj.candidato.asambleista[i].partido_id;
        this.foto = obj.candidato.asambleista[i].foto;
        this.nombre = obj.candidato.asambleista[i].nombre;
        this.apellido = obj.candidato.asambleista[i].apellido;
        this.edad = obj.candidato.asambleista[i].edad;
    }
}



class Candidatos{
    constructor(obj, i){
        this.presidente = new Presidente(obj, i);
        this.asambleista = new Asambleista(obj, i);
    }
}

class Votante{
    constructor(obj, i){
        this.cedula = obj.votante[i].cedula;
        this.id_presidente = obj.votante[i].id_presidente;
        this.id_asa_partido = obj.votante[i].id_asa_partido;
    }
}

class Dignidad{
    constructor(obj, i){
        this.id = obj.dignidades[i].id;
        this.nombre = obj.dignidades[i].nombre;
    }
}

class Elecciones{
    constructor(obj, i){
        this.id = obj.elecciones[i].id;
        this.fecha = obj.elecciones[i].fecha;
        this.dignidadesArray = [];
        this.partidosArray = [];
        this.asambleistasArray = [];
    
          for (var j = 0; j < obj.elecciones[i].dignidades.length; j++) {
                    this.dignidadesArray.push(obj.elecciones[i].dignidades[j].id);
                    console.log(this.dignidadesArray[j]);
                
        }
       
       
        for (var j = 0; j < obj.elecciones[i].representantes.length; j++) {
                    this.partidosArray.push(obj.elecciones[i].representantes[j].id_partido);
                    this.asambleistasArray.push(obj.elecciones[i].representantes[j].id_asambleista);
        }
        
       

}
}

function aparecer(){
    document.getElementById('id01').style.display='block';
    //$('id01').show();
    
}

function salir(){
    document.getElementById('id01').style.display='none';
}


function listar_partidos(){
    for (var i = 0; i < 6; i++){
        var part = new Partido(str,i);
        arrPartido.push(part);
        console.log(arrPartido[i]);
    }
    return(arrPartido);
}



function registrar(i){
    
    arrPartido[i].candidatos.presidente.nro_votos += 1;
    console.log(arrPartido[i].candidatos.presidente.nro_votos);
}

var votante;
var par;
var pr;
var ban1 = false;
var ban2 = false;



function comp_banderas(ced){
           if (ban1 && ban2) {
          str.votante.push({cedula: ced, id_presidente: pr,id_asa_partido:par});

    for (var j = 0; j < str.votante.length; j++ ) {
        console.log(str.votante[j].cedula);
         console.log(str.votante[j].id_presidente);
         console.log(str.votante[j].id_asa_partido);
        }
     }
}


function votar(id_votacion_presidente, ced){
    for (var i = 0; i < str.candidato.presidente.length; i++) {
        if (str.candidato.presidente[i].id_presidente == parseInt(id_votacion_presidente) ) {
            str.candidato.presidente[i].nro_votos += 1;
            $('#tabla_votar').find("button").attr("disabled", "disabled");
            pr = str.candidato.presidente[i].id_presidente;
            ban1 = true;
            
             comp_banderas(ced);
     
        } 
    }
    
}


function votar_asambleistas(id_votacion_asambleistas, ced){
    for (var i = 0; i < str.partido.length; i++) {
        if (str.partido[i].id_partido == id_votacion_asambleistas ) {
            str.partido[i].asambleista += 1;
            $('#tabla_votar_asam').find("button").attr("disabled", "disabled");
            par = str.partido[i].id_partido;
            ban2  = true;   
            
      comp_banderas(ced);
     
        } 
    }
    
}

//FUNCION TODO LO QUE VA A HACER EL ENCUESTADOR
function encuestador(num){
    $('#id01').hide();
    $('#screen_encuestador').show();
    $('#btnIngresar').hide();
    $('#screen_out').hide();
    document.getElementById('pantalla_tabla_votar').style.display='none';
        
}


//FUNCION TODO LO QUE VA A HACER EL ADMINISTRADOR
function administrador(admi){
    $('#id01').hide();
    $('#screen_admin').show();
    $('#btnIngresar').hide();
    $('#screen_out').hide();
    $("#entrada-administrador").html("¡Bienvenido " + admi.nombre+ "!");
    
   //listar_presidentes();
    
}



function inicio_sesion(){
var user = document.getElementById('user').value;
var pass = document.getElementById('pass').value;
    
    
    switch (user && pass) {
        case str.administrador[0].usuario && str.administrador[0].clave:
            
            adm = new Administrador(str, 0);
            administrador(adm);
            
            break; 
   
            
        case str.encuestador[0].usuario && str.encuestador[0].clave:
            
            encuestador(0);
            break;
            
        case str.encuestador[1].usuario && str.encuestador[1].clave:
            encuestador(1);
            break;
        
        default:
            alert("Ingrese un usuario y contraseña valido");
    
    
    }
     
   
}




$(document).ready(function(){
    
    var eleccion1 = new Elecciones(str, 0);
    
    var func_crear = $("#crear_");
    var crear_pantalla = $('#crear_pantalla'); 

    var func_eliminar =  $("#eliminar_");
    var elim_pantalla = $('#eliminar_pantalla');
    
    var func_actualizar = $("#actualizar_");
    var act_pantalla = $("#act_pantalla");
    
    var func_mostrar = $("#mostrar_");
    var mostrar_pantalla = $("#mostrar_pantalla");
    
    var btn_crear = $("#btn_crear");

    var cr_ = document.getElementsByName('cr');


    

       

        
func_crear.click(function(){
    act_pantalla.hide();
    crear_pantalla.show();
    elim_pantalla.hide();
    mostrar_pantalla.hide();

    $('#create').show();
    
    cr_pres_screen.hide();
    cr_asam_screen.hide();
    cr_prt_screen.hide();


    var datosCreate = "<option value='0'>Seleccione una dignidad a crear</option>";

    for (var dignidad in str.candidato) {
             datosCreate += '<option>'+dignidad.charAt(0).toUpperCase() + dignidad.slice(1)+'</option>';
    }
    datosCreate += '<option>Partido</option>';
    $('#combo_dignidades').html(datosCreate);
    
    $("#combo_dignidades").change(function () {	 
        
        switch ($(this).val()) {
            case 'Presidente':
                create_presidente_screen();
                break;
                
            case 'Asambleista':
                create_asam_screen();
                break;
                
            case 'Partido':
                create_prt_screen();
                break;
            
            default:
                cr_pres_screen.hide();
                cr_asam_screen.hide();
                cr_prt_screen.hide();
        }
        
        
    });

});




var btn_delete = $("#btn_delete");

var dl_ = document.getElementsByName('dl');

func_eliminar.click(function(){
    
   act_pantalla.hide();
    elim_pantalla.show();
    
    dl_pres_screen.hide();
    dl_asam_screen.hide();
    dl_prt_screen.hide();

    
    $('#del').show();
    crear_pantalla.hide();
    mostrar_pantalla.hide();
    
    var datosDelete = "<option>Seleccione una dignidad a eliminar</option>";

    for (var dignidad in str.candidato) {
             datosDelete += '<option>'+dignidad.charAt(0).toUpperCase() + dignidad.slice(1)+'</option>';
    }
    datosDelete += '<option>Partido</option>';
    $('#combo_dignidades_eliminar').html(datosDelete);
    
    $("#combo_dignidades_eliminar").change(function () {	 
        
        switch ($(this).val()) {
            case 'Presidente':
                del_presidente_screen();
                break;
            
            case 'Asambleista':
                del_asam_screen();
                break;
                
            case 'Partido':
                del_prt_screen();
                break;
                
            default:
                dl_pres_screen.hide();
                dl_asam_screen.hide();
                dl_prt_screen.hide();
			      
			        
			}
			});

    
    
});

   var cr_pres_screen = $("#create_presidente_screen");
    var cr_asam_screen = $("#create_asam_screen");
    var cr_prt_screen = $("#create_parti_screen");
    
    var func_create_president = $("#create_president");


function create_presidente_screen(){
    var listar_pres = " ";
    
    $("#select_pres").empty();
    
    cr_pres_screen.show();
    cr_asam_screen.hide();
    cr_prt_screen.hide();
    
    
    
    for (var i = 0; i < str.partido.length; i++){
        listar_pres += "<option>" + str.partido[i].nombre + "</option>";
    }
    
    $("#select_pres").html(listar_pres);

    $('#combo_dignidades option[value="0"]').attr('selected', false);
}

var lis_partido = document.getElementsByName('prt_pres');
var select_partido = document.getElementsByName('part');

func_create_president.click(function(){
    var aviso = confirm("Si creas un nuevo presidente, el nuevo partido que le asignes se le reemplazara con el nuevo presidente creado, ¿Seguro que quieres continuar?");
    
    $('#combo_dignidades option[value="0"]').attr('selected', true);
    if (aviso){
        
        
        var imagenk = $("#img-local").val();
        var cedulak = $("#id_pres").val();
        var nombrek = $("#name_pres").val();
        var apellidok = $("#last_pres").val();
        var edadk = $("#age_pres").val();
        var campanak = $("#camp_pres").val();
        var nro_votos = 0;
        
        var img_presidente = "image/" +imagenk+".jpg";
    
        var imagen_vice_local = $("#img_vice_local").val(); 
        var cedula_vice = $("#vice_id").val();
        var nombre_vice = $("#vice_name").val();
        var apellido_vice = $("#vice_ap").val();
        var edad_vice = $("#vice_edad").val();
        
        var img_vice = "image/" + imagen_vice_local +".jpg";
    
        var nuevoIndice = document.getElementById("select_pres").selectedIndex;
        var id_presidente = str.candidato.presidente.length;
        
        
        var n = false;
        for (var i =0; i< str.candidato.presidente.length; i++){
            if (str.candidato.presidente[i].foto == imagenk || 
            str.candidato.presidente[i].vicepresidente.foto == imagenk ||
            str.candidato.presidente[i].foto == imagen_vice_local || 
            str.candidato.presidente[i].vicepresidente.foto == imagen_vice_local){
                
                n = true;
                break;
            }
        }
        
        
        if (n == false){
            alert("Lo sentimos esa imagen no existe en nuestra base de datos por favor carguela localmente")
        }else{
                    var presi = { id_presidente: id_presidente, cedula: cedulak,
        foto: img_presidente, nombre: nombrek, 
    apellido: apellidok, edad: edadk, campaña: campanak, 
    nro_votos: nro_votos, vicepresidente: {cedula: cedula_vice, foto: img_vice,
    nombre: nombre_vice, apellido: apellido_vice, 
    edad: edad_vice}};

        alert("Presidente nuevo creado con exito!"); 
    
        str.candidato.presidente.push(presi);
            
        str.partido[nuevoIndice].id_presidente = id_presidente;
        
        $("#img-local").val("");
        $("#id_pres").val(" ");
        $("#name_pres").val(" ");
        $("#last_pres").val(" ");
        $("#age_pres").val(" ");
        $("#camp_pres").val(" ");
    
        $("#vice_id").val(" ");
        $("#vice_name").val(" ");
        $("#vice_ap").val(" ");
        $("#vice_edad").val(" ");
        
        cr_pres_screen.hide();
        

        }
    
    

    }
    
    


});

var lis_partido = document.getElementsByName('prt_asam');
var select_partido = document.getElementsByName('part_asam');
var func_create_asam = $("#create_asamb");

function create_asam_screen(){
    
cr_pres_screen.hide();
    cr_asam_screen.show();
    cr_prt_screen.hide();
    
    
    var listar = " ";
    
    
    for (var i = 0; i < str.partido.length; i++){
        listar += "<option name='prt_asam' >" + str.partido[i].nombre + "</option>";
    }
    
    document.getElementById("selects_").innerHTML = listar;

    $('#combo_dignidades option[value="0"]').attr('selected', false);
    
}


func_create_asam.click(function(){
        $('#combo_dignidades option[value="0"]').attr('selected', true);
        
    var cedula_asam = $("#id_asam").val();
    var nombre_asam = $("#name_asam").val();
    var apellido_asam = $("#last_asam").val();
    var edad_asam = $("#age_asam").val();
    var nro_votos = 0;
    var nuevoIndice = document.getElementById("selects_").selectedIndex;
    
    var indice = str.candidato.asambleista.length;
   
    var asam = { id_asam: indice, cedula: cedula_asam, partido_id: nuevoIndice, nombre: nombre_asam, 
    apellido: apellido_asam, edad: edad_asam, nro_votos : nro_votos};
    
    str.candidato.asambleista.push(asam);

    str.partido[nuevoIndice].asambleista++;
    
    
    $("#id_asam").val("");
    $("#name_asam").val("");
    $("#last_asam").val("");
    $("#age_asam").val("");
    
    alert("Asambleista creado con exito");
    cr_asam_screen.hide();

});

var func_create_prt = $("#create_prt");

function create_prt_screen(){
    cr_pres_screen.hide();
    cr_asam_screen.hide();
    cr_prt_screen.show();
    
    
    $('#combo_dignidades option[value="0"]').attr('selected', false);
}


func_create_prt.click(function(){
    
        $('#combo_dignidades option[value="0"]').attr('selected', true);
        var imagen_pr_local = $("#img_prt_local").val();
        var lista_p = $("#lista_part").val();
        var nombre_p = $("#nombre_part").val();
        var id = str.partido.length;
        var arrCan = [];
        
        var img_prt = "image/" + imagen_pr_local +".jpg";
        
        
        var n = false;
        
        for (var i =0; i< str.partido.length; i++){
            if (str.partido[i].logo == img_prt){
                
                n = true;
                break;
            }
        }
        
        
        if (n == false){
            alert("Lo sentimos esa imagen no existe en nuestra base de datos por favor carguela localmente")
        }else{

    
        var partid = {id: id, logo: img_prt, lista: lista_p, nombre: nombre_p, candidatos: {}};
    str.partido.push(partid)
    
        for (var i = 0; i < str.partido.length; i++){
            console.log(str.partido[i]);
        }
        alert("Partido " +nombre_p+" creado con exito");
        $("#img_prt_local").val("");
        $("#lista_part").val("");
        $("#nombre_part").val("");
        
        cr_prt_screen.hide();
        }
});

var dl_pres_screen = $("#del_pres_screen");
var dl_asam_screen = $("#del_asam_screen");
var dl_prt_screen = $("#del_parti_screen");


function del_presidente_screen(){
    dl_pres_screen.show();
    dl_asam_screen.hide();
    dl_prt_screen.hide();
    
    
    var del_pres = document.getElementsByName('prt_pres');
    
    var listar_presi = " ";
    
    for (var i = 0; i < str.candidato.presidente.length; i++){
        listar_presi += "<option>" + str.candidato.presidente[i].nombre + "</option>";            
    }
    
    document.getElementById("selects_del_pre").innerHTML = listar_presi;
    
}
    
var btn_dele_pres = $("#btn_delete_pres");

btn_dele_pres.click(function() {
    
    var indice = document.getElementById("selects_del_pre").selectedIndex;
    
    str.candidato.presidente.splice(indice,1)
    
    
    for (var i = 0; i < str.candidato.presidente.length; i++){
        console.log(str.candidato.presidente[i]);
    }
    
    var listar_presi = " ";
    
    for (var i = 0; i < str.candidato.presidente.length; i++){
        listar_presi += "<option>" + str.candidato.presidente[i].nombre + "</option>";            
        
    }
    alert("Presidente eliminado con exito!")
    document.getElementById("selects_del_pre").innerHTML = listar_presi;
    
});
    
var btn_asam_del = $("#btn_delete_asam");

function del_asam_screen(){
    dl_pres_screen.hide();
    dl_asam_screen.show();
    dl_prt_screen.hide();
    
    
    var listar_presi = " ";
    
    for (var i = 0; i < str.candidato.asambleista.length; i++){
        listar_presi += "<option>" + str.candidato.asambleista[i].nombre + "</option>";            
    }
    
    document.getElementById("selects_del_asam").innerHTML = listar_presi;
}

 
btn_asam_del.click(function() {
    var indice = document.getElementById("selects_del_asam").selectedIndex;
    str.candidato.asambleista.splice(indice, 1);
    var listar_presi = " ";
    
    alert("Asambleista eliminado con exito!")
    for (var i = 0; i < str.candidato.asambleista.length; i++){
        listar_presi += "<option>" + str.candidato.asambleista[i].nombre + "</option>";            
    }
    
    document.getElementById("selects_del_asam").innerHTML = listar_presi;
    
})  


function del_prt_screen(){
    dl_pres_screen.hide();
    dl_asam_screen.hide();
    dl_prt_screen.show();
    
    var listar_presi = " ";
    
    for (var i = 0; i < str.partido.length; i++){
        listar_presi += "<option>" + str.partido[i].nombre + "</option>";            
    }
    
    document.getElementById("selects_prt_pre").innerHTML = listar_presi;
}

var btn_del_prt = $("#btn_delete_prt");

    
    
    
    
//ELIMINAR partido del Proyecto ANTERIOR    
    
    
    
btn_del_prt.click(function() {
    var indice = document.getElementById("selects_prt_pre").selectedIndex;
    str.partido.splice(indice, 1);
    var listar_presi = " ";
    
    alert("Partido eliminado con exito!")
    for (var i = 0; i < str.partido.length; i++){
        listar_presi += "<option>" + str.partido[i].nombre + "</option>";            
    }
    
    document.getElementById("selects_prt_pre").innerHTML = listar_presi;
    



})




var act_principal = $('#actualizar_principal');
var ac_pres_screen = $('#act_pres_screen');
var ac_asam_screen = $('#act_asam_screen');
var ac_prt_screen = $('#act_parti_screen');


var form_act_presi = $('#modificar_presidente_form');
var form_act_asam = $('#modificar_asambleista_form');
var form_act_prt = $('#modificar_partido_form');


func_actualizar.click(function(){
    
    
    crear_pantalla.hide();
    elim_pantalla.hide();
    mostrar_pantalla.hide();
    act_pantalla.show();
    
    form_act_presi.hide();
    form_act_asam.hide();
    form_act_prt.hide();
    
    ac_pres_screen.hide();
    ac_asam_screen.hide();
    ac_prt_screen.hide();
    
    
    var datosActualizar = "<option value='0'>Seleccione una dignidad para actualizar</option>";

    for (var dignidad in str.candidato) {
             datosActualizar += '<option>'+dignidad.charAt(0).toUpperCase() + dignidad.slice(1)+'</option>';
    }
    datosActualizar += '<option>Partido</option>';
    $('#combo_dignidades_actualizar').html(datosActualizar);
    
    		$("#combo_dignidades_actualizar").change(function () {	 
			
			if($(this).val() == "Presidente"){
			    actualizar_listar_presidentes();
			}else{
			    if($(this).val() == "Asambleista"){
			        actualizar_listar_asambleista();
			 }else{
			     if($(this).val() == "Partido"){
			       actualizar_listar_partido();			    
			     }else{
			        ac_asam_screen.hide();
                    ac_pres_screen.hide();
                    ac_prt_screen.hide();
			     }
			}  
			}

			
			});
    

});

function actualizar_listar_presidentes(){

    ac_asam_screen.hide();
    ac_pres_screen.show();
    ac_prt_screen.hide();
    form_act_prt.hide();
    
    var listar_presidentes = "<option>Seleccione al presidente que desea actualizar...</option>";
    
    for (var i = 0; i < str.candidato.presidente.length; i++){
        listar_presidentes += "<option>" + str.candidato.presidente[i].nombre +
        " " + str.candidato.presidente[i].apellido + "</option>";
    }
    
    document.getElementById("selects_act_pres").innerHTML = listar_presidentes;
    
    
    
    $("#selects_act_pres").change(function(){
        if (document.getElementById("selects_act_pres").selectedIndex == 0){
            form_act_presi.hide();
        }else{
            actualizar_presidente();
        }
            
            
	});
}



function actualizar_listar_asambleista(){

    ac_asam_screen.show();
    ac_prt_screen.hide();
    ac_pres_screen.hide();
    form_act_presi.hide();
    form_act_prt.hide();

    var listar_asambleistas = "<option>Seleccione al asambleista que desea actualizar</option>";
    
    for (var i = 0; i < str.candidato.asambleista.length; i++){
        listar_asambleistas += "<option>" + str.candidato.asambleista[i].nombre +
        " " + str.candidato.asambleista[i].apellido + "</option>";
    }
    
    document.getElementById("selects_act_asam").innerHTML = listar_asambleistas;
    
    
	$("#selects_act_asam").change(function(){
	    if (document.getElementById("selects_act_asam").selectedIndex == 0){
            form_act_asam.hide();
        }else{
            actualizar_asambleista();
        }
            
	});
}


function actualizar_listar_partido(){
    
    ac_asam_screen.hide();
    ac_prt_screen.show();
    ac_pres_screen.hide();
    form_act_presi.hide();
    form_act_asam.hide();
    
    var listar_prtido = "<option>Seleccione el partido que desea actualizar..</option>";
    
    for (var i = 0; i < str.partido.length; i++){
        listar_prtido += "<option>" + str.partido[i].nombre + "</option>";
    }
    
    document.getElementById("selects_act_pr").innerHTML = listar_prtido;
    
    $("#selects_act_pr").change(function(){
        if (document.getElementById("selects_act_pr").selectedIndex == 0){
            form_act_prt.hide();
        }else{
            actualizar_partido();
        }
            
	});
	
}


var modificar_part_presidente = "";

function actualizar_presidente(){
    var indice = document.getElementById("selects_act_pres").selectedIndex - 1;
    form_act_presi.show();
    form_act_asam.hide();
    
    $('#id_img_act_pres').val(str.candidato.presidente[indice].foto);
    var ruta = str.candidato.presidente[indice].foto;
    var img_actualizar_p = document.getElementById('imagen_actualizar_presidente');

    img_actualizar_p.setAttribute('src', ruta);
    img_actualizar_p.setAttribute('style', 'width: 25%')
    
    
    $('#act_id_pres').val(str.candidato.presidente[indice].cedula);
    $('#act_name_pres').val(str.candidato.presidente[indice].nombre);
    $('#act_last_pres').val(str.candidato.presidente[indice].apellido);
    $('#act_age_pres').val(str.candidato.presidente[indice].edad);
    $('#act_camp_pres').val(str.candidato.presidente[indice].campaña);
    
    for (var i = 0; i < str.partido.length; i++){
        modificar_part_presidente += "<option>" + str.partido[i].nombre + "</option>";
    }
    
    document.getElementById("act_select_pres").innerHTML = modificar_part_presidente;
    
    
    
    
    
    $('#id_img_act_vice').val(str.candidato.presidente[indice].vicepresidente.foto);
    var ruta_v = str.candidato.presidente[indice].vicepresidente.foto;
    var img_actualizar_v = document.getElementById('imagen_actualizar_vice');

    img_actualizar_v.setAttribute('src', ruta_v);
    img_actualizar_v.setAttribute('style', 'width: 25%')
    
    
    $('#act_vice_id').val(str.candidato.presidente[indice].vicepresidente.cedula);
    $('#act_vice_name').val(str.candidato.presidente[indice].vicepresidente.nombre);
    $('#act_vice_ap').val(str.candidato.presidente[indice].vicepresidente.apellido);
    $('#act_vice_edad').val(str.candidato.presidente[indice].vicepresidente.edad);
    
     
    $('#combo_dignidades_actualizar option[value="0"]').attr('selected', false);
   

        
    
    
}

var btn_actualizar_presidente = $('#modificar_president');


//----------------------BOTON ACTUALIZAR PRESIDENTE-----------------------------
btn_actualizar_presidente.click(function() {
    $('#combo_dignidades_actualizar option[value="0"]').attr('selected', true);
    var indice = document.getElementById("selects_act_pres").selectedIndex - 1;
    
    var nueva_img_pres = $("#id_img_act_pres").val();
    var nueva_cedula_pres =  $('#act_id_pres').val();
    var nueva_nombre_pres =  $('#act_name_pres').val();
    var nueva_apellido_pres =  $('#act_last_pres').val();
    var nueva_edad_pres =  $('#act_age_pres').val();
    var nueva_campana_pres =  $('#act_camp_pres').val();
    
    var nueva_img_vice = $("#id_img_act_vice").val();
    var nueva_cedula_vice =  $('#act_vice_id').val();
    var nueva_nombre_vice =  $('#act_vice_name').val();
    var nueva_apellido_vice =  $('#act_vice_ap').val();
    var nueva_edad_vice =  $('#act_vice_edad').val();
    
    var id_p = document.getElementById("act_select_pres").selectedIndex;
    
    var n = 0;
        
        for (var i =0; i< str.candidato.presidente.length; i++){
            if (str.candidato.presidente[i].foto != nueva_img_pres){
                n = 1;
                break;
            }
            //ambas fotos son iguales
            if(nueva_img_pres == nueva_img_vice){
                n=2;
                break;
            }
            if (str.candidato.presidente[i].vicepresidente.foto != nueva_img_vice){
                n = 3;
                break;
            }
            
        }
        
        
        switch (n) {
            case 0:
                 for (var i = 0; i < str.candidato.presidente.length; i++ ) {
        
                    if (indice == str.candidato.presidente[i].id_presidente){
            
                        str.candidato.presidente[i].cedula = nueva_cedula_pres;
                        str.candidato.presidente[i].foto = nueva_img_pres;
                        str.candidato.presidente[i].nombre = nueva_nombre_pres;
                        str.candidato.presidente[i].apellido = nueva_apellido_pres;
                        str.candidato.presidente[i].edad = nueva_edad_pres;
                        str.candidato.presidente[i].campaña = nueva_campana_pres;
                        str.partido[id_p].id_presidente = indice;
            
                        str.candidato.presidente[i].vicepresidente.foto = nueva_img_vice;
                        str.candidato.presidente[i].vicepresidente.cedula = nueva_cedula_vice;
                        str.candidato.presidente[i].vicepresidente.nombre = nueva_nombre_vice;
                        str.candidato.presidente[i].vicepresidente.apellido = nueva_apellido_vice;
                        str.candidato.presidente[i].vicepresidente.edad = nueva_edad_vice;
            
                    }
                }
                alert(("Presidente " + nueva_nombre_pres + " " + nueva_apellido_pres + " actualizado con exito!"));
    
    
                ac_pres_screen.hide();
                form_act_presi.hide();
            
            case 1:
                alert("Error: Imagen del Candidato a Presidente incorrecta")
                break;
            case 2:
                alert("Presidente y vicepresidente no pueden tener los mismos datos")
                break;
            case 3:
                alert("Error: Imagen del Candidato a Vicepresidente incorrecta")
                break;    
            
            default:
                // code
        }
      
        
    
})


var modificar_part_asambleista = "";

function actualizar_asambleista(){
    form_act_presi.hide();
    form_act_asam.show();
    form_act_prt.hide();
    
    var indice = document.getElementById("selects_act_asam").selectedIndex - 1 ;
    
    
    $('#act_id_asam').val(str.candidato.asambleista[indice].cedula);
    $('#act_name_asam').val(str.candidato.asambleista[indice].nombre);
    $('#act_last_asam').val(str.candidato.asambleista[indice].apellido);
    $('#act_age_asam').val(str.candidato.asambleista[indice].edad);
    
    for (var i = 0; i < str.partido.length; i++){
        modificar_part_asambleista += "<option>" + str.partido[i].nombre + "</option>";
    }
    
    document.getElementById("act_part_asam").innerHTML = modificar_part_asambleista;
    
    
    $('#combo_dignidades_actualizar option[value="0"]').attr('selected', false);
}




//-----------------------------------BOTON ACTUALIZAR ASAMBLEISTA----------------------------

var btn_act_asam = $('#modificar_asamb');


btn_act_asam.click(function() {
    
    $('#combo_dignidades_actualizar > option[value="0"]').attr('selected', true);
    var indice = document.getElementById("selects_act_pres").selectedIndex - 1;
    var nueva_cedula_asam =  $('#act_id_asam').val();
    var nueva_nombre_asam =  $('#act_name_asam').val();
    var nueva_apellido_asam =  $('#act_last_asam').val();
    var nueva_edad_asam =  $('#act_age_asam').val();


    var id_p = document.getElementById("act_part_asam").selectedIndex;
    
    for (var i = 0; i < str.candidato.asambleista.length; i++ ) {
        
        if (indice == str.candidato.asambleista[i].id_presidente){
            str.candidato.asambleista[i].cedula = nueva_cedula_asam;
            str.candidato.asambleista[i].nombre = nueva_nombre_asam;
            str.candidato.asambleista[i].apellido = nueva_apellido_asam;
            str.candidato.asambleista[i].edad = nueva_edad_asam;
            str.partido[id_p].asambleista++;
            
            
            
        }
    }
    
    alert(("Asambleista " + nueva_nombre_asam + " " + nueva_apellido_asam +" actualizado con exito!"));
    
    ac_asam_screen.hide();
    form_act_asam.hide();

    
})

function actualizar_partido(){
    form_act_presi.hide();
    form_act_asam.hide();
    form_act_prt.show();
    
    var indice = document.getElementById("selects_act_pr").selectedIndex - 1;
    
    $('#imagen_actualizar_prt').val(str.partido[indice].logo);
    var ruta_pr = str.partido[indice].logo;
    var img_actualizar_pr = document.getElementById('imagen_actualizar_prt');

    img_actualizar_pr.setAttribute('src', ruta_pr);
    img_actualizar_pr.setAttribute('style', 'width: 20%')
    
    
    $('#id_img_act_prt').val(str.partido[indice].logo)
    
    $('#act_lista_part').val(str.partido[indice].lista);
    $('#act_nombre_part').val(str.partido[indice].nombre);
    
    
    $('#combo_dignidades_actualizar option[value="0"]').attr('selected', false);


    
}


//-----------------------------------BOTON ACTUALIZAR PARTIDO----------------------------
var btn_act_prt = $('#modificar_prt');

btn_act_prt.click(function() {
    
    $('#combo_dignidades_actualizar > option[value="0"]').attr('selected', true);
    var indice = document.getElementById("selects_act_pr").selectedIndex - 1;
    
    var nueva_img_prt = $('#id_img_act_prt').val();
    var nueva_lista_prt =  $('#act_lista_part').val();
    var nueva_nombre_prt =  $('#act_nombre_part').val();
    
    
    var n= false;
        
        for (var i =0; i< str.partido.length; i++){
            if (str.partido[i].logo == nueva_img_prt){
                n = true;
                break;
            }

        }
        
     if (n == false){
         alert("Lo sentimos imagen no encontrada en nuestra base de datos. Por favor carguela localmente")
     }else{
         for (var i = 0; i < str.partido.length; i++){
             if (indice == str.partido[i].id_partido){
                 str.partido[i].logo = nueva_img_prt;
                 str.partido[i].lista = nueva_lista_prt;
                 str.partido[i].nombre = nueva_nombre_prt;
                 }
        }
        alert("Partido " +nueva_nombre_prt + " actualizado con exito");
    
        ac_prt_screen.hide();
        form_act_prt.hide();
    

     }   

})
    
    
    
//----------------  Mostrar candidatos  -------------

func_mostrar.click(function(){
     act_pantalla.hide();
    crear_pantalla.hide();
    elim_pantalla.hide();
  
    var datos = '';
  
  var lista = '';
    for (var i = 0; i < str.elecciones[eleccion1.id].representantes.length; i++ ) {
        for (var j = 0; j < str.partido.length; j++ ) {
            if(str.partido[j].id_partido == str.elecciones[eleccion1.id].representantes[i].id_partido){
                datos += '<tr><td width=20>'+str.partido[j].lista +'</td><td><img width=30 src="' + 
                str.partido[j].logo + '"></img></td><td>'+str.partido[j].nombre +'</td>';
                for (var k = 0; k < str.candidato.presidente.length; k++ ) {
                    if(str.partido[j].id_presidente == str.candidato.presidente[k].id_presidente){
                         datos += '<td>'+ str.candidato.presidente[k].nombre +' '
                         +str.candidato.presidente[k].apellido +'</td><td><img width=30 src="' + 
                str.candidato.presidente[k].foto + '"></img></td><td>'+ str.candidato.presidente[k].vicepresidente.nombre + ' '
                +str.candidato.presidente[k].vicepresidente.apellido +
                '</td><td><img width=30 src="' + 
                str.candidato.presidente[k].vicepresidente.foto + '"></img></td><td>'+ str.candidato.presidente[k].nro_votos +'</td></tr>';
                    }
                }
            }
           
            
        }
        
    }
    $('#body_candidatos').html(datos);
    
    
     mostrar_pantalla.show();
    
    
     /*"elecciones":[{"fecha":"17 de febrero del 2016", 
                        "dignidades":[
                                        {"id":0}, 
                                        {"id":1}, 
                                        {"id":2}
                                    ], 
                        "representantes":[
                                        {"id_partido":0, "asambleista":0}, 
                                        {"id_partido":1, "id_asambleista":1},
                                        {"id_partido":2, "id_asambleista":2},
                                        {"id_partido":3, "id_asambleista":3}
                                        ]
                        }]*/
    
    
    
    /* <tbody>
    
    <tr>
       <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td> 
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
      <td>@mdo</td>
    </tr>
  </tbody>*/
})

    
    
    
    //funcion cerrar sesion
    var cerrar = $('#cerrar_sesion');
    cerrar.click(function() {
        document.getElementById('user').value = "";
        document.getElementById('pass').value = "";
    
    
        var exit = confirm("¿Seguro que quieres salir?");
        if (exit) {
            $('#screen_out').show();
            $('#screen_admin').hide();
            $('#screen_encuestador').hide();
            $('#btnIngresar').show();
            
            
          crear_pantalla.hide();
            elim_pantalla.hide();
            act_pantalla.hide();
            mostrar_pantalla.hide();
            
        } 
        
    })
    
    //funcion cerrar sesion
    var cerrar = $('#cerrar_sesion_');
    cerrar.click(function() {
        document.getElementById('user').value = "";
        document.getElementById('pass').value = "";
    
    
        var exit = confirm("¿Seguro que quieres salir?");
        if (exit) {
            $('#screen_out').show();
            $('#screen_admin').hide();
            $('#screen_encuestador').hide();
            $('#btnIngresar').show();
            
            
            
        } 
        
    })
    
    var btn_cedula = $('#btn_cedula');
    
    btn_cedula.click(function() {
         var cedula = $('#cedula_vot').val();
          array = cedula.split( "" );
          num = array.length;
          if ( num == 10 )
          {
            total = 0;
            digito = (array[9]*1);
            for( i=0; i < (num-1); i++ )
            {
              mult = 0;
              if ( ( i%2 ) != 0 ) {
                total = total + ( array[i] * 1 );
              }
              else
              {
                mult = array[i] * 2;
                if ( mult > 9 )
                  total = total + ( mult - 9 );
                else
          total = total + mult;
      }
            }
            decena = total / 10;
            decena = Math.floor( decena );
            decena = ( decena + 1 ) * 10;
            final = ( decena - total );
            
            if ( ( final == 10 && digito == 0 ) || ( final == digito ) ) {
                
                
                
        var registrado = false;
        
      for (var i = 0; i < str.votante.length; i++){
          
          if(cedula == str.votante[i].cedula){
                registrado = true;
                alert("Ya votó");
                $('#cedula_vot').val('');
            
        }else{
            registrado = false;
             
            
        }
    }            
    
    
    
    if (!registrado){
        $('#cedula_vot').val('');
            var datos = '';
            var datos_asambleistas = '';
            var pre;
            var lis;
 
    for (var i = 0; i < str.elecciones[eleccion1.id].representantes.length; i++ ) {
        for (var j = 0; j < str.partido.length; j++ ) {
            if(str.partido[j].id_partido == str.elecciones[eleccion1.id].representantes[i].id_partido){
                datos += '<tr><td width=20>'+str.partido[j].lista +'</td><td><img width=30 src="' + 
                str.partido[j].logo + '"></img></td>';
    
                for (var k = 0; k < str.candidato.presidente.length; k++ ) {
                    if(str.partido[j].id_presidente == str.candidato.presidente[k].id_presidente){
                        pre = str.partido[j].id_presidente;
                         datos += '<td>'+ str.candidato.presidente[k].nombre +' '
                         +str.candidato.presidente[k].apellido +'</td><td><img width=30 src="' + 
                str.candidato.presidente[k].foto + '"></img></td><td>'+ str.candidato.presidente[k].vicepresidente.nombre + ' '
                +str.candidato.presidente[k].vicepresidente.apellido +
                '</td><td><img width=30 src="' + 
                str.candidato.presidente[k].vicepresidente.foto + 
                '"></img></td><td><button type="button" class="btn btn-success" onclick="votar('+ 
                str.candidato.presidente[k].id_presidente +','+cedula+');">Votar</button></td></tr>';
                
                    }
                }
            }
           
            
        }
        
    }
    
    
    for (var i = 0; i < str.elecciones[eleccion1.id].representantes.length; i++ ) {
        for (var j = 0; j < str.partido.length; j++ ) {
            if(str.partido[j].id_partido == str.elecciones[eleccion1.id].representantes[i].id_partido){
                lis =str.partido[j].id_partido;
                datos_asambleistas += '<tr><td width=20>'+str.partido[j].lista +'</td><td><img width=30 src="' + 
                str.partido[j].logo + '"></img><td><button type="button" class="btn btn-success" onclick="votar_asambleistas('+ 
                str.partido[j].id_partido +','+cedula+');">Votar</button></td></td>';
    
            }
           
            
        }
        
    }
    
    
    $('#body_votar').html(datos);
    $('#body_votar_asam').html(datos_asambleistas)   ;
            
        
            
          

    for (var j = 0; j < str.votante.length; j++ ) {
        console.log(str.votante[j].cedula);
        console.log(str.votante[j].id_asa_partido);
        console.log(str.votante[j].id_presidente);
    }
    
        
        
    document.getElementById('pantalla_tabla_votar').style.display='block';
    
    
        
    }
        
        
      return true;
      
  
   
      
      
    }
            else
            {
      alert( "La c\xe9dula NO es v\xe1lida!!!" );
        $('#cedula_vot').val('');
              return false;
            }
          }
          else
          {
              $('#cedula_vot').val('');
            alert("La c\xe9dula debe tener 10 d\xedgitos");
            return false;
          }
          
          
          
          
          
            })
    
});

