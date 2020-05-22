package com.example.main.entity;

import javax.persistence.*;

@Entity
@Table(name = "works")
public class Work {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long Id;

    private String date_work;

    @ManyToOne()
    @JoinColumn(name = "master_id", nullable = false)
    private Master master;

    @ManyToOne()
    @JoinColumn(name = "car_id", nullable = false)
    private Car car;

    @ManyToOne()
    @JoinColumn(name = "service_id", nullable = false)
    private Services service;

    public Work() {
    }

    public Work(String date_work, Master master, Services service, Car car) {
        this.date_work = date_work;
        this.car = car;
        this.master = master;
        this.service = service;
    }

    public Car getCars() {
        return car;
    }

    public void setCars(Car cars) {
        this.car = cars;
    }

    public Master getMasters() {
        return master;
    }

    public Services getServices() {
        return service;
    }

    public void setMasters(Master masters) {
        this.master = masters;
    }

    public void setServices(Services services) {
        this.service = services;
    }

    public Long getId() {
        return Id;
    }

    public String getDate_work() {
        return date_work;
    }

    public void setId(Long id) {
        Id = id;
    }

    public void setDate_work(String date_work) {
        this.date_work = date_work;
    }

    @Override
    public String toString() {
        return "Works{" +
                "Id=" + Id +
                ", date_work='" + date_work + '\'' +
                ", masters=" + master +
                ", cars=" + car +
                ", services=" + service +
                '}';
    }
}
