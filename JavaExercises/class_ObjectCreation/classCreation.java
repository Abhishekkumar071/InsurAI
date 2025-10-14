class Student {
    String name;
    int age;

    // Constructor
    Student(String n, int a) {
        name = n;
        age = a;
    }

    // Method to display info
    void show() {
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
    }
}

public class classCreation  {
    public static void main(String[] args) {
        // Object creation
        Student s1 = new Student("Abhishek", 20);
        Student s2 = new Student("Ravi", 22);

        s1.show();
        s2.show();
    }
}
