//Trae el detalle de la tabla de incidencias para ADMON
app.get('/DetalleTablaADMON', async (req, res) => {
    try {
        await sql.connect(config);
        const result = await sql.query`
            SELECT 
                I.id_incidencia, D.nombre, I.fecha, TI.nombre as nombreIncidencia, I.descripcion, EI.estado_incidencia as estado, EI.color
            FROM 
                INCIDENCIA I
            JOIN 
                INCIDENCIA_LUGAR IL ON I.id_incidencia = IL.id_incidencia
            JOIN 
                ESPACIOS E ON IL.id_espacio = E.id_espacio
            JOIN 
                DEPARTAMENTO D ON E.id_departamento = D.id_departamento
            JOIN 
                TIPO_INCIDENCIA TI ON TI.id_tipoIncidencia =I.id_tipoIncidencia
            JOIN
                ESTADO_INCIDENCIA EI ON EI.id_estado = I.id_estado;
        `;
        const detalle = result.recordset;
        console.log(detalle);
        res.status(200).json(detalle);
        //res.status(200).json({id_folio: detalle.id_incidencia, departamento: detalle.nombre, fecha: detalle.fecha, 
          //  tipoIncidencia: detalle.nombreIncidencia, descripcion: detalle.descripcion, estado: detalle.estado, color: detalle.color})
    } catch (error) {
        console.log('Error al obtener datos de la tabla: ', error);
        res.status(500).json({ error: 'Error al obtener datos de la tabla' });
    }
});

//Trae el detalle de la tabla de incidencias por departamento
app.get('/DetalleTablaDepartamento', async (req, res) => {
    try {
        await sql.connect(config);
        const { id_departamento } = req.query;
        console.log('Llegue a tabla por dpto y el id_departamento es ', id_departamento);
        const result = await sql.query`
            SELECT 
                I.id_incidencia, I.fecha, TI.nombre as nombreIncidencia, I.descripcion, EI.estado_incidencia as estado, EI.color
            FROM 
                INCIDENCIA I
            JOIN 
                INCIDENCIA_LUGAR IL ON I.id_incidencia = IL.id_incidencia
            JOIN 
                ESPACIOS E ON IL.id_espacio = E.id_espacio
            JOIN 
                DEPARTAMENTO D ON E.id_departamento = D.id_departamento
            JOIN 
                TIPO_INCIDENCIA TI ON TI.id_tipoIncidencia =I.id_tipoIncidencia
            JOIN
                ESTADO_INCIDENCIA EI ON EI.id_estado = I.id_estado
            WHERE D.id_departamento = ${id_departamento};
        `;
        const detalle = result.recordset;
        console.log(detalle);
        res.status(200).json(detalle);
    } catch (error) {
        console.log('Error al obtener datos de la tabla: ', error);
        res.status(500).json({ error: 'Error al obtener datos de la tabla' });
    }
});

//Trae las especializaciones
app.get('/SelectEspecializaciones', async (req, res) => {
    try {
        await sql.connect(config);
        const request = new sql.Request();
        const result = await request.query(`
            SELECT * FROM ESPECIALIZACION
        `);    
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error al obtener las especializaciones', error.message);
        res.status(500).send('Error al obtener las especializacioness');
    }
});

//Trae los tecnicos
app.get('/SelectTecnicos', async (req, res) => {
    try {
        await sql.connect(config);
        const { id_especializacion } = req.query;
        console.log(id_especializacion)
        const request = new sql.Request();
        const result = await request.query(`
            select t.id_usuario, u.nombre+' '+u.apellido as nombre from TECNICO T
            JOIN
                ESPECIALIZACION E ON e.id_especializacion = t.id_especializacion
            JOIN 
                USUARIO U ON u.id_usuario = t.id_usuario
            WHERE e.id_especializacion = ${id_especializacion} and t.id_estadoDisponibilidad = 1;
        `);    
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error al obtener las especializaciones', error.message);
        res.status(500).send('Error al obtener las especializacioness');
    }
});

// Asigna tecnico a incidencia
app.put('/AsignarTecnico', async (req, res) => {
    const { id_incidencia, id_usuario } = req.body;

    console.log('Datos recibidos:', {
        id_incidencia, id_usuario
    });
    try {
        await sql.connect(config);
        const request = new sql.Request();
        request.input('id_incidencia', sql.Int, id_incidencia);
        request.input('id_usuario', sql.Int, id_usuario);
        const result = await request.query(`
            UPDATE INCIDENCIA
            SET id_tecnicoAsignado = @id_usuario, 
                id_estado = 1
            WHERE id_incidencia = @id_incidencia;
        `)

        if (result.rowsAffected[0] > 0) {
            res.json({ success: true, message: 'Tecnico asignado' });
        } else {
            res.json({ success: false, message: 'No se pudo asignar tecnico' });
        }
    } catch (error) {
        console.error('Error al asignar tecnico:', error.message);
        res.status(500).json({ success: false, message: 'Error al asignar tecnico' });
    } finally {
        await sql.close();
    }
});

// Rechazar incidencia
app.put('/RechazarIncidencia', async (req, res) => {
    const { id_incidencia } = req.body;

    console.log('Datos recibidos:', {
        id_incidencia
    });
    try {
        await sql.connect(config);
        const request = new sql.Request();
        request.input('id_incidencia', sql.Int, id_incidencia);
        const result = await request.query(`
            UPDATE INCIDENCIA
            SET id_estado = 4
            WHERE id_incidencia = @id_incidencia;
        `)

        if (result.rowsAffected[0] > 0) {
            res.json({ success: true, message: 'Incidencia rechazada' });
        } else {
            res.json({ success: false, message: 'No se pudo rechazar incidencia' });
        }
    } catch (error) {
        console.error('Error al rechazar incidencia:', error.message);
        res.status(500).json({ success: false, message: 'Error al rechazar incidencia' });
    } finally {
        await sql.close();
    }
});

//Trae el detalle de la tabla de incidencias para tecnico
app.get('/DetalleTablaTecnico', async (req, res) => {
    try {
        await sql.connect(config);
        const { id_usuario } = req.query;
        console.log('Datos recibidos:', {
            id_usuario
        });
        const result = await sql.query`
            SELECT 
                I.id_incidencia, D.nombre, I.fecha, TI.nombre as nombreIncidencia, I.descripcion, EI.estado_incidencia as estado, EI.color
            FROM 
                INCIDENCIA I
            JOIN 
                INCIDENCIA_LUGAR IL ON I.id_incidencia = IL.id_incidencia
            JOIN 
                ESPACIOS E ON IL.id_espacio = E.id_espacio
            JOIN 
                DEPARTAMENTO D ON E.id_departamento = D.id_departamento
            JOIN 
                TIPO_INCIDENCIA TI ON TI.id_tipoIncidencia = I.id_tipoIncidencia
            JOIN
                ESTADO_INCIDENCIA EI ON EI.id_estado = I.id_estado
            JOIN
                TECNICO T ON T.id_usuario = I.id_tecnicoAsignado
            WHERE I.id_tecnicoAsignado = ${id_usuario};
        `;
        const detalle = result.recordset;
        console.log(detalle);
        res.status(200).json(detalle);
    } catch (error) {
        console.log('Error al obtener datos de la tabla: ', error);
        res.status(500).json({ error: 'Error al obtener datos de la tabla' });
    }
});

//Trae el detalle de incidencias para tecnico
app.get('/DetalleIncidencia', async (req, res) => {
    try {
        await sql.connect(config);
        const { id_incidencia } = req.query;
        console.log('Datos recibidos:', {
            id_incidencia
        });
        const result = await sql.query`
            SELECT 
                I.id_incidencia,
                I.hora_envio,
                I.hora_disponible_inicio,
                I.hora_disponible_fin,
                P.nombre AS nombre_prioridad,
                P.descripcion AS descripcion_prioridad,
                E.nombre as nombre_espacio,
                E.ubicacion_esp,
                D.ubicacion_edificio
            FROM 
                INCIDENCIA I
            JOIN 
                PRIORIDAD P ON I.id_prioridad = P.id_prioridad
            JOIN 
                INCIDENCIA_LUGAR IL ON I.id_incidencia = IL.id_incidencia
            JOIN 
                ESPACIOS E ON IL.id_espacio = E.id_espacio
            JOIN 
                EDIFICIO D ON E.id_edificio = D.id_edificio
            WHERE I.id_incidencia = ${id_incidencia};
        `;
        const detalle = result.recordset[0];
        console.log(detalle);
        res.status(200).json(detalle);
    } catch (error) {
        console.log('Error al obtener datos del detalle incidencia: ', error);
        res.status(500).json({ error: 'Error al obtener datos del detalle incidencia' });
    }
});

// Finalizar incidencia
app.put('/FinalizarIncidencia', async (req, res) => {
    const { id_incidencia } = req.body;

    console.log('Datos recibidos:', {
        id_incidencia
    });
    try {
        await sql.connect(config);
        const request = new sql.Request();
        request.input('id_incidencia', sql.Int, id_incidencia);
        const result = await request.query(`
            UPDATE INCIDENCIA
            SET id_estado = 2
            WHERE id_incidencia = @id_incidencia;
        `)

        if (result.rowsAffected[0] > 0) {
            res.json({ success: true, message: 'Incidencia finalizada' });
        } else {
            res.json({ success: false, message: 'No se pudo finalizar incidencia' });
        }
    } catch (error) {
        console.error('Error al finalizar incidencia:', error.message);
        res.status(500).json({ success: false, message: 'Error al finalizar incidencia' });
    } finally {
        await sql.close();
    }
});

// Finalizar incidencia
app.put('/LiberarIncidencia', async (req, res) => {
    const { id_incidencia } = req.body;

    console.log('Datos recibidos:', {
        id_incidencia
    });
    try {
        await sql.connect(config);
        const request = new sql.Request();
        request.input('id_incidencia', sql.Int, id_incidencia);
        const result = await request.query(`
            UPDATE INCIDENCIA
            SET id_estado = 3
            WHERE id_incidencia = @id_incidencia;
        `)

        if (result.rowsAffected[0] > 0) {
            res.json({ success: true, message: 'Incidencia liberada' });
        } else {
            res.json({ success: false, message: 'No se pudo liberar incidencia' });
        }
    } catch (error) {
        console.error('Error al liberar incidencia:', error.message);
        res.status(500).json({ success: false, message: 'Error al liberar incidencia' });
    } finally {
        await sql.close();
    }
});