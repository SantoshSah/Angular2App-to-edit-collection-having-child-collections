import { Component } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import {Address, Message, Person} from '../shared/models';
import {PersonService} from '../shared/services/data-services';


@Component({
  selector: 'person',
  providers: [PersonService],
  templateUrl:'./person.component.html'
})

export class PersonComponent {
  id: number;
  mode: string;
  subParams: any;
  person: Person;
  people: Person[];
  message: Message;

  constructor(private personService: PersonService, 
    private route: ActivatedRoute,
    private router: Router) {
    }

   ngOnInit(){
        this.getPerson(); 
   }

  private getPerson(): void {
    this.subParams = this.route.params.subscribe(params => {
       this.id = +params['id']; // (+) converts string 'id' to a number
       this.mode = params['mode'] ? params['mode'] : 'View';
       if(this.id === 0){
         //provide blank view to add new person
          this.person = <Person>{id:0,firstName:"",lastName:"",addresses:[<Address>{id:0,city:"",street:""}]};
       }else{
         //pull person from data service
         this.personService
            .getPerson(this.id)
            .subscribe((data: Person) =>{this.person = data},
            error => console.log(error),
            () => console.log("Get Person Complete!"));
       }
    });
  }

  private save(): void {
    this.personService.savePerson(this.person)
    .subscribe((msg: Message) =>{
              this.message = msg;
            },
            error => console.log(error),
            () => console.log("Save Person Complete!"));
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }

  ngOnDestroy() {
    this.subParams.unsubscribe();
  }

}
