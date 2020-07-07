import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Image } from './../image.model';
import { ImageService } from './image.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnInit, OnDestroy {

  photos: Image[];
  photosSubscription: Subscription;
  pageNo = 1;
  maxPages;

  constructor(private imageService: ImageService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.imageService.getImages(this.pageNo);
    this.photos = this.imageService.photos;
    this.maxPages = this.imageService.maxPages;
    this.photosSubscription = this.imageService.photosChanged.subscribe(photos => {
      // console.log(photos);
      this.photos = photos;
      this.maxPages = this.imageService.maxPages;
    });
  }

  onImageClicked(index: number) {
    this.router.navigate([`images/${index}`]);
  }

  onNextPage() {
    // console.log(this.maxPages);
    this.pageNo = this.pageNo + 1;
    this.imageService.getImages(this.pageNo);
  }

  onPrevPage() {
    this.pageNo = this.pageNo - 1;
    this.imageService.getImages(this.pageNo);
  }

  ngOnDestroy() {
    this.photosSubscription.unsubscribe();
  }

}
