import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PagedResult } from '../../../main';
import { AuthService } from '../Auth/auth-service.service';

export interface DanhMuc{
  
  listDanhMucPage: DanhMuc[];
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

  listDanhMuc: DanhMuc[];
  danhMucIds : number [];
}

@Injectable({
  providedIn: 'root'
})
export class DanhMucService {
  readonly APIUrlDanhMuc = "http://localhost:5095/api/DanhMuc";
  readonly APIUrlDanhMucPage = "http://localhost:5095/api/DanhMuc/Page";

  constructor(
    private http:HttpClient,
    private authService : AuthService
  ) { }

  
  private getHeader(): HttpHeaders {
    const token = this.authService.getToken();
    
    return token
    ? new HttpHeaders({ "Authorization": `Bearer ${token}` })
    : new HttpHeaders();
  }

  getAllDanhMuc(): Observable<DanhMuc[]> {
    return this.http.get<DanhMuc[]>(this.APIUrlDanhMuc, { headers: this.getHeader() });
  }
  getDanhMucPage(currentPage: number, pageSize: number): Observable<PagedResult<DanhMuc>> {
    return this.http.get<PagedResult<DanhMuc>>(`${this.APIUrlDanhMucPage}?page=${currentPage}&size=${pageSize}`, { headers: this.getHeader() });
  }

  addDanhMuc(danhMuc: DanhMuc): Observable<DanhMuc> {
    return this.http.post<DanhMuc>(this.APIUrlDanhMuc, danhMuc, { headers: this.getHeader() });
  }

  updateDanhMuc(danhMuc: DanhMuc): Observable<any> {
    return this.http.put(`${this.APIUrlDanhMuc}/${danhMuc.id}`, danhMuc, { headers: this.getHeader() });
  }

  deleteDanhMuc(id: number): Observable<any> {
    return this.http.delete(`${this.APIUrlDanhMuc}/${id}`, { headers: this.getHeader() });
  }

  getDanhMucById(id: number): Observable<DanhMuc> {
    return this.http.get<DanhMuc>(`${this.APIUrlDanhMuc}/${id}`, { headers: this.getHeader() });
  }
  
  getDanhMucByParentId(parentDanhMucId: number): Observable<DanhMuc[]> {
    return this.http.get<DanhMuc[]>(`${this.APIUrlDanhMuc}/${parentDanhMucId}`, { headers: this.getHeader() });
  }
  
}
