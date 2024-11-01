import { Component,OnInit } from '@angular/core';
import { DanhMuc, DanhMucService } from '../../service/danhmuc/danh-muc.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'

@Component({
  selector: 'app-edit-danh-muc',
  templateUrl: './edit-danh-muc.component.html',
  styleUrl: './edit-danh-muc.component.css'
})
export class EditDanhMucComponent implements OnInit {

  tenDanhMuc! : string
  danhMucId!: number;

  listDanhMuc : DanhMuc[]=[];
  danhMucTree: any[] = [];
  selectedDanhMucId!: number | null;

  constructor(
    private service : DanhMucService,
    private route : ActivatedRoute,
    private location : Location
  ){}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.danhMucId = +params['id'];
      this.loadDanhMucById();           
    });
    this.loadDanhMuc();
  }

  loadDanhMucById(){
    this.service.getDanhMucById(this.danhMucId).subscribe(data =>{
      this.tenDanhMuc = data.tenDanhMuc;
      this.selectedDanhMucId = data.parentDanhMucId;
    })
  }

  loadDanhMuc (){
    this.service.getAllDanhMuc().subscribe(data =>{
      this.listDanhMuc = data;
      this.danhMucTree = this.buildDanhMucTree(this.listDanhMuc);
    })
  }
  
  buildDanhMucTree(danhmuc: DanhMuc[], parentId: number | null = null): any[] {
    return danhmuc
    .filter(cat => cat.parentDanhMucId === parentId)
    .map(cat => ({
      cat,
      danhMucCon: this.buildDanhMucTree(danhmuc, cat.id)
    })); 
  }
  saveEdit(){
    const updateDanhMuc = {
      id : this.danhMucId,
      tenDanhMuc : this.tenDanhMuc,
      parentDanhMucId : this.selectedDanhMucId,
      listDanhMucPage: [],    
      listDanhMuc: []
    };
    this.service.updateDanhMuc(updateDanhMuc).subscribe(data =>{
      this.location.back();
    },error =>{
      alert("Da xay ra loi khi cap nhat danh muc")
      console.error(error);
    })
  }

}
