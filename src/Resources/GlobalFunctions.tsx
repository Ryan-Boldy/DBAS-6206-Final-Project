export async function Retrieve(resource: string) {
    const requestOptions = {
        method: "GET",
    }
    const res = await fetch(`${import.meta.env.VITE_URL}${resource}`, requestOptions);
    return await res.json();
}