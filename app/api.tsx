const apiUrl = import.meta.env.VITE_API_URL;
/**
 * Headers to apply to all API call after logging in
 * @returns Headers with bearer token
 */
const headers = () => {
    const myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")
    const token = localStorage.getItem('token')
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

async function doPostCall(api: string, body: any) {
    const response = await fetch(apiUrl + api, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify(body),
    })

    const statusCode = response.status;
    const data = await response.json();
    return {status: statusCode, data: data}
}

//#region Auth
export const doLoginUser = async (body: any) => {
    return doPostCall("login", body);
}
//#endregion

//#region user
export const getUser = async (id: string = "") => {
    return doGetCall("user/" + id);
}
//#endregion

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