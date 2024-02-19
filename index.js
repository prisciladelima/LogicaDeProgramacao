import { clientes } from "./cliente.js";
import { enviarEmail } from './envia-email.js';

// 1. Criar uma função para verificar o dia da semana atual, que será levado em conta para o disparo dos emails.

function verificarDiaDaSemana(){

    const data = new Date();
    const diaDaSemana = data.getDay();

    const nomesDiasSemana = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];

    return nomesDiasSemana[diaDaSemana].toUpperCase();

}

// 2. Criar uma função para montar o corpo do e-mail a ser enviado.

function criarEmail(nome){

    let mensagem =  
    
    `Olá ${nome} 

           Prepare-se para acelerar!    

           Novos modelos:     

               * [HB2024-1]: Potência e tecnologia para você conquistar qualquer terreno.
               * [IX-35-24]: Design elegante e sofisticado para você chegar com estilo.
               * [Creta-24]: Aventura e liberdade para você explorar novos caminhos.    
            
           Ofertas imperdíveis:          

               * [HB2024-1: Preço especial  taxa de financiamento 0%.
               * [IX-35-24]: Bônus de entrada  garantia estendida.
               * [Creta-24]: Troca com troco na sua avaliação justa.
                     
           Agende seu test drive:
               
           Aguardamos o seu contato!
           
           ---------------------------------------------------------`;

    return mensagem;
}

// 3. Criar uma função para enviar o e-mail para cada um dos clientes da lista, levando em conta a sua decisão sobre receber comunicações de marketing.

function enviarEmailMarketing(cliente, notificationListHandler) {

    let subject = "Super ofertas na Car Store!!!";
    let body = criarEmail(cliente.nome);

    let result = enviarEmail(cliente.email, subject, body);
    notificationListHandler.push({cliente: cliente.nome, status: result.status, message: result.message});

}

// 4. Tratar o retorno de erro ou sucesso da função "enviarEmail", de maneira a exibir uma mensagem amigável ao usuário no console.

function validarEmail(notificationListHandler) {

    if (notificationListHandler.length<1)
        return;

    console.log(`
    
    Relatório de notificações:

    `);

    console.table(notificationListHandler);

}

function iniciar(){

    let diaCampanha = "Domingo";

    if(!verificarDiaDaSemana().includes(diaCampanha.toUpperCase()))
        return;

    const notificationList = clientes.filter(client => client.subscription === "true");
    const notificationListHandler = [];

    notificationList.forEach(cliente => enviarEmailMarketing(cliente, notificationListHandler));
    
    if (notificationListHandler.length > 0) 
        validarEmail(notificationListHandler);

}

iniciar();

