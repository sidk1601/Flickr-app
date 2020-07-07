import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { ImageListComponent } from './image-list/image-list.component';
import { ImageDetailComponent } from './image-detail/image-detail.component';

const routes: Route[] = [
    { path: '', redirectTo: 'images', pathMatch: 'full' },
    { path: 'images', component: ImageListComponent },
    { path: 'images/:id', component: ImageDetailComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}