import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CreateAccountFormComponent } from "../../components/forms/create-account-form/create-account-form.component";

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [CommonModule, CreateAccountFormComponent],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.scss'
})
export class CreateAccountComponent {

}
