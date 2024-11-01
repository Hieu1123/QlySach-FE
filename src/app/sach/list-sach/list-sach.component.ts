import { DanhMuc} from './../../service/danhmuc/danh-muc.service';
import { Component, OnInit } from '@angular/core';
import { Sach, SachService } from '../../service/sach/sach.service';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../service/Auth/auth-service.service';

@Component({
  selector: 'app-list-sach',
  templateUrl: './list-sach.component.html',
  styleUrl: './list-sach.component.css'
})
export class ListSachComponent implements OnInit {

  listSachDanhMuc : Sach[] = [];
  listSachPage : Sach[]=[];
  isLoggedIn : boolean =  false;
  
  currentPage = 1;
  pageSize = 5;
  totalItems = 0;
  totalPages = 0;

  constructor(
    private authService : AuthService,
    private sachService: SachService, 
    private cdRef : ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    if(!this.isLoggedIn){
      this.router.navigate(["/Login"]);
      return
    }
    this.route.queryParams.subscribe(params => {
      const page = +params['page'] || 1;
      this.currentPage = page;
      this.loadSachPage(this.currentPage);
    });
  }
  
  loadSachDanhMuc(){
    this.sachService.getSachDanhMuc().subscribe(dataSachDanhMuc =>{
      this.listSachDanhMuc = dataSachDanhMuc;
    })
  }
  deleteSach(index : number){
    const sach =  this.listSachPage[index].id;
    if(confirm("ban co muon xoa sach ?")){
      this.sachService.deleteSach(sach).subscribe(() =>{
        alert("ban da xoa sach thanh cong");
        this.loadSachPage(this.currentPage);
      })
    }
  }
  prevPage(){
    if(this.currentPage > 1){
      this.currentPage -- ;
      this.loadSachPage(this.currentPage);
    }
  }

  nextPage(){
    if(this.currentPage < this.totalPages){
      this.currentPage ++;
      this.loadSachPage(this.currentPage);
    }
  }

  loadSachPage(page : number){
    this.sachService.getSachPage(page, this.pageSize).subscribe(res =>{
      this.listSachPage = res.items || [];
      this.totalItems = res.totalItems;
      this.totalPages = Math.ceil(this.totalItems / this.pageSize);
      this.router.navigate(['/Sach'], { queryParams: { page: page } });
      this.listSachPage.forEach(sach =>{
        if(!sach.listDanhMuc){
         sach.listDanhMuc= [];
        } 
      })
      this.cdRef.detectChanges();
    }
    ,error =>{
      if(error){
        this.router.navigate(["/Login"])
      }
    });
  }

}
