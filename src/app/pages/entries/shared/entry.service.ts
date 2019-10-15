import { Observable } from "rxjs";
import { flatMap } from "rxjs/operators";
import { Injectable, Injector } from '@angular/core';

import { BaseResourceService } from "../../../shared/services/base-resource.service";
import { CategoryService } from "../../categories/shared/category.service";

import { Entry } from "./entry.model";

@Injectable({
    providedIn: 'root'
})

export class EntryService extends BaseResourceService<Entry> {

    constructor(protected injector: Injector, private categoryService: CategoryService) {
        super("api/entries", injector, Entry.fromJson);
    }

    // create(entry: Entry): Observable<Entry> {
    //     return this.http.post(this.apiPath, entry).pipe(
    //         catchError(this.handleError),
    //         map(this.jsonDataToEntry)
    //     )
    // }

    create(entry: Entry): Observable<Entry> {
        return this.categoryService.getById(entry.categoryId).pipe(
            flatMap(category => {
                entry.category = category;
                return super.create(entry)
            })
        );
    }

    // update(entry: Entry): Observable<Entry> {
    //     const url = `${this.apiPath}/${entry.id}`;

    //     return this.http.put(url, entry).pipe(
    //         catchError(this.handleError),
    //         map(() => entry)
    //     )
    // }

    update(entry: Entry): Observable<Entry> {
    
        return this.categoryService.getById(entry.categoryId).pipe(
          flatMap(category => {
            entry.category = category;
              return super.update(entry)
          })
        )
      }

    // PRIVATE METHODS

    //private jsonDataToEntry(jsonData: any): Entry {
    //    return jsonData as Entry;
    //}
}
