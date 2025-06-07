import config from "../../config"

const host = config.API_URL

//---------> AUTHENTICATION <--------------//

export const loginApi = `${host}/api/v1/auth/login`

export const registerApi = `${host}/api/v1/auth/register`

//--------> AVAILABILITY <---------------------//

export const getAvailabilityApi = `${host}/api/v1/availability`

export const saveAvailabilityApi = `${host}/api/v1/availability/save`

//--------> PUBLIC LINK <---------------------//

export const generatePublicLinkApi = `${host}/api/v1/booking/generate`

export const bookSlotByIdApi = `${host}/api/v1/booking/book`

export const getLinkDataByIdApi = `${host}/api/v1/booking`


