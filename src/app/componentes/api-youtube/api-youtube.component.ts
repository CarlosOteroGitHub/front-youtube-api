import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Video } from '../../interfaces/api-youtube.interface';
import { ApiYoutubeService } from 'src/app/servicios/api-youtube.service';

@Component({
  selector: 'app-api-youtube',
  templateUrl: './api-youtube.component.html',
  styleUrls: ['./api-youtube.component.css']
})
export class ApiYoutubeComponent implements OnInit {

  videos_array: Video[] = [];

  constructor(private apiYoutubeService: ApiYoutubeService, private http: HttpClient) { }

  ngOnInit(): void {
    this.cargarVideos();
  }

  cargarVideos() {
    this.apiYoutubeService.getVideos().subscribe(resp => {
      this.videos_array.push(...resp);
      console.log(this.videos_array);
    })
  }

  agregarVideo(elemento: any): void {
    const payload = {
      publishedAt: elemento.publishedAt,
      channelId: elemento.channelId,
      title: elemento.title,
      description: elemento.description,
      thumbnails: '',
      channelTitle: elemento.channelTitle,
      playlistId: elemento.playlistId,
      position: elemento.position,
      resourceId: elemento.resourceId.videoId,
      videoOwnerChannelTitle: elemento.videoOwnerChannelTitle,
      videoOwnerChannelId: elemento.videoOwnerChannelId
    };

    console.log(payload);

    this.http.post('http://127.0.0.1:8080/youtube-api/v1/agregar-video-favorito', payload)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.error(err);
        }
      });
  }
}
