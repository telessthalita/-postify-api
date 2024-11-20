import { MongoClient } from 'mongodb';

export default async function connectToDatabase(connectionString) {
  let mongoClient;

  try {
    // Criando uma nova instância do MongoClient com a string de conexão
    mongoClient = new MongoClient(connectionString, {
      useUnifiedTopology: true, // Opção recomendada para compatibilidade
    });

    console.log('Connecting to the database cluster...');
    
    // Conectar ao MongoDB usando o MongoClient
    await mongoClient.connect();
    console.log('Successfully connected to MongoDB Atlas!');
    
    // Retorna a instância do MongoClient para uso posterior
    return mongoClient;
  } catch (error) {
    console.error('Failed to connect to the database!', error);
    process.exit(1); // Finaliza o processo em caso de erro
  }
}
