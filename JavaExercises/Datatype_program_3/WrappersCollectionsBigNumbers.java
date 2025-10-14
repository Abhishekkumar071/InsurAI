package Datatype_programs;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

public class WrappersCollectionsBigNumbers {
    public static void main(String[] args) {
        // 1) Wrapper classes and autoboxing/unboxing
        Integer wInt = 100;
        int primitiveInt = wInt;
        System.out.println("Wrapper and primitive:");
        System.out.println("Integer wInt = " + wInt + ", int primitiveInt = " + primitiveInt);

        // 2) == vs equals for wrappers
        Integer a = 127;
        Integer b = 127;
        Integer c = 128;
        Integer d = 128;
        System.out.println("\n== vs equals:");
        System.out.println("a == b ? " + (a == b) + "   a.equals(b)? " + a.equals(b));
        System.out.println("c == d ? " + (c == d) + "   c.equals(d)? " + c.equals(d));

        // 3) Collections of boxed types (ArrayList)
        List<Integer> intList = new ArrayList<>();
        for (int k = 1; k <= 5; k++) {
            intList.add(k * 10);
        }
        System.out.println("\nArrayList<Integer> contents: " + intList);

        // 4) Null unboxing pitfall
        Integer maybeNull = null;
        try {
            int x = maybeNull; // will throw NullPointerException at unboxing
            System.out.println("This won't print: " + x);
        } catch (NullPointerException npe) {
            System.out.println("\nNull unboxing pitfall: unboxing a null Integer throws NullPointerException");
        }

        // 5) BigInteger for very large integers
        BigInteger big1 = new BigInteger("123456789012345678901234567890");
        BigInteger big2 = new BigInteger("987654321098765432109876543210");
        BigInteger bigSum = big1.add(big2);
        System.out.println("\nBigInteger example:");
        System.out.println(big1 + " + " + big2 + " = " + bigSum);

        // 6) BigDecimal for exact decimal arithmetic (currency etc.)
        BigDecimal bd1 = new BigDecimal("0.1");
        BigDecimal bd2 = new BigDecimal("0.2");
        BigDecimal bdSum = bd1.add(bd2);
        System.out.println("\nBigDecimal example (exact decimal arithmetic):");
        System.out.println("0.1 + 0.2 using BigDecimal = " + bdSum);

        // 7) Conversions between String and wrapper
        String numStr = "2025";
        Integer fromStr = Integer.valueOf(numStr);
        System.out.println("\nString to wrapper and back:");
        System.out.println("String \"" + numStr + "\" -> Integer " + fromStr + " -> String " + fromStr.toString());
    }
}
