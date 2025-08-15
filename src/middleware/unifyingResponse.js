export const unifyResponse = (req, res, next) => {
    const originalJson = res.json;
    res.json = function (body) {
        if (body && res.statusCode >= 200 && res.statusCode < 300) {
                body.message = "success";
        }
        return originalJson.call(this, body);
    };
    next();
}