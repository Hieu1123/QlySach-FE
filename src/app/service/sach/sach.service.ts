
import { Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PagedResult } from '../../../main';

export interface DanhMuc{
  listDanhMucPage: DanhMuc[];
  isEditing: boolean;
  listDanhMuc : DanhMuc [];
  
  id: number;
  tenDanhMuc: string;
  listDanhMucCon?: DanhMuc[] ;
  parentDanhMucId : number | null;
  listDanhMucConNames?: string;
}
export interface Sach {
  
  sachDanhMuc: SachDanhMuc[]

  listDanhMuc: DanhMuc[];
  danhMucIds : number [];

  id: number;
  tenSach: string;
  soLuong: number;
  giaTien: number;
}
export interface SachDanhMuc{
  sachId : number;
  danhMucId : number;
  tenDanhMuc : string;

  listDanhMuc: DanhMuc[];
  danhMucIds : number [];
}

@Injectable({
  providedIn: 'root'
})

export class SachService {

  readonly APIUrlSach = "http://localhost:5095/api/Sach";
  readonly APIUrlSachPage = "http://localhost:5095/Page/Sach"
  readonly APIUrlSachDanhMuc = "http://localhost:5095/api/SachDanhMuc";
  readonly ApIUrlDanhMuc = "http://localhost:5095/api/DanhMuc"

  constructor(private http:HttpClient) { }
//DanhMuc  
  getAllDanhMuc():Observable<DanhMuc[]> {
    return this.http.get<DanhMuc[]>(`${this.ApIUrlDanhMuc}`);
  }
//Sach
  getAllSach():Observable<Sach[]> {
    return this.http.get<Sach[]>(`${this.APIUrlSach}`);
  }

  addSach(sach : Sach, danhMucIds : number[], ): Observable<Sach> {
    return this.http.post<Sach>(`${this.APIUrlSach}`, sach).pipe(
      switchMap((newSach : Sach) =>{
        const sachDanhMucRequest = danhMucIds.map(danhMucId => { 
          return this.http.post<SachDanhMuc>(`${this.APIUrlSachDanhMuc}`, {sachId : newSach.id, danhMucId})
        });
        return forkJoin(sachDanhMucRequest).pipe(
          map(() => newSach)
        )
      })
    )
  }

  

  updateSach(update: any): Observable<any> {
    return this.http.put(`${this.APIUrlSach}/${update.id}`, update);
  }

  deleteSach(id: number):Observable<any>{
    return this.http.delete(`${this.APIUrlSach}/${id}`);
  }

  getSachById(id: number): Observable<Sach>{
    return this.http.get<Sach>(`${this.APIUrlSach}/${id}`);
  }


//sach danh muc
  getSachDanhMuc(): Observable<Sach[]> {
    return this.getAllSach().pipe(
      switchMap(sachList => 
        this.http.get<SachDanhMuc[]>(`${this.APIUrlSachDanhMuc}`).pipe(
          switchMap(sachDanhMucList => 
            this.getAllDanhMuc().pipe(
              map(danhMucList => 
                sachList.map(sach => {
                  const relatedDanhMucIds = sachDanhMucList.filter(sdm => sdm.sachId === sach.id).map(sdm => sdm.danhMucId);
                  sach.listDanhMuc = danhMucList.filter(dm => relatedDanhMucIds.includes(dm.id));
                  return sach;
                })
              )
            )
          )
        )
      )
    );
  }

  addSachDanhMuc(relation : {sachId : number,  danhMucId : number}){
    return this.http.post(`${this.APIUrlSachDanhMuc}`, relation);
  }
  
  updateSachDanhMuc( sachId: number, danhMucIds: number[] ) {

    return this.http.put(`${this.APIUrlSachDanhMuc}/${sachId}`, danhMucIds);
  }
  
  deleteSachDanhMuc(sachId : number,  danhMucId :  number){
    return this.http.delete(`${this.APIUrlSachDanhMuc}/${sachId}/${danhMucId}`)
  }
  getSachDanhMucBySachId(sachId: number): Observable<SachDanhMuc[]> {
    return this.http.get<SachDanhMuc[]>(`${this.APIUrlSachDanhMuc}/${sachId}`);
  }
//Page
  getSachPage(currentPage : number ,pageSize : number ): Observable<PagedResult<Sach>>{
    return this.http.get<PagedResult<Sach>>(`${this.APIUrlSachPage}?page=${currentPage}&size=${pageSize}`).pipe(
      switchMap(Page =>{
        const sachIds = Page.items.map(sach => sach.id);
        return forkJoin({
          sachPage : of (Page),
          sachDanhMuc : this.http.get<SachDanhMuc[]>(`${this.APIUrlSachDanhMuc}`).pipe(
            map(sdmList => sdmList.filter(sdm => sachIds.includes(sdm.sachId)))
          ),
          allDanhMuc : this.getAllDanhMuc()
        }).pipe(
          map(({sachPage, sachDanhMuc, allDanhMuc}) => {
            sachPage.items.forEach(sach =>{
              const relatedDanhMucIds = sachDanhMuc.filter(sdm => sdm.sachId === sach.id).map(sdm => sdm.danhMucId);
              sach.listDanhMuc = allDanhMuc.filter(dm => relatedDanhMucIds.includes(dm.id));
            });
            return sachPage;
          })
        )
      })
    )
  }
}
