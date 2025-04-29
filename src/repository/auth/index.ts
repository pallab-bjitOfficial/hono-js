import Auth from "../../models/auth";

class AuthRepositoryClass {
    async createAuth(data: any) {
        return await Auth.create(data);
    }
    async findAuthByEmail(email: string) {
        return await Auth.findOne({ email });
    }
    async findAuthById(id: string) {
        return await Auth.findById(id);
    }
    async findAuthByUserName(userName: string) {
        return await Auth.findOne({ userName });
    }
}
const AuthRepository = new AuthRepositoryClass();
export default AuthRepository;
