import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
declare const faceapi: any;

@Injectable({
  providedIn: 'root'
})
export class FaceapiService {
  couchdburl: string = 'https://192.168.57.185:5984';
  couchusername: string = 'd_couchdb';
  couchpassword: string = 'Welcome#2';
  databasename: any = 'clothingboutique';

  header = {
    'Authorization': `Basic ${btoa(this.couchusername + ':' + this.couchpassword)}`
  };

  public video: HTMLVideoElement | undefined;
  public displaySize: { width: number; height: number } = { width: 0, height: 0 }; // Provide initial values
  public descriptions: any[] = [];
  public flag: boolean = false;
  public results: any;
  public count: number = 0;
  public resize: any;
  public canva: any;
  public timeInterval: any;


  constructor(public http: HttpClient) { }

  createfacelogin(document: any) {
    console.log("created");

    const createurl = `${this.couchdburl}/${this.databasename}`;
    return this.http.post(createurl, document, {
      headers: this.header
    });
  }
  async loadModels(): Promise<void> {
    try {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('./assets/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('./assets/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('./assets/models'),
        faceapi.nets.ssdMobilenetv1.loadFromUri('./assets/models')
      ]);
      console.log("Models loaded successfully");
    } catch (error) {
      console.error("Error loading models:", error);
    }
  }

  async FaceDetection(video: HTMLVideoElement, divElement: HTMLDivElement): Promise<any> {
    divElement.innerHTML = "Don't move util face have been scanned"

    try {
      await this.loadModels()
      console.log("loaded");
    } catch (error) {
      console.log("error of the model", error);
    }
    this.results = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors();
    console.log("results:", this.results);
    const labeledDescriptors = this.results.map((result: { descriptor: any; }) => {
      return new faceapi.LabeledFaceDescriptors('hari', [result.descriptor]);
    });
    console.log(labeledDescriptors);



    if (labeledDescriptors.length > 0) {
      this.clearIntervalTimer();
      divElement.innerHTML = "face scanned successfully"
      return labeledDescriptors;
    }

  }

  startInterval(video: HTMLVideoElement, divTag: HTMLDivElement): Promise<any> {
    return new Promise(async (resolve) => {
      this.timeInterval = setInterval(async () => {
        const labeledDescriptors = await this.FaceDetection(video, divTag);
        resolve(labeledDescriptors);
      }, 1000);
    });
  }

  clearIntervalTimer() {
    clearInterval(this.timeInterval);
  }
  async confirmImage(video: HTMLVideoElement, divTag: HTMLDivElement): Promise<any> {
    try {
      await this.loadModels();

      return new Promise((resolve) => {
        let clearId: any;

        clearId = setInterval(async () => {
          let resultsDes = await this.detectFace(video, divTag);
          if (resultsDes.length > 0) {
            console.log(resultsDes);
            this.clearIntervalId(clearId);
            resolve(resultsDes);
          }
        }, 1000);
      });
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async detectFace(video: HTMLVideoElement, divTag: HTMLDivElement): Promise<any> {
    divTag.innerHTML = "Don't move face until face scanned";
    let resultsVal = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors();
    return resultsVal.map((res: any) => res.descriptor);
  }


  clearIntervalId(id: any) {
    clearInterval(id);
  }

  adminFaceMatch(descriptorStored: any, descriptors: any): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      let result = await this.faceMatch(descriptorStored, descriptors)
      console.log(result)
      resolve(result.toString());
    })
  }
  faceMatch(descriptorStored: any, descriptor: any) {
    return new Promise<string>((resolve, reject) => {
      console.log(descriptor)
      console.log(descriptorStored.descriptors);

      let floatArray = new Float32Array(descriptorStored.descriptors[0]);
      console.log(floatArray);
      const labeledDes = new faceapi.LabeledFaceDescriptors(descriptorStored.label, [floatArray]);
      console.log(labeledDes);
      const faceMatcher = new faceapi.FaceMatcher([labeledDes]);
      console.log(descriptor[0]);
      let result = faceMatcher.findBestMatch(descriptor[0]);
      console.log(result, "final result")
      resolve(result.toString());
    })
  }

}
