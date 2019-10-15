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
        super("api/entries", injector);
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

    protected jsonDataToResources(jsonData: any[]): Entry[] {
        const entries: Entry[] = [];

        console.log(jsonData[0] as Entry);//Não tranforma o json em objeto do tipo Entry. Cast não funciona legal.
        console.log(Object.assign(new Entry(), jsonData[0]));

        //jsonData.forEach(element => entries.push(element as Entry));

        jsonData.forEach(element => {
            const entry = Object.assign(new Entry(), element);
            entries.push(entry);
        });

        return entries;
    }

    //private jsonDataToEntry(jsonData: any): Entry {
    //    return jsonData as Entry;
    //}

    protected jsonDataToResource(jsonData: any): Entry {
        return Object.assign(new Entry(), jsonData);
    }
}
