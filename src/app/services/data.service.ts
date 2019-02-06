import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  getdata() {
  return this.http.get('https://api.chucknorris.io/jokes/random')
}
getbooks(searchData: string) {
  return this.http.get('https://www.googleapis.com/books/v1/volumes?q='+searchData)
}
}
