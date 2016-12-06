import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {PersonService} from '../shared/services/data-services';
import {Message, Person} from '../shared/models';

@Component({
  selector: 'people',
  providers: [PersonService],
  styles: [`
  `],
  templateUrl: './people.component.html'
})

export class PeopleComponent {
  people: Person[];
  message: Message;

  constructor(private personService: PersonService,  
    private route: ActivatedRoute,
    private router: Router) {
    }

   ngOnInit(){
     this.getPeople();
   }

  private getPeople(): void {
    this.personService
            .getPeople()
            .subscribe((data: Person[]) =>{this.people = data;},
            error => console.log(error),
            () => console.log("Get people Complete!"));      
  }

  private addPerson(): void {
      this.navigateToPerson(0,"Add");
  }

  private viewPerson(id:number): void {
      this.navigateToPerson(id,"View");
  }

  private editPerson(id:number): void {
      this.navigateToPerson(id,"Edit");
  }

  private deletePerson(person: Person): void {
    if(confirm("Are you sure you want to delete this person")){
      this.personService.deletePerson(person.id)
          .subscribe((msg: Message) =>{
              this.people.splice(this.people.indexOf(person),1); 
              this.message = msg;
            },
            error => console.log(error),
            () => console.log("Delete Person Complete!"));
    }   
  }

  private navigateToPerson(id:number,mode:string): void {
    this.router.navigate(['/person', id,mode]);
  }

}
