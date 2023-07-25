import { NgModule } from '@angular/core';
import { SearchPipe } from './search.pipe';
import { HttpClientModule } from '@angular/common/http';
import { QuillModule } from 'ngx-quill';

@NgModule({
  imports: [HttpClientModule, QuillModule.forRoot()],
  exports: [HttpClientModule, QuillModule, SearchPipe],
  declarations: [SearchPipe],
})
export class SharedModule {}
