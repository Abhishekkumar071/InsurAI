package Conditional_Program;

import java.util.Scanner;
public class LoanEligibility {
    public static double computeEmi(double principal, double annualRatePercent, int years) {
        double r = annualRatePercent / 100.0 / 12.0;
        int n = years * 12;
        if (r == 0) return principal / n;
        double emi = principal * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
        return emi;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Annual income (INR): ");
        double income = sc.nextDouble();
        System.out.print("Credit score (300-900): ");
        int credit = sc.nextInt();
        System.out.print("Existing monthly EMI (INR): ");
        double existingEmi = sc.nextDouble();
        System.out.print("Requested loan amount (INR): ");
        double loanAmount = sc.nextDouble();
        System.out.print("Loan term (years): ");
        int termYears = sc.nextInt();
        double dti = (existingEmi * 12) / income;
        String decision = "Rejected";
        String offer = "None";
        double rate = 0.0;
        double emi = 0.0;
        if (credit >= 750 && income >= 300000 && dti < 0.40) {
            decision = "Approved";
            offer = "Low Interest";
            rate = 9.0;
        } else if (credit >= 700 && income >= 200000 && dti < 0.45) {
            decision = "Approved";
            offer = "Standard Interest";
            rate = 11.5;
        } else if (credit >= 650 && income >= 150000 && dti < 0.50) {
            decision = "Conditional - Review Required";
            offer = "Review";
            rate = 14.0;
        } else {
            decision = "Rejected";
            offer = "None";
            rate = 0.0;
        }
        if (!offer.equals("None")) {
            emi = computeEmi(loanAmount, rate, termYears);
        }
        System.out.println("\n--- Loan Decision ---");
        System.out.println("Decision: " + decision);
        System.out.println("Offer Tier: " + offer);
        if (!offer.equals("None")) {
            System.out.printf("Interest Rate (approx): %.2f%% per annum%n", rate);
            System.out.printf("Estimated Monthly EMI: INR %.2f%n", emi);
        }
        System.out.printf("Debt-to-Income (existing EMI *12 / income): %.2f%n", dti);
        sc.close();
    }
}
