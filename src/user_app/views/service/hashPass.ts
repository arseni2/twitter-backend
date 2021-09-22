import bcrypt from "bcrypt";

export interface Error {
    name: string;
    message: string;
    stack?: string;
}
export const passToHash = (pass: string, setPassCB: (err: Error | undefined, hash: string)=>void) => {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(pass, salt, setPassCB)
    });
}

export const checkPassEquals = (pass2: string) => {

}