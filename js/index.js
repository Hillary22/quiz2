//declaraciones
let tiempo;
const descripTarea= document.getElementById('descripTarea'); 
const botonTarea= document.getElementById('botonTarea');
const toDoT= document.getElementById('toDoT');
const doingT= document.getElementById('doingT');
const doneT= document.getElementById('doneT');
const database = firebase.database();

//metodos
console.log(database);
regirtroT = ()=>{


    if (descripTarea.value === ''){
        alert('No se escribió una nueva tarea');
        return;
    }

    let referencia =database.ref('tareas').push();
    console.log(referencia);
    tiempo =new Date();

     objPubliTarea={
        id: referencia.key,
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
            let list= new ListT(valor, publiTarea.key);

            if(valor.estado ==='ToDo'){
                toDoT.appendChild(list.render());
            }

            if(valor.estado ==='Doing'){
                doingT.appendChild(list.render());
            }

            if(valor.estado ==='Done'){
                doneT.appendChild(list.render());
            }
            
        });

});

