import { firebase, Auth, database } from './Setup';

export const SignUpUser = (email, passswod) => {
    return new Promise(function (resolve, reject) {
        Auth()
            .createUserWithEmailAndPassword(email, passswod)
            .then(() => {
                resolve('Sign Up Successfully');
            })
            .catch(error => {
                reject(error);
            });
    });
};

export const SignInUser = (email, passswod) => {
    return new Promise(function (resolve, reject) {
        Auth()
            .signInWithEmailAndPassword(email, passswod)
            .then(() => {
                resolve('Sign In Successfully');
            })
            .catch(error => {
                reject(error);
            });
    });
};

export const SignOutUser = () => {
    return new Promise(function (resolve, reject) {
        Auth()
            .signOut()
            .then(() => {
                resolve('Sign Out Successfully');
            })
            .catch(error => {
                reject(error);
            });
    });
};
