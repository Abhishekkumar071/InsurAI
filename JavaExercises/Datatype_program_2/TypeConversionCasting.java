package Datatype_programs;
import java.util.Scanner;
public class TypeConversionCasting {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        // 1) Widening conversion (safe, implicit)
        int i = 123456;
        long widened = i; 
        double widened2 = i; 
        System.out.println("Widening conversions:");
        System.out.println("int i = " + i + " -> long widened = " + widened + " -> double widened2 = " + widened2);

        // 2) Narrowing conversion (explicit, may lose data)
        double pi = 3.99;
        int narrowed = (int) pi; 
        System.out.println("\nNarrowing conversion:");
        System.out.println("double pi = " + pi + " -> int (cast) = " + narrowed);

        // 3) Demonstrate possible loss with large numbers
        long big = 9_223_372_036_854_775L;
        int castToInt = (int) big;
        System.out.println("\nCasting large long to int may change value:");
        System.out.println("long big = " + big + " -> (int) big = " + castToInt);

        // 4) Parse user input (String to numbers) with exception handling
        System.out.println("\nEnter an integer (or something invalid to see error handling): ");
        String userInput = sc.nextLine();
        try {
            int parsed = Integer.parseInt(userInput.trim());
            System.out.println("Parsed integer: " + parsed);
        } catch (NumberFormatException ex) {
            System.out.println("Invalid integer: \"" + userInput + "\". Exception: " + ex.getMessage());
        }

        // 5) Parse double
        System.out.println("\nEnter a floating number (double): ");
        String sDouble = sc.nextLine();
        try {
            double parsedDouble = Double.parseDouble(sDouble.trim());
            System.out.printf("Parsed double: %.6f%n", parsedDouble);
        } catch (NumberFormatException ex) {
            System.out.println("Invalid double: \"" + sDouble + "\". Exception: " + ex.getMessage());
        }
        sc.close();
    }
}

