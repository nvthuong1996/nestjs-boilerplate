const dotenv = require('dotenv');
import { SnakeNamingStrategy } from './src/snake-naming.strategy';

dotenv.config({
    path: `.${process.env.NODE_ENV}.env`,
});

// Replace \\n with \n to support multiline strings in AWS
for (const envName of Object.keys(process.env)) {
    process.env[envName] = process.env[envName].replace(/\\n/g, '\n');
}


const config = {
    type: 'postgres',
    host: 'localhost',
    port: process.env['BACKEND_DB_PORT'] ,
    username: process.env['BACKEND_DB_USERNAME'] ,
    password: process.env['BACKEND_DB_PASSWORD'],
    database: 'default' ,
    namingStrategy: new SnakeNamingStrategy(),
    entities: ['src/modules/**/entities/*.entity{.ts,.js}'],
    migrations: ['src/migrations/*{.ts,.js}'],
};

console.log('config',config);

module.exports = config
