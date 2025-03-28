import { Component ,OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-questionnaire',
  standalone: true,
  imports: [],
  templateUrl: './customer-questionnaire.component.html',
  styleUrl: './customer-questionnaire.component.css'
})
export class CustomerQuestionnaireComponent implements OnInit{

  ngOnInit(): void {
    console.log('Customer Questionnaire Component initialized');
  }
}
