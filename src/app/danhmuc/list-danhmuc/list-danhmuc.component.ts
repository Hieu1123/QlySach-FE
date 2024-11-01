import { Component, OnInit } from '@angular/core';
import { DanhMuc, DanhMucService } from '../../service/danhmuc/danh-muc.service';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../service/Auth/auth-service.service';


@Component({
  selector: 'app-list-danhmuc',
  templateUrl: './list-danhmuc.component.html',
  styleUrl: './list-danhmuc.component.css'
})
export class ListDanhmucComponent implements OnInit {
  listDanhMuc : DanhMuc[]=[]
  listDanhMucPage: DanhMuc[] = [];
  parentDanhMucs: DanhMuc[] = [];
  danhMucTree: any[] = []; 
  parentDanhMucId!: number;

  isLoggedIn: boolean = false;

  currentPage = 1;
  pageSize = 5;
  totalItems = 0;
  totalPages = 0;

  constructor(
    private authService : AuthService,
    private service: DanhMucService,
    private cd : ChangeDetectorRef,
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
      this.loadDanhMucPage(this.currentPage);
    });
  }
  
  deleteDanhMuc(index: number) {
    const danhMucId = this.listDanhMucPage[index].id;
    if(confirm("ban muon xoa danh muc ?")){
      this.service.deleteDanhMuc(danhMucId).subscribe(data =>{
        alert("ban da xoa thanh cong");
        this.loadDanhMucPage(this.currentPage);
      });
      
    };  
  }

  prevPage(){
    if(this.currentPage > 1){
      this.currentPage --;
      this.loadDanhMucPage(this.currentPage);
    }
  }
  nextPage(){
    if(this.currentPage < this.totalPages){
      this.currentPage ++;
      this.loadDanhMucPage(this.currentPage);
    }
  }
  loadDanhMucPage(page : number){
    this.service.getDanhMucPage(page, this.pageSize).subscribe(res =>{
      this.listDanhMucPage = res.items || [];
      this.totalItems = res.totalItems;
      this.totalPages = Math.ceil(this.totalItems / this.pageSize);
      this.router.navigate(['/DanhMuc'], { queryParams: { page: page } });
      this.cd.detectChanges();
    })
  }
}