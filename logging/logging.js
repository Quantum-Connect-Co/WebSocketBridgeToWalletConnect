var chalk = require("chalk");

class LOG {
    static INFO(message){
        console.info(`[`+ chalk.green(`INFO`) + `]: `
         + `${message}`);
    }
    
    static SERVER(message){
        console.info(`[`+ chalk.green(`INFO`) + `]: `
         + chalk.blue(`SERVER << `) 
         + `${chalk.blue(`[`)}${message}${chalk.blue(`]`)}`);    
    }

    static UCLIENT(message, uuid){
        console.info(`[`+ chalk.green(`INFO`) + `]: `
         + chalk.cyan(`UNREAL CLIENT[${chalk.green(uuid)}] << `) 
         + `${chalk.cyan(`[`)}${message}${chalk.cyan(`]`)}`); 
    } 
    
    static WCLIENT(message, uuid){
        console.info(`[`+ chalk.green(`INFO`) + `]: `
         + chalk.magenta(`WALLET CONNECT CLIENT[${chalk.green(uuid)}] << `) 
         + `${chalk.magenta(`[`)}${message}${chalk.magenta(`]`)}`); 
    }

    /************************************************************************/
    static FAIL(message){
        console.info(`[`+ chalk.red(`FAIL`) + `]: `
         + `${message}`);
    }
    
    static SERVER_ERROR(message){
        console.info(`[`+ chalk.red(`FAIL`) + `]: `
         + chalk.blue(`SERVER << `) 
         + `${chalk.blue(`[`)}${message}${chalk.blue(`]`)}`);    
    }

    static UCLIENT_ERROR(message, uuid){
        console.info(`[`+ chalk.red(`FAIL`) + `]: `
         + chalk.cyan(`UNREAL CLIENT[${chalk.green(uuid)}] << `) 
         + `${chalk.cyan(`[`)}${message}${chalk.cyan(`]`)}`); 
    }

    static WCLIENT_ERROR(message, uuid){
        console.info(`[`+ chalk.red(`FAIL`) + `]: `
         + chalk.magenta(`WALLET CONNECT CLIENT[${chalk.green(uuid)}] << `) 
         + `${chalk.magenta(`[`)}${message}${chalk.magenta(`]`)}`); 
    }
    /***************************************************************/

    static COMMAND(message){
        console.info(`[`+ chalk.green(`INFO`) + `]: `
         + chalk.white(`COMMAND << `) 
         + `${chalk.white(`[`)}${message}${chalk.white(`]`)}`);  
    }

    static COMMAND_ERROR(message){
        console.info(`[`+ chalk.red(`FAIL`) + `]: `
         + chalk.white(`COMMAND << `) 
         + `${chalk.white(`[`)}${message}${chalk.white(`]`)}`);    
    }
};



var script = {
     
}
module.exports = {LOG};
