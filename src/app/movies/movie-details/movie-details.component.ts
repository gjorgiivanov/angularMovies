import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';
import { ActivatedRoute } from '@angular/router';
import { movieDTO } from '../movies.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { coordinatesMapWithMessage } from 'src/app/utilities/map/coordinate';
import { RatingService } from '../../utilities/rating.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent implements OnInit {
  constructor(
    private moviesService: MoviesService,
    private ratingService: RatingService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.moviesService
        .getById(params['id'])
        .subscribe((movieDTO: movieDTO) => {
          this.movie = movieDTO;
          this.releaseDate = new Date(movieDTO.releaseDate);
          this.trailerURL = this.generateYoutubeURLForEmbeddedVideo(
            movieDTO.trailer
          );
          this.coordinates = movieDTO.movieTheaters.map((movieTheater) => {
            return {
              latitude: movieTheater.latitude,
              longitude: movieTheater.longitude,
              message: movieTheater.name,
            };
          });
        });
    });
  }

  movie: movieDTO | undefined;
  releaseDate: Date | undefined;
  trailerURL: SafeResourceUrl | undefined;
  coordinates: coordinatesMapWithMessage[] = [];

  onRateing(rate: number): void {
    this.ratingService.rate(this.movie!.id, rate).subscribe(() => {
      Swal.fire('Success', 'Your vote has been receved', 'success');
    });
  }

  generateYoutubeURLForEmbeddedVideo(url: string): SafeResourceUrl | undefined {
    if (!url) {
      return undefined;
    }

    let videoId = url.split('v=')[1];
    if (videoId) {
      const ampersandPosition = videoId.indexOf('&');

      if (ampersandPosition !== -1) {
        videoId = videoId.substring(0, ampersandPosition);
      }

      return this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://www.youtube.com/embed/${videoId}`
      );
    }
    return undefined;
  }
}
