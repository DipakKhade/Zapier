import { PRIMARY_BACKEND_URL } from "config/config"

export const get_available_triggers = async () =>{
    const res = await fetch(`${PRIMARY_BACKEND_URL}/api/v1/trigger/available_trigger`,{
        method: "GET",
        headers: {
            authorization : `Bearer ${localStorage.getItem('token')}`
        }
    })
    const data = await res.json();

    return data;
}

export const get_available_actions = async () =>{
    const res = await fetch(`${PRIMARY_BACKEND_URL}/api/v1/action/available_action`,{
        method: "GET",
        headers: {
            authorization : `Bearer ${localStorage.getItem('token')}`
        }
    })
    const data = await res.json();

    return data;
}