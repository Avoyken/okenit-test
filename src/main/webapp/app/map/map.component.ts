import Component from 'vue-class-component';
import { Inject, Vue } from 'vue-property-decorator';
import LoginService from '@/account/login.service';

// @Component
export default {
  data() {
    return {
      // coordinates: [0, 0]
    };
  },
  // @Inject('loginService')
  // private loginService: () => LoginService;
  //
  // public openLogin(): void {
  //   this.loginService().openLogin((<any>this).$root);
  // }
  //
  // public get authenticated(): boolean {
  //   return this.$store.getters.authenticated;
  // }
  //
  // public get username(): string {
  //   return this.$store.getters.account ? this.$store.getters.account.login : '';
  // }
};
