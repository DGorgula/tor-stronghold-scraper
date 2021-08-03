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