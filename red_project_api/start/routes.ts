/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.get('api/test', async ({ request }) => {
  console.log('Test endpoint hit from origin:', request.header('origin'))
  return {
    message: 'Successfully connected to AdonisJS backend!'
  }
})

Route.group(() => {
  Route.post('auth/register', 'AuthController.signUp')
  Route.post('auth/login', 'AuthController.signIn')
  
  // Protected routes
  Route.group(() => {
    Route.post('auth/logout', 'AuthController.logout')
    Route.post('auth/logout-all', 'AuthController.logoutAll')
  }).middleware('auth')
}).prefix('api')
