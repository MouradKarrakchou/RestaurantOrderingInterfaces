package fr.teama.bff.entities;

import com.fasterxml.jackson.annotation.JsonView;

import java.util.List;

public class Recipe {
    private String shortName;
    private Post post;
    private List<String> cookingSteps;
    private int meanCookingTimeInSec;

    public String getShortName() {
        return shortName;
    }

    public void setShortName(String shortName) {
        this.shortName = shortName;
    }

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    public List<String> getCookingSteps() {
        return cookingSteps;
    }

    public void setCookingSteps(List<String> cookingSteps) {
        this.cookingSteps = cookingSteps;
    }

    public int getMeanCookingTimeInSec() {
        return meanCookingTimeInSec;
    }

    public void setMeanCookingTimeInSec(int meanCookingTimeInSec) {
        this.meanCookingTimeInSec = meanCookingTimeInSec;
    }
}
