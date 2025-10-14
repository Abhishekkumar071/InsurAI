package Operator_Programs;

public class ArithmeticOperators {
    public static void main(String[] args) {
        int a = 15;
        int b = 4;

        System.out.println("a = " + a + ", b = " + b);

        // Basic arithmetic
        System.out.println("a + b = " + (a + b));
        System.out.println("a - b = " + (a - b));
        System.out.println("a * b = " + (a * b));
        System.out.println("a / b (integer) = " + (a / b));
        System.out.println("a / b (float) = " + ((double)a / b));
        System.out.println("a % b = " + (a % b));

        // Increment / Decrement
        int x = 5;
        System.out.println("\nStart x = " + x);
        System.out.println("Post-increment x++ -> returns " + (x++));
        System.out.println("Now x = " + x);
        x = 5; // reset
        System.out.println("Pre-increment ++x -> returns " + (++x));
        System.out.println("Now x = " + x);
    }
}
