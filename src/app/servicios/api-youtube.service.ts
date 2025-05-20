import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { YoutubeResponse } from '../interfaces/api-youtube.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiYoutubeService {

  private urlYoutube: string = 'https://www.googleapis.com/youtube/v3';
  private part: string = 'snippet';
  private playlistId: string = 'UUHTRMrjK81pik804GiWBdAw';
  private key: string = 'AIzaSyCUFlu8jCXByGwOIlYWYlxo7nunAaY49kA';
  private nextpagetoken: string = '';

  constructor(private http: HttpClient) { }

  getVideos() {
    const url = `${this.urlYoutube}/playlistItems`;

    const params = new HttpParams()
      .set('part', this.part)
      .set('maxResults', "10")
      .set('playlistId', this.playlistId)
      .set('key', this.key)
      .set('pageToken', this.nextpagetoken);

    console.log(url, { params })

    return this.http.get<YoutubeResponse>(url, { params })
      .pipe(
        map(resp => {
          this.nextpagetoken = resp.nextPageToken;
          return resp.items;
        }),
        map(items => items.map(video => video.snippet))
      );
  }
}