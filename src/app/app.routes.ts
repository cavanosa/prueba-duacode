import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { ChatComponent } from './chat/chat.component';

export const routes: Routes = [
    { path: '', component: ListComponent },
    { path: 'list', component: ListComponent },
    { path: 'detail/:id', component: DetailComponent },
    { path: 'create', component: CreateComponent },
    { path: 'update/:id', component: UpdateComponent },
    { path: 'chat', component: ChatComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
