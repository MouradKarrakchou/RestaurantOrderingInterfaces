package fr.teama.bff.entities;

import java.net.URL;
import java.util.UUID;

public class MenuItem {

        private UUID id;

        private String fullName;

        private String shortName;

        private double price; // in euro

        private Category category;

        private URL image;

        public UUID getId() {
                return id;
        }

        public void setId(UUID id) {
                this.id = id;
        }

        public String getFullName() {
                return fullName;
        }

        public void setFullName(String fullName) {
                this.fullName = fullName;
        }

        public String getShortName() {
                return shortName;
        }

        public void setShortName(String shortName) {
                this.shortName = shortName;
        }

        public double getPrice() {
                return price;
        }

        public void setPrice(double price) {
                this.price = price;
        }

        public Category getCategory() {
                return category;
        }

        public void setCategory(Category category) {
                this.category = category;
        }

        public URL getImage() {
                return image;
        }

        public void setImage(URL image) {
                this.image = image;
        }
}
