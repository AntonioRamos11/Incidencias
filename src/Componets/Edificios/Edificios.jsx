import React, { useEffect, useState } from "react";
import axios from "axios";
import '../Edificios/Edificios.css';

export const Edificios = () => {
    const [radioCheck, setRadioCheck] = useState('Agregar');
    const [id_edificio, setId_edificio] = useState('');
    const [nombre, setNombre] = useState('');
    const [ubicacion_edificio, setUbicacion_edificio] = useState('');
    const [edificios, setEdificios] = useState([]);
    const [edificio, setEdificio] = useState('');
    const [action, setAction] = useState(null);

    useEffect(() => {
        const obtenerEdificios = async () => {
            try {
                const response = await axios.get('http://localhost:3000/SelectEdificiosPorEstatus');
                console.log('Edificios obtenidos:', response.data); // Verifica la estructura
                // Si response.data contiene un array dentro de una propiedad
                setEdificios(response.data)// Asegúrate de que sea un array
            } catch (error) {
                console.error('Error al obtener los edificios:', error);
            }
        };

    obtenerEdificios(); // Llamar a la función cuando el componente se monta

    }, [action]); // Se ejecuta una sola vez al montar el componente


    const handleListo = async (e) => {
        e.preventDefault();
        if (radioCheck === 'Agregar') {
            await handleAgregar(); // Llamar a handleAgregar
        } else if (radioCheck === 'Actualizar') {
            await handleActualizar(); // Llamar a handleActualizar
        } else if (radioCheck === 'Eliminar') {
            await handleEliminar(); // Asegúrate de definir handleEliminar si es necesario
        }
        limpiar();
    };

    const handleAgregar = async () => {
        if (!nombre || !ubicacion_edificio) {
            alert("Por favor, complete todos los campos.");
            return;
        }
    
        try {
            const response = await axios.post('http://localhost:3000/AltaEdificio', {
                nombre: nombre,
                ubicacion_edificio: ubicacion_edificio
            });
            const resultado = response.data;
            console.log(resultado);
            alert('Edificio agregado exitosamente'); // Mensaje de éxito
        } catch (error) {
            console.error("Error al agregar el edificio:", error.message);
            alert(`Hubo problemas al agregar el edificio: ${error.message}`);
        }
        setAction('add');
    };

    const handleActualizar = async () => {
        try {
            const response = await axios.put('http://localhost:3000/ActualizarEdificio', {
                id_edificio: id_edificio,
                nombre: nombre,
                ubicacion_edificio: ubicacion_edificio
            });
    
            const resultado = response.data;
            console.log('Resultado de la actualización:', resultado);
            alert('Edificio actualizado exitosamente');
        } catch (error) {
            console.error('Hubo problemas:', error.message);
            alert('Hubo problemas al actualizar el edificio');
        }
        setAction('update');
    };

    const handleEliminar = async () => {
        try {
            const response = await axios.put(`http://localhost:3000/EliminaEdificio`, {
                    id_edificio: id_edificio
            });
            const resultado = response.data;
            console.log('Resultado de la elimincacion:', resultado);
            alert('Edificio eliminado exitosamente');
        } catch (error) {
            console.error('Hubo problemas:', error.message);
            alert('Hubo problemas al eliminar el edificio');
        }
        setAction('update');
    };
    

    const handleRadioChange = (event) => {
        const valueCheck = event.target.value;
        setRadioCheck(valueCheck);
        console.log(valueCheck);
        limpiar();
    };

    const handleSelectedChange = async (e) => {
        const id_edificioSeleccionado = e.target.value; // Capturamos el ID del edificio seleccionado
        const ediSelect = edificios.filter(edi => edi.id_edificio === parseInt(id_edificioSeleccionado));
    
        console.log(ediSelect);
        setEdificio(id_edificioSeleccionado); // Actualizamos el ID del edificio en el estado
    
        if (ediSelect.length > 0) { 
            setId_edificio(ediSelect[0].id_edificio);
            setNombre(ediSelect[0].nombre);
            setUbicacion_edificio(ediSelect[0].ubicacion_edificio);
        }
    
        try {
            const response = await axios.get(`http://localhost:3000/TraeUbicacionEdificio/${id_edificioSeleccionado}`);
            if (response.data) {
                setUbicacion_edificio(response.data.ubicacion_edificio); // Actualizamos la ubicación
            } else {
                console.error('No se recibió una respuesta válida de la API');
            }
        } catch (error) {
            console.error('Error al obtener la ubicación del edificio:', error);
        }
    };

    const limpiar = () => {
        setId_edificio('');
        setNombre('Selecciona el edificio');
        setUbicacion_edificio('');
   }

    return (
        <>
            <div className="background-half"></div>
            <form className="form-container">
                <div className="form-wrapper">
                    <span className="d-block text-center nito tam-letra-28px tipo-letra-arial">Edificio</span>

                    <div className="depCheck margin-top-20px">
                        {/* Radio buttons */}
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="radioAAE" id="idRadioAgregar" value="Agregar" onChange={handleRadioChange} checked={radioCheck === 'Agregar'} />
                            <label className="form-check-label" htmlFor="idRadioAgregar">Agregar</label>
                        </div>

                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="radioAAE" id="idRadioActualizar" value="Actualizar" onChange={handleRadioChange} checked={radioCheck === 'Actualizar'} />
                            <label className="form-check-label" htmlFor="idRadioActualizar">Actualizar</label>
                        </div>

                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="radioAAE" id="idRadioEliminar" value="Eliminar" onChange={handleRadioChange} checked={radioCheck === 'Eliminar'} />
                            <label className="form-check-label" htmlFor="idRadioEliminar">Eliminar</label>
                        </div>
                    </div>

                    {(radioCheck === 'Actualizar' || radioCheck === 'Eliminar') && (
                    <div>
                        <label htmlFor="inputText" className="form-label">Edificio</label>
                        <select className="form-select" aria-label="Select building" value={edificio} onChange={handleSelectedChange/*(e) => setDepartamentoPadre(e.target.value)*/}>
                            <option value="selCheck">Selecciona el edificio</option>
                            {Array.isArray(edificios) && edificios.map((edi) => (
                                <option key={edi.id_edificio} value={edi.id_edificio}>{edi.nombre}</option>))}
                        </select>
                    </div>
                    )}

                    {(radioCheck === "Agregar") && (
                    <div className="mb-3">
                        <label htmlFor="inputText" className="form-label">Nombre</label>
                        <input type="text" className="form-control" id="inputText" placeholder="Ingresa nombre de edificio aqui" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                    </div>
                    )}
                    
                    <div className="mb-3">
                        <label htmlFor="inputUbicacion" className="form-label">Ubicacion</label>
                        <input type="text" className="form-control" id="inputUbicacion" placeholder="Ingresa ubicacion aquí" value={ubicacion_edificio} onChange={(e) => setUbicacion_edificio(e.target.value)} />
                    </div>
                    <div className="button-container">
                        <button onClick={handleListo} className='color-boton-azul submit-btn color-blanco'>
                            Listo
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}