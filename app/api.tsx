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
    return {status: statusCode, ...data}
}

async function doPostCall(api: string, body: any) {
    const response = await fetch(apiUrl + api, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify(body),
    })

    const statusCode = response.status;
    const data = await response.json();
    return {status: statusCode, ...data}
}

async function doPutCall(api: string, body: any) {
    const response = await fetch(apiUrl + api, {
        method: 'PUT',
        headers: headers(),
        body: JSON.stringify(body),
    })

    const statusCode = response.status;
    const data = await response.json();
    return {status: statusCode, ...data}
}

//#region Auth
export const doLoginUser = async (body: any) => {
    return doPostCall("login", body);
}
//#endregion

//#region user
/**
 * Get data for a user
 * @param id user id, will default to self if not specified
 */
export const getUser = async (id: string = "") => {
    return doGetCall("user/" + id);
}

export const updateUser = async (id: string = "", body: any) => {
    return doPutCall("user/" + id, body);
}
//#endregion

//#region garage
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

//#region item
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

//#region search
/**
 * Perform a search
 * @returns
 */
export const getSearch = async (search: string) => {
    return doGetCall("search?" + search);
}
//#endregion

//#region Misc

export const getLocations = async() => {
    return doGetCall("location");
}
//#endregion