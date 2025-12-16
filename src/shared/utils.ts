// Shared utility functions

export interface PasswordValidities {
    pswdLen: boolean;
    nameOrEmail: boolean;
    ul: boolean; // uppercase letter
    ll: boolean; // lowercase letter
    nums: boolean; // numbers
    specChars: boolean; // special characters
}

/**
 * Validates password requirements
 * @param name - User's name
 * @param email - User's email
 * @param pswd - Password to validate
 * @returns Object with boolean flags for each validation requirement
 */
export function getPswdValidities(
    name: string,
    email: string | undefined,
    pswd: string,
): PasswordValidities {
    const pswdLen = pswd.length >= 8 && pswd.length <= 100;
    const emailPrefix = email ? email.toLowerCase().split("@")[0] : "";
    const nameLower = name.toLowerCase();
    const pswdLower = pswd.toLowerCase();
    const nameOrEmail = !pswdLower.includes(nameLower) &&
                        (!emailPrefix || !pswdLower.includes(emailPrefix));
    const ul = /[A-Z]/.test(pswd); // uppercase letter
    const ll = /[a-z]/.test(pswd); // lowercase letter
    const nums = /[0-9]/.test(pswd); // numbers
    const specChars = /[!@#$%^&*(),.?":{}|<>]/.test(pswd); // special characters

    return {
        pswdLen,
        nameOrEmail,
        ul,
        ll,
        nums,
        specChars,
    };
}

