package com.example.main.service;

import com.example.main.entity.Car;

import java.util.List;

public interface CarsService {
    List<Car> listCars();
    Car findCar(long id);
    Car addCar(Car cars);
    void deleteCar(long id);
    void editCar(long id, String mark, String num, Boolean is_foreign, String color);
}
