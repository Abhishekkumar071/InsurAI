package Operator_Programs;

public class RelationalLogicalOperators {
    public static void main(String[] args) {
        int age = 20;
        boolean hasID = true;

        System.out.println("age = " + age + ", hasID = " + hasID);

        // Relational tests
        System.out.println("age > 18 : " + (age > 18));
        System.out.println("age >= 21: " + (age >= 21));
        System.out.println("age == 20: " + (age == 20));
        System.out.println("age != 30: " + (age != 30));

        // Logical operators with if
        if (age >= 18 && hasID) {
            System.out.println("\nAllowed: age >= 18 AND hasID is true");
        } else {
            System.out.println("\nNot allowed: need age>=18 AND id");
        }

        if (age < 18 || !hasID) {
            System.out.println("Either under 18 OR missing ID (one of them).");
        } else {
            System.out.println("Not (under 18 or missing ID)");
        }
    }
}
