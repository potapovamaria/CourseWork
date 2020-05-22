package com.example.main.service;

import com.example.main.entity.Car;
import com.example.main.entity.Work;
import com.example.main.exception.WorksNotFoundException;
import com.example.main.repository.CarsRepository;
import com.example.main.repository.WorksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CarsServiceImpl implements CarsService{

    @Autowired
    private CarsRepository carsRepository;

    @Autowired
    private WorksRepository worksRepository;

    @Override
    public List<Car> listCars() {
        return (List<Car>) carsRepository.findAll();
    }

    @Override
    public Car findCar(long id) {
        Optional<Car> optionalCars = carsRepository.findById(id);
        if (optionalCars.isPresent())
        {
            return optionalCars.get();
        } else {
            throw new WorksNotFoundException("This car not found");
        }
    }

    @Override
    public Car addCar(Car car) {
        return carsRepository.save(car);
    }

    @Override
    public void deleteCar(long id) {
        List<Work> works = (List<Work>) worksRepository.findAll();
        for (int i = 0; i < works.size(); i++){
            Work work = works.get(i);
            if (work.getCars().getId() == id) {
                worksRepository.delete(work);
            }
        }
        carsRepository.deleteById(id);
    }

    @Override
    public void editCar(long id, String mark, String num, Boolean is_foreign, String color) {
        Optional<Car> optionalCars = carsRepository.findById(id);
        if (optionalCars.isPresent()) {
            Car car = optionalCars.get();
            car.setColor(color);
            car.setIs_foreign(is_foreign);
            car.setMark(mark);
            car.setNum(num);
            carsRepository.save(car);
        }
    }
}
