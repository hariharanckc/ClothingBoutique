import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { FaceapiService } from 'src/app/services/faceapi.service';



@Component({
  selector: 'app-facescanning',
  templateUrl: './facescanning.component.html',
  styleUrls: ['./facescanning.component.css']
})
export class FacescanningComponent implements OnInit {
  video!: HTMLVideoElement
  errorDiv!: HTMLDivElement
  flag: string = 'notScanned'
  RegisterNumber!: string
  currentYear = new Date().getFullYear();
  index: number = 0
  results: any;
  getids: any;
  facescanning: string = "notscanned";

  constructor(private render: Renderer2, private faceApi: FaceapiService, private route: ActivatedRoute, public adminservice: AdminService, public router: Router) { }

  ngOnInit(): void {
    this.RegisterNumber = this.route.snapshot.params['id'];
    console.log(this.RegisterNumber);

    this.video = this.render.selectRootElement('#myVideo') as HTMLVideoElement
    this.errorDiv = this.render.selectRootElement(".errorMessage")
    this.startVideo();
  }

  async startVideo() {
    // this.errorDiv.innerHTML=""
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (this.video) {
        this.video.srcObject = stream;
        this.video.addEventListener('play', async () => {
          try {
            this.results = await this.faceApi.startInterval(this.video, this.errorDiv)
            console.log("first")
            console.log("results", this.results);
            this.getid(this.results);
            // this.faceApi.createfacelogin(this.results).subscribe((res:any)=>{
            //         console.log(res);        
            this.flag = "scanned";
            // })
            // if(results.length>0){
            //   this.Couch.faceUpdate(results,this.RegisterNumber,this.currentYear)
            //   this.flag='Scanned'
            // }
          } catch (error) {
            console.log(error)
          }
        })
      }
    } catch (error) {
      console.error('Error accessing webcam:', error);
    }
  }
  faceloginpage() {
    this.router.navigateByUrl('/admindashboard');
  }


  getid(faceLandmark: any) {
    console.log(faceLandmark);

    this.adminservice.getDetail(this.RegisterNumber).subscribe((res: any) => {
      console.log(res);
      if (res.data.faceLandmark.length > 0) {
        console.log("match");
        this.faceApi.faceMatch(res.data.faceLandmark[0], faceLandmark).then((data: any) => {
          console.log(data);

        })

      } else {
        this.adminservice.updateFace(res, faceLandmark)

      }

    }
    )
  }



}

