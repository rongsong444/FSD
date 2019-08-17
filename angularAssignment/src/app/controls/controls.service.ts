import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class ControlsService {

    constructor(private http: HttpClient, private router: Router) {
    }
    /*get local json*/
    getDemoData() {
        const promise = new Promise((resolve) => {
                this.http.get('assets/json/videodata.json')
            .subscribe((resp) => {
                resolve(resp);
            });
        });
        return promise;
				}
				
		    /*use json-server get local json*/
				getJsonData() {
					const promise = new Promise((resolve) => {
									this.http.get('http://localhost:3000/videoList')
							.subscribe((resp) => {
									resolve(resp);
							});
					});
					return promise;
          }
          
        /*use json-server get add video json*/
				getAddData() {
					const promise = new Promise((resolve) => {
									this.http.get('http://localhost:3000/videoAdd')
							.subscribe((resp) => {
									resolve(resp);
							});
					});
					return promise;
					}

				/*use json-server get add video json*/
				addAddData(body:any) {
					this.http.post('http://localhost:3000/videoAdd',body)
							.subscribe((resp) => {
					});
				}

				/*use json-server get add video json*/
				deleteData(id) {
					const promise = new Promise((resolve) => {
									this.http.delete('http://localhost:3000/videoAdd/'+id)
							.subscribe((resp) => {
									resolve(resp);
							});
					});
					return promise;
					}

				/*use json-server get add video json*/
				editorAddData(id:any,body:any) {
					this.http.put('http://localhost:3000/videoAdd/'+id,body)
							.subscribe((resp) => {
					});
				}


				/*use json-server get add video json*/
				approveAddData(id:any,body:any) {
					this.http.put('http://localhost:3000/videoAdd/'+id,body)
							.subscribe((resp) => {
					});
				}

}
