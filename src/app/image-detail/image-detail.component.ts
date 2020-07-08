import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { NgForm } from '@angular/forms';

import { ImageService } from './../image-list/image.service';
import { Image } from './../image.model';

@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.css']
})
export class ImageDetailComponent implements OnInit {
  id: string;
  image: Image;
  rating = 50;

  constructor(private imageService: ImageService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.get('id')) {
        this.id = paramMap.get('id');
        this.image = this.imageService.getImage(+this.id);
        // console.log(this.image);
      }
    });
  }

  onSubmit(form: NgForm) {
    // console.log(form.value);
    const rating = form.value.rating / 10;
    const userName = form.value.userName;
    const reason = form.value.reason;
    this.imageService.updateImageDetails(+this.id, +rating, userName, reason);
    this.router.navigate(['/images']);
  }

}
