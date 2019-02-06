import { Component , OnInit, ChangeDetectorRef, OnDestroy} from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { DataService } from './services/data.service';
import {MediaMatcher} from '@angular/cdk/layout';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'newconcept';
  update: boolean = false;
  newconcept: any;
  mobileQuery: MediaQueryList;

  // fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);

  // fillerContent = Array.from({length: 50}, () =>
  //     `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
  //      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
  //      laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
  //      voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
  //      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);
private _mobileQueryListener: () => void;

  constructor(updates: SwUpdate, private data: DataService,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
     updates.available.subscribe(event => {
      updates.activateUpdate().then(() => document.location.reload());
  })
  }


 ngOnInit() {
  console.log(navigator);
  let isIEOrEdge = /msie\s|trident\/|edge\//i.test(window.navigator.userAgent);
  console.log("Browser---" + isIEOrEdge);
    this.data.getdata().subscribe(res => {
      this.newconcept = res;
    })
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}