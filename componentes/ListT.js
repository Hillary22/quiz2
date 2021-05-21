class ListT{


  constructor(publiTarea, key){
      this.publiTarea=publiTarea;
      this.key=key;
  }



  render = ()=>{

    let component=document.createElement('div');
    component.className='ListT';
    
    let descripT = document.createElement('div');//CONTENIDO DE LA TAREA
    descripT.className = 'descripTarea';
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
    
    switch (this.publiTarea.estado){
      case 'ToDo':
        component.appendChild(borrarBtn);
        component.appendChild(fecha);
        component.appendChild(descripT);
        component.appendChild(subirBtn);
     
      break;
      case 'doing':
        component.appendChild(borrarBtn);
        component.appendChild(fecha);
        component.appendChild(descripT);
        component.appendChild(subirBtn);
        component.appendChild(bajarBtn);
        
          break;
      case 'done':
        component.appendChild(borrarBtn);
        component.appendChild(fecha);
        component.appendChild(descripT);
        component.appendChild(bajarBtn);


  }

    //subimos de nivel el estado de la tarea creada
    let subir=()=>{

      if(this.publiTarea.estado === 'ToDo'){

        let ref = database.ref('tareas/doing/').push()

        let obj ={
          id:ref.key,
          estado:"doing",
          descripcion:this.publiTarea.descripcion,
          fecha:this.publiTarea.fecha,
      };

      ref.set(obj);
      console.log(this.publiTarea.id);
      database.ref('tareas/toDo/'+this.publiTarea.id).set(null);
      }

      if(this.publiTarea.estado === 'doing'){

        let ref = database.ref('tareas/done/').push()

        let obj ={
          id:ref.key,
          estado:"done",
          descripcion:this.publiTarea.descripcion,
          fecha:this.publiTarea.fecha,
      };

      ref.set(obj);
      console.log(this.publiTarea.id);
      database.ref('tareas/doing/'+this.publiTarea.id).set(null);
      }

    
    
      }
    
      //bajamos de nivel
      let bajar=()=>{
    
        if(this.publiTarea.estado === 'done'){

          let ref = database.ref('tareas/doing/').push()

          let obj ={
            id:ref.key,
            estado:"doing",
            descripcion:this.publiTarea.descripcion,
            fecha:this.publiTarea.fecha,
        };
    
        ref.set(obj);
        console.log(this.publiTarea.id);
        database.ref('tareas/done/'+this.publiTarea.id).set(null);
      
      }

      if(this.publiTarea.estado === 'doing'){

        let ref = database.ref('tareas/toDo/').push()

        let obj ={
          id:ref.key,
          estado:"done",
          descripcion:this.publiTarea.descripcion,
          fecha:this.publiTarea.fecha,
      };

      ref.set(obj);
      console.log(this.publiTarea.id);
      database.ref('tareas/doing/'+this.publiTarea.id).set(null);
      }


    }

      //se borra t
      let borrar=()=>{
        database.ref('tareas/'+this.publiTarea.estado+'/'+this.key).set(null);
        console.log(this.key);
    }
    
    //botones
    subirBtn.addEventListener('click', subir);
    bajarBtn.addEventListener('click', bajar);
    borrarBtn.addEventListener('click', borrar);

   
    
    return component;
    }
  }