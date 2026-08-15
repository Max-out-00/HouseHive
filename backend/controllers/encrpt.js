import bycrpt from 'bcrypt'

const hashPassword = async (password)=>{
    const saltRound = 10;
    const hashedPassword  = await bycrpt.hash(password , saltRound);
    return hashedPassword ;
}

export default hashPassword;