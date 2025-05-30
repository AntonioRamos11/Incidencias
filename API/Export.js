const sql = require('mssql');
const fs = require('fs');

// Configuración de conexión a SQL Server
const config = {
    user: 'sa',
    password: 'Ramosfe1101@',
    server: 'localhost',
    database: 'proyectoITIL',
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

async function exportDatabase() {
    let pool;
    try {
        // Conectar a la base de datos
        pool = await sql.connect(config);

        // Obtener la lista de tablas
        const tablesResult = await sql.query`SELECT table_name FROM information_schema.tables WHERE table_type = 'BASE TABLE'`;
        const tables = tablesResult.recordset.map(row => row.table_name);

        // Exportar esquema y datos para cada tabla
        for (const table of tables) {
            // Exportar esquema
            const schemaResult = await sql.query`SELECT * FROM sys.tables WHERE name = ${table}`;
            fs.writeFileSync(`${table}_schema.sql`, JSON.stringify(schemaResult.recordset, null, 2));

            // Exportar datos
            const dataResult = await sql.query`SELECT * FROM ${table}`;
            fs.writeFileSync(`${table}_data.json`, JSON.stringify(dataResult.recordset, null, 2));
        }

        console.log('Base de datos exportada correctamente');
    } catch (err) {
        console.error('Error al exportar la base de datos:', err);
    } finally {
        // Cerrar la conexión
        if (pool) {
            pool.close();
        }
    }
}

// Llamar a la función para exportar la base de datos
exportDatabase();