import { DanhMuc, DanhMucService } from './../../service/danhmuc/danh-muc.service';
import { Component, OnInit } from '@angular/core';
import { Sach, SachService } from '../../service/sach/sach.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-sach',
  templateUrl: './add-sach.component.html',
  styleUrl: './add-sach.component.css'
})
export class AddSachComponent implements OnInit {


  sachForm : FormGroup;
  listDanhMuc : DanhMuc[] = [];
  danhMucTree : any[] = [];
  listSachPage: Sach [] = [];

  currentPage = 1;
  pageSize = 5;
  totalItems = 0;
  totalPages = 0;

  constructor(
    private sachService: SachService,
    private danhMucService : DanhMucService,
    private fb :FormBuilder,
    private router : Router
  ){
    this.sachForm = this.fb.group({
      tenSach : ['', Validators.required],
      soLuong : [null , Validators.required],
      giaTien : [null ,Validators.required],
      danhMucIds : [[],  Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadListDanhMuc();
  }

  loadListDanhMuc(){
    this.danhMucService.getAllDanhMuc().subscribe(data =>{
      this.listDanhMuc = data;
      this.buildDanhMucTree();
    });
  }

  buildDanhMucTree() {
    const map = new Map<number, any>();
    this.listDanhMuc.forEach(cat =>{
      map.set(cat.id, {cat, danhMucCon : []})
    });
    map.forEach((catWrapper) =>{
      if(catWrapper.cat.parentDanhMucId !== null){
        const  parentWrapper = map.get(catWrapper.cat.parentDanhMucId);
        if(parentWrapper){
          parentWrapper.danhMucCon.push(catWrapper)
        } 
      }
    });
    this.danhMucTree = Array.from(map.values()).filter(catWrapper => catWrapper.cat.parentDanhMucId === null)
  }

  addSach(){
    if(this.sachForm.valid){
      const sach =  this.sachForm.value;
      const danhMucIds = sach.danhMucIds;
      this.sachService.addSach(sach, danhMucIds).subscribe(data =>{
        this.sachService.getSachPage(this.currentPage, this.pageSize).subscribe(res =>{
          this.totalItems = res.totalItems;
          this.totalPages = Math.ceil(this.totalItems / this.pageSize)
          this.loadSachPage(this.totalPages);
        })
      },error => {
        console.error(error)
      })
    }
  }
  
  loadSachPage(page : number){
    this.sachService.getSachPage(page, this.pageSize).subscribe(res =>{
      this.listSachPage = res.items || [];
      this.totalItems = res.totalItems;
      this.totalPages = Math.ceil(this.totalItems / this.pageSize)
      this.listSachPage.forEach(sach =>{
        if(!sach.listDanhMuc){
         sach.listDanhMuc= [];
        } 
      })
    });
    this.router.navigate(['/Sach'], { queryParams: { page: this.totalPages } });
  }
}

