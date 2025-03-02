package calculator;

import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class CalculatorController {

    @PostMapping("/api/multiply")
    public Map<String, Object> multiply(@RequestBody Map<String, Object> payload) {
        double num1 = Double.parseDouble(payload.get("num1").toString());
        double num2 = Double.parseDouble(payload.get("num2").toString());
        double result = num1 * num2;
        
        Map<String, Object> response = new HashMap<>();
        response.put("operation", "multiply");
        response.put("result", result);
        return response;
    }

    @PostMapping("/api/divide")
    public Map<String, Object> divide(@RequestBody Map<String, Object> payload) {
        double num1 = Double.parseDouble(payload.get("num1").toString());
        double num2 = Double.parseDouble(payload.get("num2").toString());
        
        Map<String, Object> response = new HashMap<>();
        
        if (num2 == 0) {
            response.put("operation", "divide");
            response.put("error", "Cannot divide by zero");
            return response;
        }
        
        double result = num1 / num2;
        response.put("operation", "divide");
        response.put("result", result);
        return response;
    }

    @GetMapping("/health")
    public Map<String, String> health() {
        Map<String, String> status = new HashMap<>();
        status.put("status", "healthy");
        return status;
    }
}