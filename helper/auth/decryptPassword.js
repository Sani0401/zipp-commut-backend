import bcrypt from 'bcrypt'


const verifyPassword = async (plainPassword, hashedPassword) => {
    try {
        const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
        return isMatch; 
    } catch (error) {
        console.error("Error verifying password:", error);
        throw error; 
    }
};

export default verifyPassword;
