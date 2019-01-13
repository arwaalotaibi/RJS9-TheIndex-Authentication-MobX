import { decorate, observable } from "mobx";
import axios from "axios";
import jwt_decode from 'jwt-decode';

const instance = axios.create({
  baseURL: "https://the-index-api.herokuapp.com/"
});

class AuthStore{
  constructor() {
    this.user = null;
  }
  setUser(token){
      if(token){
        localStorage.setItem("token",token);
        axios.defaults.headers.common.Authorization = `jwt ${token}` ;
          this.user = jwt_decode(token);
      }else{
          localStorage.removeItem("token");
          delete axios.defaults.headers.common.Authorization;
          this.user = null ;

      }
  }
  checkForToken(){
      const token = localStorage.getItem("token");
      if(token){
          const user = jwt_decode(token);
          if(user.exp > Date.now() / 1000){
              this.setUser(token);
          }else{
              this.setUser();
          }
      }
  }
 authentication(userData,type){
    instance
    .post(`/${type}/`,userData)
    .then(res => res.data)
    .then(user => this.setUser(user.token))
    .catch(err => console.error(err.response.data));
 }
  signup(userData){
     this.authentication(userData,"signup")
   }
  login(userData){
    this.authentication(userData,"login")
  }
  logout() {
      this.setUser();
  }
  

}  

decorate(AuthStore, {
    user: observable
});

const authStore = new AuthStore();
authStore.checkForToken();
export default authStore;


