import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HistoryRecord } from '../models/history-record.model';

@Injectable({
  providedIn: 'root'
})
export class HistoryService 
{
  historyArray: HistoryRecord[] = []
  
  constructor(private storage: Storage) 
  { 
    storage.get('history').then((val) => 
    {
      if(val)
      {
        this.historyArray = JSON.parse(val);
      }
    });
  }

  public saveRecord(record: HistoryRecord)
  {
    this.historyArray.unshift(record);
    this.storage.set('history', JSON.stringify(this.historyArray));
  }
  
  public getRecord()
  {
    return this.historyArray;
  }
} 