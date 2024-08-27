import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import type { InvestmentInput } from '../models/investement-input.model';
import { InvestmentService } from '../investement.service';

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css',
})
export class UserInputComponent {
  investmentInput = signal<InvestmentInput>({
    initialInvestment: 0,
    annualInvestment: 0,
    expectedReturn: 5,
    duration: 10,
  });

  constructor(private investmentService: InvestmentService) {}

  onSubmit() {
    this.investmentService.onCalculateInvestmentResults(this.investmentInput());
    this.investmentInput.set({
      initialInvestment: 0,
      annualInvestment: 0,
      expectedReturn: 5,
      duration: 10,
    });
  }
}
