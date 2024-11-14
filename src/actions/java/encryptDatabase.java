import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.stream.Collectors;

public class DatabaseEncryption {
   public static List<EmployeeBytes> encryptDatabase(List<Employee> clearDatabase) {
       byte[] key = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32};
       byte[] nonce = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16};

       return clearDatabase.stream()
               .map(employee -> new EmployeeBytes(
                       encryptField(employee.getFirst()),
                       encryptField(employee.getLast()),
                       encryptField(employee.getEmail()),
                       encryptField(employee.getCountry()),
                       encryptField(String.valueOf(employee.getSalary()))
               ))
               .collect(Collectors.toList());
   }

   private static byte[] encryptField(String field) {
       try {
           Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
           SecretKeySpec secretKey = new SecretKeySpec(key, "AES");
           IvParameterSpec iv = new IvParameterSpec(nonce);
           cipher.init(Cipher.ENCRYPT_MODE, secretKey, iv);
           return cipher.doFinal(field.getBytes(StandardCharsets.UTF_8));
       } catch (Exception e) {
           throw new RuntimeException("Error encrypting field", e);
       }
   }
}