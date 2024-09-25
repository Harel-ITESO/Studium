import bcrypt from 'bcrypt';

/** Utilities for hasing strings */

/**
 *  Hashes a password
 * @param password The password to hash
 * @returns  Hashed password
 */
export async function hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

/**
 *
 * @param incoming  Incoming unhashed password
 * @param hashedTarget Hashed password to compare
 * @returns true if passwords are equal, false otherwise
 */
export async function comparePasswords(incoming: string, hashedTarget: string) {
    return await bcrypt.compare(incoming, hashedTarget);
}
