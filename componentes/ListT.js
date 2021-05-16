class ListT{

    constructor(publiTarea, key){
        this.publiTarea=publiTarea;
        this.key=key;
    }

}

render = ()=>{

    let component=document.createElement('div');
    component.className='ListT';
    
    let descripT = document.createElement('div');//CONTENIDO DE LA TAREA
   // descripT.className = 'descrcipTarea';
    descripT.innerHTML=(this.publiTarea.descripcion);
    
    //tiempo
    let fecha = document.createElement('div');
    fecha.className ='date';
    fecha.innerHTML =(this.publiTarea.fecha);
    
    
    let borrarBtn = document.createElement('button');
    borrarBtn.innerHTML =('x');
    borrarBtn.className='borrarBtn';
    
    let subirBtn = document.createElement('button');
    subirBtn.innerHTML =('>');
    subirBtn.className ='subirBtn';
    
    let bajarBtn = document.createElement('button');
    bajarBtn.innerHTML =('<');
    bajarBtn.className ='bajarBtn';
    
    //subimos de nivel el estado de la tarea creada
    let subir=()=>{
    
    
        database.ref('tareas/'+this.key).set(
                {
                id:this.publiTarea.key,
                estado:this.publiTarea.estado ==='ToDo'?'Doing': this.publiTarea.estado ==='Doing'?'Done':'Done',
                descripcion:this.publiTarea.value,
                fecha:this.publiTarea.fecha,
            }
        );
    
      }
    
      //bajamos de nivel
      let bajar=()=>{
    
        database.ref('tareas/'+this.key).set(
            {
              text:this.publiTarea.text,
              estado: this.publiTarea.estado ==='Done'?'Doing': this.publiTarea.estado ==='Doing'? 'ToDo':'ToDo',
              descripcion:this.publiTarea.value,
              fecha:this.publiTarea.fecha,
            }
        );
    
      }
    
    
      //se borra t
      let borrar=()=>{
        database.ref('tareas/'+this.key).set(null);
        console.log(this.key);
    }
    
    //botones
    subirBtn.addEventListener('click',subir);
    botonAtras.addEventListener('click', bajar);
    botonDelete.addEventListener('click', borrar);

    component.appendChild(descripT);
    component.appendChild(fecha);
    component.appendChild(borrarBtn);
    component.appendChild(subirBtn);
    component.appendChild(bajarBtn);
    
    return component;
    }
    