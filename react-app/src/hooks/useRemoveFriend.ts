import { useState } from "react";

type ResponseData = {
    success?: boolean,
    message?: string,
    error?: string
}

export function useRemoveFriend() {

    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    async function removeFriend(id:number){

        try{

            setLoading(true)

            const response = await fetch(
                `http://localhost:8080/api/users/removeFriend?id=${id}`,
                {method: "PATCH"}
            )

            const data:ResponseData = await response.json()

            if(!response.ok){
                throw new Error(data.error || "Ошибка")
            }

            return data
        }

        catch(err){
            setError(err instanceof Error ? err.message : "Ошибка")
        }
        finally{
            setLoading(false)
        }
        
    }

    return{removeFriend, loading, error}
}