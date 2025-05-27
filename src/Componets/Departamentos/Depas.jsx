import { useNavigate } from "react-router-dom"
import './Departamento_Alta_Baja_Cambio.css';
import React, { useEffect, useState } from "react";
import axios from "axios";

export const Departamento_Alta_Baja_Cambio =() => {

    const [radioCheck,setRadioCheck] = useState('Agregar');
    const [nombre,setNombre] = useState('');
    const [departamentoPadre,setDepartamentoPadre] = useState('');
    const [correo,setCorreo] = useState('');
    const [telefono,setTelefono] = useState('');
    const [ubicacion,setUbicacion] = useState(null);
    const [departamentos,setDepartamentos] = useState([]);
    const [departamento,setDepartamento] = useState('');
    const [nomPadre,setNomPadre] = useState('Selecciona el departamento');
    const [id,setId] = useState('');

    useEffect(() => {
        const obtenerDepartamentos = async () => {
            try {
                const response = await axios.get('http://localhost:3000/SelectDepartamentos');
                setDepartamentos(response.data); // Guardar los departamentos en el estado
            } catch (error) {
                console.error('Error al obtener los departamentos cliente:', error);
            }
        };
    
        obtenerDepartamentos(); // Llamar a la función cuando el componente se monta
    }, []); 

    const handleListo = async (e) => {
        e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
    
        if (radioCheck === 'Agregar') {
            handleAgregar(); // Llamar a handleAgregar
            //window.location.reload();
        } else if (radioCheck === 'Actualizar') {
            handleActualizar(); // Llamar a handleActualizar
            //window.location.reload();
        } else if (radioCheck === 'Eliminar') {
            await handleEliminar(); // Asegúrate de definir handleEliminar si es necesario
            //  window.location.reload();
        }
    };

    const handleAgregar = async(e) => {
        //e.preventDefault(); // Asegúrate de que esto esté al principio para prevenir el comportamiento predeterminado del formulario
        try{
            const response = await axios.post('http://localhost:3000/AltaDepartamentos',{
                nombre:nombre,
                departamentoPadre:departamentoPadre,
                correo:correo,
                telefono:telefono,
                ubicacion:ubicacion
            });
            // Obtener y mostrar el resultado
        const resultado = response.data;
        console.log(resultado);
        alert('Departamento insertado exitosamente'); // Mensaje de éxito
        window.location.reload();
        }catch(error){
            alert("Hubo problemas");
            console.log(error.message);
        }
    };

    /*const handleActualizar = async (e) => {
        // e.preventDefault(); // Descomentarlo si quieres evitar el comportamiento por defecto del formulario
        try {
            const response0 = await axios.get(`http://localhost:3000/ObtenerIdDepartamentoPadre/${departamentoPadre}`);
            console.log('Respuesta de la API:', response0.data);
            alert('id:', response0.data);
            const idDepPadre = response0.data.id_departamento;
            alert(idDepPadre);
    
            // Hacer la petición para actualizar el departamento
            const response = await axios.put('http://localhost:3000/ActualizarDepartamento', {
                id_departamento: id,
                nombre: nombre,
                correo: correo,
                telefono: telefono,
                ubicacion_dep: ubicacion, // Asegúrate de enviar el nombre correcto del campo
                id_departamentoPadre: idDepPadre
            });
    
            const resultado = response.data;
            console.log(resultado);
            alert('Departamento actualizado exitosamente');
        } catch (error) {
            //alert("Hubo problemas");
            console.log("Hubo problemas",error.message);
        }
    };*/
    
    const handleActualizar = async (e) => {
        // e.preventDefault(); // Descomentarlo si quieres evitar el comportamiento por defecto del formulario
        try {
            alert(departamentoPadre)
            const response0 = await axios.get(`http://localhost:3000/ObtenerIdDepartamentoPadre/${departamentoPadre}`);
            console.log('Respuesta de la API:', response0.data);
            alert('123')
            // Verificar si response0.data tiene el formato esperado
            if (!response0.data || !response0.data.id_departamento) {
                throw new Error('La respuesta de la API no contiene id_departamento');
            }
           
            const idDepPadre = response0.data.id_departamento;
            alert(`ID del departamento padre: ${idDepPadre}`);
    
            // Hacer la petición para actualizar el departamento
            const response = await axios.put('http://localhost:3000/ActualizarDepartamento', {
                id_departamento: id,
                nombre: nombre,
                correo: correo,
                telefono: telefono,
                ubicacion_dep: ubicacion, // Asegúrate de enviar el nombre correcto del campo
                id_departamentoPadre: idDepPadre
            });
    
            const resultado = response.data;
            console.log('Resultado de la actualización:', resultado);
            alert('Departamento actualizado exitosamente');
        } catch (error) {
            console.error('Hubo problemas:', error.message);
            alert('Hubo problemas al actualizar el departamento');
        }
    };
    
    const handleEliminar = async () => {
        if (!id) {
            console.error('ID del departamento no definido');
            alert('Por favor, selecciona un departamento para eliminar');
            return;
        }
    
        try {
            alert(id);
            const response = await axios.delete(`http://localhost:3000/EliminarDepartamento/${id}`);
            console.log('Departamento eliminado:', response.data);
            alert('Departamento eliminado exitosamente');
            window.location.reload();
            // Aquí puedes actualizar tu estado o hacer cualquier otra cosa necesaria después de la eliminación
        } catch (error) {
            console.error('Error al eliminar el departamento:', error.message);
            alert('Hubo problemas al eliminar el departamento');
        }
    };
    
    const handleImageChange = (e) => {
        const file = e.target.files[0]; // Obtiene el primer archivo seleccionado
        setUbicacion(file); // Almacena la imagen en el estado
    };

    const handleRadioChange = (event) => {
        const valueCheck = event.target.value;
        setRadioCheck(valueCheck);
        console.log(valueCheck);
        limpiar();
    };

    const handleSelectedCheck = async (e) => {
        e.preventDefault();
        const depSelect = departamentos.filter(dep => dep.nombre === e.target.value);
        console.log(depSelect);
        setDepartamento(e.target.value);
    
        if (depSelect.length > 0) { // Asegúrate de que depSelect tenga elementos
            setId(depSelect[0].id_departamento)
            setNombre(depSelect[0].nombre);
            setCorreo(depSelect[0].correo);
            setTelefono(depSelect[0].telefono);
            setUbicacion(depSelect[0].ubicacion);
    
            try {
                const response = await axios.get(`http://localhost:3000/TraeNombreDep/${depSelect[0].id_departamentoPadre}`);
                const nombreDepPadre = response.data.nombre || "No depende de otro departamento"; // Si es null, asigna el texto por defecto
                setDepartamentoPadre(nombreDepPadre);
                console.log(response.data);
            } catch (error) {
                console.error('Error al obtener el nombre del departamento padre:', error);
                setNomPadre("No depende de otro departamento"); // En caso de error, asigna el texto por defecto
            }
        }
    };
    
   const limpiar = () => {
    setNombre('');
    setNomPadre('No depende de otro departamento');
    setCorreo('');
    setTelefono('');
   }
    return(
        <form>
            <div className='Login-div-azul'></div>

            <div className='Login-div-IS'>
                <span className="d-block text-center nito tam-letra-28px tipo-letra-arial">Departamento</span>

                <div className="depCheck ">
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="radioAAE" id="idRadioAgregar" value="Agregar" onChange={handleRadioChange} checked={radioCheck === 'Agregar'} ></input>
                        <label class="form-check-label" for="inlineRadio1">Agregar</label>
                    </div>

                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="radioAAE" id="idRadioActualizar" value="Actualizar" onChange={handleRadioChange} checked={radioCheck === 'Actualizar'}></input>
                        <label class="form-check-label" for="inlineRadio1">Actualizar</label>
                    </div>

                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="radioAAE" id="idRadioEliminar" value="Eliminar" onChange={handleRadioChange} checked={radioCheck === 'Eliminar'}></input>
                        <label class="form-check-label" for="inlineRadio1">Eliminar</label>
                    </div>
                </div>

                {(radioCheck === 'Actualizar' || radioCheck === 'Eliminar') && (
                    <div>
                        <label htmlFor="inputText" className="form-label">Seleccione el departamento</label>
                        <select className="form-select" aria-label="Select department" value={departamento} onChange={handleSelectedCheck/*(e) => setDepartamentoPadre(e.target.value)*/}>
                            <option value="selCheck">Selecciona el departamento</option>
                            {departamentos.map((dep, index) => (
                                <option key={dep.id} value={dep.id}>{dep.nombre}</option>
                            ))}
                        </select>
                    </div>
                )}

                {(radioCheck !== 'Eliminar') &&
                    <div>
                        <div className="mb-3">
                            <label htmlFor="inputText" className="form-label">Departamento</label>
                            <input type="text" className="form-control" id="inputText" placeholder="Ingresa el departamento aquí" value={nombre} onChange={(e) => setNombre(e.target.value)}></input>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="inputText" className="form-label">Departamento al que pertenece</label>
                            <select className="form-select" value={departamentoPadre} onChange={(e) => setDepartamentoPadre(e.target.value)}>
                                <option value="" >No depende de otro departamento</option> {/* Mostrar el nombre del departamento padre o el texto por defecto */}
                                {departamentos.map((dep, index) => (
                                    <option key={index} value={dep.nombre}>{dep.nombre}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="inputEmail" className="form-label">Correo Electrónico</label>
                            <input type="email" className="form-control" id="inputEmail" placeholder="Ingresa el correo electrónico" value={correo} onChange={(e) => setCorreo(e.target.value)}></input>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="inputPhone" className="form-label" value={'telefono'}>Teléfono</label>
                            <input type="tel" className="form-control" id="inputPhone" placeholder="Ingresa el número de teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)}></input>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="inputFile" className="form-label" >Cargar Imagen</label>
                            <input type="file" className="form-control" id="inputFile"  accept="image/*"  onChange={handleImageChange}/>
                        </div>
                    </div>
                }

                <div>
                    <button  onClick={handleListo} className='margin-left-25px tam-btn color-boton-azul color-blanco nito sombra-50px tipo-letra-arial'>
                        Listo
                    </button>
                </div>
            </div>
        </form>
    )
}