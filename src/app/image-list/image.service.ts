import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Image } from './../image.model';

@Injectable({ providedIn: 'root' })
export class ImageService {
    API_KEY = '167afa79b32df8ee3ffd73cec0c7623d';
    GALLERY_ID = '22552328-72157714495705401';
    // GALLERY_ID = '66911286-72157712233171141';

    photos: Image[];
    photosChanged = new Subject<Image[]>();
    maxPages;
    constructor(private httpClient: HttpClient) {}

    getImages(pageNo: number) {
        const savedImages = JSON.parse(localStorage.getItem('images'));
        if(savedImages) {
            this.maxPages = Math.ceil(savedImages.length / 30);
            this.photos = savedImages.slice(( pageNo - 1 ) * 30, pageNo * 30);
            // console.log(this.photos);
            this.photosChanged.next(this.photos.slice());

        } else {
            this.httpClient.get(`https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=${this.API_KEY}&gallery_id=${this.GALLERY_ID}&per_page=30&format=json&nojsoncallback=1`)
            .subscribe((response => {
                const responseObj: any = response;
                // console.log(responseObj);
                const images = responseObj.photos.photo.map(photoObj => {
                    return {
                        id: photoObj.id,
                        src: `https://farm${photoObj.farm}.staticflickr.com/${photoObj.server}/${photoObj.id}_${photoObj.secret}.jpg`,
                        rating: 0,
                        ratingBy: '',
                        reason: ''
                    };
                });
                this.maxPages = Math.ceil(images.length / 30);
                this.photos = images.slice(( pageNo - 1 ) * 30, pageNo * 30);
                localStorage.setItem('images', JSON.stringify(images));
                this.photosChanged.next(this.photos.slice());
            }));
        }
    }

    // getAllImages() {
    //     return this.photos.slice();
    // }

    getSubscribePhotos() {
        return this.photosChanged;
    }

    getImage(index: number) {
        return this.photos[index];
    }

    updateImageDetails(index: number, rating: number, userName: string, reason: string) {
        const image: Image = this.photos[index];
        image.rating = rating;
        image.ratingBy =  userName;
        image.reason = reason;
        this.photos[index] = image;
        localStorage.setItem('images', JSON.stringify(this.photos));
        this.photosChanged.next(this.photos.slice());
    }
}