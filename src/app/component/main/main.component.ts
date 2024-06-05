import { Component ,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  showSplash = true;
  optionopen:boolean=false;

  constructor(private router: Router,private title:Title) { }

  ngOnInit(): void {
    this.title.setTitle('main');
    setTimeout(() => {
      this.showSplash = false;
    }, 2000);
    this.title.setTitle("ClothingBoutiques");
  }
  
login(){
  this.router.navigateByUrl("login")
}

}
