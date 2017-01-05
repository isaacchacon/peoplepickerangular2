import { Injectable } from '@angular/core';
import { Http, RequestOptions, Request, RequestMethod, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import * as pnp from "sp-pnp-js";
import * as sp from "sp-pnp-js";

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()

export class ListService {

  // url for your sharepoint site.
  private url: string = "https://gajanansp.sharepoint.com/";

  constructor(private http: Http) { }

  search(term: string) {
    return new pnp.Web(this.url).siteUsers.filter("substringof('" + term + "', Email )").get();
  }
}
