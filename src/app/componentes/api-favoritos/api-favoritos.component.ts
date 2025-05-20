import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Video } from '../../interfaces/api-youtube.interface';
import { YoutubeApiResponse } from '../../interfaces/api-youtube.interface';

@Component({
  selector: 'app-api-favoritos',
  templateUrl: './api-favoritos.component.html',
  styleUrls: ['./api-favoritos.component.css']
})
export class ApiFavoritosComponent implements OnInit {

  columns_array: string[] = ['Número', 'Nombre', 'Publicación', 'Ver Video', 'Quitar de Favoritos'];
  videos_fav_array: Video[] = [];
  constructor(private http: HttpClient) { }


  ngOnInit(): void {
    this.http
      .get<YoutubeApiResponse>('http://127.0.0.1:8080/youtube-api/v1/videos-favoritos')
      .subscribe((res) => {
        console.log(res);
        this.videos_fav_array = res.data;
      }, (err) => {
        console.log(err);
      });
  }

  eliminarVideo(id): void {
    this.http
      .delete(`http://127.0.0.1:8080/youtube-api/v1/eliminar-video-favorito?id_resourse=${id}`)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.videos_fav_array = this.videos_fav_array.filter(v => v.resourceId !== id);
        },
        error: (err) => {
          console.error(err);
        }
      });
  }

  mostrarVideo(video: Video) {
    Swal.fire({
      html: `
        <h3>${video.title}</h3><hr>
        <iframe width="100%" 
        height="315" 
        src="https://www.youtube.com/embed/${video.resourceId}" 
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; 
        autoplay; 
        clipboard-write; 
        encrypted-media; 
        gyroscope; 
        picture-in-picture" 
        allowfullscreen></iframe>
      `
    })
  }
}
