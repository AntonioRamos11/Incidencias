const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const port = 3000;

const app = express();
app.use(cors());
app.use(express.json());

// Configuración de conexión a SQL Server
const config = {
    user: 'sa',
    //password: 'Ramos123',
    password: 'Ramosfe1101@',
    server: 'localhost', // Ejemplo: localhost
    database: 'proyectoITIL',
    options: {
        encrypt: false, // Si usas Azure
        trustServerCertificate: true // Si usas SQL Server local
    }
};


// Conexión a la base de datos
sql.connect(config, err => {
    if (err) {
        console.error('Error de conexión a la base de datos:', err);
        return;
    }
    console.log('Conectado a SQL Server');

    // Ejemplo de una ruta que realiza una consulta a la base de datos
    app.get('/api/datos', async (req, res) => {
        try {
            const result = await sql.query('SELECT * FROM USUARIO'); // Reemplaza 'tuTabla' con el nombre de tu tabla
            //console.log(result)
            res.json(result.recordset);
        } catch (err) {
            console.error('Error en la consulta:', err);
            res.status(500).send('Error en la consulta');
        }
    });
});

//Inserta departamentos
app.post('/AltaDepartamentos',async(req,res) => {
    try{
        
        await sql.connect(config);
        const {nombre,departamentoPadre,correo,telefono,ubicacion} = req.body;
        await sql.query`EXEC InsertDepartamento
        @nombre = ${nombre},
        @departamentoPadreNombre = ${departamentoPadre},
        @correo = ${correo},
        @telefono = ${telefono},
        @ubicacion = ${ubicacion};`
         // Enviar una respuesta de éxito
        res.status(200).send('Departamento insertado exitosamente');
    }catch(error){
        console.error('Error al insertar el departamento:', error.message);
        // Enviar una respuesta de error
        res.status(500).send('Error al insertar el departamento');
    }finally{
        await sql.close();
    }
});

//Trae departamentos 
app.get('/SelectDepartamentos', async(req,res) => {
    try{
        await sql.connect(config);
        const result = await sql.query(`select * from departamento`);
        res.status(200).json(result.recordset);
    }catch(error){
        console.error('Error al traer los departamentos:', error.message);
        // Enviar una respuesta de error
        res.status(500).send('Error al traer los departamentos');
    }finally{
        await sql.close();
    }
});

app.get('/ObtenerIdDepartamentoPadre/:departamentoPadre', async (req, res) => {
    try {
        await sql.connect(config);
        const { departamentoPadre } = req.params;
        console.log("imprime en obtener id: ", { departamentoPadre });

        // Crear una nueva instancia de solicitud SQL
        const request = new sql.Request();

        // Definir el parámetro de entrada y ejecutar la consulta parametrizada
        const result = await request
            .input('departamentoPadre', sql.NVarChar, departamentoPadre) // Definir el parámetro limpio
            .query('SELECT id_departamento FROM departamento WHERE nombre = @departamentoPadre');

        console.log("Resultado de la consulta: ", result.recordset[0]);
        res.status(200).json(result.recordset[0]);
    } catch (error) {
        console.error('Error al obtener el ID del departamento padre:', error.message);
        res.status(500).send('Error al obtener el ID del departamento padre');
    } finally {
        await sql.close();
    }
});

app.put('/ActualizarDepartamento', async (req, res) => {
    try {
        await sql.connect(config);

        // Extraer parámetros del body
        const { id_departamento, nombre, correo, telefono, ubicacion_dep, id_departamentoPadre } = req.body;

        // Crear una nueva instancia de solicitud SQL para ejecutar el procedimiento almacenado
        const request = new sql.Request();

        // Ejecutar el procedimiento almacenado con los parámetros proporcionados
        await request
            .input('id_departamento', sql.Int, id_departamento)
            .input('nombre', sql.NVarChar, nombre)
            .input('correo', sql.NVarChar, correo)
            .input('telefono', sql.NVarChar, telefono)
            .input('ubicacion_dep', sql.NVarChar, ubicacion_dep)
            .input('id_departamentoPadre', sql.Int, id_departamentoPadre)
            .execute('ActualizarDepartamento'); // Ejecutar el procedimiento almacenado

        res.status(200).send('Departamento actualizado exitosamente');
    } catch (error) {
        console.error('Error al actualizar el departamento:', error.message);
        res.status(500).send('Error al actualizar el departamento');
    } finally {
        await sql.close();
    }
});

app.delete('/EliminarDepartamento/:id', async (req, res) => {
    try {
        await sql.connect(config);
        const { id } = req.params;
        console.log("Eliminando departamento con ID:", id);

        // Crear una nueva instancia de solicitud SQL
        const request = new sql.Request();

        // Ejecutar la consulta para eliminar el departamento
        const result = await request
            .input('id', sql.Int, id)
            .query('DELETE FROM departamento WHERE id_departamento = @id');

        if (result.rowsAffected[0] === 0) {
            res.status(404).send('Departamento no encontrado');
        } else {
            res.status(200).send('Departamento eliminado exitosamente');
        }
    } catch (error) {
        console.error('Error al eliminar el departamento:', error.message);
        res.status(500).send('Error al eliminar el departamento');
    } finally {
        await sql.close();
    }
});


app.get('/TraeNombreDep/:id_departamentoPadre', async (req, res) => {
    console.log('Conectado a SQL Server');
    try {
        await sql.connect(config);
        const { id_departamentoPadre } = req.params; // Obtener el parámetro de la URL
        console.log(id_departamentoPadre); // Corregido el nombre de la variable
        const result = await sql.query`SELECT nombre FROM departamento WHERE id_departamento = ${id_departamentoPadre}`;
        
        console.log(result.recordset);
        res.status(200).json(result.recordset[0]); 
    } catch (error) {
        console.error('Error al traer nombre del departamento', error.message);
        res.status(500).send('Error al traer nombre del departamento');
    } finally {
        await sql.close();
    }
});


// Permisos del usuario
app.post('/Permisos', async(req,res) => {
    try {
        await sql.connect(config);

        const {usuario} = req.body;

        const permisosCheckResult = await sql.query`
        SELECT dbo.VerificarPermisos(${usuario}) AS Permisos;`

        const permisos = permisosCheckResult.recordset[0].Permisos;
        console.log(permisos);
        res.status(200).json({permisos});
    } catch (error) {
        console.log('error al verificar el inicio de sesion: ',error);
        res.status(500).json({error: 'error al verificar inicio de sesion'});
    }finally{
        await sql.close();
    }
});

app.listen(port, () => {
    console.log(`La API está escuchando en http://localhost:${port}`);
});

// Actualiza la contraseña del usuario
app.put('/CambiarContrasenia', async(req,res) => {
    try{
        await sql.connect(config);
        const {idUsuario, contrasenia} = req.body;
        await sql.query`UPDATE Usuario SET contrasena = ${contrasenia} WHERE id_usuario = ${idUsuario}`;
        res.status(200).send('Usuario actualizado exitosamente');
    }catch(error){
        res.status(500).send('Error al actualizar usuario');
    }finally{
        await sql.close();
    }
});


// Traer el nombre del departamento que pertenece el usuario
app.get('/SelectDepartamento', async (req, res) => {
    try {
        await sql.connect(config);
        const idDepartamentoPertenece = req.query.id_pertenece; // Cambiar a req.query
        const checkNombreDep = await sql.query`
            select nombre from departamento where id_departamento = ${idDepartamentoPertenece}`;
        const result = checkNombreDep.recordset[0].nombre;
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ error: 'Error al verificar nombre del departamento' });
    } finally {
        await sql.close();
    }
});

// Trae los Edificios
app.get('/SelectEdificios', async(req,res) => {
    try{
        await sql.connect(config);
        const checkEdificio = await sql.query(`select id_edificio, nombre from Edificio where estatus = 1`);
        res.status(200).json({edificios: checkEdificio.recordset});
    }catch(error){
        console.error('Error al traer los edificios:', error.message);
        res.status(500).send('Error al traer los edificios');
    }
});

// Trae los Edificios segun su departamento
app.get('/SelectEdificiosPorDepartamento', async(req, res) => {
    try{
        await sql.connect(config);
        const id_departamento = req.query.id_departamento;
        const checkEdificioDepartamento = await sql.query(`
            SELECT DISTINCT E.id_edificio, E.nombre
            FROM EDIFICIO E
            JOIN ESPACIOS ES ON E.id_edificio = ES.id_edificio
            WHERE ES.id_departamento = ${id_departamento} and ES.estatus = 1;
        `);
        res.status(200).json({edificios: checkEdificioDepartamento.recordset});
    }catch(error){
        console.error('Error al traer los edificios por departamento: ', error.message);
        res.status(500).send('Error al traer los edificios');
    }
});

// Trae los Espacios segun el edificio
app.get('/SelectEspaciosPorEdificio', async(req,res) => {
    try{
        await sql.connect(config);
        const id_edificio = req.query.id_edificio;
        const id_departamento = req.query.id_departamento;
        console.log('idEdificio: ', id_edificio);
        const checkEspacioEdificio = await sql.query(`
            SELECT DISTINCT TE.id_tipoEspacio, TE.nombre
            FROM TIPO_ESPACIO TE
            LEFT JOIN ESPACIOS ES ON TE.id_tipoEspacio = ES.id_tipoEspacio
            WHERE ES.id_edificio = ${id_edificio} AND ES.id_departamento = ${id_departamento} AND estatus = 1;
        `);
        res.status(200).json({tiposEspacios: checkEspacioEdificio.recordset});
    }catch(error){
        console.error('Error al traer los espacios por edificio: ', error.message);
        res.status(500).send('Error al traer los espacios');
    }
});

// Trae los nombres de los espacios
app.get('/SelectNombrePorEspacios', async(req,res) => {
    try{
        await sql.connect(config);
        const id_tipoEspacio = req.query.id_tipoEspacio;
        const id_edificio = req.query.id_edificio;
        const id_departamento = req.query.id_departamento;
        console.log('idTipoEspacio ', id_tipoEspacio);
        const checkNombreEspacio = await sql.query(`
            SELECT ES.id_espacio, ES.nombre, responsable = u.nombre+' '+u.apellido
            FROM ESPACIOS ES
            LEFT JOIN usuario u on u.id_usuario = es.responsable
            WHERE ES.id_tipoEspacio = ${id_tipoEspacio} AND ES.id_edificio = ${id_edificio} AND ES.id_departamento = ${id_departamento};
        `);
        if(!checkNombreEspacio){
        
        }
        console.log(checkNombreEspacio.recordset)
        res.status(200).json({nombresEspacio: checkNombreEspacio.recordset});
    }catch(error){
        console.error('Error al traer los nombres de los espacios: ', error.message);
        res.status(500).send('Error al traer los nombres de los espacios');
    }
});

// Trae los Tipos de Espacios
app.get('/SelectTipoEspacios', async(req,res) => {
    try{
        await sql.connect(config);
        const checkTipoEspacio = await sql.query(`select * from tipo_espacio`);
        res.status(200).json({tipoEspacios: checkTipoEspacio.recordset});
    }catch(error){
        console.error('Error al traer los tipos de espacios: ', error.message);
        res.status(500).json.send('Error al traer los tipos de espacios');
    }
});

app.get('/SelectCapacidadNombre', async (req, res) => {
    try {
        await sql.connect(config);
        const id_espacio = req.query.id_espacio;
        console.log('idEspacio ', id_espacio);
        const request = new sql.Request();
        request.input('id_espacio', sql.Int, id_espacio);
        const result = await request.query('SELECT id_espacio, capacidad, ubicacion_esp, nombre, responsable FROM ESPACIOS WHERE id_espacio = @id_espacio');
        const capacidadUbicacion = result.recordset[0];
        console.log('capacidad: ', capacidadUbicacion);
        if (capacidadUbicacion) {
            res.status(200).json({
                capacidad: capacidadUbicacion.capacidad,
                ubicacion: capacidadUbicacion.ubicacion_esp,
                nombreEspacio: capacidadUbicacion.nombre,
                responsable: capacidadUbicacion.responsable
            });
        } else {
            res.status(404).json({ message: 'Espacio no encontrado' });
        }
    } catch (error) {
        console.error('Error al traer la capacidad y ubicacion: ', error.message);
        res.status(500).send('Error al traer la capacidad y la ubicacion');
    }
});

// Da de alta a espacios
app.post('/AltaEspacios', async(req, res) => {
    try{
        await sql.connect(config);
        const{tipoEspacio, edificio, idDepartamentoPertenece, ubicacion, capacidad, nombre, usuario} = req.body;
        await sql.query`INSERT INTO espacios(id_tipoEspacio, id_edificio, id_departamento, ubicacion_esp, capacidad, nombre, responsable, estatus)
            VALUES(${tipoEspacio}, ${edificio}, ${idDepartamentoPertenece}, ${ubicacion}, ${capacidad}, ${nombre}, ${usuario}, 1);
            `;
        res.status(200).send('Espacio insertado exitosamente');
    }catch(error){
        console.error('Error al insertar el espacio:, ', error.message);
        res.status(500).send('Error al insertar el espacio');
    }finally{
        await sql.close();
    }
});


// Actualiza espacios
app.put('/ActualizaEspacio', async (req, res) => {
    const { tipoEspacio, edificio, idDepartamentoPertenece, ubicacion, capacidad, nombreEspacio, id_espacio, usuario } = req.body;
    console.log('Datos recibidos:', {
        tipoEspacio,
        edificio,
        idDepartamentoPertenece,
        ubicacion,
        capacidad,
        nombreEspacio,
        id_espacio,
        usuario
    });
    try {
        await sql.connect(config);
        const request = new sql.Request();
        request.input('id_tipoEspacio', sql.Int, tipoEspacio);
        request.input('id_edificio', sql.Int, edificio);
        request.input('id_departamento', sql.Int, idDepartamentoPertenece);
        request.input('ubicacion_esp', sql.VarChar, ubicacion);
        request.input('capacidad', sql.Int, capacidad);
        request.input('nombre', sql.VarChar, nombreEspacio);
        request.input('id_espacio', sql.Int, id_espacio);
        request.input('responsable',sql.Int, usuario)
        const result = await request.query(`
            UPDATE Espacios
            SET id_tipoEspacio = @id_tipoEspacio,
                id_edificio = @id_edificio,
                id_departamento = @id_departamento,
                ubicacion_esp = @ubicacion_esp,
                capacidad = @capacidad,
                nombre = @nombre,
                responsable = @responsable
            WHERE id_espacio = @id_espacio
        `);
        if (result.rowsAffected[0] > 0) {
            res.json({ success: true, message: 'Espacio actualizado correctamente' });
        } else {
            res.json({ success: false, message: 'No se encontró el espacio para actualizar' });
        }
    } catch (error) {
        console.error('Error al actualizar el espacio:', error.message);
        res.status(500).json({ success: false, message: 'Error al actualizar el espacio' });
    } finally {
        await sql.close();
    }
});

// Elimina un espacio
app.put('/EliminaEspacio', async (req,res) => {
    try{
        await sql.connect(config);
        const id_espacio = req.body.id_espacio;
        console.log(id_espacio)
        const result = await sql.query(`
            UPDATE ESPACIOS
            SET estatus = 0
            where id_espacio = ${id_espacio};
        `)
        if (result.rowsAffected[0] > 0) {
            res.json({ success: true, message: 'Espacio eliminado correctamente, soy servidor' });
        } else {
            res.json({ success: false, message: 'No se encontró el espacio para eliminar' });
        }
    } catch (error) {
        console.error('Error al eliminar el espacio:', error.message);
        res.status(500).json({ success: false, message: 'Error al eliminar el espacio' });
    } finally {
        await sql.close();
    }
});


app.post('/Login', async (req, res) => {
    try {
        await sql.connect(config);
        const { usuario, contra } = req.body;
        const loginCheckResult = await sql.query`
            SELECT * FROM dbo.VerificarUsuario(${usuario}, ${contra});
        `;
        const result = loginCheckResult.recordset[0];
        console.log('lala Resultado de VerificarUsuario:', result.id_usuario);
        if (result.EsValido === 1) {
            res.status(200).json({ esValido: true, idUsuario: result.id_usuario, idDepartamentoPertenece: result.id_departamento_pertenece});
        } else {
            res.status(200).json({ esValido: false });
        }
    } catch (error) {
        console.log('Error al verificar el inicio de sesión: ', error);
        res.status(500).json({ error: 'Error al verificar el inicio de sesión' });
    } finally {
        await sql.close();
    }
});

//---------------------------------------------------
//Trae todos los usuarios
app.get('/SelectUsuario', async (req, res) => {
    try {
        await sql.connect(config);
        const request = new sql.Request();
        const result = await request.query(`
            SELECT id_usuario, nombre + ' ' + apellido AS Nombre, nombre, 
        apellido, id_departamento_pertenece, id_jefe, correo, telefono, permisos 
        FROM USUARIO 
        WHERE status = 1;`);        
        const Usuario = result.recordset; 
        res.status(200).json(Usuario); // Devuelve los datos correctamente
    } catch (error) {
        console.error('Error al traer los usuarios', error.message);
        res.status(500).send('Error al traer los usuarios');
    } finally {
        await sql.close();
    }
});

app.get('/SelectUsuarioDep/:idDepartamento', async (req, res) => {
    try {
        const { idDepartamento } = req.params; // Aquí se extrae el idDepartamento de los parámetros de la URL
        console.log(idDepartamento);
        await sql.connect(config);
        const request = new sql.Request();
        const result = await request.query(`
            SELECT id_usuario, nombre + ' ' + apellido AS Nombre, nombre, apellido, 
            id_departamento_pertenece, id_jefe, correo, telefono, permisos FROM USUARIO 
            WHERE status = 1 AND id_departamento_pertenece = ${idDepartamento}`);        
        const Usuario = result.recordset; 
        res.status(200).json(Usuario); // Devuelve los datos correctamente
    } catch (error) {
        console.error('Error al traer los usuarios', error.message);
        res.status(500).send('Error al traer los usuarios');
    } finally {
        await sql.close();
    }
});

//Inserta Usuarios
app.post('/AltaUsuarios',async(req,res) => {
    try{
        
        await sql.connect(config);
        const {nombre,apellido,departamento,jefe,correo,telefono,permisos,contrasenia,especialidad} = req.body;
        const result = await sql.query`INSERT INTO usuario(nombre, apellido, id_departamento_pertenece, id_jefe, correo, telefono, contrasena, permisos, status)
            OUTPUT INSERTED.id_usuario
            VALUES(${nombre}, ${apellido}, ${departamento}, ${jefe}, ${correo}, ${telefono}, ${contrasenia}, ${permisos}, ${1})`;
        
        const idUsuarioInsertado = result.recordset[0].id_usuario;
        
        if(permisos === 4){
            const disponible = 1;
            await sql.query`INSERT INTO TECNICO (id_usuario, id_especializacion, id_estadoDisponibilidad)
                VALUES (${idUsuarioInsertado}, ${especialidad}, ${disponible})`;
        };
            // Enviar una respuesta de éxito
        res.status(200).send('Usuario insertado exitosamente');
    }catch(error){
        console.error('Error al insertar el usuario:', error.message);
        // Enviar una respuesta de error
        res.status(500).send('Error al insertar el usuario');
    }finally{
        await sql.close();
    }
});

// Actualiza usuarios
app.put('/ActualizaUsuarios', async (req, res) => {
    console.log('Llego ajua')
    const { id_usuario, nombre, apellido, departamento_pertenece, jefe, correo, telefono, permisos } = req.body;
    //const id_usuario = req.query.id_usuario;
    console.log('Datos recibidos:', {
        id_usuario,
        nombre,
        apellido,
        departamento_pertenece,
        jefe,
        correo,
        telefono,
        permisos
    });
    try {
        await sql.connect(config);
        const request = new sql.Request();
        request.input('id_usuario', sql.Int, id_usuario);
        request.input('nombre', sql.VarChar, nombre);
        request.input('apellido', sql.VarChar, apellido);
        request.input('departamento_pertenece', sql.Int, departamento_pertenece);
        request.input('jefe', sql.Int, jefe);
        request.input('correo', sql.VarChar, correo);
        request.input('telefono', sql.VarChar, telefono);
        request.input('permisos', sql.Int, permisos);
        const result = await request.query(`
            UPDATE Usuario
            SET nombre = @nombre,
                apellido = @apellido,
                id_departamento_pertenece = @departamento_pertenece,
                id_jefe = @jefe,
                correo = @correo,
                telefono = @telefono,
                permisos = @permisos
            WHERE id_usuario = @id_usuario
        `);
        if (result.rowsAffected[0] > 0) {
            res.json({ success: true, message: 'Usuario actualizado correctamente' });
        } else {
            res.json({ success: false, message: 'No se encontró el usuario para actualizar' });
        }
    } catch (error) {
        console.error('Error al actualizar el usuario:', error.message);
        res.status(500).json({ success: false, message: 'Error al usuario el espacio' });
    } finally {
        await sql.close();
    }
});

//Baja usuarios
app.put('/BajaUsuarios', async (req,res) => {
    const {id_usuario} = req.body;
    const per = 0;
    try{
        await sql.connect(config);
        const request = new sql.Request();
        request.input('id_usuario', sql.Int, id_usuario);
        request.input('status', sql.Bit, per);
        const result = await request.query(`
            UPDATE Usuario
            SET status = @status
            WHERE id_usuario = @id_usuario
        `);
        if (result.rowsAffected[0] > 0) {
            res.json({ success: true, message: 'Usuario dado de baja correctamente' });
        } else {
            res.json({ success: false, message: 'No se encontró el usuario para actualizar' });
        }
    } catch (error) {
        console.error('Error al dar de baja el usuario:', error.message);
        res.status(500).json({ success: false, message: 'Error al usuario el espacio' });
    } finally {
        await sql.close();
    }
});

// Trae los equipos segun el espacio
app.get('/SelectEquiposPorEspacio', async (req, res) => {
    try{
        await sql.connect(config);
        const id_espacio = req.query.id_espacio;
        const id_edificio = req.query.id_edificio;
        const id_tipoEspacio = req.query.id_tipoEspacio;

        console.log('idEspacio en equipo:', id_espacio);
        const checkEquiposEspacios = await sql.query(`
            SELECT id_equipo, clave = ''+clave
            FROM EQUIPO 
            WHERE id_espacio = ${id_espacio}
            AND id_espacio IN (
                SELECT id_espacio 
                FROM ESPACIOS 
                WHERE id_tipoEspacio = ${id_tipoEspacio} 
                AND id_edificio = ${id_edificio}
            );
        `);
        console.log('clave:', checkEquiposEspacios.recordset[0].clave);
        res.status(200).json({equipos: checkEquiposEspacios.recordset})
    } catch (error) {
        console.error('Error al obtener los equipos:', error.message);
        res.status(500).send({ error: 'Error al obtener los equipos' });
    }
});

// Trae los Espacios segun el edificio para ADMON
app.get('/SelectEspaciosPorEdificioADMON', async(req,res) => {
    try{
        await sql.connect(config);
        const id_edificio = req.query.id_edificio;
        console.log('idEdificio: ', id_edificio);
        const checkEspacioEdificio = await sql.query(`
            SELECT DISTINCT TE.id_tipoEspacio, TE.nombre
            FROM TIPO_ESPACIO TE
            JOIN ESPACIOS ES ON TE.id_tipoEspacio = ES.id_tipoEspacio
            WHERE ES.id_edificio = ${id_edificio}
        `);
        res.status(200).json({tiposEspacios: checkEspacioEdificio.recordset});
    }catch(error){
        console.error('Error al traer los espacios por edificio ADMON: ', error.message);
        res.status(500).send('Error al traer los espacios ADMIN');
    }
});

// Trae los nombres de los espacios ADMON
app.get('/SelectNombrePorEspaciosADMON', async(req,res) => {
    try{
        await sql.connect(config);
        const id_tipoEspacio = req.query.id_tipoEspacio;
        const id_edificio = req.query.id_edificio;
        console.log('idTipoEspacio ', id_tipoEspacio);
        const checkNombreEspacio = await sql.query(`
            SELECT ES.id_espacio, ES.nombre, responsable = u.nombre+' '+u.apellido
            FROM ESPACIOS ES
            INNER JOIN USUARIO U ON U.ID_USUARIO = ES.RESPONSABLE
            WHERE ES.id_tipoEspacio = ${id_tipoEspacio} AND ES.id_edificio = ${id_edificio};
        `);
        res.status(200).json({nombresEspacio: checkNombreEspacio.recordset});
    }catch(error){
        console.error('Error al traer los nombres de los espacios ADMON: ', error.message);
        res.status(500).send('Error al traer los nombres de los espacios ADMON');
    }
});

// Da de alta a Edificio
app.post('/AltaEdificio', async(req, res) => {
    try{
        await sql.connect(config);
        const{nombre, ubicacion_edificio} = req.body;
        await sql.query`INSERT INTO EDIFICIO(nombre, ubicacion_edificio)
            VALUES(${nombre}, ${ubicacion_edificio});
            `;
        res.status(200).send('Edificio insertado exitosamente');
    }catch(error){
        console.error('Error al insertar edificio:, ', error.message);
        res.status(500).send('Error al insertar edificio');
    }finally{
        await sql.close();
    }
});

// Actualizar datos de edificio
app.put('/ActualizarEdificio', async (req, res) => {
    try {
        await sql.connect(config);

        // Extraer parámetros del body
        const { id_edificio, nombre, ubicacion_edificio} = req.body;

        // Crear una nueva instancia de solicitud SQL para ejecutar el procedimiento almacenado
        const request = new sql.Request();

        // Ejecutar el procedimiento almacenado con los parámetros proporcionados
        await request
            .input('id_edificio', sql.Int, id_edificio)
            .input('nombre', sql.NVarChar, nombre)
            .input('ubicacion_edificio', sql.NVarChar, ubicacion_edificio)
            .execute('ActualizarEdificio'); // Ejecutar el procedimiento almacenado
        res.status(200).send('Edificio actualizado exitosamente');
    } catch (error) {
        console.error('Error al actualizar el edificio:', error.message);
        res.status(500).send('Error al actualizar el edificio');
    } finally {
        await sql.close();
    }
});

// Elimina un edificio
app.put('/EliminaEdificio', async (req, res) => {
    try {
        await sql.connect(config);

        // Extraer parámetros del body
        const { id_edificio } = req.body;

        if (!id_edificio) {
            return res.status(400).send('El id_edificio es requerido');
        }

        // Crear una nueva instancia de solicitud SQL
        const request = new sql.Request();

        // Ejecutar la actualización para eliminar lógicamente el edificio
        const result = await request
            .input('id_edificio', sql.Int, id_edificio)
            .execute('BajaEdificio');

        // Comprobar si se actualizó algún registro
        if (result.rowsAffected[0] > 0) {
            res.status(200).send('Edificio eliminado lógicamente exitosamente');
        } else {
            res.status(404).send('No se encontró el edificio para eliminar');
        }
    } catch (error) {
        console.error('Error al eliminar lógicamente el edificio:', error.message);
        res.status(500).send('Error al eliminar lógicamente el edificio');
    } finally {
        await sql.close();
    }
});


//Trae edificios
app.get('/SelectEdificiosPorEstatus', async (req, res) => {
    try {
        await sql.connect(config);
        const result = await sql.query(`select id_edificio, nombre from Edificio where estatus = 1`);
        console.log('Edificios obtenidos:', result.recordset);
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error al traer los edificios:', error.message);
        res.status(500).send('Error al traer los edificios');
    } finally {
        await sql.close();
    }
});

//Trae ubicacion de edificio
app.get('/TraeUbicacionEdificio/:id_edificio', async (req, res) => {
    console.log('Conectado a SQL Server');
    try {
        await sql.connect(config);
        const { id_edificio } = req.params;
        console.log('ID del edificio:', id_edificio);
        
        // Realizar la consulta SQL
        const result = await sql.query`SELECT ubicacion_edificio FROM edificio WHERE id_edificio = ${id_edificio} AND estatus = 1`;
        
        // Verificar si se encontró el edificio
        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'Edificio no encontrado' });
        }

        console.log('Resultado de la consulta:', result.recordset[0]);
        
        // Devolver la ubicación del edificio
        res.status(200).json(result.recordset[0]); 

    } catch (error) {
        console.error('Error al traer ubicacion del edificio:', error.message);
        res.status(500).send('Error al traer ubicacion del edificio');
    } finally {
        await sql.close();
    }
});

//-------------------------------------------------------------------------
//Desmadre de equipos
//Trae los modelos de equipos
app.get('/SelectModelos', async (req, res) => {
    try {
        await sql.connect(config);
        const request = new sql.Request();
        const result = await request.query('SELECT * from Modelo');        
        res.status(200).json(result.recordset); // Devuelve los datos correctamente
    } catch (error) {
        console.error('Error al traer los usuarios', error.message);
        res.status(500).send('Error al traer los usuarios');
    }
});

//Trae los tipos de computadoras
app.get('/selectTipoComputadora', async (req, res) => {
    try {
        await sql.connect(config);
        const request = new sql.Request();
        const result = await request.query('SELECT * from Tipo_Computadora');       
        res.status(200).json(result.recordset); // Devuelve los datos correctamente
    } catch (error) {
        console.error('Error al traer los usuarios', error.message);
        res.status(500).send('Error al traer los usuarios');
    }
});

//Trae los procesadores
app.get('/selectProcesador', async (req, res) => {
    try {
        await sql.connect(config);
        const request = new sql.Request();
        const result = await request.query('SELECT * from Procesador');       
        res.status(200).json(result.recordset); // Devuelve los datos correctamente
    } catch (error) {
        console.error('Error al traer los usuarios', error.message);
        res.status(500).send('Error al traer los usuarios');
    }
});

//Trae las tarjetas graficas
app.get('/SelectGrafica', async (req, res) => {
    try {
        await sql.connect(config);
        const request = new sql.Request();
        const result = await request.query('SELECT * from Tarjeta_Grafica');       
        res.status(200).json(result.recordset); // Devuelve los datos correctamente
    } catch (error) {
        console.error('Error al obtener las tarjetas graficas', error.message);
        res.status(500).send('Error al obtener las tarjetas graficas');
    }
});

//Trae los sistemas operativos
app.get('/SelectSistemasOperativos', async (req, res) => {
    try {
        await sql.connect(config);
        const request = new sql.Request();
        const result = await request.query('SELECT * from sistema_operativo');    
        res.status(200).json(result.recordset); // Devuelve los datos correctamente
    } catch (error) {
        console.error('Error al obtener los sietamas operativos', error.message);
        res.status(500).send('Error al obtener los sietamas operativos');
    }
});

//Trae las configuraciones de red
app.get('/ConfiguracionRed', async (req, res) => {
    try {
        await sql.connect(config);
        const request = new sql.Request();
        const result = await request.query('SELECT * from tarjeta_red');    
        res.status(200).json(result.recordset); // Devuelve los datos correctamente
    } catch (error) {
        console.error('Error al obtener las configuraciones de red', error.message);
        res.status(500).send('Error al obtener las configuraciones de red');
    }
});

//Trae los softwares
app.get('/SelectSoftwares', async (req, res) => {
    try {
        await sql.connect(config);
        const request = new sql.Request();
        const result = await request.query('SELECT * from software');    
        res.status(200).json(result.recordset); // Devuelve los datos correctamente
    } catch (error) {
        console.error('Error al obtener las los softwares', error.message);
        res.status(500).send('Error al obtener los softwares');
    }
});

//Trae los tipos de impresoras
app.get('/SelectTipoImpresora', async (req, res) => {
    try {
        await sql.connect(config);
        const request = new sql.Request();
        const result = await request.query('SELECT * from tipo_impresora');    
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error al obtener los tipos de impresora', error.message);
        res.status(500).send('Error al obtener los tipos de impresora');
    }
});

//Trae los tipos de escaner
app.get('/SelectTipoEscaner', async (req, res) => {
    try {
        await sql.connect(config);
        const request = new sql.Request();
        const result = await request.query('SELECT * from tipo_escaner');    
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error al obtener los tipos de escaner', error.message);
        res.status(500).send('Error al obtener los tipos de escaner');
    }
});

//Inserta Computadora
app.post('/AltaComputadora',async(req,res) => {
    try{
        await sql.connect(config);
        const {numeroSerie, fechaCompra, costo, id_usuario, modelo, garantia, estado, puertos, tipo, procesador, RAM, memoria, tarjetaGrafica, sistemaOperativo, tarjetaRed, softwares} = req.body;
        console.log('Datos recibidos:', {
            numeroSerie, fechaCompra, costo, id_usuario, modelo, garantia, estado, puertos, tipo, procesador, RAM, memoria, tarjetaGrafica, sistemaOperativo, tarjetaRed, softwares
        });
        console.log('llegue a altacomputadora');
       // Inserción en la tabla EQUIPO
        const resultEquipo = await sql.query`
            DECLARE @InsertedIds TABLE (id_equipo INT);
            INSERT INTO EQUIPO (numero_serie, fecha_compra, valor_compra, id_usuario, id_modelo, id_garantia, estado_equipo)
            OUTPUT INSERTED.id_equipo INTO @InsertedIds
            VALUES (${numeroSerie}, ${fechaCompra}, ${costo}, ${id_usuario}, ${modelo}, ${garantia}, ${estado});
            
            SELECT id_equipo FROM @InsertedIds;
        `;

        // Obtener el ID del equipo insertado
        const idEquipoInsertado = resultEquipo.recordset[0].id_equipo;
        // Inserción en la tabla COMPUTADORA
        await sql.query`INSERT INTO COMPUTADORA (id_computadora, id_tipoComputadora, procesador, memoria_RAM, almacenamiento, tarjeta_grafica, sistema_operativo, configuracion_red)
        VALUES (${idEquipoInsertado}, ${tipo}, ${procesador}, ${RAM}, ${memoria}, ${tarjetaGrafica}, ${sistemaOperativo}, ${tarjetaRed});`;

        // Insertar en la tabla SOFTWARE_COMPUTADORA
        if (softwares && softwares.length > 0) {
            for (const softwareId of softwares) {
                await sql.query`INSERT INTO SOFTWARE_COMPUTADORA (
                    id_software,
                    id_computadora
                ) VALUES (
                    ${softwareId},
                    ${idEquipoInsertado}
                );`;
            }
        }

        // Insertar en la tabla PUERTO
        if (puertos && puertos.length > 0) {
            for (const puertoId of puertos) {
                await sql.query`INSERT INTO PUERTO (
                    id_equipo,
                    nombre_puerto,
                    estado
                ) VALUES (
                    ${idEquipoInsertado},
                    ${puertoId},
                    0
                );`;
            }
        }

        console.log(idEquipoInsertado)
        res.status(200).json({id: idEquipoInsertado});
    }catch(error){
        console.error('Error al insertar el equipo-computadora:', error.message);
        // Enviar una respuesta de error
        res.status(500).send('Error al insertar el equipo-computadora');
    }finally{
        await sql.close();
    }
});

//Inserta Servidor
app.post('/AltaServidor',async(req,res) => {
    try{
        await sql.connect(config);
        const {numeroSerie, fechaCompra, costo, id_usuario, modelo, garantia, estado, puertos, procesador, RAM, memoria, tarjetaGrafica, sistemaOperativo, tarjetaRed} = req.body;
        console.log('Datos recibidos:', {
            numeroSerie, fechaCompra, costo, id_usuario, modelo, garantia, estado, puertos, procesador, RAM, memoria, tarjetaGrafica, sistemaOperativo, tarjetaRed
        });
        console.log('llegue a altaservidor');
       // Inserción en la tabla EQUIPO
        const resultEquipo = await sql.query`
            DECLARE @InsertedIds TABLE (id_equipo INT);
            INSERT INTO EQUIPO (numero_serie, fecha_compra, valor_compra, id_usuario, id_modelo, id_garantia, estado_equipo)
            OUTPUT INSERTED.id_equipo INTO @InsertedIds
            VALUES (${numeroSerie}, ${fechaCompra}, ${costo}, ${id_usuario}, ${modelo}, ${garantia}, ${estado});
            
            SELECT id_equipo FROM @InsertedIds;
        `;

        // Obtener el ID del equipo insertado
        const idEquipoInsertado = resultEquipo.recordset[0].id_equipo;
        // Inserción en la tabla SERVIDOR
        await sql.query`INSERT INTO SERVIDOR (id_servidor, procesador, memoria_RAM, almacenamiento, tarjeta_grafica, sistema_operativo, configuracion_red)
        VALUES (${idEquipoInsertado}, ${procesador}, ${RAM}, ${memoria}, ${tarjetaGrafica}, ${sistemaOperativo}, ${tarjetaRed});`;

        // Insertar en la tabla PUERTO
        if (puertos && puertos.length > 0) {
            for (const puertoId of puertos) {
                await sql.query`INSERT INTO PUERTO (
                    id_equipo,
                    nombre_puerto,
                    estado
                ) VALUES (
                    ${idEquipoInsertado},
                    ${puertoId},
                    0
                );`;
            }
        }

        res.status(200).send({ id: idEquipoInsertado });
    }catch(error){
        console.error('Error al insertar el equipo-servidor:', error.message);
        // Enviar una respuesta de error
        res.status(500).send('Error al insertar el equipo-servidor');
    }finally{
        await sql.close();
    }
});

//Inserta Impresora
app.post('/AltaImpresora',async(req,res) => {
    try{
        await sql.connect(config);
        const {numeroSerie, fechaCompra, costo, id_usuario, modelo, garantia, estado, puertos, tipoImpresora, resolucion, velocidad, conectividad} = req.body;
        console.log('Datos recibidos:', {
            numeroSerie, fechaCompra, costo, id_usuario, modelo, garantia, estado, puertos, tipoImpresora, resolucion, velocidad, conectividad
        });
        console.log('llegue a altaimpresora');
       // Inserción en la tabla EQUIPO
        const resultEquipo = await sql.query`
            DECLARE @InsertedIds TABLE (id_equipo INT);
            INSERT INTO EQUIPO (numero_serie, fecha_compra, valor_compra, id_usuario, id_modelo, id_garantia, estado_equipo)
            OUTPUT INSERTED.id_equipo INTO @InsertedIds
            VALUES (${numeroSerie}, ${fechaCompra}, ${costo}, ${id_usuario}, ${modelo}, ${garantia}, ${estado});
            
            SELECT id_equipo FROM @InsertedIds;
        `;

        // Obtener el ID del equipo insertado
        const idEquipoInsertado = resultEquipo.recordset[0].id_equipo;
        // Inserción en la tabla impresora
        await sql.query`INSERT INTO IMPRESORA (id_impresora, id_tipoImpresora, resolucion, velocidad_impresion, conectividad)
        VALUES (${idEquipoInsertado}, ${tipoImpresora}, ${resolucion}, ${velocidad}, ${conectividad});`;

        // Insertar en la tabla PUERTO
        if (puertos && puertos.length > 0) {
            for (const puertoId of puertos) {
                await sql.query`INSERT INTO PUERTO (
                    id_equipo,
                    nombre_puerto,
                    estado
                ) VALUES (
                    ${idEquipoInsertado},
                    ${puertoId},
                    0
                );`;
            }
        }

        res.status(200).send({ id: idEquipoInsertado });
    }catch(error){
        console.error('Error al insertar el equipo-impresora:', error.message);
        // Enviar una respuesta de error
        res.status(500).send('Error al insertar el equipo-impresora');
    }finally{
        await sql.close();
    }
});

//Inserta Switch
app.post('/AltaSwitch',async(req,res) => {
    try{
        await sql.connect(config);
        const {numeroSerie, fechaCompra, costo, id_usuario, modelo, garantia, estado, puertos, numPuertos, velocidad_backplane, tipoSwitch, capacidad, consEnergia} = req.body;
        console.log('Datos recibidos:', {
            numeroSerie, fechaCompra, costo, id_usuario, modelo, garantia, estado, puertos, numPuertos, velocidad_backplane, tipoSwitch, capacidad, consEnergia
        });
        console.log('llegue a altaswitch');
       // Inserción en la tabla EQUIPO
        const resultEquipo = await sql.query`
            DECLARE @InsertedIds TABLE (id_equipo INT);
            INSERT INTO EQUIPO (numero_serie, fecha_compra, valor_compra, id_usuario, id_modelo, id_garantia, estado_equipo)
            OUTPUT INSERTED.id_equipo INTO @InsertedIds
            VALUES (${numeroSerie}, ${fechaCompra}, ${costo}, ${id_usuario}, ${modelo}, ${garantia}, ${estado});
            
            SELECT id_equipo FROM @InsertedIds;
        `;

        // Obtener el ID del equipo insertado
        const idEquipoInsertado = resultEquipo.recordset[0].id_equipo;
        // Inserción en la tabla switch
        await sql.query`INSERT INTO SWITCH (id_switch, numero_puertos, velocidad_backplane, tipo_switch, capacidad_switching, consumo_energia)
        VALUES (${idEquipoInsertado}, ${numPuertos}, ${velocidad_backplane}, ${tipoSwitch}, ${capacidad}, ${consEnergia});`;

        // Insertar en la tabla PUERTO
        if (puertos && puertos.length > 0) {
            for (const puertoId of puertos) {
                await sql.query`INSERT INTO PUERTO (
                    id_equipo,
                    nombre_puerto,
                    estado
                ) VALUES (
                    ${idEquipoInsertado},
                    ${puertoId},
                    0
                );`;
            }
        }

        res.status(200).send({ id: idEquipoInsertado });
    }catch(error){
        console.error('Error al insertar el equipo-switch:', error.message);
        // Enviar una respuesta de error
        res.status(500).send('Error al insertar el equipo-switch');
    }finally{
        await sql.close();
    }
});

//Inserta Router
app.post('/AltaRouter',async(req,res) => {
    try{
        await sql.connect(config);
        const {numeroSerie, fechaCompra, costo, id_usuario, modelo, garantia, estado, puertos, tipo_conexion, soporte_vpn, numGigFas, numSeriales, frecuencia, protocolos, capacidad, consEnergia} = req.body;
        console.log('Datos recibidos:', {
            numeroSerie, fechaCompra, costo, id_usuario, modelo, garantia, estado, puertos, tipo_conexion, soporte_vpn, numGigFas, numSeriales, frecuencia, protocolos, capacidad, consEnergia
        });
        console.log('llegue a altarouter');
       // Inserción en la tabla EQUIPO
        const resultEquipo = await sql.query`
            DECLARE @InsertedIds TABLE (id_equipo INT);
            INSERT INTO EQUIPO (numero_serie, fecha_compra, valor_compra, id_usuario, id_modelo, id_garantia, estado_equipo)
            OUTPUT INSERTED.id_equipo INTO @InsertedIds
            VALUES (${numeroSerie}, ${fechaCompra}, ${costo}, ${id_usuario}, ${modelo}, ${garantia}, ${estado});
            
            SELECT id_equipo FROM @InsertedIds;
        `;
        // Obtener el ID del equipo insertado
        const idEquipoInsertado = resultEquipo.recordset[0].id_equipo;
        // Inserción en la tabla switch
        await sql.query`INSERT INTO ROUTER (id_router, tipo_conexion, soporte_vpn, numero_interfaces_giga_fast, numero_seriales, frecuencia_ruta, protocolos_ruta, capacidad_ruta, consumo_energia)
        VALUES (${idEquipoInsertado}, ${tipo_conexion}, ${soporte_vpn}, ${numGigFas}, ${numSeriales}, ${frecuencia}, ${protocolos}, ${capacidad}, ${consEnergia});`;

        // Insertar en la tabla PUERTO
        if (puertos && puertos.length > 0) {
            for (const puertoId of puertos) {
                await sql.query`INSERT INTO PUERTO (
                    id_equipo,
                    nombre_puerto,
                    estado
                ) VALUES (
                    ${idEquipoInsertado},
                    ${puertoId},
                    0
                );`;
            }
        }

        res.status(200).send({ id: idEquipoInsertado });
    }catch(error){
        console.error('Error al insertar el equipo-router:', error.message);
        // Enviar una respuesta de error
        res.status(500).send('Error al insertar el equipo-router');
    }finally{
        await sql.close();
    }
});

//Inserta Escaner
app.post('/AltaEscaner',async(req,res) => {
    try{
        await sql.connect(config);
        const {numeroSerie, fechaCompra, costo, id_usuario, modelo, garantia, estado, puertos, velocidad, tipoEscaner} = req.body;
        console.log('Datos recibidos:', {
            numeroSerie, fechaCompra, costo, id_usuario, modelo, garantia, estado, puertos, velocidad, tipoEscaner
        });
        console.log('llegue a altaescaner');
       // Inserción en la tabla EQUIPO
        const resultEquipo = await sql.query`
            DECLARE @InsertedIds TABLE (id_equipo INT);
            INSERT INTO EQUIPO (numero_serie, fecha_compra, valor_compra, id_usuario, id_modelo, id_garantia, estado_equipo)
            OUTPUT INSERTED.id_equipo INTO @InsertedIds
            VALUES (${numeroSerie}, ${fechaCompra}, ${costo}, ${id_usuario}, ${modelo}, ${garantia}, ${estado});
            
            SELECT id_equipo FROM @InsertedIds;
        `;
        // Obtener el ID del equipo insertado
        const idEquipoInsertado = resultEquipo.recordset[0].id_equipo;
        // Inserción en la tabla escaner
        await sql.query`INSERT INTO ESCANER (id_escaner, velocidad, id_tipoEscaner)
        VALUES (${idEquipoInsertado}, ${velocidad}, ${tipoEscaner});`;

        // Insertar en la tabla PUERTO
        if (puertos && puertos.length > 0) {
            for (const puertoId of puertos) {
                await sql.query`INSERT INTO PUERTO (
                    id_equipo,
                    nombre_puerto,
                    estado
                ) VALUES (
                    ${idEquipoInsertado},
                    ${puertoId},
                    0
                );`;
            }
        }

        res.status(200).send({id: idEquipoInsertado});
    }catch(error){
        console.error('Error al insertar el equipo-escaner:', error.message);
        // Enviar una respuesta de error
        res.status(500).send('Error al insertar el equipo-escaner');
    }finally{
        await sql.close();
    }
});

app.get('/NombreEquipo', async (req, res) => {
    try {
        await sql.connect(config);
        const id_equipo = req.query.id_equipo;  // Cambiado a req.query
        const result = await sql.query(`SELECT Nombre FROM Equipo WHERE id_equipo = ${id_equipo}`);
        res.status(200).json(result.recordset[0]);
    } catch (error) {
        console.error('Error al traer el nombre del equipo: ', error.message);
        res.status(500).send('Error al traer el nombre del equipo');
    }
});

//------------28 de Septiembre-------------

//Trae las computadoras
app.get('/SelectComputadora', async (req, res) => {
    try {
        await sql.connect(config);
        const request = new sql.Request();
        const result = await request.query(`
            SELECT e.id_equipo, e.nombre
            FROM EQUIPO e
            JOIN COMPUTADORA c ON e.id_equipo = c.id_computadora
            WHERE e.id_espacio IS NULL 
            AND e.estado_equipo = 'disponible'
        `);    
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error al obtener las computadoras', error.message);
        res.status(500).send('Error al obtener los computadoras');
    }
});

//Trae las impresoras
app.get('/selectImpresora', async (req, res) => {
    try {
        await sql.connect(config);
        const request = new sql.Request();
        const result = await request.query(`
            SELECT e.id_equipo, e.nombre
            FROM EQUIPO e
            JOIN IMPRESORA i ON e.id_equipo = i.id_impresora
            WHERE e.id_espacio IS NULL 
            AND e.estado_equipo = 'disponible'
        `);    
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error al obtener las impresoras', error.message);
        res.status(500).send('Error al obtener los impresoras');
    }
});

//Trae los servidores
app.get('/selectServidor', async (req, res) => {
    try {
        await sql.connect(config);
        const request = new sql.Request();
        const result = await request.query(`
            SELECT e.id_equipo, e.nombre
            FROM EQUIPO e
            JOIN SERVIDOR s ON e.id_equipo = s.id_servidor
            WHERE e.id_espacio IS NULL 
            AND e.estado_equipo = 'disponible'
        `);    
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error al obtener los servidores', error.message);
        res.status(500).send('Error al obtener los servidores');
    }
});

//Trae los switch
app.get('/selectSwitch', async (req, res) => {
    try {
        await sql.connect(config);
        const request = new sql.Request();
        const result = await request.query(`
            SELECT e.id_equipo, e.nombre
            FROM EQUIPO e
            JOIN SWITCH s ON e.id_equipo = s.id_switch
            WHERE e.id_espacio IS NULL 
            AND e.estado_equipo = 'disponible'
        `);    
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error al obtener los switch', error.message);
        res.status(500).send('Error al obtener los switch');
    }
});

//Trae los routers
app.get('/selectRouter', async (req, res) => {
    try {
        await sql.connect(config);
        const request = new sql.Request();
        const result = await request.query(`
            SELECT e.id_equipo, e.nombre
            FROM EQUIPO e
            JOIN ROUTER r ON e.id_equipo = r.id_router
            WHERE e.id_espacio IS NULL 
            AND e.estado_equipo = 'disponible'
        `);    
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error al obtener los routers', error.message);
        res.status(500).send('Error al obtener los routes');
    }
});

//Trae los escaner
app.get('/selectEscaner', async (req, res) => {
    try {
        await sql.connect(config);
        const request = new sql.Request();
        const result = await request.query(`
            SELECT e.id_equipo, e.nombre
            FROM EQUIPO e
            JOIN ESCANER es ON e.id_equipo = es.id_escaner
            WHERE e.id_espacio IS NULL 
            AND e.estado_equipo = 'disponible'
        `);    
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error al obtener los escaners', error.message);
        res.status(500).send('Error al obtener los escaners');
    }
});

// Alta equipo en espacio
app.put('/AltaEquipoEnEspacio', async (req, res) => {
    const { id_equipo, id_espacio, fecha_instalacion, id_usuario, clave } = req.body;

    console.log('Datos recibidos:', {
        id_equipo, id_espacio, fecha_instalacion, id_usuario, clave
    });
    try {
        await sql.connect(config);
        const request = new sql.Request();
        request.input('id_espacio', sql.Int, id_espacio);
        request.input('fecha_instalacion', sql.DateTime, fecha_instalacion);
        request.input('id_usuario', sql.Int, id_usuario);
        request.input('clave', sql.VarChar, clave);
        request.input('id_equipo', sql.Int, id_equipo);
        const result = await request.query(`
            UPDATE EQUIPO
            SET id_espacio = @id_espacio,
                fecha_instalacion = @fecha_instalacion,
                id_usuario = @id_usuario,
                estado_equipo = 'En uso',
                CLAVE = @clave
            WHERE id_equipo = @id_equipo
        `)

        if (result.rowsAffected[0] > 0) {
            res.json({ success: true, message: 'Equipo dado de alta en espacio' });
        } else {
            res.json({ success: false, message: 'No se encontró el equipo para actualizar' });
        }
    } catch (error) {
        console.error('Error al dar de alta el equipo en el espacio:', error.message);
        res.status(500).json({ success: false, message: 'Error al dar de alta el equipo en el usuario' });
    } finally {
        await sql.close();
    }
});

//Trae las especialidades de un tecnico
app.get('/SelectEspecialidades', async (req, res) => {
    try {
        await sql.connect(config);
        const request = new sql.Request();
        const result = await request.query('select *  from especializacion');        
        res.status(200).json(result.recordset); // Devuelve los datos correctamente
    } catch (error) {
        console.error('Error al traer los usuarios', error.message);
        res.status(500).send('Error al traer los usuarios');
    }
});

//Detalle y caracteristicas de los equipos
app.get('/DetalleEquipo/:idEquipo', async(req, res) => {
    try {
        const { idEquipo } = req.params;
        await sql.connect(config);

        // Consultar primero en la tabla EQUIPO
        const equipoResult = await sql.query`SELECT * FROM EQUIPO WHERE id_equipo = ${idEquipo}`;
        const equipo = equipoResult.recordset[0];

        if (!equipo) {
            return res.status(404).send('Equipo no encontrado');
        }

        // Comprobar si el equipo es una computadora
        const computadoraResult = await sql.query`select 
            c.memoria_RAM, c.almacenamiento,
            tipoComputadora = tc.nombre,
            procesador = p.modelo+' '+p.fabricante, p.nucleos, p.hilos, p.cache,
            tarjeta_grafica = tg.modelo+' '+tg.fabricante, tg.arquitectura,
            sistemaOperativo = so.nombre+' '+so.version_, so.interfaz, so.licencia,
            tarjetaRed = tr.modelo+' '+tr.fabricante
            from COMPUTADORA c
            inner join TIPO_COMPUTADORA tc on tc.id_tipoComputadora = c.id_tipoComputadora
            inner join PROCESADOR p on p.id_procesador = c.procesador
            inner join TARJETA_GRAFICA tg on tg.id_tarjeta = c.tarjeta_grafica
            inner join SISTEMA_OPERATIVO so on so.id_sistema = c.sistema_operativo
            inner join TARJETA_RED tr on tr.id_tarjeta = c.configuracion_red 
            where id_computadora = ${idEquipo}`;
        const computadora = computadoraResult.recordset[0];

        if (computadora) {
            // Si es una computadora, enviar los detalles del equipo y la computadora
            const softwareResult = await sql.query`
                select software = s.nombre+' '+s.version_
                from COMPUTADORA c
                inner join SOFTWARE_COMPUTADORA sc on sc.id_computadora = c.id_computadora
                inner join SOFTWARE s on s.id_software = sc.id_software
                where c.id_computadora = ${idEquipo}`
            const softwares = softwareResult.recordset;
            
            return res.status(200).json({
                tipo: 'Computadora',
                equipo: equipo,
                detalles: computadora,
                softwares: softwares
            });
        }
        // Comprobar si el equipo es un servidor
        const servidorResult = await sql.query`SELECT * FROM SERVIDOR WHERE id_servidor = ${idEquipo}`;
        const servidor = servidorResult.recordset[0];

        if (servidor) {
            // Si es un servidor, enviar los detalles del equipo y el servidor
            return res.status(200).json({
                tipo: 'Servidor',
                equipo: equipo,
                detalles: servidor
            });
        }

        // Comprobar si el equipo es un switch
        const switchResult = await sql.query`SELECT * FROM SWITCH WHERE id_switch = ${idEquipo}`;
        const Switch = switchResult.recordset[0];

        if (Switch) {
            // Si es un switch, enviar los detalles del equipo y el switch
            return res.status(200).json({
                tipo: 'Switch',
                equipo: equipo,
                detalles: Switch
            });
        }

        // Comprobar si el equipo es un router
        const routerResult = await sql.query`SELECT * FROM ROUTER WHERE id_router = ${idEquipo}`;
        const router = routerResult.recordset[0];

        if (router) {
            // Si es un switch, enviar los detalles del equipo y el switch
            return res.status(200).json({
                tipo: 'Router',
                equipo: equipo,
                detalles: router
            });
        }

        // Comprobar si el equipo es un switch
        const escanerResult = await sql.query`SELECT * FROM ESCANER WHERE id_escaner = ${idEquipo}`;
        const escaner = escanerResult.recordset[0];

        if (escaner) {
            // Si es un switch, enviar los detalles del equipo y el switch
            return res.status(200).json({
                tipo: 'Escaner',
                equipo: equipo,
                detalles: escaner
            });
        }
        // Si no es ni computadora ni servidor
        res.status(404).send('El equipo no es ni una computadora ni un servidor');

    } catch (error) {
        console.error('Error al obtener los detalles del equipo:', error.message);
        res.status(500).send('Error al obtener los detalles del equipo');
    }
});

//--------------------05 de Octubre-----------------------
//Trae las prioridades
app.get('/Prioridad', async (req, res) => {
    try {
        await sql.connect(config);
        const request = new sql.Request();
        const result = await request.query(`
            SELECT * FROM PRIORIDAD
        `);    
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error al obtener las prioridades', error.message);
        res.status(500).send('Error al obtener las prioridades');
    }
});

//Trae los Tipos de incidencias
app.get('/TipoIncidencia', async (req, res) => {
    try {
        await sql.connect(config);
        const request = new sql.Request();
        const result = await request.query(`
            SELECT * FROM TIPO_INCIDENCIA
        `);    
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error al obtener los tipos de incidencias', error.message);
        res.status(500).send('Error al obtener los tipos de incidencias');
    }
});

//Inserta nueva incidencia
app.post('/NuevaIncidencia',async(req,res) => {
    try{
        await sql.connect(config);
        const {id_equipo, descripcionGeneral, fechaActual, hrEnvio, hrInicial, hrFinal, tipoIncidencia} = req.body;
        console.log('Datos recibidos:', {
            id_equipo, descripcionGeneral, fechaActual, hrEnvio, hrInicial, hrFinal, tipoIncidencia
        });
        console.log('llegue a altaIncidencia');
       // Inserción en la tabla EQUIPO
       const resultIncidencia = await sql.query`
            DECLARE @InsertedIds TABLE (id_incidencia INT);
            
            INSERT INTO INCIDENCIA (id_equipo, descripcion, fecha, hora_envio, id_estado, id_tipoIncidencia, hora_disponible_inicio, hora_disponible_fin, btnDiag, btnAutorizacion, det)
            OUTPUT INSERTED.id_incidencia INTO @InsertedIds
            VALUES (${id_equipo}, ${descripcionGeneral}, ${fechaActual}, ${hrEnvio}, 5, ${tipoIncidencia}, ${hrInicial}, ${hrFinal}, 0, 0, 0);
            
            SELECT id_incidencia FROM @InsertedIds;
        `;
        const id_incidencia = resultIncidencia.recordset[0].id_incidencia;
        //traer el id_espacio
        const resultEspacio = await sql.query`
            select id_espacio from EQUIPO where id_equipo = ${id_equipo};
        `;
        const id_espacio = resultEspacio.recordset[0].id_espacio;
        //Insertar en la tabla incidencia_lugar
        await sql.query`
            INSERT INTO INCIDENCIA_LUGAR(id_incidencia, id_espacio)
            VALUES ( ${id_incidencia}, ${id_espacio});
        `;
        res.status(200).send('Incidencia agregada');
    }catch(error){
        console.error('Error al insertar incidencia:', error.message);
        // Enviar una respuesta de error
        res.status(500).send('Error al insertar incidencia');
    }finally{
        await sql.close();
    }
});


//Trae el detalle de la tabla de incidencias para ADMON
app.get('/DetalleTablaADMON', async (req, res) => {
    try {
        await sql.connect(config);
        const result = await sql.query`
            SELECT 
                I.id_incidencia, D.nombre, I.fecha, TI.nombre as nombreIncidencia, I.descripcion, EI.estado_incidencia as estado, EI.color, ISNULL(r.autoriza, 0) AS autoriza,  ISNULL(r.autorizado, 0) AS autorizado, I.servicio, I.detalleHora, I.btnAutorizacion
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
            LEFT JOIN
				RFC r ON r.incidencia = I.id_incidencia;
        `;
        const detalle = result.recordset.map(item => ({
            ...item,
            servicio: item.servicio ? 1 : 0 
        }));
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
                I.id_incidencia, I.fecha, TI.nombre as nombreIncidencia, I.descripcion, EI.estado_incidencia as estado, EI.color, ISNULL(r.autoriza, 0) AS autoriza,  ISNULL(r.autorizado, 0) AS autorizado, I.servicio, I.detalleHora, I.btnAutorizacion
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
            LEFT JOIN
				RFC r ON r.incidencia = I.id_incidencia
            WHERE D.id_departamento = ${id_departamento};
        `;
        const detalle = result.recordset.map(item => ({
            ...item,
            servicio: item.servicio ? 1 : 0 
        }));
        console.log(detalle);
        res.status(200).json(detalle);
    } catch (error) {
        console.log('Error al obtener datos de la tabla: ', error);
        res.status(500).json({ error: 'Error al obtener datos de la tabla' });
    }
});

//Trae el detalle de la tabla de incidencias por tecnico
app.get('/DetalleTablaTecnico', async (req, res) => {
    try {
        await sql.connect(config);
        const { id_usuario } = req.query;
        console.log('Datos recibidos:', {
            id_usuario
        });
        const result = await sql.query`
            SELECT 
                I.id_incidencia, D.nombre, I.fecha, TI.nombre as nombreIncidencia, I.descripcion, EI.estado_incidencia as estado, EI.color, ISNULL(r.autoriza, 0) AS autoriza,  ISNULL(r.autorizado, 0) AS autorizado, I.servicio, I.detalleHora, I.btnAutorizacion
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
            JOIN
                TECNICO T ON T.id_usuario = I.id_tecnicoAsignado
            LEFT JOIN
				RFC r ON r.incidencia = I.id_incidencia
            WHERE I.id_tecnicoAsignado = ${id_usuario};
        `;
        const detalle = result.recordset.map(item => ({
            ...item,
            servicio: item.servicio ? 1 : 0 
        }));
        console.log(detalle);
        res.status(200).json(detalle);
    } catch (error) {
        console.log('Error al obtener datos de la tabla: ', error);
        res.status(500).json({ error: 'Error al obtener datos de la tabla' });
    }
});




//Trae el detalle de la tabla de incidencias para ADMON enviados
app.get('/DetalleTablaADMONEnviado', async (req, res) => {
    try {
        await sql.connect(config);
        const result = await sql.query`
            SELECT 
                I.id_incidencia, D.nombre, I.fecha, TI.nombre as nombreIncidencia, I.descripcion, EI.estado_incidencia as estado, EI.color, ISNULL(r.autoriza, 0) AS autoriza,  ISNULL(r.autorizado, 0) AS autorizado, I.servicio, I.detalleHora, I.btnAutorizacion
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
            LEFT JOIN
				RFC r ON r.incidencia = I.id_incidencia
			WHERE I.id_estado = 5;
        `;
        const detalle = result.recordset.map(item => ({
            ...item,
            servicio: item.servicio ? 1 : 0 
        }));
        console.log(detalle);
        res.status(200).json(detalle);
        //res.status(200).json({id_folio: detalle.id_incidencia, departamento: detalle.nombre, fecha: detalle.fecha, 
          //  tipoIncidencia: detalle.nombreIncidencia, descripcion: detalle.descripcion, estado: detalle.estado, color: detalle.color})
    } catch (error) {
        console.log('Error al obtener datos de la tabla: ', error);
        res.status(500).json({ error: 'Error al obtener datos de la tabla' });
    }
});

//Trae el detalle de la tabla de incidencias por departamento enviados
app.get('/DetalleTablaDepartamentoEnviado', async (req, res) => {
    try {
        await sql.connect(config);
        const { id_departamento } = req.query;
        console.log('Llegue a tabla por dpto y el id_departamento es ', id_departamento);
        const result = await sql.query`
            SELECT 
                I.id_incidencia, I.fecha, TI.nombre as nombreIncidencia, I.descripcion, EI.estado_incidencia as estado, EI.color, ISNULL(r.autoriza, 0) AS autoriza,  ISNULL(r.autorizado, 0) AS autorizado, I.servicio, I.detalleHora, I.btnAutorizacion
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
            LEFT JOIN
				RFC r ON r.incidencia = I.id_incidencia
            WHERE D.id_departamento = ${id_departamento} and I.id_estado = 5;
        `;
        const detalle = result.recordset.map(item => ({
            ...item,
            servicio: item.servicio ? 1 : 0 
        }));
        console.log(detalle);
        res.status(200).json(detalle);
    } catch (error) {
        console.log('Error al obtener datos de la tabla: ', error);
        res.status(500).json({ error: 'Error al obtener datos de la tabla' });
    }
});

//Trae el detalle de la tabla de incidencias por tecnico enviados
app.get('/DetalleTablaTecnicoEnviado', async (req, res) => {
    try {
        await sql.connect(config);
        const { id_usuario } = req.query;
        console.log('Datos recibidos:', {
            id_usuario
        });
        const result = await sql.query`
            SELECT 
                I.id_incidencia, D.nombre, I.fecha, TI.nombre as nombreIncidencia, I.descripcion, EI.estado_incidencia as estado, EI.color, ISNULL(r.autoriza, 0) AS autoriza,  ISNULL(r.autorizado, 0) AS autorizado, I.servicio, I.detalleHora, I.btnAutorizacion
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
            JOIN
                TECNICO T ON T.id_usuario = I.id_tecnicoAsignado
            LEFT JOIN
				RFC r ON r.incidencia = I.id_incidencia
            WHERE I.id_tecnicoAsignado = ${id_usuario} and I.id_estado = 5;
        `;
        const detalle = result.recordset.map(item => ({
            ...item,
            servicio: item.servicio ? 1 : 0 
        }));
        console.log(detalle);
        res.status(200).json(detalle);
    } catch (error) {
        console.log('Error al obtener datos de la tabla: ', error);
        res.status(500).json({ error: 'Error al obtener datos de la tabla' });
    }
});

//Trae el detalle de la tabla de incidencias para ADMON en proceso
app.get('/DetalleTablaADMONEnProceso', async (req, res) => {
    try {
        await sql.connect(config);
        const result = await sql.query`
            SELECT 
                I.id_incidencia, D.nombre, I.fecha, TI.nombre as nombreIncidencia, I.descripcion, EI.estado_incidencia as estado, EI.color, ISNULL(r.autoriza, 0) AS autoriza,  ISNULL(r.autorizado, 0) AS autorizado, I.servicio, I.detalleHora, I.btnAutorizacion
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
            LEFT JOIN
				RFC r ON r.incidencia = I.id_incidencia
			WHERE I.id_estado = 1;
        `;
        const detalle = result.recordset.map(item => ({
            ...item,
            servicio: item.servicio ? 1 : 0 
        }));
        console.log(detalle);
        res.status(200).json(detalle);
        //res.status(200).json({id_folio: detalle.id_incidencia, departamento: detalle.nombre, fecha: detalle.fecha, 
          //  tipoIncidencia: detalle.nombreIncidencia, descripcion: detalle.descripcion, estado: detalle.estado, color: detalle.color})
    } catch (error) {
        console.log('Error al obtener datos de la tabla: ', error);
        res.status(500).json({ error: 'Error al obtener datos de la tabla' });
    }
});

//Trae el detalle de la tabla de incidencias por departamento en proceso
app.get('/DetalleTablaDepartamentoEnproceso', async (req, res) => {
    try {
        await sql.connect(config);
        const { id_departamento } = req.query;
        console.log('Llegue a tabla por dpto y el id_departamento es ', id_departamento);
        const result = await sql.query`
            SELECT 
                I.id_incidencia, I.fecha, TI.nombre as nombreIncidencia, I.descripcion, EI.estado_incidencia as estado, EI.color, ISNULL(r.autoriza, 0) AS autoriza,  ISNULL(r.autorizado, 0) AS autorizado, I.servicio, I.detalleHora, I.btnAutorizacion
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
            LEFT JOIN
				RFC r ON r.incidencia = I.id_incidencia
            WHERE D.id_departamento = ${id_departamento} and I.id_estado = 1;
        `;
        const detalle = result.recordset.map(item => ({
            ...item,
            servicio: item.servicio ? 1 : 0 
        }));
        console.log(detalle);
        res.status(200).json(detalle);
    } catch (error) {
        console.log('Error al obtener datos de la tabla: ', error);
        res.status(500).json({ error: 'Error al obtener datos de la tabla' });
    }
});

//Trae el detalle de la tabla de incidencias por tecnico en proceso
app.get('/DetalleTablaTecnicoEnProceso', async (req, res) => {
    try {
        await sql.connect(config);
        const { id_usuario } = req.query;
        console.log('Datos recibidos:', {
            id_usuario
        });
        const result = await sql.query`
            SELECT 
                I.id_incidencia, D.nombre, I.fecha, TI.nombre as nombreIncidencia, I.descripcion, EI.estado_incidencia as estado, EI.color, ISNULL(r.autoriza, 0) AS autoriza,  ISNULL(r.autorizado, 0) AS autorizado, I.servicio, I.detalleHora, I.btnAutorizacion
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
            JOIN
                TECNICO T ON T.id_usuario = I.id_tecnicoAsignado
            LEFT JOIN
				RFC r ON r.incidencia = I.id_incidencia
            WHERE I.id_tecnicoAsignado = ${id_usuario} and I.id_estado = 1;
        `;
        const detalle = result.recordset.map(item => ({
            ...item,
            servicio: item.servicio ? 1 : 0 
        }));
        console.log(detalle);
        res.status(200).json(detalle);
    } catch (error) {
        console.log('Error al obtener datos de la tabla: ', error);
        res.status(500).json({ error: 'Error al obtener datos de la tabla' });
    }
});

//Trae el detalle de la tabla de incidencias para ADMON Terminados
app.get('/DetalleTablaADMONTerminados', async (req, res) => {
    try {
        await sql.connect(config);
        const result = await sql.query`
            SELECT 
                I.id_incidencia, D.nombre, I.fecha, TI.nombre as nombreIncidencia, I.descripcion, EI.estado_incidencia as estado, EI.color, ISNULL(r.autoriza, 0) AS autoriza,  ISNULL(r.autorizado, 0) AS autorizado, I.servicio, I.detalleHora, I.btnAutorizacion
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
            LEFT JOIN
				RFC r ON r.incidencia = I.id_incidencia
			WHERE I.id_estado = 2;
        `;
        const detalle = result.recordset.map(item => ({
            ...item,
            servicio: item.servicio ? 1 : 0 
        }));
        console.log(detalle);
        res.status(200).json(detalle);
        //res.status(200).json({id_folio: detalle.id_incidencia, departamento: detalle.nombre, fecha: detalle.fecha, 
          //  tipoIncidencia: detalle.nombreIncidencia, descripcion: detalle.descripcion, estado: detalle.estado, color: detalle.color})
    } catch (error) {
        console.log('Error al obtener datos de la tabla: ', error);
        res.status(500).json({ error: 'Error al obtener datos de la tabla' });
    }
});

//Trae el detalle de la tabla de incidencias por departamento terminados
app.get('/DetalleTablaDepartamentoTerminados', async (req, res) => {
    try {
        await sql.connect(config);
        const { id_departamento } = req.query;
        console.log('Llegue a tabla por dpto y el id_departamento es ', id_departamento);
        const result = await sql.query`
            SELECT 
                I.id_incidencia, I.fecha, TI.nombre as nombreIncidencia, I.descripcion, EI.estado_incidencia as estado, EI.color, ISNULL(r.autoriza, 0) AS autoriza,  ISNULL(r.autorizado, 0) AS autorizado, I.servicio, I.detalleHora, I.btnAutorizacion
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
            LEFT JOIN
				RFC r ON r.incidencia = I.id_incidencia
            WHERE D.id_departamento = ${id_departamento} and I.id_estado = 2;
        `;
        const detalle = result.recordset.map(item => ({
            ...item,
            servicio: item.servicio ? 1 : 0 
        }));
        console.log(detalle);
        res.status(200).json(detalle);
    } catch (error) {
        console.log('Error al obtener datos de la tabla: ', error);
        res.status(500).json({ error: 'Error al obtener datos de la tabla' });
    }
});

//Trae el detalle de la tabla de incidencias por tecnico terminados
app.get('/DetalleTablaTecnicoTerminados', async (req, res) => {
    try {
        await sql.connect(config);
        const { id_usuario } = req.query;
        console.log('Datos recibidos:', {
            id_usuario
        });
        const result = await sql.query`
            SELECT 
                I.id_incidencia, D.nombre, I.fecha, TI.nombre as nombreIncidencia, I.descripcion, EI.estado_incidencia as estado, EI.color, ISNULL(r.autoriza, 0) AS autoriza,  ISNULL(r.autorizado, 0) AS autorizado, I.servicio, I.detalleHora, I.btnAutorizacion
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
            JOIN
                TECNICO T ON T.id_usuario = I.id_tecnicoAsignado
            LEFT JOIN
				RFC r ON r.incidencia = I.id_incidencia
            WHERE I.id_tecnicoAsignado = ${id_usuario} and I.id_estado = 2;
        `;
        const detalle = result.recordset.map(item => ({
            ...item,
            servicio: item.servicio ? 1 : 0 
        }));
        console.log(detalle);
        res.status(200).json(detalle);
    } catch (error) {
        console.log('Error al obtener datos de la tabla: ', error);
        res.status(500).json({ error: 'Error al obtener datos de la tabla' });
    }
});

app.get('/Problemas', async (req, res) => {
    let pool = null;
    try {
        pool = await new sql.ConnectionPool(config).connect();
        const result = await pool.request().query(`
            SELECT 
                p.id_problema,
                p.titulo,
                p.descripcion,
                p.fecha_creacion,
                p.fecha_resolucion,
                p.estado, 
                p.prioridad,
                p.categoria,
                (SELECT COUNT(*) FROM PROBLEMA_INCIDENCIA WHERE id_problema = p.id_problema) AS num_incidencias
            FROM 
                PROBLEMAS p
            ORDER BY 
                p.fecha_creacion DESC;
        `);
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error al obtener problemas:', error.message);
        res.status(500).send('Error al obtener problemas');
    } finally {
        if (pool) {
            await pool.close();
        }
    }
});

app.delete('/EliminarAsociacionProblema', async (req, res) => {
    let pool = null;
    try {
        pool = await new sql.ConnectionPool(config).connect();
        const { id_problema, id_incidencia } = req.body;
        
        // Verificar que exista la asociación
        const checkResult = await pool.request()
            .input('id_problema', sql.Int, id_problema)
            .input('id_incidencia', sql.Int, id_incidencia)
            .query(`
                SELECT 1 
                FROM PROBLEMA_INCIDENCIA 
                WHERE id_problema = @id_problema AND id_incidencia = @id_incidencia
            `);
            
        if (checkResult.recordset.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'La asociación no existe'
            });
        }
        
        // Eliminar la asociación
        await pool.request()
            .input('id_problema', sql.Int, id_problema)
            .input('id_incidencia', sql.Int, id_incidencia)
            .query(`
                DELETE FROM PROBLEMA_INCIDENCIA 
                WHERE id_problema = @id_problema AND id_incidencia = @id_incidencia
            `);
            
        res.status(200).json({
            success: true,
            message: 'Asociación eliminada exitosamente'
        });
    } catch (error) {
        console.error('Error al eliminar asociación:', error.message);
        res.status(500).json({
            success: false,
            message: 'Error al eliminar asociación: ' + error.message
        });
    } finally {
        if (pool) {
            await pool.close();
        }
    }
});

// Endpoint para guardar la solución personalizada
app.post('/GuardarSolucion', async (req, res) => {
    let pool = null;
    try {
        const { id_incidencia, solucion } = req.body;
        if (!id_incidencia || !solucion) {
            return res.status(400).json({ 
                success: false, 
                message: 'Se requiere id_incidencia y solucion' 
            });
        }
        
        pool = await new sql.ConnectionPool(config).connect();
        
        // Verificar si ya existe una solución para esta incidencia
        const checkResult = await pool.request()
            .input('id_incidencia', sql.Int, id_incidencia)
            .query(`SELECT 1 FROM SOLUCIONES_PERSONALIZADAS WHERE id_incidencia = @id_incidencia`);
            
        if (checkResult.recordset.length > 0) {
            // Actualizar solución existente
            await pool.request()
                .input('id_incidencia', sql.Int, id_incidencia)
                .input('solucion', sql.NVarChar(1000), solucion)
                .query(`UPDATE SOLUCIONES_PERSONALIZADAS SET solucion = @solucion WHERE id_incidencia = @id_incidencia`);
        } else {
            // Insertar nueva solución
            await pool.request()
                .input('id_incidencia', sql.Int, id_incidencia)
                .input('solucion', sql.NVarChar(1000), solucion)
                .query(`INSERT INTO SOLUCIONES_PERSONALIZADAS (id_incidencia, solucion) VALUES (@id_incidencia, @solucion)`);
        }
        
        res.status(200).json({
            success: true,
            message: 'Solución guardada exitosamente'
        });
    } catch (error) {
        console.error('Error al guardar solución:', error.message);
        res.status(500).json({
            success: false,
            message: 'Error al guardar solución: ' + error.message
        });
    } finally {
        if (pool) {
            await pool.close();
        }
    }
});

// Endpoint para obtener la solución personalizada
app.get('/ObtenerSolucion', async (req, res) => {
    let pool = null;
    try {
        const { id_incidencia } = req.query;
        if (!id_incidencia) {
            return res.status(400).json({ error: 'Se requiere id_incidencia' });
        }
        
        pool = await new sql.ConnectionPool(config).connect();
        const result = await pool.request()
            .input('id_incidencia', sql.Int, id_incidencia)
            .query(`SELECT solucion FROM SOLUCIONES_PERSONALIZADAS WHERE id_incidencia = @id_incidencia`);
        
        if (result.recordset.length > 0) {
            res.status(200).json({ solucion: result.recordset[0].solucion });
        } else {
            res.status(200).json({ solucion: '' });
        }
    } catch (error) {
        console.error('Error al obtener solución:', error.message);
        res.status(500).json({ error: 'Error al obtener solución' });
    } finally {
        if (pool) {
            await pool.close();
        }
    }
});

app.get('/DetalleIncidencia2', async (req, res) => {
    let pool = null;
    try {
        const { id_incidencia } = req.query;
        if (!id_incidencia) {
            return res.status(400).json({ error: 'Se requiere id_incidencia' });
        }
        
        console.log('Solicitando detalles para incidencia:', id_incidencia);
        
        pool = await new sql.ConnectionPool(config).connect();
        const result = await pool.request()
            .input('id_incidencia', sql.Int, id_incidencia)
            .query(`
                SELECT i.*,
                       t.nombre AS nombreIncidencia,
                       e.estado_incidencia AS estado,
                       u.nombre AS nombre_usuario,
                       d.nombre AS nombre_departamento,
                       esp.nombre AS nombre_espacio,
                       esp.ubicacion_esp AS ubicacion_esp,
                       edi.nombre AS nombre_edificio,
                       ISNULL(resp.nombre + ' ' + resp.apellido, 'No asignado') AS responsable,
                       p.nombre AS nombre_prioridad,
                       p.descripcion AS descripcion_prioridad
                FROM INCIDENCIA i
                LEFT JOIN TIPO_INCIDENCIA t ON i.id_tipoincidencia = t.id_tipoincidencia
                LEFT JOIN ESTADO_INCIDENCIA e ON i.id_estado = e.id_estado
                LEFT JOIN USUARIO u ON i.id_tecnicoAsignado = u.id_usuario
                LEFT JOIN INCIDENCIA_LUGAR il ON i.id_incidencia = il.id_incidencia
                LEFT JOIN ESPACIOS esp ON il.id_espacio = esp.id_espacio
                LEFT JOIN EDIFICIO edi ON esp.id_edificio = edi.id_edificio
                LEFT JOIN USUARIO resp ON esp.responsable = resp.id_usuario
                LEFT JOIN DEPARTAMENTO d ON esp.id_departamento = d.id_departamento
                LEFT JOIN PRIORIDAD p ON i.id_prioridad = p.id_prioridad
                WHERE i.id_incidencia = @id_incidencia
            `);
        
        if (result.recordset.length === 0) {
            return res.status(404).json({ error: 'Incidencia no encontrada' });
        }
        
        console.log('Datos encontrados:', result.recordset[0]);
        
        res.status(200).json(result.recordset[0]);
    } catch (error) {
        console.error('Error al obtener detalles de la incidencia:', error.message);
        console.error('Datos recibidos:', req.query);
        res.status(500).json({ error: 'Error al obtener detalles de la incidencia' });
    } finally {
        if (pool) {
            await pool.close();
        }
    }
});
app.get('/IncidenciasAsociadasProblema', async (req, res) => {
    let pool = null;
    try {
        const { id_problema } = req.query;
        pool = await new sql.ConnectionPool(config).connect();
        
        // Updated query with corrected column name: id_tecnicoAsignado instead of id_usuario_asignado
        const result = await pool.request()
            .input('id_problema', sql.Int, id_problema)
            .query(`
                SELECT i.*, d.nombre as nombre_departamento, u.nombre as nombre_usuario
                FROM INCIDENCIA i
                JOIN PROBLEMA_INCIDENCIA pi ON i.id_incidencia = pi.id_incidencia
                LEFT JOIN USUARIO u ON i.id_tecnicoAsignado = u.id_usuario
                LEFT JOIN INCIDENCIA_LUGAR il ON i.id_incidencia = il.id_incidencia
                LEFT JOIN ESPACIOS e ON il.id_espacio = e.id_espacio
                LEFT JOIN DEPARTAMENTO d ON e.id_departamento = d.id_departamento
                WHERE pi.id_problema = @id_problema
                ORDER BY i.fecha DESC
            `);
        
        // Map status IDs to names
        const recordsWithMappedStates = result.recordset.map(record => ({
            ...record,
            estado: mapEstadoId(record.id_estado)
        }));
        
        res.status(200).json(recordsWithMappedStates);
    } catch (error) {
        console.error('Error al obtener incidencias asociadas:', error.message);
        console.error('Datos recibidos:', req.query);
        res.status(500).send('Error al obtener incidencias asociadas al problema');
    } finally {
        if (pool) {
            await pool.close();
        }
    }
});
// Función para mapear IDs de estado a nombres
function mapEstadoId(id) {
    const estados = {
        1: 'Enviado',
        2: 'En Proceso',
        3: 'Terminado',
        4: 'Liberado',
        5: 'Rechazado'
    };
    return estados[id] || 'Desconocido';
}
app.post('/AsociarIncidenciaProblema', async (req, res) => {
    let pool = null;
    try {
        pool = await new sql.ConnectionPool(config).connect();
        const { id_incidencia, id_problema } = req.body;
        
        // Verificar que la incidencia existe
        const checkIncidencia = await pool.request()
            .input('id_incidencia', sql.Int, id_incidencia)
            .query('SELECT id_estado FROM INCIDENCIA WHERE id_incidencia = @id_incidencia');
        
        if (checkIncidencia.recordset.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'La incidencia no existe'
            });
        }
        
        // Verificar si la asociación ya existe
        const checkAsociacion = await pool.request()
            .input('id_problema', sql.Int, id_problema)
            .input('id_incidencia', sql.Int, id_incidencia)
            .query('SELECT 1 FROM PROBLEMA_INCIDENCIA WHERE id_problema = @id_problema AND id_incidencia = @id_incidencia');
        
        // Si la asociación ya existe, devolver éxito sin hacer cambios
        if (checkAsociacion.recordset.length > 0) {
            return res.status(200).json({
                success: true,
                message: 'La asociación ya existía previamente'
            });
        }
        
        // Asociar la incidencia al problema
        await pool.request()
            .input('id_problema', sql.Int, id_problema)
            .input('id_incidencia', sql.Int, id_incidencia)
            .query('INSERT INTO PROBLEMA_INCIDENCIA (id_problema, id_incidencia, fecha_asociacion) VALUES (@id_problema, @id_incidencia, GETDATE())');
        
        res.status(200).json({
            success: true,
            message: 'Incidencia asociada al problema exitosamente'
        });
    } catch (error) {
        console.error('Error al asociar incidencia:', error.message);
        res.status(500).json({
            success: false,
            message: 'Error al asociar incidencia: ' + error.message
        });
    } finally {
        if (pool) {
            await pool.close();
        }
    }
});
app.post('/AsociarProblemasSimilares', async (req, res) => {
    try {
        await sql.connect(config);
        const { id_problema_principal, id_problema_secundario } = req.body;
        
        // Verificar que ambos problemas existen
        const checkProblemas = await sql.query`
            SELECT COUNT(*) AS count
            FROM PROBLEMAS
            WHERE id_problema IN (${id_problema_principal}, ${id_problema_secundario});
        `;
        
        if (checkProblemas.recordset[0].count !== 2) {
            return res.status(404).json({
                success: false,
                message: 'Uno o ambos problemas no existen'
            });
        }
        
        // Asociar los problemas
        await sql.query`
            INSERT INTO PROBLEMAS_SIMILARES (
                id_problema_principal,
                id_problema_secundario,
                fecha_asociacion
            ) VALUES (
                ${id_problema_principal},
                ${id_problema_secundario},
                GETDATE()
            )
        `;
        
        res.status(200).json({
            success: true,
            message: 'Problemas asociados exitosamente'
        });
    } catch (error) {
        console.error('Error al asociar problemas:', error.message);
        res.status(500).send('Error al asociar problemas');
    } finally {
        await sql.close();
    }
});

// Endpoint para obtener problemas similares
app.get('/ProblemasSimilares/:id_problema', async (req, res) => {
    try {
        await sql.connect(config);
        const { id_problema } = req.params;
        
        const result = await sql.query`
            SELECT 
                p.id_problema,
                p.titulo,
                p.descripcion,
                p.estado,
                p.categoria,
                p.prioridad,
                p.fecha_creacion,
                ps.fecha_asociacion
            FROM 
                PROBLEMAS p
            JOIN 
                PROBLEMAS_SIMILARES ps ON (
                    (ps.id_problema_principal = ${id_problema} AND ps.id_problema_secundario = p.id_problema)
                    OR 
                    (ps.id_problema_secundario = ${id_problema} AND ps.id_problema_principal = p.id_problema)
                )
            ORDER BY 
                ps.fecha_asociacion DESC;
        `;
        
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error al obtener problemas similares:', error.message);
        res.status(500).send('Error al obtener problemas similares');
    } finally {
        await sql.close();
    }
});

app.get('/TodasIncidencias', async (req, res) => {
    try {
        await sql.connect(config);
        const result = await sql.query`
            SELECT 
                I.id_incidencia, 
                D.nombre AS departamento, 
                I.fecha, 
                TI.nombre AS nombreIncidencia, 
                I.descripcion, 
                EI.estado_incidencia, 
                EI.color,
                (SELECT COUNT(*) FROM PROBLEMA_INCIDENCIA WHERE id_incidencia = I.id_incidencia) AS asociada_problema
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
            ORDER BY 
                I.fecha DESC;
        `;
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error al obtener todas las incidencias:', error.message);
        res.status(500).send('Error al obtener todas las incidencias');
    } finally {
        await sql.close();
    }
});
app.post('/AsociarIncidenciaProblema', async (req, res) => {
    try {
        await sql.connect(config);
        const { id_incidencia, id_problema } = req.body;
        
        // Verificar que la incidencia existe y tiene estado Liberado (3)
        const checkIncidencia = await sql.query`
            SELECT id_estado FROM INCIDENCIA 
            WHERE id_incidencia = ${id_incidencia}
        `;
        
        if (checkIncidencia.recordset.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'La incidencia no existe'
            });
        }
        
        // Asociar la incidencia al problema
        await sql.query`
            INSERT INTO PROBLEMA_INCIDENCIA (id_problema, id_incidencia, fecha_asociacion)
            VALUES (${id_problema}, ${id_incidencia}, GETDATE())
        `;
        
        res.status(200).json({
            success: true,
            message: 'Incidencia asociada al problema exitosamente'
        });
    } catch (error) {
        console.error('Error al asociar incidencia:', error.message);
        res.status(500).send('Error al asociar incidencia al problema');
    } finally {
        await sql.close();
    }
});

app.post('/AsociarIncidenciaProblema', async (req, res) => {
    try {
        await sql.connect(config);
        const { id_incidencia, id_problema } = req.body;
        
        // Verificar que la incidencia existe y tiene estado Liberado (3)
        const checkIncidencia = await sql.query`
            SELECT id_estado FROM INCIDENCIA 
            WHERE id_incidencia = ${id_incidencia}
        `;
        
        if (checkIncidencia.recordset.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'La incidencia no existe'
            });
        }
        
        // Asociar la incidencia al problema
        await sql.query`
            INSERT INTO PROBLEMA_INCIDENCIA (id_problema, id_incidencia, fecha_asociacion)
            VALUES (${id_problema}, ${id_incidencia}, GETDATE())
        `;
        
        res.status(200).json({
            success: true,
            message: 'Incidencia asociada al problema exitosamente'
        });
    } catch (error) {
        console.error('Error al asociar incidencia:', error.message);
        res.status(500).send('Error al asociar incidencia al problema');
    } finally {
        await sql.close();
    }
});
app.post('/CrearProblema', async (req, res) => {
    try {
        await sql.connect(config);
        const { titulo, descripcion, categoria, prioridad } = req.body;
        
        const result = await sql.query`
            INSERT INTO PROBLEMAS (
                titulo, 
                descripcion, 
                fecha_creacion,
                estado,
                categoria,
                prioridad
            ) OUTPUT INSERTED.id_problema
            VALUES (
                ${titulo}, 
                ${descripcion}, 
                GETDATE(), 
                'Abierto',
                ${categoria},
                ${prioridad}
            )
        `;
        
        const id_problema = result.recordset[0].id_problema;
        
        res.status(200).json({
            success: true,
            message: 'Problema creado exitosamente',
            id_problema: id_problema
        });
    } catch (error) {
        console.error('Error al crear problema:', error.message);
        res.status(500).send('Error al crear problema');
    } finally {
        await sql.close();
    }
});

//Trae el detalle de la tabla de incidencias para ADMON Liberados
app.get('/DetalleTablaADMONLiberados', async (req, res) => {
    try {
        await sql.connect(config);
        const result = await sql.query`
            SELECT 
                I.id_incidencia, D.nombre, I.fecha, TI.nombre as nombreIncidencia, I.descripcion, EI.estado_incidencia as estado, EI.color, ISNULL(r.autoriza, 0) AS autoriza,  ISNULL(r.autorizado, 0) AS autorizado, I.servicio, I.detalleHora, I.btnAutorizacion
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
            LEFT JOIN
				RFC r ON r.incidencia = I.id_incidencia
			WHERE I.id_estado = 3;
        `;
        const detalle = result.recordset.map(item => ({
            ...item,
            servicio: item.servicio ? 1 : 0 
        }));
        console.log(detalle);
        res.status(200).json(detalle);
        //res.status(200).json({id_folio: detalle.id_incidencia, departamento: detalle.nombre, fecha: detalle.fecha, 
          //  tipoIncidencia: detalle.nombreIncidencia, descripcion: detalle.descripcion, estado: detalle.estado, color: detalle.color})
    } catch (error) {
        console.log('Error al obtener datos de la tabla: ', error);
        res.status(500).json({ error: 'Error al obtener datos de la tabla' });
    }
});

//Trae el detalle de la tabla de incidencias por departamento Liberados
app.get('/DetalleTablaDepartamentoLiberados', async (req, res) => {
    try {
        await sql.connect(config);
        const { id_departamento } = req.query;
        console.log('Llegue a tabla por dpto y el id_departamento es ', id_departamento);
        const result = await sql.query`
            SELECT 
                I.id_incidencia, I.fecha, TI.nombre as nombreIncidencia, I.descripcion, EI.estado_incidencia as estado, EI.color, ISNULL(r.autoriza, 0) AS autoriza,  ISNULL(r.autorizado, 0) AS autorizado, I.servicio, I.detalleHora, I.btnAutorizacion
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
            LEFT JOIN
				RFC r ON r.incidencia = I.id_incidencia
            WHERE D.id_departamento = ${id_departamento} and I.id_estado = 3;
        `;
        const detalle = result.recordset.map(item => ({
            ...item,
            servicio: item.servicio ? 1 : 0 
        }));
        console.log(detalle);
        res.status(200).json(detalle);
    } catch (error) {
        console.log('Error al obtener datos de la tabla: ', error);
        res.status(500).json({ error: 'Error al obtener datos de la tabla' });
    }
});

//Trae el detalle de la tabla de incidencias por tecnico liberados
app.get('/DetalleTablaTecnicoLiberados', async (req, res) => {
    try {
        await sql.connect(config);
        const { id_usuario } = req.query;
        console.log('Datos recibidos:', {
            id_usuario
        });
        const result = await sql.query`
            SELECT 
                I.id_incidencia, D.nombre, I.fecha, TI.nombre as nombreIncidencia, I.descripcion, EI.estado_incidencia as estado, EI.color, ISNULL(r.autoriza, 0) AS autoriza,  ISNULL(r.autorizado, 0) AS autorizado, I.servicio, I.detalleHora , I.btnAutorizacion
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
            JOIN
                TECNICO T ON T.id_usuario = I.id_tecnicoAsignado
            LEFT JOIN
				RFC r ON r.incidencia = I.id_incidencia
            WHERE I.id_tecnicoAsignado = ${id_usuario} and I.id_estado = 3;
        `;
        const detalle = result.recordset.map(item => ({
            ...item,
            servicio: item.servicio ? 1 : 0 
        }));
        console.log(detalle);
        res.status(200).json(detalle);
    } catch (error) {
        console.log('Error al obtener datos de la tabla: ', error);
        res.status(500).json({ error: 'Error al obtener datos de la tabla' });
    }
});

//Trae el detalle de la tabla de incidencias para ADMON Rechazados
app.get('/DetalleTablaADMONRechazados', async (req, res) => {
    try {
        await sql.connect(config);
        const result = await sql.query`
            SELECT 
                I.id_incidencia, D.nombre, I.fecha, TI.nombre as nombreIncidencia, I.descripcion, EI.estado_incidencia as estado, EI.color, ISNULL(r.autoriza, 0) AS autoriza,  ISNULL(r.autorizado, 0) AS autorizado, I.servicio, I.detalleHora, I.btnAutorizacion 
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
            LEFT JOIN
				RFC r ON r.incidencia = I.id_incidencia
			WHERE I.id_estado = 4;
        `;
        const detalle = result.recordset.map(item => ({
            ...item,
            servicio: item.servicio ? 1 : 0 
        }));
        console.log(detalle);
        res.status(200).json(detalle);
        //res.status(200).json({id_folio: detalle.id_incidencia, departamento: detalle.nombre, fecha: detalle.fecha, 
          //  tipoIncidencia: detalle.nombreIncidencia, descripcion: detalle.descripcion, estado: detalle.estado, color: detalle.color})
    } catch (error) {
        console.log('Error al obtener datos de la tabla: ', error);
        res.status(500).json({ error: 'Error al obtener datos de la tabla' });
    }
});

//Trae el detalle de la tabla de incidencias por departamento Rechazados
app.get('/DetalleTablaDepartamentoRechazados', async (req, res) => {
    try {
        await sql.connect(config);
        const { id_departamento } = req.query;
        console.log('Llegue a tabla por dpto y el id_departamento es ', id_departamento);
        const result = await sql.query`
            SELECT 
                I.id_incidencia, I.fecha, TI.nombre as nombreIncidencia, I.descripcion, EI.estado_incidencia as estado, EI.color, ISNULL(r.autoriza, 0) AS autoriza,  ISNULL(r.autorizado, 0) AS autorizado, I.servicio, I.detalleHora, I.btnAutorizacion
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
            LEFT JOIN
				RFC r ON r.incidencia = I.id_incidencia
            WHERE D.id_departamento = ${id_departamento} and I.id_estado = 4;
        `;
        const detalle = result.recordset.map(item => ({
            ...item,
            servicio: item.servicio ? 1 : 0 
        }));
        console.log(detalle);
        res.status(200).json(detalle);
    } catch (error) {
        console.log('Error al obtener datos de la tabla: ', error);
        res.status(500).json({ error: 'Error al obtener datos de la tabla' });
    }
});

//Trae el detalle de la tabla de incidencias por tecnico Rechazados
app.get('/DetalleTablaTecnicoRechazados', async (req, res) => {
    try {
        await sql.connect(config);
        const { id_usuario } = req.query;
        console.log('Datos recibidos:', {
            id_usuario
        });
        const result = await sql.query`
            SELECT 
                I.id_incidencia, D.nombre, I.fecha, TI.nombre as nombreIncidencia, I.descripcion, EI.estado_incidencia as estado, EI.color, ISNULL(r.autoriza, 0) AS autoriza,  ISNULL(r.autorizado, 0) AS autorizado, I.servicio, I.detalleHora, I.btnAutorizacion
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
            JOIN
                TECNICO T ON T.id_usuario = I.id_tecnicoAsignado
            LEFT JOIN
				RFC r ON r.incidencia = I.id_incidencia
            WHERE I.id_tecnicoAsignado = ${id_usuario} and I.id_estado = 4;
        `;
        const detalle = result.recordset.map(item => ({
            ...item,
            servicio: item.servicio ? 1 : 0 
        }));
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
            select t.id_usuario, u.nombre+' '+u.apellido as nombre, t.num_incidencias from TECNICO T
            JOIN ESPECIALIZACION E ON e.id_especializacion = t.id_especializacion
            JOIN USUARIO U ON u.id_usuario = t.id_usuario
            WHERE e.id_especializacion = ${id_especializacion} and t.id_estadoDisponibilidad = 1 AND t.jefe != 1;`);    
            res.status(200).json(result.recordset);
            console.log(result.recordset)
    } catch (error) {
        console.error('Error al obtener las especializaciones', error.message);
        res.status(500).send('Error al obtener las especializacioness');
    }
});

// Asigna tecnico a incidencia
app.put('/AsignarTecnico', async (req, res) => {
    const { id_incidencia, id_usuario, id_prioridad } = req.body;

    console.log('Datos recibidos:', {
        id_incidencia, id_usuario, id_prioridad
    });
    try {
        await sql.connect(config);
        const transaction = new sql.Transaction();
        await transaction.begin();

        const request = new sql.Request(transaction);
        request.input('id_incidencia', sql.Int, id_incidencia);
        request.input('id_usuario', sql.Int, id_usuario);
        request.input('id_prioridad', sql.Int, id_prioridad);
        const result = await request.query(`
            UPDATE INCIDENCIA
            SET 
                id_prioridad = @id_prioridad,
                id_tecnicoAsignado = @id_usuario, 
                id_estado = 1
            WHERE id_incidencia = @id_incidencia;
        `);

        if (result.rowsAffected[0] > 0) {
            const updateTechnicianResult = await request.query(`
                UPDATE TECNICO
                SET num_incidencias = num_incidencias + 1
                WHERE id_usuario = @id_usuario;
            `);

            if (updateTechnicianResult.rowsAffected[0] > 0) {
                await transaction.commit();
                res.json({ success: true, message: 'Técnico asignado y número de incidencias actualizado' });
            } else {
                await transaction.rollback();
                res.json({ success: false, message: 'No se pudo actualizar el número de incidencias del técnico' });
            }
        } else {
            await transaction.rollback();
            res.json({ success: false, message: 'No se pudo asignar técnico' });
        }
    } catch (error) {
        console.error('Error al asignar técnico:', error.message);
        res.status(500).json({ success: false, message: 'Error al asignar técnico' });
    } finally {
        await sql.close();
    }
});


// Rechazar incidencia
app.put('/RechazarIncidencia', async (req, res) => {
    const { id_incidencia } = req.body;

    console.log('Datos recibidos:', { id_incidencia });
    try {
        await sql.connect(config);
        const request = new sql.Request();
        request.input('id_incidencia', sql.Int, id_incidencia);

        const result = await request.query(`
            BEGIN TRANSACTION;
            
            UPDATE INCIDENCIA
            SET id_estado = 4
            WHERE id_incidencia = @id_incidencia;
            
            UPDATE RFC
            SET autorizado = 2
            WHERE incidencia = @id_incidencia;
            
            COMMIT;
        `);

        if (result.rowsAffected[0] > 0) {
            res.json({ success: true, message: 'Incidencia rechazada y RFC actualizado' });
        } else {
            res.json({ success: false, message: 'No se pudo rechazar incidencia o actualizar RFC' });
        }
    } catch (error) {
        console.error('Error al rechazar incidencia y actualizar RFC:', error.message);
        res.status(500).json({ success: false, message: 'Error al rechazar incidencia y actualizar RFC' });
    } finally {
        await sql.close();
    }
});

//Trae el equipo de la incidencia
app.get('/SelectEquipoDeIncidencia', async (req, res) => {
    try {
        await sql.connect(config);
        const { id_incidencia } = req.query;
        console.log('Datos recibidos:', {
            id_incidencia
        });
        const result = await sql.query`
            select id_equipo from INCIDENCIA where id_incidencia = ${id_incidencia};
        `;
        const detalle = result.recordset;
        console.log(detalle);
        res.status(200).json(detalle);
    } catch (error) {
        console.log('Error al obtener datos de la tabla incidencia: ', error);
        res.status(500).json({ error: 'Error al obtener datos de la tabla incidencia al traer el equipo de la incidencia' });
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
                D.ubicacion_edificio,
				D.nombre as nombre_edificio,
				CONCAT(U.nombre, ' ', U.apellido) AS responsable
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
			LEFT JOIN
				USUARIO U ON U.id_usuario = E.responsable
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

//Trael el id del equipo que se esta atendiendo en la incidencia
app.get('/SelectEquipoDeIncidencia', async (req, res) => {
    try {
        await sql.connect(config);
        const { id_incidencia } = req.query;
        console.log('Datos recibidos:', {
            id_incidencia
        });
        const result = await sql.query`
            select id_equipo from INCIDENCIA where id_incidencia = ${id_incidencia};
        `;
        const detalle = result.recordset;
        console.log(detalle);
        res.status(200).json(detalle);
    } catch (error) {
        console.log('Error al obtener datos de la tabla incidencia: ', error);
        res.status(500).json({ error: 'Error al obtener datos de la tabla incidencia al traer el equipo de la incidencia' });
    }
});

// Finalizar incidencia
app.put('/FinalizarIncidencia', async (req, res) => {
    const { id_incidencia, hora_final } = req.body;

    console.log('Finalizar - Datos recibidos:', {
        id_incidencia, hora_final
    });
    try {
        await sql.connect(config);
        const request = new sql.Request();
        request.input('id_incidencia', sql.Int, id_incidencia);
        request.input('hora_final', sql.VarChar, hora_final);
        const result = await request.query(`
            UPDATE INCIDENCIA
            SET id_estado = 2
            WHERE id_incidencia = @id_incidencia;
        `);

        if (result.rowsAffected[0] > 0) {
            await request.query(`
                UPDATE RFC
                SET hora_final = CONVERT(TIME, @hora_final)
                WHERE incidencia = @id_incidencia;
            `);

            res.json({ success: true, message: 'Incidencia finalizada y hora_final actualizada' });
        } else {
            res.json({ success: false, message: 'No se pudo finalizar la incidencia' });
        }
    } catch (error) {
        console.error('Error al finalizar incidencia:', error.message);
        res.status(500).json({ success: false, message: 'Error al finalizar incidencia' });
    } finally {
        await sql.close();
    }
});

// Liberar incidencia
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

//Trae los gigas
app.get('/SelectGiga', async (req, res) => {
    try {
        await sql.connect(config);
        const request = new sql.Request();
        const result = await request.query(`
            SELECT * FROM NOMBRE_PUERTO
            WHERE id_tipo_puerto = 2;
        `);    
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error al obtener los gigas', error.message);
        res.status(500).send('Error al obtener los gigas');
    }
});

//Trae los fast
app.get('/SelectFast', async (req, res) => {
    try {
        await sql.connect(config);
        const request = new sql.Request();
        const result = await request.query(`
            SELECT * FROM NOMBRE_PUERTO
            WHERE id_tipo_puerto = 1;
        `);   
        console.log(result.recordset) 
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error al obtener los fast', error.message);
        res.status(500).send('Error al obtener los fast');
    }
});

//Trae los consolas
app.get('/SelectConsolas', async (req, res) => {
    try {
        await sql.connect(config);
        const request = new sql.Request();
        const result = await request.query(`
            SELECT * FROM NOMBRE_PUERTO
            WHERE id_tipo_puerto = 3;
        `);    
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error al obtener los consolas', error.message);
        res.status(500).send('Error al obtener los consolas');
    }
});

//Trae los ubs2
app.get('/SelectUsb2', async (req, res) => {
    try {
        await sql.connect(config);
        const request = new sql.Request();
        const result = await request.query(`
            SELECT * FROM NOMBRE_PUERTO
            WHERE id_tipo_puerto = 4;
        `);    
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error al obtener los usb2', error.message);
        res.status(500).send('Error al obtener los usb2');
    }
});

//Trae los ubs3
app.get('/SelectUsb3', async (req, res) => {
    try {
        await sql.connect(config);
        const request = new sql.Request();
        const result = await request.query(`
            SELECT * FROM NOMBRE_PUERTO
            WHERE id_tipo_puerto = 5;
        `);    
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error al obtener los usb3', error.message);
        res.status(500).send('Error al obtener los usb3');
    }
});

//Trae los hdmi
app.get('/SelectHdmi', async (req, res) => {
    try {
        await sql.connect(config);
        const request = new sql.Request();
        const result = await request.query(`
            SELECT * FROM NOMBRE_PUERTO
            WHERE id_tipo_puerto = 6;
        `);    
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error al obtener los hdmi', error.message);
        res.status(500).send('Error al obtener los hdmi');
    }
});

//Trae los Vga
app.get('/SelectVga', async (req, res) => {
    try {
        await sql.connect(config);
        const request = new sql.Request();
        const result = await request.query(`
            SELECT * FROM NOMBRE_PUERTO
            WHERE id_tipo_puerto = 7;
        `);    
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error al obtener los vga', error.message);
        res.status(500).send('Error al obtener los vga');
    }
});

//Trae los ubs3
app.get('/SelectRj', async (req, res) => {
    try {
        await sql.connect(config);
        const request = new sql.Request();
        const result = await request.query(`
            SELECT * FROM NOMBRE_PUERTO
            WHERE id_tipo_puerto = 8;
        `);    
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error al obtener los rj', error.message);
        res.status(500).send('Error al obtener los rj');
    }
});

//Trae los diagnosticos
app.get('/SelectDiagnostico', async (req, res) => {
    try {
        await sql.connect(config);
        const request = new sql.Request();
        const result = await request.query(`
            SELECT * FROM DIAGNOSTICO
        `);    
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error al obtener los diagnosticos', error.message);
        res.status(500).send('Error al obtener los diagnosticos');
    }
});

//Trae los softwares que no tiene la compu
app.post('/SelectSoftwares2', async (req, res) => {
    const { id_incidencia, id_equipo} = req.body;
    console.log('diagnostico - Datos recibidos:', {
        id_incidencia, id_equipo
    });
    try {
        await sql.connect(config);
        const request = new sql.Request();
        request.input('id_incidencia', sql.Int, id_incidencia);
        request.input('id_equipo', sql.Int, id_equipo);
        const result = await request.query(`
            SELECT s.id_software, s.nombre 
            FROM SOFTWARE s
            WHERE s.id_software NOT IN (
                SELECT sc.id_software
                FROM INCIDENCIA i
                JOIN EQUIPO e ON e.id_equipo = i.id_equipo
                JOIN COMPUTADORA c ON c.id_computadora = e.id_equipo
                JOIN SOFTWARE_COMPUTADORA sc ON sc.id_computadora = c.id_computadora
                WHERE i.id_equipo = @id_equipo AND i.id_incidencia = @id_incidencia
            );
        `);    
        res.status(200).json(result.recordset); // Devuelve los datos correctamente
    } catch (error) {
        console.error('Error al obtener las los softwares', error.message);
        res.status(500).send('Error al obtener los softwares');
    }
});

//Actualiza los softwares de una computadora y cambio de estado de incidencia
app.post('/GuardarDiagnosticoSoftware', async (req, res) => {
    try {
        await sql.connect(config);
        const { id_incidencia, id_equipo, softwares, diag, tipoIncidencia } = req.body;

        console.log('guardarSoftwares - Datos recibidos:', { id_incidencia, id_equipo, softwares, diag, tipoIncidencia });

        // Crear una nueva instancia de solicitud para cada operación
        const request1 = new sql.Request();
        request1.input('diag', sql.Int, diag)
                .input('id_incidencia', sql.Int, id_incidencia)
                .input('tipoIncidencia', sql.Int, tipoIncidencia);

        // Insertar en DIAGNOSTICO_INCIDENCIA
        await request1.query(`
            INSERT INTO DIAGNOSTICO_INCIDENCIA (id_diagnostico, id_incidencia, id_tipoIncidencia)
            VALUES (@diag, @id_incidencia, @tipoIncidencia);
        `);

        // Crear una nueva instancia de solicitud para el UPDATE
        const request2 = new sql.Request();
        request2.input('id_incidencia', sql.Int, id_incidencia);
        request2.input('diag', sql.Int, diag);

        // Actualizar estado de la incidencia
        await request2.query(`
            UPDATE INCIDENCIA
            SET id_estado = 2, diagnostico = @diag
            WHERE id_incidencia = @id_incidencia;
        `);

        // Inserción de softwares en SOFTWARE_COMPUTADORA si existen
        if (softwares && softwares.length > 0) {
            for (const softwareId of softwares) {
                const softwareRequest = new sql.Request();
                softwareRequest.input('softwareId', sql.Int, softwareId)
                               .input('id_equipo', sql.Int, id_equipo);
                
                await softwareRequest.query(`
                    INSERT INTO SOFTWARE_COMPUTADORA (id_software, id_computadora)
                    VALUES (@softwareId, @id_equipo);
                `);
            }
        }

        res.status(200).send('Datos guardados correctamente');
    } catch (error) {
        console.error('Error al guardar los softwares y cambiar el estado de incidencia', error.message);
        res.status(500).send('Error al guardar los softwares y cambiar el estado de incidencia');
    } finally {
        await sql.close();
    }
});

//Actualiza el estado de incidencia
app.post('/GuardarDiagnostico', async (req, res) => {
    try {
        await sql.connect(config);
        const { id_incidencia, diag, tipoIncidencia} = req.body;
        console.log('guardarDiagnostico - Datos recibidos:', {
            id_incidencia, diag, tipoIncidencia
        });
        const request = new sql.Request();
        request.input('id_incidencia', sql.Int, id_incidencia);
        request.input('diag', sql.Int, diag);
        request.input('tipoIncidencia', sql.Int, tipoIncidencia);

        await request.query(`
            UPDATE INCIDENCIA
            SET id_estado = 2, diagnostico = @diag
            WHERE id_incidencia = @id_incidencia;
        `);

        await request.query(`
            INSERT INTO DIAGNOSTICO_INCIDENCIA (id_diagnostico, id_incidencia, id_tipoIncidencia) 
            VALUES (@diag, @id_incidencia, @tipoIncidencia);
        `);

        res.status(200).send('Datos guardados correctamente');
    } catch (error) {
        console.error('Error al guardar los softwares y cambiar el estado de incidencia', error.message);
        res.status(500).send('Error al guardar los softwares y cambiar el estado de incidencia');
    }finally{
        await sql.close();
    }
});

//Trae el tipo de incidencia para la incidencia
app.post('/tIncidencia', async (req, res) => {
    try {
        await sql.connect(config);
        const { id_incidencia } = req.body;

        const request = new sql.Request();
        request.input('id_incidencia', sql.Int, id_incidencia);
        
        const result = await request.query(`
            SELECT id_tipoIncidencia 
            FROM INCIDENCIA 
            WHERE id_incidencia = @id_incidencia
        `);    

        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error al obtener el tipo de incidencia', error.message);
        res.status(500).send('Error al obtener el tipo de incidencia');
    }
});

//Trae las piezas
app.get('/SelectPieza', async (req, res) => {
    try {
        await sql.connect(config);
        const request = new sql.Request();
        const result = await request.query(`
            SELECT * FROM PIEZA
            WHERE stock > 0
        `);    
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error al obtener las piezas', error.message);
        res.status(500).send('Error al obtener las piezas');
    }
});

// Hace las cosas del RFC
app.post('/GuardarRFC', async (req, res) => {
    try {
        await sql.connect(config);
        const { id_incidencia, pieza, diag, tipoIncidencia, id_equipo } = req.body;

        console.log('RFC - Datos recibidos:', {
            id_incidencia, pieza, diag, tipoIncidencia, id_equipo
        });

        const piezaInt = parseInt(pieza, 10);
        const diagInt = parseInt(diag, 10);

        console.log('RFC modificado- Datos recibidos:', {
            id_incidencia, piezaInt, diagInt, tipoIncidencia, id_equipo
        });

        const request = new sql.Request();
        request.input('id_incidencia', sql.Int, id_incidencia);
        request.input('id_pieza', sql.Int, piezaInt);
        request.input('id_diagnostico', sql.Int, diagInt);
        request.input('id_tipoIncidencia', sql.Int, tipoIncidencia);
        request.input('id_equipo', sql.Int, id_equipo);

        const result = await request.execute('AllRFC');  

        const updateRequest = new sql.Request();
        updateRequest.input('id_incidencia', sql.Int, id_incidencia);
        await updateRequest.query(`
            UPDATE Incidencia
            SET btnDiag = 1
            WHERE id_incidencia = @id_incidencia;
        `);
        
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error al ejecutar el procedimiento AllRFC', error.message);
        res.status(500).send('Error al ejecutar el procedimiento');
    }
});

//Trae los servicios
app.get('/SelectServicios', async (req, res) => {
    try {
        await sql.connect(config);
        const request = new sql.Request();
        const result = await request.query(`
            select * from SERVICIOS
        `);    
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error al obtener los servicios', error.message);
        res.status(500).send('Error al obtener los servicios');
    }
});

// Aceptar incidencia
app.put('/AceptarIncidencia', async (req, res) => {
    const { id_incidencia } = req.body;

    console.log('Datos recibidos:', {
        id_incidencia
    });
    try {
        await sql.connect(config);
        const request = new sql.Request();
        request.input('id_incidencia', sql.Int, id_incidencia);
        const result = await request.query(`
            UPDATE RFC
            SET autorizado = 1
            WHERE incidencia = @id_incidencia;
        `)

        if (result.rowsAffected[0] > 0) {
            res.json({ success: true, message: 'Incidencia aceptada' });
        } else {
            res.json({ success: false, message: 'No se pudo aceptar incidencia' });
        }
    } catch (error) {
        console.error('Error al aceptar incidencia:', error.message);
        res.status(500).json({ success: false, message: 'Error al aceptar incidencia' });
    } finally {
        await sql.close();
    }
});

// Registrar servicio
app.put('/RegistrarServicio', async (req, res) => {
    const { id_incidencia, pieza, servicio, hora_inicial } = req.body;

    console.log('Datos recibidos registrar servicio:', {
        id_incidencia, pieza, servicio, hora_inicial
    });

    try {
        await sql.connect(config);

        const piezaInt = parseInt(pieza, 10);
        const request = new sql.Request();

        // Definir parámetros para RFC y PIEZA
        request.input('id_incidencia', sql.Int, id_incidencia);
        request.input('servicio', sql.Int, servicio);
        request.input('hora_inicial', sql.VarChar, hora_inicial);
        request.input('pieza', sql.Int, piezaInt);

        // Actualizar la tabla RFC con el servicio y la hora
        await request.query(`
            UPDATE RFC
            SET id_servicio = @servicio, hora_inicial = CONVERT(TIME, @hora_inicial)
            WHERE incidencia = @id_incidencia;
        `);

        // Actualizar el stock de la tabla PIEZA
        await request.query(`
            UPDATE PIEZA
            SET stock = stock - 1
            WHERE id_pieza = @pieza;
        `);

        // Actualizar el campo servicio en la tabla INCIDENCIA
        await request.query(`
            UPDATE INCIDENCIA
            SET servicio = 1
            WHERE id_incidencia = @id_incidencia;
        `);

        res.json({ success: true, message: 'Datos actualizados correctamente.' });

    } catch (error) {
        console.error('Error al registrar servicio:', error.message);
        res.status(500).json({ success: false, message: 'Error al registrar servicio' });
    } finally {
        await sql.close();
    }
});

//Trae la pieza enfadoza
app.post('/pieza', async (req, res) => {
    try {
        await sql.connect(config);
        const { id_incidencia } = req.body;

        const request = new sql.Request();
        request.input('id_incidencia', sql.Int, id_incidencia);
        
        const result = await request.query(`
            Select id_pieza from HISTORIAL_PIEZA 
            where id_incidencia = @id_incidencia
        `);    

        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error al obtener la pza', error.message);
        res.status(500).send('Error al obtener la pza');
    }
});

//Trae las Horas
app.post('/Horas', async (req, res) => {
    try {
        await sql.connect(config);
        const { id_incidencia } = req.body;

        const request = new sql.Request();
        request.input('id_incidencia', sql.Int, id_incidencia);
        
        const result = await request.query(`
            SELECT 
            hora_inicial, 
            hora_final, 
            DATEDIFF(MINUTE, hora_inicial, hora_final) AS duracion_minutos
            FROM RFC
            where incidencia = @id_incidencia
        `);    
        res.status(200).json(result.recordset[0]);
    } catch (error) {
        console.error('Error al obtener las horas', error.message);
        res.status(500).send('Error al obtener las horas');
    }
});

app.put('/CalificarIncidencia', async (req, res) => {
    const { id_incidencia, selectedRating} = req.body;

    console.log('Datos recibidos calificar incidencia:', {
        id_incidencia, selectedRating
    });

    try {
        await sql.connect(config);
        const request = new sql.Request();

        // Definir parámetros para RFC y PIEZA
        request.input('id_incidencia', sql.Int, id_incidencia);
        request.input('calificacion', sql.Int, selectedRating);

        // Actualizar la tabla incidencia con la calificacion
        await request.query(`
            UPDATE INCIDENCIA
            SET calificacion = @calificacion
            WHERE id_incidencia = @id_incidencia
        `);

        // Obtener el id_tecnico de la incidencia actualizada
        const result = await request.query(`
            SELECT id_tecnicoAsignado
            FROM INCIDENCIA
            WHERE id_incidencia = @id_incidencia
        `);

        if (result.recordset.length > 0) {
            const id_tecnico = result.recordset[0].id_tecnicoAsignado;

            // Calcular el promedio de las calificaciones para el técnico
            const avgResult = await request.query(`
                SELECT AVG(calificacion) AS promedio
                FROM INCIDENCIA
                WHERE id_tecnicoAsignado = ${id_tecnico}
            `);

            const promedio = avgResult.recordset[0].promedio;

            // Actualizar el promedio en la tabla tecnico
            await request.query(`
                UPDATE TECNICO
                SET promedio_calificaciones = ${promedio}
                WHERE id_usuario = ${id_tecnico}
            `);

            res.json({ success: true, message: 'Incidencia calificada y promedio actualizado' });
        } else {
            res.status(400).json({ success: false, message: 'Técnico no encontrado para la incidencia' });
        }

    } catch (error) {
        console.error('Error al calificar incidencia:', error.message);
        res.status(500).json({ success: false, message: 'Error al calificar incidencia' });
    } finally {
        await sql.close();
    }
});

//Trae al tecnico de la incidencia
app.post('/TecnicoIncidencia', async (req, res) => {
    try {
        await sql.connect(config);
        const { id_incidencia } = req.body;
        console.log('Datos recibidos tecnico incidencia:', {
            id_incidencia
        });

        const request = new sql.Request();
        request.input('id_incidencia', sql.Int, id_incidencia);
        
        const result = await request.query(`
            select i.id_tecnicoAsignado as tecnico, CONCAT(u.nombre, ' ', u.apellido) as nombre from INCIDENCIA i
            join TECNICO t on t.id_usuario = i.id_tecnicoAsignado
            join USUARIO u on u.id_usuario = t.id_usuario
            where id_incidencia = @id_incidencia
        `);    
        tecnico = result.recordset[0];
        console.log('El tecnico es:', {
            tecnico
        });
        res.status(200).json(result.recordset[0]);
    } catch (error) {
        console.error('Error al obtener al tecnico', error.message);
        res.status(500).send('Error al obtener al tecnico');
    }
});

//Trae la info de pieza
app.post('/TraerInfoPieza', async (req, res) => {
    try {
        await sql.connect(config);
        const { id_incidencia } = req.body;

        const request = new sql.Request();
        request.input('id_incidencia', sql.Int, id_incidencia);
        
        const result = await request.query(`
            select p.nombre from incidencia i
            join RFC r on r.incidencia = i.id_incidencia
            join PIEZA p on p.id_pieza = r.pieza
            where id_incidencia = @id_incidencia
        `);    
        res.status(200).json(result.recordset[0]);
    } catch (error) {
        console.error('Error al obtener la info de pza', error.message);
        res.status(500).send('Error al obtener la info de pza');
    }
});

//Trae la duracion del servicio
app.post('/DuracionServicio', async (req, res) => {
    try {
        await sql.connect(config);
        const { id_incidencia } = req.body;

        const request = new sql.Request();
        request.input('id_incidencia', sql.Int, id_incidencia);
        
        const result = await request.query(`
            select s.duracion from incidencia i
            join RFC r on r.incidencia = i.id_incidencia
            join servicios s on s.id_servicio = r.id_servicio
            where id_incidencia = @id_incidencia
        `);    
        res.status(200).json(result.recordset[0]);
    } catch (error) {
        console.error('Error al obtener la duracion del servicio', error.message);
        res.status(500).send('Error al obtener la duracion del servicio');
    }
});

// Agregar problema a incidencia, reasignar técnico y eliminar registros relacionados
app.put('/AgregarProblema', async (req, res) => {
    const { id_incidencia } = req.body;

    console.log('Datos recibidos problema incidencia:', { id_incidencia });

    try {
        await sql.connect(config);
        const request = new sql.Request();
        request.input('id_incidencia', sql.Int, id_incidencia);

        // Buscar un nuevo técnico con la misma especialización y jefe = 1
        const resultTecnico = await request.query(`
            SELECT TOP 1
                t2.id_usuario AS nuevo_tecnico
            FROM INCIDENCIA i
            JOIN TECNICO t1 ON i.id_tecnicoAsignado = t1.id_usuario
            JOIN TECNICO t2 ON t1.id_especializacion = t2.id_especializacion
            JOIN USUARIO u2 ON t2.id_usuario = u2.id_usuario
            WHERE i.id_incidencia = @id_incidencia
              AND t1.id_usuario != t2.id_usuario
              AND t2.jefe = 1;
        `);

        // Verificar si se encontró un nuevo técnico
        if (resultTecnico.recordset.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No se encontró un técnico elegible para reasignar la incidencia'
            });
        }

        const nuevoTecnico = resultTecnico.recordset[0].nuevo_tecnico;

        console.log('NUEVO TECNICO:', { nuevoTecnico });

        // Eliminar registros en RFC y DIAGNOSTICO_INCIDENCIA antes de hacer el update
        await request.query(`
            DELETE FROM RFC
            WHERE incidencia = @id_incidencia
        `);

        await request.query(`
            DELETE FROM DIAGNOSTICO_INCIDENCIA
            WHERE id_incidencia = @id_incidencia
        `);

        request.input('nuevo_tecnico', sql.Int, nuevoTecnico);

        // Actualizar la tabla INCIDENCIA con el nuevo técnico y marcar problema
        const resultUpdate = await request.query(`
            UPDATE INCIDENCIA
            SET problema = 1, id_tecnicoAsignado = @nuevo_tecnico, diagnostico = NULL, servicio = 0, calificacion = NULL, 
            detalleHora = 0, btnDiag = 0
            WHERE id_incidencia = @id_incidencia
        `);

        // Verificar si se actualizó correctamente
        if (resultUpdate.rowsAffected[0] === 0) {
            return res.status(404).json({
                success: false,
                message: 'No se encontró la incidencia con el ID proporcionado'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Problema agregado, técnico reasignado y registros eliminados exitosamente',
            nuevo_tecnico: nuevoTecnico
        });

    } catch (error) {
        console.error('Error al problema incidencia:', error.message);
        res.status(500).json({
            success: false,
            message: 'Error al actualizar el problema de la incidencia'
        });
    } finally {
        await sql.close();
    }
});

//Trae las causas
app.get('/SelectCausa', async (req, res) => {
    try {
        await sql.connect(config);
        const request = new sql.Request();
        const result = await request.query(`
            select * from CAUSA_RAIZ
        `);    
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error al obtener las causas', error.message);
        res.status(500).send('Error al obtener las causas');
    }
});

//Dar de alta el error conocido
app.post('/AltaError', async (req, res) => {
    try {
        await sql.connect(config);
        const { id_incidencia, causa, errorEncontrado } = req.body;

        console.log('Datos recibidos alta error:', { id_incidencia, causa, errorEncontrado });

        const request = new sql.Request();
        request.input('id_causa', sql.Int, causa);
        request.input('errorEncontrado', sql.VarChar, errorEncontrado);

        // Insertar en la tabla errores y obtener el ID generado
        const resultInsert = await request.query(`
            INSERT INTO errores (descripcion, causa_raiz) 
            OUTPUT INSERTED.id_error
            VALUES (@errorEncontrado, @id_causa)
        `);

        // Obtener el id_error generado
        const id_error = resultInsert.recordset[0].id_error;

        // Crear un nuevo objeto de solicitud para la actualización
        const updateRequest = new sql.Request();
        updateRequest.input('id_error', sql.Int, id_error);
        updateRequest.input('id_incidencia', sql.Int, id_incidencia);

        // Actualizar la tabla INCIDENCIA con el id_error
        const resultUpdate = await updateRequest.query(`
            UPDATE INCIDENCIA
            SET id_error = @id_error
            WHERE id_incidencia = @id_incidencia
        `);

        // Verificar si la incidencia fue actualizada
        if (resultUpdate.rowsAffected[0] === 0) {
            return res.status(404).json({
                success: false,
                message: 'No se encontró la incidencia para actualizar'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Error registrado y vinculado exitosamente',
            id_error: id_error
        });

    } catch (error) {
        console.error('Error al dar de alta el error:', error.message);
        res.status(500).send('Error al dar de alta el error');
    } finally {
        await sql.close();
    }
});

//Trae los errores conocidos
app.get('/selectErroresConocidos', async (req, res) => {
    try {
        await sql.connect(config);
        const request = new sql.Request();
        const result = await request.query(`
            select * from errores
        `);    
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error al obtener los errores conocidos', error.message);
        res.status(500).send('Error al obtener los errores conocidos');
    }
});

// Asigna tecnico a incidencia con error
app.put('/AsignarTecnicoError', async (req, res) => {
    const { id_incidencia, id_usuario, id_prioridad, id_error } = req.body;

    console.log('Datos recibidos:', {
        id_incidencia, id_usuario, id_prioridad, id_error
    });
    try {
        await sql.connect(config);
        const transaction = new sql.Transaction();
        await transaction.begin();

        const request = new sql.Request(transaction);
        request.input('id_incidencia', sql.Int, id_incidencia);
        request.input('id_usuario', sql.Int, id_usuario);
        request.input('id_prioridad', sql.Int, id_prioridad);
        request.input('id_error', sql.Int, id_error);
        const result = await request.query(`
            UPDATE INCIDENCIA
            SET 
                id_prioridad = @id_prioridad,
                id_tecnicoAsignado = @id_usuario, 
                id_estado = 1,
                errorConocido = @id_error,
                eC = 1,
                btnDiag = 1
            WHERE id_incidencia = @id_incidencia;
        `);

        if (result.rowsAffected[0] > 0) {
            const updateTechnicianResult = await request.query(`
                UPDATE TECNICO
                SET num_incidencias = num_incidencias + 1
                WHERE id_usuario = @id_usuario;
            `);

            if (updateTechnicianResult.rowsAffected[0] > 0) {
                await transaction.commit();
                res.json({ success: true, message: 'Técnico asignado y número de incidencias actualizado' });
            } else {
                await transaction.rollback();
                res.json({ success: false, message: 'No se pudo actualizar el número de incidencias del técnico' });
            }
        } else {
            await transaction.rollback();
            res.json({ success: false, message: 'No se pudo asignar técnico' });
        }
    } catch (error) {
        console.error('Error al asignar técnico:', error.message);
        res.status(500).json({ success: false, message: 'Error al asignar técnico' });
    } finally {
        await sql.close();
    }
});

//Traer el error conocido
app.get('/errorIncidencia', async (req, res) => {
    try {
        await sql.connect(config);
        const { id_incidencia } = req.query;

        console.log('Datos EI:', {
            id_incidencia
        });

        const request = new sql.Request();
        request.input('id_incidencia', sql.Int, id_incidencia);
        
        const result = await request.query(`
            select errorConocido from INCIDENCIA where id_incidencia = @id_incidencia
        `);    
        res.status(200).json(result.recordset[0]);
    } catch (error) {
        console.error('Error al obtener el error de incidencia', error.message);
        res.status(500).send('Error al obtener el error de incidencia');
    }
});

//Traer si hay error conocido
app.get('/errorConocido', async (req, res) => {
    try {
        await sql.connect(config);
        const { id_incidencia } = req.query;

        console.log('Datos EC:', {
            id_incidencia
        });

        const request = new sql.Request();
        request.input('id_incidencia', sql.Int, id_incidencia);
        
        const result = await request.query(`
            select eC from INCIDENCIA where id_incidencia = @id_incidencia
        `);    
        res.status(200).json(result.recordset[0]);
    } catch (error) {
        console.error('Error al obtener el error conocido de incidencia', error.message);
        res.status(500).send('Error al obtener el error conocido de incidencia');
    }
});

//Trae la solucion del problema
app.post('/Solucion', async (req, res) => {
    try {
        await sql.connect(config);
        const { error_incidencia } = req.body;

        const request = new sql.Request();
        request.input('error_incidencia', sql.Int, error_incidencia);
        
        const result = await request.query(`
            select i.id_incidencia, i.diagnostico, d.nombre as diagnom, r.pieza, p.nombre as pzanom, s.id_servicio, s.nombre as sernom, s.duracion, 
            e.id_error, e.descripcion, c.id_causa_raiz, c.nombre as caunom, c.descripcion as caudes from INCIDENCIA i 
            join DIAGNOSTICO d on d.id_diagnostico = i.diagnostico
            join rfc r on r.incidencia = i.id_incidencia
            join PIEZA p on p.id_pieza = r.pieza
            join SERVICIOS s on s.id_servicio = r.id_servicio
            join errores e on e.id_error = i.id_error
            join CAUSA_RAIZ c on c.id_causa_raiz = e.causa_raiz
            where i.id_error = @error_incidencia
        `);    
        res.status(200).json(result.recordset[0]);
    } catch (error) {
        console.error('Error al obtener la solucion del problema', error.message);
        res.status(500).send('Error al obtener la solucion del problema');
    }
});

//Ver si ya se hizo el diagnostico
app.get('/btnDiag', async (req, res) => {
    try {
        await sql.connect(config);
        const { id_incidencia } = req.query;

        console.log('Datos btnDiag:', {
            id_incidencia
        });

        const request = new sql.Request();
        request.input('id_incidencia', sql.Int, id_incidencia);
        
        const result = await request.query(`
            select btnDiag from INCIDENCIA where id_incidencia = @id_incidencia
        `);    
            const resp = result.recordset[0]
        console.log('Es btnDiag:', {
            resp
        });
        res.status(200).json(result.recordset[0]);
    } catch (error) {
        console.error('Error al obtener btnDiag', error.message);
        res.status(500).send('Error al obtener btnDiag');
    }
});

//Ver si ya se solicito la autorizacion
app.get('/btnAutorizacion', async (req, res) => {
    try {
        await sql.connect(config);
        const { id_incidencia } = req.query;

        console.log('Datos btnAutorizacion:', {
            id_incidencia
        });

        const request = new sql.Request();
        request.input('id_incidencia', sql.Int, id_incidencia);
        
        const result = await request.query(`
            select btnAutorizacion from INCIDENCIA where id_incidencia = @id_incidencia
        `);    

        const r = result.recordset[0]
        console.log('es btnAutorizacion:', {
            r
        });

        res.status(200).json(result.recordset[0]);
    } catch (error) {
        console.error('Error al obtener la solicitud de autorizacion', error.message);
        res.status(500).send('Error la solicitud de autorizacion');
    }
});

//Cambiar el btn autorizacion
app.post('/cambiarBtnAutorizacion', async (req, res) => {
    try {
        await sql.connect(config);
        const { id_incidencia } = req.body;

        console.log('Datos cambiar btnAutorizacion:', {
            id_incidencia
        });

        const request = new sql.Request();
        request.input('id_incidencia', sql.Int, id_incidencia);
        
        const result = await request.query(`
            update incidencia
            set btnAutorizacion = 1
            where id_incidencia = @id_incidencia
        `);    

        // Verifica si alguna fila fue afectada
        if (result.rowsAffected[0] > 0) {
            res.status(200).json({
                success: true,
                message: 'btnAutorizacion actualizado correctamente',
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'No se encontró una incidencia con el ID proporcionado',
            });
        }
    } catch (error) {
        console.error('Error al cambiar el btnAutorizacion:', error.message);
        res.status(500).send('Error al cambiar el btnAutorizacion');
    }
});

//det
app.post('/det', async (req, res) => {
    try {
        await sql.connect(config);
        const { id_incidencia } = req.body;

        const request = new sql.Request();
        request.input('id_incidencia', sql.Int, id_incidencia);
        
        const result = await request.query(`
            select det from INCIDENCIA where id_incidencia = @id_incidencia
        `);    
        res.status(200).json(result.recordset[0]);
    } catch (error) {
        console.error('Error al obtener dt', error.message);
        res.status(500).send('Error al obtener dt');
    }
});