import { PRIMARY_BACKEND_URL } from "config/config"

export const get_available_triggers = async () =>{
    const res = await fetch(`${PRIMARY_BACKEND_URL}/api/v1/trigger/available_triggers`,{
        method: "GET",
        headers: {
            authorization : `Bearer ${localStorage.getItem('token')}`
        }
    })
    const data = await res.json();

    return data?.available_triggers;
}

export const get_available_actions = async () =>{
    const res = await fetch(`${PRIMARY_BACKEND_URL}/api/v1/action/available_actions`,{
        method: "GET",
        headers: {
            authorization : `Bearer ${localStorage.getItem('token')}`
        }
    })
    const data = await res.json();

    return data?.available_actions
}

export const get_test_hookId = async () =>{
    const res = await fetch(`${PRIMARY_BACKEND_URL}/hook/hookid}`,{
        method: "POST",
        headers: {
            authorization : `Bearer ${localStorage.getItem('token')}`
        }
    })

    const data = await res.json();

    return {
        hookId: data?.hookId,
        userId: data?.userId
    }
}

export const get_test_webhook_url = async (hookUUID:string) =>{
    const res = await fetch(`${PRIMARY_BACKEND_URL}/hook/getTestHook/${hookUUID}`,{
        method: "GET",
        headers: {
            authorization : `Bearer ${localStorage.getItem('token')}`
        }
    })

    const data = await res.json();
    return data?.message;
}