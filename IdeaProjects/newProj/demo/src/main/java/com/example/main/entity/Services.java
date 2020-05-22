package com.example.main.entity;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "services")
public class Services {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    private String name;

    private Integer cost_our;

    private Integer cost_foreign;

    public Services() {
    }

    public Services(String name, Integer cost_foreign, Integer cost_our) {
        this.cost_foreign = cost_foreign;
        this.cost_our = cost_our;
        this.name = name;
    }

    @OneToMany(mappedBy = "service", cascade = CascadeType.ALL)
    private Set<Work> work;

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Integer getCost_our() {
        return cost_our;
    }

    public Integer getCost_foreign() {
        return cost_foreign;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setCost_our(Integer cost_our) {
        this.cost_our = cost_our;
    }

    public void setCost_foreign(Integer cost_foreign) {
        this.cost_foreign = cost_foreign;
    }

    @Override
    public String toString() {
        return "Services{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", cost_our=" + cost_our +
                ", cost_foreign=" + cost_foreign +
                '}';
    }
}
