import Auth from "../../models/auth";

class AuthRepo {
  async createAuth(data: any) {
    return await Auth.create(data);
  }
  async findAuthByEmail(email: string) {
    return await Auth.findOne({ email });
  }
  async findAuthByUserName(userName: string) {
    return await Auth.findOne({ userName });
  }
  async findAuthById(id: string) {
    return await Auth.findById(id);
  }
}
const AuthRepository = new AuthRepo();
export default AuthRepository;
