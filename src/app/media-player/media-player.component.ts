import { MediaService } from './../services/media.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.scss']
})
export class MediaPlayerComponent implements OnInit {

  constructor(private mediaService: MediaService, private route: ActivatedRoute) { }
  private singleFile: any = [];
  private id: any;
  private userName: any;
  private favourites = 0;
  private thisPostLiked: boolean;
  buttonText:string;

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.id = params.id;
      this.thisPostLiked = false;
      this.viewMediaFile(this.id);

    });


  }

  viewMediaFile = (fileId) => {
    this.mediaService.getSingleMedia(fileId).subscribe(
      res => {
        this.singleFile = res;
        this.getUserName(this.singleFile.user_id);
        this.getFileFavourites(fileId);

      }
    );

  };

  getUserName = (userId) => {
    this.mediaService.getUserName(userId).subscribe(
      res => {
        this.userName = res.username;
      }
    );
  }

  getFileFavourites = (fileId) => {


    this.mediaService.getFavourites(fileId).subscribe(
      res => {
        this.favourites = res.length;

        for (var key in res) {
          var obj = res[key];
          for (var prop in obj) {

            if (prop === 'user_id') {

              if (obj[prop] === JSON.parse(localStorage.getItem("user")).user_id) {
                console.log(obj[prop]);
                this.thisPostLiked = true;
                this.buttonText = 'Unlike';
              }
              console.log(this.thisPostLiked);
              this.buttonText = 'Like';
            }
          }
        }
      }
    );
  }


  addFavourite = (fileId) => {
    this.mediaService.addToFavourites(fileId);
    window.location.reload();
  }

  deleteFavourite = (fileId) => {
    this.mediaService.deleteFromFavourites(fileId);
    window.location.reload();
  }
}
