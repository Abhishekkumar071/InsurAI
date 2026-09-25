package com.insurai.platform;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		// Load .env file into system properties
		loadEnvFile();
		SpringApplication.run(BackendApplication.class, args);
	}
	
	private static void loadEnvFile() {
		try {
			String envPath = ".env";
			if (Files.exists(Paths.get(envPath))) {
				BufferedReader reader = new BufferedReader(new FileReader(envPath));
				String line;
				while ((line = reader.readLine()) != null) {
					line = line.trim();
					if (!line.isEmpty() && !line.startsWith("#")) {
						String[] parts = line.split("=", 2);
						if (parts.length == 2) {
							String key = parts[0].trim();
							String value = parts[1].trim();
							System.setProperty(key, value);
						}
					}
				}
				reader.close();
				System.out.println("✓ .env file loaded successfully");
			} else {
				System.out.println("⚠ .env file not found at " + envPath);
			}
		} catch (IOException e) {
			System.err.println("⚠ Warning: Could not load .env file: " + e.getMessage());
		}
	}

}
