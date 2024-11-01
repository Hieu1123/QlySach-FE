import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DanhMuc, DanhMucService } from '../../service/danhmuc/danh-muc.service';
@Component({
  selector: 'app-add-danhmuc',
  templateUrl: './add-danhmuc.component.html',
  styleUrl: './add-danhmuc.component.css'
})
export class AddDanhmucComponent implements OnInit{

  listDanhMuc: DanhMuc[] = [];
  danhMucForm: FormGroup;
  danhMucTree: any[] = [];
  listDanhMucPage: DanhMuc [] = [];

  currentPage = 1;
  pageSize = 5;
  totalItems = 0;
  totalPages = 0;

  constructor(
    private fb: FormBuilder,
    private service:DanhMucService,
    private router: Router
  ){
    this.danhMucForm = this.fb.group({
      tenDanhMuc: ['', Validators.required],
      parentDanhMucId : [null],
      listDanhMucCon: this.fb.array([])  
    });
  }

  ngOnInit(): void {
    this.loadListDanhMuc();
  };
  
  loadListDanhMuc() {
    this.service.getAllDanhMuc().subscribe(data => {
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

  addDanhMuc(){
    if (this.danhMucForm.valid) {
      const newDanhMuc = {
        ...this.danhMucForm.value,
        parentDanhMucId : this.danhMucForm.value.parentDanhMucId
        
      };
      this.service.addDanhMuc(newDanhMuc).subscribe(data =>{
        this.service.getDanhMucPage(this.currentPage, this.pageSize).subscribe(res =>{
          this.totalItems = res.totalItems;
          this.totalPages = Math.ceil(this.totalItems / this.pageSize)
          this.loadDanhMucPage(this.totalPages)
        })
      },error => {
        console.error(error)
      })
    }
  }
  loadDanhMucPage(page : number){
    this.service.getDanhMucPage(page, this.pageSize).subscribe(res =>{
      this.listDanhMucPage = res.items || [];
      this.totalItems = res.totalItems;
      this.totalPages = Math.ceil(this.totalItems / this.pageSize)
      this.listDanhMucPage.forEach(danhmuc =>{
        if(!danhmuc.listDanhMuc){
          danhmuc.listDanhMuc= [];
        } 
      })
    });
    this.router.navigate(['/DanhMuc'], { queryParams: { page: this.totalPages } });
  }
}  

  
  
  

