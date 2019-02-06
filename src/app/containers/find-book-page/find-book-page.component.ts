import { Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import { DataService } from '../../services/data.service';
import { Book } from '../../models/book';
@Component({
  selector: 'app-find-book-page',
  templateUrl: './find-book-page.component.html',
  styleUrls: ['./find-book-page.component.scss']
})
export class FindBookPageComponent implements OnInit {

  displayedColumns: string[] = ['id','etag','selfLink','title', 'publisher', 'pageCount','language','publishedDate'];
  dataSource = new MatTableDataSource;
  @ViewChild( MatPaginator ) paginator: MatPaginator;
  @ViewChild( MatSort ) sort: MatSort;
  constructor(private dataservice: DataService) { }
  ngOnInit() {
  	let searchdata='a';
  	this.dataservice.getbooks(searchdata).subscribe(res => {
      this.dataSource = new MatTableDataSource(res['items']);
  	  this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.dataSource);
    })
  }
}
