import { useEffect, useState } from "react"

type User = {
    ID: number,
    Name: string,
    Username: string,
    Friend: boolean,
}

export function useAllUsers(){

    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {

        async function fetchUsers() {

            try {

                setLoading(true)

                const response = await fetch(
                    "http://localhost:8080/api/users",
                    {method: "GET"}
                );

                const data: User[] = await response.json();

                if(!response.ok){
                    throw new Error("Ошибка")
                }

                setUsers(data)
            }

            catch(err){
                setError(err instanceof Error ? err.message : "Ошибка")
            }
            finally{
                setLoading(false)
            }

        }

        fetchUsers();
    }, []);


    return { users, loading, error}
}