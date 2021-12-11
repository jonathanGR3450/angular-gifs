import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, GIFSearchInterface } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey = '3YfUyq9WYj4oZP3nPwQB5LzUqYpbZHET';
  private serviceUrl = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  public result: Gif[] = [];

  get historial(): string[] {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.result = JSON.parse(localStorage.getItem('result')!) || [];
  }

  addHistorial(value: string) {


    if (value.trim().length === 0) {
      return;
    }

    value = value.trim().toLowerCase();
    if (!this._historial.includes(value)) {
      console.log(value);
      this._historial.unshift(value);
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    this._historial = this._historial.splice(0, 10);

    var params = new HttpParams()
        .set('api_key', this.apiKey)
        .set('limit', '10')
        .set('q', value);

    this.http.get<GIFSearchInterface>(`${this.serviceUrl}/search`, { params })
      .subscribe((resp: any) => { this.result = resp.data; localStorage.setItem('result', JSON.stringify(this.result)); });




  }
}
