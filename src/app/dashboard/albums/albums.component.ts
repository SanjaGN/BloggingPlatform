import {Component, OnInit} from '@angular/core';
import {DashboardService} from "../dashboard.service";
import {Album} from "../../models/album.model";
import {Photo} from "../../models/photo.model";
import {MatDialog} from "@angular/material/dialog";
import {PhotoModalComponent} from "./photo-modal/photo-modal.component";

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrl: './albums.component.scss'
})
export class AlbumsComponent implements OnInit {
  albums: Album[] = [];
  isLoading: boolean = false;
  photos: Photo[] = [];

  constructor(private dashboardService: DashboardService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {

    this.isLoading = true;
    this.dashboardService.fetchAlbums().subscribe(
      (response: Album[] | Album) => {

        this.isLoading = false;
        if (Array.isArray(response)) {
          this.albums = response.filter(album => album.userId === 1);
        } else if (response instanceof Object) {
          this.albums = response.userId === 1 ? [response] : [];
        }
      }, (error) => {
        console.log('Failed to fetch albums list', error);
      }
    )
  }

  openDialog(albumId: number): void {
    this.isLoading = true;
    this.dashboardService.fetchPhotos(albumId).subscribe(
      (response: Photo[]) => {
        this.isLoading = false;
        this.photos = Array.isArray(response) ? response : [response]; // Ensure photos is always an array
        this.dialog.open(PhotoModalComponent, {
          data: { photos: this.photos }
        });
        console.log('Photos for album', albumId, ':', this.photos);
      },
      (error) => {
        this.isLoading = false;
        console.error('Failed to fetch photos:', error);
      }
    );
  }

}
