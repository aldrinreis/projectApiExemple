export async function jsonBodyHandler(request, response) {

    //Adicionando cada chunk
    const buffers = []

    //Coleta os chunks de dados da requisição    
    for await (const chunk of request){
        buffers.push(chunk)
    }

    try{
        //Concatenar os chunk e converter para string. Em seguida converte a string para json

        request.body = JSON.parse(Buffer.concat(buffers).toString())

    }catch(error){
        request.body = null
    }

    //Define o Header de resposta como Json.

    response.setHeader("Content-Type", "application/json")
    
}