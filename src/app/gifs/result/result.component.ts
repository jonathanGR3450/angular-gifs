import { Component} from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styles: [
  ]
})
export class ResultComponent{

  get result(){
    return this.gifsServide.result;
  }

  constructor(private gifsServide: GifsService) { }

}
