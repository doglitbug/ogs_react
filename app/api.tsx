const apiUrl = process.env.API_URL;
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

async function doGetCall(api: string) {
    const response = await fetch(apiUrl + api, {
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
    return doGetCall("garage/" + id);
}

/**
 * Get data for all Garages
 * @returns
 */
export const getGarages = async () => {
    return doGetCall("garage/");
}
//#endregion

//#region Items
/**
 * Get data for a item
 * @returns
 */
export const getItem = async (id: string) => {
    return doGetCall("item/" + id);
}

/**
 * Get data for all Items
 * @returns
 */
export const getItems = async () => {
    return doGetCall("item/");
}
//#endregion

//#region Search

/**
 * Get data for all Items
 * @returns
 */
export const getSearch = async (search: string) => {
    return doGetCall("search?search=" + search);
}
//#endregion