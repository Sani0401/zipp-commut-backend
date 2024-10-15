import bcrypt from 'bcrypt'


const encryptPassword = async (password) => {
    const saltRounds = 10; 
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword; 
    } catch (error) {
        console.error("Error encrypting password:", error);
        throw error; 
    }
};


export default encryptPassword;

