

export const asyncWrapper = (request) => (req , res , next) =>{

    Promise.resolve( request(req , res , next) ).catch(next);
}