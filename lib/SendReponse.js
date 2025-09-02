
export const SendResponse = (res, status = 200, message = "Success", data) => {
    res.status(status).json({ message, data, success: true });
};
export const SendResponseV2 = (res, status = 200, success = true, message = "Success", data = null) => {
    res.status(status).json({ success, message, data });
};