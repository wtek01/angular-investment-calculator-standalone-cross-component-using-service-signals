import { Component, computed, inject, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { InvestmentResult } from '../models/investment-results.model';
import { InvestmentService } from '../investement.service';

@Component({
  selector: 'app-investment-results',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './investment-results.component.html',
  styleUrl: './investment-results.component.css',
})
export class InvestmentResultsComponent {
  // The constructor appoach dont work here, because the investmentService is not initialized yet
  /* annualInvestmentResults?: InvestmentResult[];
  constructor(private investmentService: InvestmentService) {
    console.log(
      'InvestmentResultsComponent annualInvestmentResults',
      this.annualInvestmentResults
    );
    this.annualInvestmentResults =
      this.investmentService.annualInvestmentResults;
  }*/

  private investmentService = inject(InvestmentService);
  // Without signal
  /* get annualInvestmentResults() {
    return this.investmentService.annualInvestmentResults;
  }*/

  // Signal version
  annualInvestmentResults = computed(() =>
    this.investmentService.annualInvestmentResults()
  );
}
