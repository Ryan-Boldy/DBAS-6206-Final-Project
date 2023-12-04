export async function Retrieve(resource: string) {
    const requestOptions = {
        method: "GET",
    }
    return await fetch(`${import.meta.env.VITE_URL}${resource}`, requestOptions);
}