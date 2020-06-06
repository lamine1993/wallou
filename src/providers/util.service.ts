import {  Injectable } from '@angular/core';
import { ToastController, Platform } from 'ionic-angular';
import moment from 'moment';
import * as _ from 'lodash';
@Injectable()
export class UtilService {
    constructor(public platform: Platform) {
  }

  getDate():string{
      return moment.HTML5_FMT.DATETIME_LOCAL_SECONDS
  }
}