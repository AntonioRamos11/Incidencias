import './Departamento_Alta_Baja_Cambio.css';
import React, { useEffect, useState } from "react";
import axios from "axios";

export const Departamento_Alta_Baja_Cambio = () => {

    const [radioCheck, setRadioCheck] = useState('Agregar');
    const [nombre, setNombre] = useState('');
    const [departamentoPadre, setDepartamentoPadre] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [ubicacion, setUbicacion] = useState(null);
    const [departamentos, setDepartamentos] = useState([]);
    const [departamento, setDepartamento] = useState('');
    const [nomPadre, setNomPadre] = useState('Selecciona el departamento');
    const [id, setId] = useState('');

    useEffect(() => {
        const obtenerDepartamentos = async () => {
            try {
                const response = await axios.get('http://localhost:3000/SelectDepartamentos');
                setDepartamentos(response.data);
            } catch (error) {
                console.error('Error al obtener los departamentos cliente:', error);
            }
        };
    
        obtenerDepartamentos();
    }, [departamento]);

    const handleListo = async (e) => {
        e.preventDefault();
    
        if (radioCheck === 'Agregar') {
            handleAgregar();
        } else if (radioCheck === 'Actualizar') {
            handleActualizar();
        } else if (radioCheck === 'Eliminar') {
            await handleEliminar();
        }
        const response = await axios.get('http://localhost:3000/SelectDepartamentos');
        setDepartamentos(response.data);
    };

    const handleAgregar = async() => {
        try {
            const response = await axios.post('http://localhost:3000/AltaDepartamentos', {
                nombre: nombre,
                departamentoPadre: departamentoPadre,
                correo: correo,
                telefono: telefono,
                ubicacion: ubicacion
            });
            const resultado = response.data;
            console.log(resultado);
            alert('Departamento insertado exitosamente');
            limpiar();
        } catch (error) {
            alert("Hubo problemas");
            console.log(error.message);
        }
    };

    const handleActualizar = async () => {
        try {
            const response0 = await axios.get(`http://localhost:3000/ObtenerIdDepartamentoPadre/${departamentoPadre}`);
            console.log('Respuesta de la API:', response0.data);
            let idDepPadre = '';
            if (!response0.data || !response0.data.id_departamento) {
                idDepPadre = null;
                //throw new Error('La respuesta de la API no contiene id_departamento');
            }else{
                idDepPadre = response0.data.id_departamento;
            }
    
            const response = await axios.put('http://localhost:3000/ActualizarDepartamento', {
                id_departamento: id,
                nombre: nombre,
                correo: correo,
                telefono: telefono,
                ubicacion_dep: ubicacion,
                id_departamentoPadre: idDepPadre
            });
    
            const resultado = response.data;
            console.log('Resultado de la actualización:', resultado);
            alert('Departamento actualizado exitosamente');
            limpiar();
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
            const response = await axios.delete(`http://localhost:3000/EliminarDepartamento/${id}`);
            console.log('Departamento eliminado:', response.data);
            alert('Departamento eliminado exitosamente');
            limpiar();
        } catch (error) {
            console.error('Error al eliminar el departamento:', error.message);
            alert('Hubo problemas al eliminar el departamento');
        }
    };
    
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setUbicacion(file);
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
    
        if (depSelect.length > 0) {
            setId(depSelect[0].id_departamento || ' ');
            setNombre(depSelect[0].nombre || ' ');
            setCorreo(depSelect[0].correo || ' ');
            setTelefono(depSelect[0].telefono || ' ');
            setUbicacion(depSelect[0].ubicacion || ' ');
    
            try {
                const response = await axios.get(`http://localhost:3000/TraeNombreDep/${depSelect[0].id_departamentoPadre}`);
                const nombreDepPadre = response.data.nombre || "No depende de otro departamento";
                setDepartamentoPadre(nombreDepPadre);
                console.log(response.data);
            } catch (error) {
                console.error('Error al obtener el nombre del departamento padre:', error);
                setNomPadre("No depende de otro departamento");
            }
        }
    };
    
   const limpiar = () => {
        setDepartamento('Seleccione el departamento')
        setDepartamentoPadre('Seleccione el departamento');
        setNombre('');
        setNomPadre('No depende de otro departamento');
        setCorreo('');
        setTelefono('');
   }

    return (
        <form className="form-container">
            <div className='background-half'></div>

            <div className='form-wrapper'>
                <span className="d-block text-center nito tam-letra-28px tipo-letra-arial">Departamento</span>

                <div className="depCheck ">
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="radioAAE" id="idRadioAgregar" value="Agregar" onChange={handleRadioChange} checked={radioCheck === 'Agregar'} ></input>
                        <label className="form-check-label" htmlFor="idRadioAgregar">Agregar</label>
                    </div>

                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="radioAAE" id="idRadioActualizar" value="Actualizar" onChange={handleRadioChange} checked={radioCheck === 'Actualizar'}></input>
                        <label className="form-check-label" htmlFor="idRadioActualizar">Actualizar</label>
                    </div>

                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="radioAAE" id="idRadioEliminar" value="Eliminar" onChange={handleRadioChange} checked={radioCheck === 'Eliminar'}></input>
                        <label className="form-check-label" htmlFor="idRadioEliminar">Eliminar</label>
                    </div>
                </div>

                {(radioCheck === 'Actualizar' || radioCheck === 'Eliminar') && (
                    <div>
                        <label htmlFor="inputText" className="form-label">Seleccione el departamento</label>
                        <select className="form-select" aria-label="Select department" value={departamento} onChange={handleSelectedCheck}>
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
                                <option value="" >No depende de otro departamento</option>
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
                            <label htmlFor="inputPhone" className="form-label">Teléfono</label>
                            <input type="tel" className="form-control" id="inputPhone" placeholder="Ingresa el número de teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)}></input>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="inputFile" className="form-label">Ubicación (Imagen)</label>
                            <input type="file" className="form-control" id="inputFile" onChange={handleImageChange}></input>
                        </div>
                    </div>
                }

                <div className="d-grid gap-2">
                    <button className='color-boton-azul submit-btn color-blanco' type="submit" onClick={handleListo}>Listo</button>
                </div>
            </div>
        </form>
    );
};