import { Injectable, Optional, Inject, Injector } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpRequest } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { downLoadFile, CONTEXT_PATH, BASE_URL } from '../../utils';
import { Observable } from 'rxjs';
import { AppConfigService } from '../config/app-config.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {

  protected fullUrl;
  private appConfigService: AppConfigService;

  constructor(
    protected injector: Injector,
    protected http: HttpClient,
    @Inject('ENDPOINT') protected endpoint: string,
    @Inject(CONTEXT_PATH) @Optional() protected contextPathKey?: string,
    @Inject(BASE_URL) @Optional() protected baseUrlKey?: string
  ) {
    this.contextPathKey = contextPathKey !== undefined ? contextPathKey : injector.get(CONTEXT_PATH);
    this.baseUrlKey = baseUrlKey !== undefined ? baseUrlKey : injector.get(BASE_URL);
    this.appConfigService = injector.get(AppConfigService);
    this.endpoint = endpoint;
  }

  getFullUrl() {
    return this.appConfigService.getByKey(this.baseUrlKey) + this.appConfigService.getByKey(this.contextPathKey);
  }

  setContextPath(contextPath: string) {
    this.fullUrl = this.appConfigService.getByKey(this.baseUrlKey) + contextPath;
  }

  setEndpoint(endpoint: string) {
    this.endpoint = endpoint;
  }

  post(data: any, extraUrl?: string, options?: any): Observable<any> {
    let part = extraUrl ? `/${extraUrl}` : '';
    return this.http.post(`${this.getFullUrl()}/${this.endpoint}${part}`, data, { ...options });
  }

  put(data: any, extraUrl?: string | number | Number) {
    let part = extraUrl ? `/${extraUrl}` : '';
    return this.http.put(`${this.getFullUrl()}/${this.endpoint}${part}`, data);
  }

  delete(extraUrl?: string | number | Number) {
    let part = extraUrl ? `/${extraUrl}` : '';
    return this.http.delete(`${this.getFullUrl()}/${this.endpoint}${part}`);
  }

  get(extraPartUrl?: string, params?: HttpParams) {
    return this.http.get(`${this.getFullUrl()}/${this.getUrlPart(this.endpoint, extraPartUrl)}`, { params });
  }

  download(extraPartUrl?: string, params?: HttpParams) {
    return this.http.get(`${this.getFullUrl()}/${this.getUrlPart(this.endpoint, extraPartUrl)}`,
      { responseType: 'blob', observe: 'response', params })
      .pipe(
        map(res => {
          let contentDisposition = res.headers.get('Content-disposition') || '';
          let idx = contentDisposition.indexOf('filename=');
          let fileName = idx === -1 ? 'Reporte' : contentDisposition.substring(idx + 9);
          downLoadFile(res.body, res.headers.get('Content-type'), fileName);
          return res;
        })
      );
  }

  postDownload(data: any, extraUrl?: string, options?: any): Observable<any> {
    let part = extraUrl ? `/${extraUrl}` : '';
    return this.http.post(`${this.getFullUrl()}/${this.endpoint}${part}`, data,
      { responseType: 'blob', observe: 'response' })
      .pipe(
        map(res => {
          let contentDisposition = res.headers.get('Content-disposition') || '';
          let idx = contentDisposition.indexOf('filename=');
          let fileName = idx === -1 ? 'Reporte' : contentDisposition.substring(idx + 9);
          downLoadFile(res.body, res.headers.get('Content-type'), fileName);
          return res;
        })
      );
  }

  deleteObject(obj: any) {
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
      body: obj
    };
    return this.http.delete(`${this.getFullUrl()}/${this.endpoint}`,options);
  }

  upload(formData: FormData, extraUrl?: string, moreOptions?: any): Observable<any>{
    let part = extraUrl ? `/${extraUrl}` : '';
    const options = {
//      headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data;boundary=BOECBD07-EBF1-4EA7-966C-E492A9F2C36E'})
      headers: new HttpHeaders({ 'x-upload-file': 'true'})
    };
    return this.http.post(`${this.getFullUrl()}/${this.endpoint}${part}`, formData, {...moreOptions});
  }

  getHttpParamsFromCriteria(criteria: any) {
    let httpParams = new HttpParams();
    for (let key in criteria) {
      let type = typeof criteria[key];
      switch (type) {
        case 'string':
          httpParams = httpParams.append(key, criteria[key]);
          break;
        case 'number':
          httpParams = httpParams.append(key, String(criteria[key]));
          break;
        default:
          if (Array.isArray(criteria[key])) {
            criteria[key]
              .filter(item => typeof item === 'string' || typeof item === 'number')
              .forEach(item => {
                if (typeof item === 'number') {
                  httpParams = httpParams.append(key, String(item));
                } else {
                  httpParams = httpParams.append(key, item);
                }
              })
          }
      }
    }
    return httpParams;
  }

  /**
   * Example: getUrlPart('bin','/id')
   */
  private getUrlPart(endpoint: string, extraPart: string) {
    if (!extraPart) {
      return endpoint;
    }
    return endpoint + extraPart;
  }
}
