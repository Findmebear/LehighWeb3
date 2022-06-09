import { http } from "../backend_service/http";

const api = "http:// ADD HEROKU LINK HERE ONCE CREATED";

export async function getProfile(){
    try{
        const { data } = await http.get(api + "/profile");
        return data;
    } catch (error){
        console. log(error.message);
    }
}