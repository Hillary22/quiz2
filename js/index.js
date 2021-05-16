//declaraciones
let tiempo;
const descripTarea= document.getElementById('descripTarea'); 
const botonTarea= document.getElementById('botonTarea');
const toDoT= document.getElementById('toDoT');
const doingT= document.getElementById('doingT');
const doneT= document.getElementById('doneT');
const database = firebase.database();

//metodos

regirtroT = ()=>{


    if (descripTarea.value === ''){
        alert('No se escribió una nueva tarea');
        return;
    }

    let referencia =database.ref('tareas').push();
    tiempo =new Date();

    let objPubliTarea={
        id:descripTarea.key,
        estado:'ToDo',
        descripcion:descripTarea.value,
        fecha: tiempo.getFullYear()+ "." + tiempo.getMonth() + "."+ tiempo.getDate(),
    }
    referencia.set(objPubliTarea);
    
}

//para subir las tareas a firebase
botonTarea.addEventListener('click', regirtroT);


database.ref('tareas').on('value', function (data){
    toDoT.innerHTML= '';
    doingT.innerHTML= '';
    doneT.innerHTML= '';
    data.forEach(

        publiTarea=>{

            let valor= publiTarea.val();
            let list= new ListT(valor,publiTarea.key);

            if(valor.estado ==='ToDo'){
                tareasToDoCont.appendChild(list.render());
            }

            if(valor.estado ==='Doing'){
                tareasDoingCont.appendChild(list.render());
            }

            if(valor.estado ==='Done'){
                tareasDoneCont.appendChild(list.render());
            }
            
        });

});

