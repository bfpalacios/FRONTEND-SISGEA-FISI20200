import { NgModule } from '@angular/core';
import { ObTreeComponent } from './components/ob-tree/ob-tree.component';
import { TreeNgxModule } from 'tree-ngx';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

@NgModule({
  declarations: [
    ObTreeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TreeNgxModule,
    PerfectScrollbarModule
  ],
  exports: [
    ObTreeComponent
  ]
})
export class ObTreeModule { }