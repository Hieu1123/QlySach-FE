import { SachService } from './../../service/sach/sach.service';
import { Component,OnInit } from '@angular/core';
import { Sach, SachDanhMuc } from '../../service/danhmuc/danh-muc.service';
import { DanhMuc } from '../../service/danhmuc/danh-muc.service';
import { DanhMucService } from '../../service/danhmuc/danh-muc.service';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-sach',
  templateUrl: './edit-sach.component.html',
  styleUrl: './edit-sach.component.css'
})
export class EditSachComponent implements OnInit {

  tenSach!: string;
  soLuong!: number;
  giaTien!: number;

  sach!: Sach;
  listDanhMuc: DanhMuc[] = [];
  selectedDanhMucIds: number[] = [];
  sachDanhMucList: DanhMuc[] = [];
  danhMucTree: any[] = [];
  selectedDanhMucId: number | null = null;

  constructor(
    private sachService : SachService,
    private danhMucService :DanhMucService,
    private route : ActivatedRoute,
    private location : Location
  ){}

  ngOnInit(): void {
    this.loadSachById();
  }
  
  loadSachDanhMuc(sachId: number) {
    this.sachService.getSachDanhMucBySachId(sachId).subscribe(data => {
      this.sachDanhMucList = data.map((sdm: SachDanhMuc) => {
        return this.listDanhMuc.find(danhMuc => danhMuc.id === sdm.danhMucId)!;
      });
    });
  }

  loadSachById() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    forkJoin({
      danhMucs: this.danhMucService.getAllDanhMuc(),
      sach: this.sachService.getSachById(id)
    }).subscribe(({ danhMucs, sach }) => {
      this.listDanhMuc = danhMucs;
      this.sach = sach;
      this.tenSach = sach.tenSach;
      this.soLuong = sach.soLuong;
      this.giaTien = sach.giaTien;
      this.selectedDanhMucIds = sach.sachDanhMuc?.map(sdm => sdm.danhMucId) || [];
      this.loadSachDanhMuc(sach.id);
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

  saveEdit(): void {
    const updateSach = {
      id : this.sach.id,
      tenSach : this.tenSach,
      soLuong : this.soLuong,
      giaTien : this.giaTien,
      sachDanhMuc: this.selectedDanhMucIds.map((id) => ({ danhMucId: id })),
    };
    this.sachService.updateSach(updateSach).subscribe({
      next : data => {
        this.sachService.updateSachDanhMuc(this.sach.id, this.selectedDanhMucIds).subscribe({
          next : data =>{
            alert("Cap nhat sach va danh muc thanh cong")
            this.location.back();
          },error(err) {
           alert("da xay ra loi khi cap nhat danh muc") 
          }
        })
      },error(err) {
        alert("da xay ra loi khi cap nhat")
      },
    })
  }
  
  

  addNewDanhMuc(danhMucId: number | null) {
    if (!danhMucId) {
      alert("Vui lòng chọn danh mục");
      return;
    }

    const newDanhMuc = this.listDanhMuc.find(dm => dm.id === Number(danhMucId));
    if(newDanhMuc && !this.selectedDanhMucIds.includes(danhMucId)){
      this.sachDanhMucList.push(newDanhMuc);
      this.selectedDanhMucIds.push(danhMucId);
      alert("Danh muc da duoc them thanh cong")
    }else{
      alert("danh muc da ton tai ")
    }
  } 


  
  deleteNewDanhMuc(danhMucId :  number){
    if(confirm("ban co chac chan muon xoa danh muc khong ?")){
      this.sachDanhMucList = this.sachDanhMucList.filter(danhMuc => danhMuc.id !== danhMucId);
      this.selectedDanhMucIds = this.selectedDanhMucIds.filter(id => id !== danhMucId);
    }
  }

}
