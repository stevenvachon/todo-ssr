import csrf from '../middleware/csrf';
import html from '../middleware/html';
import Router from 'express-promise-router';
import SignInFactory from './signin';
import SignOutFactory from './signout';
import SignUpFactory from './signup';

export default state => {

  const router = Router();

  router.get('*', /*csrf, */html);

  //router.use('/', WelcomeFactory(state));

  router.use('/signin',  SignInFactory(state));
  router.use('/signout', SignOutFactory(state));
  router.use('/signup',  SignUpFactory(state));
  //router.use('/todos',   TodosFactory(state));

  return router;

};
