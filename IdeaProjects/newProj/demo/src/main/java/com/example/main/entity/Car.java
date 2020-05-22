package com.example.main.entity;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "cars")
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    private String num;

    private String color;

    private String mark;

    private boolean is_foreign;

    public Car () {
    }

    @OneToMany(mappedBy = "car", cascade = CascadeType.ALL)
    private Set<Work> work;

    public Car(String num, String color, String mark, boolean is_foreign) {
        this.num = num;
        this.color = color;
        this.mark = mark;
        this.is_foreign = is_foreign;
    }


    public Long getId() {
        return id;
    }

    public String getNum() {
        return num;
    }

    public String getColor() {
        return color;
    }

    public String getMark() {
        return mark;
    }

    public boolean isIs_foreign() {
        return is_foreign;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setNum(String num) {
        this.num = num;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public void setMark(String mark) {
        this.mark = mark;
    }

    public void setIs_foreign(boolean is_foreign) {
        this.is_foreign = is_foreign;
    }

    @Override
    public String toString() {
        return "Car{" +
                "id=" + id +
                ", num='" + num + '\'' +
                ", color='" + color + '\'' +
                ", mark='" + mark + '\'' +
                ", is_foreign=" + is_foreign +
                '}';
    }
}
