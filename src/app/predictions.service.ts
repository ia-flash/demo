import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { PredBox } from './predbox';

export interface SivnormResponse {
  marque: string;
  modele: string;
  score: number;
}

@Injectable({
  providedIn: 'root'
})
export class PredictionsService {

  constructor(private http: HttpClient) { }

  objectDection(formData: FormData | {}) {
    return this.http.post<PredBox[]>(`/matchvec/object_detection`, formData);
  }

  videoDetection(formData: FormData | {}) {
    return this.http.post<any>(`/matchvec/video_detection`, formData);
  }

  statusVideoDetection(taskId) {
    return this.http.get<any>(`/matchvec/status/${taskId}`);
  }

  classPrediction(formData: FormData) {
    return this.http.post<PredBox[]>(`/matchvec/predict`, formData);
  }

  callSivnorm(marque, modele, tbRefname) {
    return this.http.get<SivnormResponse>(`/sivnorm/norm/${tbRefname}?marque=${marque}&modele=${modele}`);
  }

  callSivnormCsv(files, tbRefname) {
    const formData: FormData = new FormData();
    formData.append('file', files[0], files[0].name);
    return this.http.post(`/sivnorm/norm/${tbRefname}`, formData, {responseType: 'text'});
  }
}
