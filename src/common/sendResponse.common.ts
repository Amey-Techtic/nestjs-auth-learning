interface ResponseShape{
    success: boolean,
    statusCode: number,
    data?: any,
    message?: string,
    error?: string,
}

export const sendResponse=({success, statusCode, message, data}: ResponseShape)=>{
    return{
        success: success,
        statusCode: statusCode,
        message: message,
        data: data,
    }
}
export const sendErrorResponse=({success, statusCode, error, data=null}: ResponseShape)=>{
    return{
        success: success,
        statusCode: statusCode,
        error: error,
        data: data,
    }
}
