package Operator_Programs;

public class BitwiseAndAssignment{
    // helper to show 8-bit binary (for small numbers)
    private static String bin8(int v) {
        String s = Integer.toBinaryString(v & 0xFF);
        while (s.length() < 8) s = "0" + s;
        return s;
    }

    public static void main(String[] args) {
        int p = 6;  // binary 00000110
        int q = 3;  // binary 00000011

        System.out.println("p = " + p + " (" + bin8(p) + ")");
        System.out.println("q = " + q + " (" + bin8(q) + ")\n");

        System.out.println("p & q = " + (p & q) + " (" + bin8(p & q) + ")");
        System.out.println("p | q = " + (p | q) + " (" + bin8(p | q) + ")");
        System.out.println("p ^ q = " + (p ^ q) + " (" + bin8(p ^ q) + ")");
        System.out.println("~p (last 8 bits) = " + (~p + " (" + bin8(~p) + ")"));

        System.out.println("\nLeft shift p << 2 = " + (p << 2) + " (" + Integer.toBinaryString(p << 2) + ")");
        System.out.println("Right shift p >> 1 = " + (p >> 1) + " (" + Integer.toBinaryString(p >> 1) + ")");

        // Assignment operators
        int a = 10;
        System.out.println("\nStart a = " + a);
        a += 5;  // a = a + 5
        System.out.println("After a += 5 -> a = " + a);
        a *= 2;  // a = a * 2
        System.out.println("After a *= 2 -> a = " + a);
        a &= 7;  // a = a & 7
        System.out.println("After a &= 7 -> a = " + a + " (" + Integer.toBinaryString(a) + ")");
    }
}
