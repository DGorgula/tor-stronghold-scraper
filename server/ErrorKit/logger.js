const { Error } = require('./errordb');
const { ServerError } = require('./ServerError');


function logger(incomingError) {
    if (incomingError && incomingError.stack && incomingError.name) {
        console.log("an Error!", incomingError instanceof Error, incomingError,);
        // Error.create(incomingError)
        //     .catch((err) => console.log())
        return
    }
    try {
        throw new ServerError(incomingError)
    }
    catch (err) {
        logger(err);
    }
    console.log("not an Error!", incomingError instanceof Error, incomingError);
    // console.log(incomingError);

}


try {
    throw new ServerError("first")
}
catch (err) {
    console.log("first check", err.__proto__ instanceof Error);
    console.log("first check", typeof err);
    logger(err)
}

try {
    throw new EvalError("second")
}
catch (err) {
    console.log("second check", err.__proto__ instanceof Error);
    console.log("second check", typeof err);
    logger(err)
}
logger("third")