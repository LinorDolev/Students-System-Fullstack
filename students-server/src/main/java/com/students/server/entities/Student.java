package com.students.server.entities;

import com.students.server.Consts;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Entity
public class Student {
    @Id
    private String id;
    private String firstName;
    private String lastName;
    private Integer grade;
    private String address;
    private String city;
    private String state;

    public Student() {}

    public Student(String id, String firstName, String lastName, Integer grade, String address, String city, String state) {
        setId(id);
        setFirstName(firstName);
        setLastName(lastName);
        setGrade(grade);
        setAddress(address);
        setCity(city);
        setState(state);
    }

    public String getId() {
        return id;
    }

    public void setId(@NotNull String id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        if(firstName.length() > Consts.MAX_STR_LENGTH) {
            throw new RuntimeException(
                    String.format("First name is too long! max length allowed: %s", Consts.MAX_STR_LENGTH));
        }
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        if(lastName.length() > Consts.MAX_STR_LENGTH) {
            throw new RuntimeException(
                    String.format("Last name is too long! max length allowed: %s", Consts.MAX_STR_LENGTH));
        }
        this.lastName = lastName;
    }

    public Integer getGrade() {
        return grade;
    }

    public void setGrade(Integer grade) {
        if(grade > Consts.MAX_GRADE || grade < Consts.MIN_GRADE) {
            throw new RuntimeException(
                    String.format("Grade must be a number between %d and %d, received: %d",
                            Consts.MIN_GRADE, Consts.MAX_GRADE, grade));
        }
        this.grade = grade;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        if(address.length() > Consts.MAX_STR_LENGTH) {
            throw new RuntimeException(
                    String.format("Address is too long! max number of characters allowed: %s", Consts.MAX_STR_LENGTH));
        }
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        if(city.length() > Consts.MAX_STR_LENGTH) {
            throw new RuntimeException(
                    String.format("City is too long! max number of characters allowed: %s", Consts.MAX_STR_LENGTH));
        }
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        if(city.length() > Consts.MAX_STR_LENGTH) {
            throw new RuntimeException(
                    String.format("State is too long! max number of characters allowed: %s", Consts.MAX_STR_LENGTH));
        }
        this.state = state;
    }


    @Override
    public String toString() {
        return "Student{" +
                "id='" + id + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", grade=" + grade +
                ", address='" + address + '\'' +
                ", city='" + city + '\'' +
                ", state='" + state + '\'' +
                '}';
    }
}
