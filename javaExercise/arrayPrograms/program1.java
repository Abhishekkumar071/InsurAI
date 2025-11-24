public class TemperatureCheck {
    public static void main(String[] args) {
        int[] temp = {30, 32, 33, 35, 38};

        boolean rising = true;

        for (int i = 1; i < temp.length; i++) {
            if (temp[i] < temp[i - 1]) {
                rising = false;
                break;
            }
        }

        System.out.println("Temperature rising: " + rising);
    }
}
