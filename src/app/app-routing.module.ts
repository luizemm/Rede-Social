import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MiniPerfilComponent } from './components/mini-perfil/mini-perfil.component';
import { PostComponent } from './components/post/post.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./pages/cadastro/cadastro.module').then( m => m.CadastroPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'new-post',
    loadChildren: () => import('./pages/new-post/new-post.module').then( m => m.NewPostPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'comments/:id',
    loadChildren: () => import('./pages/comments/comments.module').then( m => m.CommentsPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'perfil/:id',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'edita-perfil',
    loadChildren: () => import('./pages/edita-perfil/edita-perfil.module').then( m => m.EditaPerfilPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'following/:id',
    loadChildren: () => import('./pages/following/following.module').then( m => m.FollowingPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'followers/:id',
    loadChildren: () => import('./pages/followers/followers.module').then( m => m.FollowersPageModule),
    canActivate: [AuthGuardService]
  }




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
