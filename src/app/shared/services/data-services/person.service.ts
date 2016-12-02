import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import {Message, Person} from '../../models';
import { CONFIG } from '../../config';

@Injectable()
export class PersonService {
    private headers: Headers;
    
    constructor(private http: Http) { 
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }

    getPeople(): Observable<Person[]> {
        return this.http.get(CONFIG.personUrl)
            .map((response: Response) => <Person[]>response.json())
            .catch(this.handleError);
    }

    getPerson(id: number): Observable<Person> {
        return this.http.get(CONFIG.personUrl + "/" + id)
            .map((response: Response) => <Person>response.json())
            .catch(this.handleError);
    }
    
    savePerson(person: Person): Observable<Message> {
        if(person.id === 0){
            return this.createPerson(person);
        }else{
            return this.updatePerson(person);
        }
    }

    createPerson(person: Person): Observable<Message> {

        return this.http.post(
            CONFIG.personUrl,
            person,
            { headers: this.headers })
        .map((response: Response) => <Message>{type:"SUCCESS", text:"Person added successfully"})
        .catch(this.handleError);
    }

    updatePerson(person: Person): Observable<Message> {
        return this.http.put(
            CONFIG.personUrl + "/" + person.id,
            person,
            { headers: this.headers })
        .map((response: Response) => <Message>{type:"SUCCESS", text:"Person updated successfully"})
        .catch(this.handleError);
    }

    deletePerson(id: number): Observable<Message> {
        return this.http.delete(
            CONFIG.personUrl + "/" + id,
            { headers: this.headers })
        .map((response: Response) => <Message>{type:"SUCCESS", text:"Person deleted successfully"})
        .catch(this.handleError);
    }
    
    private handleError(error: Response) {
        return Observable.throw(error.json().error || 'Server error');
    }

}