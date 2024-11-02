import { routes } from "../routes.js";
import { extractQueryParam } from "../utils/extract-query-params.js";

export function routeHandler(request, response){
    const route = routes.find((route)=>{
        return route.method === request.method && route.path.test(request.url)
    })

    if (route){

        const routeParams = request.url.match(route.path)

        const {query, ...params} = routeParams.groups

        

        request.params = params

        request.query =  query ? extractQueryParam(query) : {}


        return route.controller(request, response)
    }else{
        return response.writeHead(404).end("Rota não encontrada")
    }
}