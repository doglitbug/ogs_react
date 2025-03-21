
const baseURL = 'http://doglitbug.com:82/api/v1/'
/**
 * Headers to apply to all API call after logging in 
 * @returns Headers with bearer token 
 */
const headers = () => {
    const myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")
    const token = localStorage.getItem('jwt-token')
    if (token) myHeaders.append("Authorization", `Bearer ${token}`)
    return myHeaders
}

async function doGetCall(api: string, body: string) {
    const response = await fetch(baseURL + api, {
        headers: headers(),
    })
    
    const statusCode = response.status;
    const data = await response.json();
    return {status: statusCode, data: data}
}

//#region Garages
/**
 * Get data for a Garage
 * @returns 
 */
export const getGarage = async (id: string) => {
    return doGetCall("garage/"+id, "");
}

/**
 * Get data for all Garages
 * @returns 
 */
export const getGarages = async () => {
    return doGetCall("garage/", "");
}

//#endregion