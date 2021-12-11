import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, GIFSearchInterface } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey = '3YfUyq9WYj4oZP3nPwQB5LzUqYpbZHET';
  private _historial: string[] = [];

  public result: Gif[] = [];

  get historial(): string[] {
    return [...this._historial];
  }

  constructor(private http: HttpClient) { }

  addHistorial(value: string) {


    if (value.trim().length === 0) {
      return;
    }

    value = value.trim().toLowerCase();
    if (!this._historial.includes(value)) {
      console.log(value);
      this._historial.unshift(value);
    }

    // this._historial = this._historial.splice(0, 10);
    console.log(this._historial.toString());
    

    this.http.get<GIFSearchInterface>(`https://api.giphy.com/v1/gifs/search?api_key=3YfUyq9WYj4oZP3nPwQB5LzUqYpbZHET&q=${value}&limit=10`)
      .subscribe((resp: any) => { this.result = resp.data });

  }
}
