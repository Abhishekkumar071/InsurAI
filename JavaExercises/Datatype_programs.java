package Datatype_programs;


public class PrimitiveTypesDemo {
    public static void main(String[] args) {
        // 1) Declare primitives
        byte b = 127;             
        short s = 32000;
        int i = 2_000_000_000;
        long l = 9_000_000_000L;
        float f = 3.14f;
        double d = 3.141592653589793;
        char c = 'A';
        boolean bool = true;

        // 2) Print values, sizes and MIN/MAX
        System.out.println("=== Primitive types overview ===");
        System.out.printf("byte: value=%d, size=%d bits, min=%d, max=%d%n", b, Byte.SIZE, Byte.MIN_VALUE, Byte.MAX_VALUE);
        System.out.printf("short: value=%d, size=%d bits, min=%d, max=%d%n", s, Short.SIZE, Short.MIN_VALUE, Short.MAX_VALUE);
        System.out.printf("int: value=%d, size=%d bits, min=%d, max=%d%n", i, Integer.SIZE, Integer.MIN_VALUE, Integer.MAX_VALUE);
        System.out.printf("long: value=%d, size=%d bits, min=%d, max=%d%n", l, Long.SIZE, Long.MIN_VALUE, Long.MAX_VALUE);
        System.out.printf("float: value=%f, size=%d bits, min=%e, max=%e%n", f, Float.SIZE, Float.MIN_VALUE, Float.MAX_VALUE);
        System.out.printf("double: value=%f, size=%d bits, min=%e, max=%e%n", d, Double.SIZE, Double.MIN_VALUE, Double.MAX_VALUE);
        System.out.printf("char: value=%c, as int=%d%n", c, (int) c);
        System.out.printf("boolean: value=%b (no size constants in Java)%n", bool);

        // 3) Integer overflow demonstration
        System.out.println("\n=== Integer overflow demo ===");
        int maxInt = Integer.MAX_VALUE;
        System.out.println("Integer.MAX_VALUE = " + maxInt);
        int overflow = maxInt + 1; 
        System.out.println("Integer.MAX_VALUE + 1 = " + overflow + " (wrap-around)");

        // 4) Promotion rules and casting
        System.out.println("\n=== Promotion and casting demo ===");
        byte bb1 = 10;
        byte bb2 = 20;
        // bb1 + bb2 is computed as int (automatic promotion), must cast back to byte
        byte bbSum = (byte)(bb1 + bb2);
        System.out.println("byte + byte -> int, cast back to byte: (byte)(10+20) = " + bbSum);

        // 5) char arithmetic
        char ch = 'a';
        int code = ch + 1;            // 'a' -> 97, 97 + 1 = 98
        char next = (char) code;
        System.out.printf("char '%c' -> code %d -> +1 -> code %d -> char '%c'%n", ch, (int)ch, code, next);

        // 6) Floating-point precision note
        System.out.println("\n=== Floating point precision demo ===");
        double p1 = 0.1 + 0.2;
        System.out.println("0.1 + 0.2 = " + p1 + " (not exactly 0.3 due to binary floating precision)");
    }
}
