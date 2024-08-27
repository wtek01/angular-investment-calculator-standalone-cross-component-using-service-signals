import { Injectable, signal } from '@angular/core';
import { InvestmentInput } from './models/investement-input.model';
import { InvestmentResult } from './models/investment-results.model';

@Injectable({
  providedIn: 'root',
})
export class InvestmentService {
  annualInvestmentResults = signal<InvestmentResult[] | undefined>(undefined);

  onCalculateInvestmentResults(investmentInput: InvestmentInput) {
    const { initialInvestment, annualInvestment, expectedReturn, duration } =
      investmentInput;

    // Vérifier si toutes les valeurs d'entrée sont valides
    if (
      !initialInvestment ||
      !annualInvestment ||
      !expectedReturn ||
      !duration ||
      initialInvestment <= 0 ||
      annualInvestment < 0 ||
      expectedReturn < 0 ||
      duration <= 0
    ) {
      // Si une valeur n'est pas valide, réinitialiser les résultats à undefined
      this.annualInvestmentResults.set(undefined);
      return;
    }

    const annualData: InvestmentResult[] = [];
    let investmentValue = initialInvestment;

    for (let i = 0; i < duration; i++) {
      const year = i + 1;
      const interestEarnedInYear = investmentValue * (expectedReturn / 100);
      investmentValue += interestEarnedInYear + annualInvestment;
      const totalInterest =
        investmentValue - annualInvestment * year - initialInvestment;
      annualData.push({
        year: year,
        interest: interestEarnedInYear,
        valueEndOfYear: investmentValue,
        annualInvestment: annualInvestment,
        totalInterest: totalInterest,
        totalAmountInvested: initialInvestment + annualInvestment * year,
      });
    }

    // Ne définir les résultats que si des calculs ont été effectués
    if (annualData.length > 0) {
      this.annualInvestmentResults.set(annualData);
    } else {
      this.annualInvestmentResults.set(undefined);
    }
  }
}
